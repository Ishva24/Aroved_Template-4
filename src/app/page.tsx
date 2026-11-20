import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { ProductUniverse } from "@/components/sections/ProductUniverse";
import { Expertise } from "@/components/sections/Expertise";
import { WhyAroved } from "@/components/sections/WhyAroved";
import { ContactSection } from "@/components/sections/ContactSection";
import { VelocityMarquee } from "@/components/fx/VelocityMarquee";

export default function HomePage() {
  return (
    <>
      <Hero />
      <VelocityMarquee lines={["AROSAFE", "Infection Control", "Hygiene Care", "Gloves", "Drapes & Kits", "CSSD"]} />
      <ProductUniverse />
      <About />
      <Expertise />
      <WhyAroved />
      <ContactSection />
    </>
  );
}
