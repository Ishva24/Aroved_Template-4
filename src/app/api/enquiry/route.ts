import { NextResponse } from "next/server";

/**
 * Enquiry endpoint. Delivers submissions by email through Resend when
 * RESEND_API_KEY is configured. Without it, responds 503 so the client can
 * fall back to opening the visitor's mail client (no enquiry is silently lost).
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const s = (k: string, max = 200) => String(body[k] ?? "").trim().slice(0, max);
  const data = {
    name: s("name"),
    organisation: s("organisation"),
    email: s("email"),
    phone: s("phone", 40),
    product: s("product"),
    message: s("message", 5000),
  };

  if (body.company_website) return NextResponse.json({ ok: true }); // honeypot
  if (!data.name || !data.message || !/^\S+@\S+\.\S+$/.test(data.email)) {
    return NextResponse.json({ error: "Please complete the required fields." }, { status: 422 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) return NextResponse.json({ error: "Email delivery is not configured." }, { status: 503 });

  const esc = (v: string) => v.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
  const rows = Object.entries(data)
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#555;text-transform:capitalize">${k}</td><td style="padding:4px 0">${esc(v || "-").replace(/\n/g, "<br>")}</td></tr>`)
    .join("");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.ENQUIRY_FROM ?? "AROSAFE Website <onboarding@resend.dev>",
      to: [process.env.ENQUIRY_TO ?? "sales@aroved.com"],
      reply_to: data.email,
      subject: `Website enquiry: ${data.product || "General"} — ${data.name}`,
      html: `<h2 style="font-family:sans-serif">New website enquiry</h2><table style="font-family:sans-serif;font-size:14px">${rows}</table>`,
    }),
  });

  if (!res.ok) return NextResponse.json({ error: "We couldn't send your enquiry right now." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
