import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Features from "@/components/sections/Features";
import MarqueeSection from "@/components/sections/Marquee";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="bg-[#f2f2f2]">
      <Hero />
      <Services />
      <Features />
      <MarqueeSection />
      <CTA />
      <Footer />
    </main>
  );
}

