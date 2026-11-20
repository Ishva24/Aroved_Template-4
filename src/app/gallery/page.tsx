import type { Metadata } from "next";
import { GalleryClient } from "@/components/gallery/GalleryClient";

export const metadata: Metadata = {
  title: "Visual Gallery & Product Archive | AROSAFE by Aroved",
  description:
    "Explore authentic high-resolution photography and packaging showcases for AROSAFE surgical gloves, infection control drapes, CSSD reels, baby diapers, and adult incontinence solutions.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Visual Gallery & Product Archive | AROSAFE Healthcare",
    description: "Authentic clinical and packaging visual archive from Aroved Healthcare.",
    images: [{ url: "/images/products/aroved_hygiene_family_range.webp", alt: "Aroved Range Portfolio" }],
  },
};

export default function GalleryPage() {
  return <GalleryClient />;
}
