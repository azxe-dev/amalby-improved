"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);
  const labelRef   = useRef<HTMLParagraphElement>(null);
  const subRef     = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    const card    = cardRef.current;
    const left    = leftRef.current;
    const right   = rightRef.current;
    const label   = labelRef.current;
    const sub     = subRef.current;
    
    if (!section || !wrapper || !card || !left || !right) return;

    // ── 1. Entrance — text fades + rises on load ──────────────────────────
    const entrance = gsap.timeline({ delay: 0.2 });
    entrance
      .fromTo(left,  { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", overwrite: "auto" })
      .fromTo(right, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", overwrite: "auto" }, "<0.08")
      .fromTo(label, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power2.out", overwrite: "auto" }, "-=0.4");
    
    // Keep subtitle invisible until scroll
    if (sub) gsap.set(sub, { opacity: 0, y: 50 });

    // ── 2. Scroll-driven split ──────────────────────────────────────────
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.4,
      },
    });

    tl
      // Card retracts: padding opens, radius grows
      .to(wrapper, {
        padding: "12px",
        duration: 1,
        ease: "none",
      }, 0)
      .to(card, {
        borderRadius: "40px",
        duration: 1,
        ease: "none",
      }, 0)
      // Text halves fly left / right past card edges
      .to(left, {
        x: "-42vw",
        duration: 1,
        ease: "power1.in",
      }, 0)
      .to(right, {
        x: "42vw",
        duration: 1,
        ease: "power1.in",
      }, 0)
      .to(label, { opacity: 0, duration: 0.3, ease: "none" }, 0)
      // Subtitle rises from BELOW center
      .fromTo(
        sub,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        0.5
      );

    // ── 3. Infinite Shimmer ──────────────────────────────────────────
    gsap.to([left, right], {
      backgroundPosition: "200% center",
      duration: 10,
      ease: "none",
      repeat: -1,
    });

    // ── 4. Subtitle Word Shimmer ──────────────────────────────────
    gsap.to(section.querySelectorAll(".shim-silver"), {
      backgroundPosition: "200% center",
      duration: 8,
      ease: "none",
      repeat: -1,
    });

  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative will-change-transform"
      style={{ height: "200vh", background: "#f2f2f2" }}
    >
      {/* Sticky frame — wrapper padding is animated 0 → 24px */}
      <div
        ref={wrapperRef}
        className="sticky top-0 h-screen will-change-[padding]"
        style={{ background: "#f2f2f2", padding: "0px" }}
      >
        {/* Dark hero card — border-radius animated 0 → 40px */}
        <div
          ref={cardRef}
          className="relative w-full h-full overflow-hidden will-change-[border-radius]"
          style={{ background: "#0A0A0A", borderRadius: "0px" }}
        >
          {/* GIF Background Overlay */}
          <div className="absolute inset-0 pointer-events-none select-none">
            <img 
              src="/hero-bg.gif" 
              alt=""
              className="w-full h-full object-cover opacity-[0.22] grayscale-[0.3]"
            />
            {/* Soft vignette to keep focus on center */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 via-transparent to-[#0A0A0A]/60" />
          </div>
        </div>

        {/* Text layers outside the card clip bounds */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none select-none">
          <div
            ref={leftRef}
            className="font-semibold text-right will-change-transform"
            style={{
              fontSize: "clamp(44px, 5.2vw, 86px)",
              lineHeight: "1.15",
              paddingBottom: "10px",
              letterSpacing: "-0.035em",
              opacity: 0,
              background: "linear-gradient(90deg, #555555 0%, #ffffff 50%, #555555 100%)",
              backgroundSize: "200% auto",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Less talk.
          </div>

          <div style={{ width: "clamp(12px, 1vw, 24px)", flexShrink: 0 }} />

          <div
            ref={rightRef}
            className="font-semibold text-left will-change-transform"
            style={{
              fontSize: "clamp(44px, 5.2vw, 86px)",
              lineHeight: "1.15",
              paddingBottom: "10px",
              letterSpacing: "-0.035em",
              opacity: 0,
              background: "linear-gradient(90deg, #555555 0%, #ffffff 50%, #555555 100%)",
              backgroundSize: "200% auto",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            More agents.
          </div>
        </div>

        {/* Scroll hint */}
        <p
          ref={labelRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white/30 text-[11px] uppercase tracking-[0.25em] font-medium pointer-events-none select-none"
          style={{ opacity: 0 }}
        >
          Scroll to explore
        </p>

        {/* Subtitle statement */}
        <div
          ref={subRef}
          className="absolute z-20 w-full flex items-center justify-center pointer-events-none select-none will-change-[transform,opacity]"
          style={{
            top: "50%",
            left: 0,
            transform: "translateY(-50%)",
            paddingLeft:  "clamp(32px, 6vw, 120px)",
            paddingRight: "clamp(32px, 6vw, 120px)",
            opacity: 0,
          }}
        >
          <p
            className="text-white font-semibold text-center leading-tight"
            style={{
              fontSize: "clamp(32px, 4.2vw, 68px)",
              letterSpacing: "-0.025em",
              maxWidth: "820px",
            }}
          >
            Whether it&apos;s simple or complex, our agents
            help you <span className="shim-silver" style={{
              background: "linear-gradient(90deg, #555555 0%, #ffffff 50%, #555555 100%)",
              backgroundSize: "200% auto",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}>save</span> <span className="shim-silver" style={{
              background: "linear-gradient(90deg, #555555 0%, #ffffff 50%, #555555 100%)",
              backgroundSize: "200% auto",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}>time</span> and <span className="shim-silver" style={{
              background: "linear-gradient(90deg, #555555 0%, #ffffff 50%, #555555 100%)",
              backgroundSize: "200% auto",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}>revenue</span>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
