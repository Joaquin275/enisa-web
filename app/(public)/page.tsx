import { Hero } from "@/components/landing/Hero";
import { Services } from "@/components/landing/Services";
import { HowWeWork } from "@/components/landing/HowWeWork";
import { Zones } from "@/components/landing/Zones";
import { Experience } from "@/components/landing/Experience";
import { FAQ } from "@/components/landing/FAQ";
import { CTA } from "@/components/landing/CTA";
import { LocalBusinessSchema } from "@/components/landing/Schema";

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
      <CTA />
    </>
  );
}
