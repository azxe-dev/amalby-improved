"use client";

import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import MarqueeSection from "@/components/sections/Marquee";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const stackRef = useRef<HTMLDivElement>(null);

  // Section stacking: as each section scrolls behind the next,
  // it gets a subtle scale-down + border-radius push — the "card stack" feel.
  useGSAP(() => {
    const sections = stackRef.current?.querySelectorAll<HTMLElement>(".stack-section");
    if (!sections || sections.length < 2) return;

    sections.forEach((section, i) => {
      // Don't apply to the last section
      if (i >= sections.length - 1) return;

      ScrollTrigger.create({
        trigger: sections[i + 1],
        start: "top bottom",
        end: "top top",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(section, {
            scale: 1 - p * 0.025,
            transformOrigin: "center top",
            overwrite: "auto",
          });
        },
        onLeave: () => {
          gsap.to(section, { scale: 0.975, overwrite: "auto", duration: 0.1 });
        },
        onLeaveBack: () => {
          gsap.to(section, { scale: 1, overwrite: "auto", duration: 0.3, ease: "power2.out" });
        },
      });
    });
  }, { scope: stackRef });

  return (
    <main ref={stackRef} className="bg-[#f2f2f2]">
      {/* Hero — full scrollytelling section, 200vh */}
      <div className="stack-section relative z-[1]" style={{ willChange: "transform" }}>
        <Hero />
      </div>

      {/* Services — stacks over Hero */}
      <div className="stack-section relative z-[2]" style={{ willChange: "transform" }}>
        <Services />
      </div>

      {/* Marquee — stacks over Services */}
      <div className="stack-section relative z-[3]" style={{ willChange: "transform" }}>
        <MarqueeSection />
      </div>

      {/* CTA — stacks over Marquee */}
      <div className="stack-section relative z-[4]" style={{ willChange: "transform" }}>
        <CTA />
      </div>

      {/* Footer — no stacking, just flows in naturally */}
      <div className="relative z-[5]">
        <Footer />
      </div>
    </main>
  );
}
