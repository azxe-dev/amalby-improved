"use client";

import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import GEO from "@/components/sections/GEO";
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
        // Activate GPU layer only while this animation is in range
        onEnter:     () => gsap.set(section, { willChange: "transform" }),
        onEnterBack: () => gsap.set(section, { willChange: "transform" }),
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(section, {
            scale: 1 - p * 0.025,
            transformOrigin: "center top",
            overwrite: "auto",
          });
        },
        onLeave: () => {
          // Snap to final resting scale, then release GPU layer
          gsap.set(section, { scale: 0.975, willChange: "auto" });
        },
        onLeaveBack: () => {
          // Restore full scale, release GPU layer
          gsap.to(section, {
            scale: 1,
            overwrite: "auto",
            duration: 0.3,
            ease: "power2.out",
            onComplete: () => { gsap.set(section, { willChange: "auto" }); },
          });
        },
      });
    });
  }, { scope: stackRef });

  return (
    <main ref={stackRef} className="bg-[#050505]">
      {/* Hero — full scrollytelling section, 200vh */}
      <div className="stack-section relative z-[1]">
        <Hero />
      </div>

      {/* Services — stacks over Hero */}
      <div className="stack-section relative z-[2]">
        <Services />
      </div>

      {/* GEO — stacks over Services */}
      <div className="stack-section relative z-[3]">
        <GEO />
      </div>

      {/* Marquee — stacks over GEO */}
      <div className="stack-section relative z-[4]">
        <MarqueeSection />
      </div>

      {/* CTA — stacks over Marquee */}
      <div className="stack-section relative z-[5]">
        <CTA />
      </div>

      {/* Footer — no stacking, just flows in naturally */}
      <div className="relative z-[6]">
        <Footer />
      </div>
    </main>
  );
}
