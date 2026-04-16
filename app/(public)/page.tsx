import dynamic from "next/dynamic";
import { Hero } from "@/components/landing/Hero";
import { Services } from "@/components/landing/Services";
import { LocalBusinessSchema } from "@/components/landing/Schema";

// Secciones below-the-fold — carga diferida para mejorar el LCP
const HowWeWork = dynamic(() => import("@/components/landing/HowWeWork").then(m => ({ default: m.HowWeWork })));
const Zones = dynamic(() => import("@/components/landing/Zones").then(m => ({ default: m.Zones })));
const Experience = dynamic(() => import("@/components/landing/Experience").then(m => ({ default: m.Experience })));
const FAQ = dynamic(() => import("@/components/landing/FAQ").then(m => ({ default: m.FAQ })));
const MapSection = dynamic(() => import("@/components/landing/MapSection").then(m => ({ default: m.MapSection })));
const CTA = dynamic(() => import("@/components/landing/CTA").then(m => ({ default: m.CTA })));

export default function HomePage() {
  return (
    <>
      <LocalBusinessSchema />
      <Hero />
      <Services />
      <HowWeWork />
      <Zones />
      <Experience />
      <FAQ />
      <MapSection />
      <CTA />
    </>
  );
}
