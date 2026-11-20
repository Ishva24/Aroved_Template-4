import type { Metadata } from "next";
import { company } from "@/lib/company";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${company.legalName}, Rajajinagar Industrial Town, Bangalore. Call ${company.phones.join(" / ")} or email ${company.email}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="pt-16">
      <ContactSection headingLevel="h1" />
    </div>
  );
}
