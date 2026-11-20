import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import { company } from "@/lib/company";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/fx/SmoothScroll";
import { Cursor } from "@/components/fx/Cursor";
import { Preloader } from "@/components/fx/Preloader";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
// Variable font (wght 100–800) — powers the kinetic headline weight effect.
const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: {
    default: `${company.legalName} | AROSAFE Infection Control Products`,
    template: `%s | ${company.legalName}`,
  },
  description:
    "Aroved Healthcare Pvt Ltd provides a comprehensive range of infection control products under the AROSAFE brand — examination and sterile surgical gloves, hygiene care, surgical drapes & kits and CSSD products. Bangalore, India.",
  keywords: ["AROSAFE", "Aroved Healthcare", "nitrile examination gloves", "sterile surgical gloves", "EVA gloves", "surgical drape kits", "sterilization reels", "CSSD products", "infection control", "Bangalore"],
  openGraph: {
    type: "website",
    siteName: company.legalName,
    locale: "en_IN",
    images: [{ url: "/images/reference/glove-45.webp", width: 1000, height: 1000, alt: "AROSAFE blue nitrile examination glove" }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#f4f8fd",
  width: "device-width",
  initialScale: 1,
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.legalName,
  brand: { "@type": "Brand", name: company.brand },
  url: company.url,
  logo: `${company.url}/images/logo.png`,
  email: company.email,
  telephone: company.phones.map((p) => `+91-${p}`),
  address: {
    "@type": "PostalAddress",
    streetAddress: `${company.address.line1}, ${company.address.line2}`,
    addressLocality: company.address.city,
    addressRegion: company.address.region,
    postalCode: company.address.postalCode,
    addressCountry: company.address.country,
  },
  openingHours: "Mo-Sa 09:30-18:00",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${sora.variable}`}>
      <body className="min-h-screen overflow-x-hidden">
        <a href="#main" className="sr-only z-[100] rounded-full bg-ink px-5 py-3 text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4">
          Skip to content
        </a>
        <Preloader />
        <SmoothScroll />
        <Cursor />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </body>
    </html>
  );
}
