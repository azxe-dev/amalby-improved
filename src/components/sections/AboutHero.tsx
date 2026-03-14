"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const AboutHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.1 });
    
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    ).fromTo(
      subRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    );
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="relative pt-[180px] pb-[80px] px-[12px] md:px-[20px] bg-[#f2f2f2] flex flex-col items-center justify-center text-center overflow-hidden"
    >
      <div className="max-w-[1200px] w-full z-10">
        <h1 
          ref={titleRef}
          className="text-[#0D0D0D] font-semibold leading-[1.05] tracking-tight mb-8"
          style={{ fontSize: "clamp(48px, 8vw, 108px)" }}
        >
          Built for Speed. <br />
          <span className="text-[#49C88B]">Scaled with Intelligence.</span>
        </h1>
        <p 
          ref={subRef}
          className="text-[#0D0D0D]/60 font-medium max-w-[640px] mx-auto leading-relaxed"
          style={{ fontSize: "clamp(18px, 1.5vw, 24px)" }}
        >
          Orchestrating the future of work with high-performance AI agents and internal tooling. Since 2026.
        </p>
      </div>
      
      {/* Subtle geometric background shapes */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none select-none -z-0">
        <svg viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="500" cy="500" r="400" stroke="black" strokeWidth="1" />
          <rect x="200" y="200" width="600" height="600" stroke="black" strokeWidth="1" />
          <path d="M100 500 L900 500 M500 100 L500 900" stroke="black" strokeWidth="1" />
        </svg>
      </div>
    </section>
  );
};

export default AboutHero;
