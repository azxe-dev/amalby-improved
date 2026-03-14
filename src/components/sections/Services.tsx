"use client";

import React, { useRef, useMemo, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

// ─── Liquid Glass Card ────────────────────────────────────────────────────────
// Single reusable wrapper that handles the cursor-light effect via CSS custom
// properties — no extra DOM nodes, GPU-composited only.
interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const GlassCard = ({ children, className = "", style }: CardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { 
      y: -6, 
      scale: 1.008, 
      borderColor: "rgba(255, 255, 255, 0.2)",
      duration: 0.35, 
      ease: "power2.out", 
      overwrite: "auto" 
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { 
      y: 0, 
      scale: 1, 
      borderColor: "rgba(255, 255, 255, 0.08)",
      duration: 0.45, 
      ease: "power2.inOut", 
      overwrite: "auto" 
    });
  }, []);

  return (
    <div
      ref={ref}
      className={`glass-card ${className}`}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

// ─── Services Section ─────────────────────────────────────────────────────────
const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const barHeights = useMemo(() => [25, 45, 30, 60, 28, 50, 40], []);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    // 1. Initial State: Hide all cards
    const cards = gsap.utils.toArray<HTMLElement>(".glass-card");
    gsap.set(cards, { opacity: 0, y: 40, scale: 0.98 });

    // 2. Create Scroll-Driven Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top", 
        end: "+=200%",   
        pin: section.querySelector(".section-reveal-container"), 
        scrub: 1,
        anticipatePin: 1,
      }
    });

    // 3. Staggered Entrance
    tl.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      stagger: 0.5,
      ease: "power2.out"
    });

    // 4. Subtle backlighting glow stagger
    tl.fromTo(
      section.querySelectorAll(".card-light-bg"),
      { opacity: 0, scale: 0.5 },
      { opacity: 0.15, scale: 1.2, duration: 1.5, stagger: 0.5, ease: "power1.inOut" },
      0
    );

    // 5. Performance stats bars
    tl.fromTo(
      section.querySelectorAll(".bar-item"),
      { scaleY: 0 },
      { scaleY: 1, duration: 0.8, stagger: 0.05, ease: "power4.out" },
      "-=1.5"
    );

    // 6. Label reveal (independent or tied to start)
    gsap.fromTo(
      section.querySelector(".section-label"),
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: section, start: "top 85%" },
      }
    );

    // 7. Text sweep animation (independent)
    section.querySelectorAll(".text-sweep-light").forEach((el) => {
      gsap.to(el, {
        backgroundPosition: "0% 0%",
        duration: 1.8,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-[#f2f2f2] px-[12px] md:px-[20px] py-[6px] font-tomato">
      {/* Rounded section wrapper — will be pinned */}
      <div className="section-reveal-container relative max-w-[1400px] mx-auto bg-[#0A0A0A] rounded-[48px] p-8 md:p-14 overflow-hidden">
        
        {/* Subtle background glow elements for scrollytelling reveal */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="card-light-bg absolute top-[10%] left-[10%] w-[40%] h-[40%] bg-blue-500/20 blur-[120px] rounded-full" />
          <div className="card-light-bg absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
        </div>

        <p className="section-label text-white/30 text-[11px] uppercase tracking-[0.3em] font-bold mb-10 px-1">
          The Capability Layer
        </p>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 auto-rows-auto relative z-10">

          {/* 01: Intro Card — 2 cols */}
          <GlassCard className="md:col-span-2 rounded-[32px] p-10 flex flex-col justify-between min-h-[440px]">
            <div>
              <span className="text-white/30 text-[9px] uppercase tracking-[0.25em] font-bold">Already Building</span>
              <h2 className="text-white font-semibold leading-[1.05] mt-10 text-sweep-light" style={{ fontSize: "clamp(28px, 2.5vw, 36px)", letterSpacing: "-0.04em" }}>
                AI that works at scale.
              </h2>
            </div>
            <p className="text-white/40 text-[15px] leading-relaxed">Across industries.<br />From day one.</p>
          </GlassCard>

          {/* 02: Stats Card — 4 cols */}
          <GlassCard className="md:col-span-4 rounded-[32px] p-10 flex flex-col justify-between" style={{ "--card-glow": "#49C88B" } as React.CSSProperties}>
            <div>
              <span className="text-white/40 text-[10px] uppercase tracking-[0.25em] font-bold">Automations Shipped</span>
              <div className="text-white font-semibold text-sweep-light mt-4" style={{ fontSize: "clamp(64px, 8vw, 96px)", letterSpacing: "-0.06em", lineHeight: 1 }}>50+</div>
            </div>
            <div>
              <span className="text-white/40 text-[10px] uppercase tracking-[0.25em] font-bold">Client Satisfaction</span>
              <div className="flex items-center gap-5 mt-4">
                <div className="text-white font-semibold text-sweep-light" style={{ fontSize: "clamp(48px, 6vw, 72px)", letterSpacing: "-0.04em", lineHeight: 1 }}>4.9/5</div>
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-[24px] text-white">✦</div>
              </div>
            </div>
          </GlassCard>

          {/* 03: AI Agents Card — 4 cols */}
          <GlassCard className="md:col-span-4 rounded-[32px] p-10 flex flex-col justify-between relative" style={{ "--card-glow": "#49C88B" } as React.CSSProperties}>
            <div className="absolute top-10 right-10 grid grid-cols-5 gap-2.5 opacity-[0.12]">
              {[...Array(25)].map((_, i) => <div key={i} className="w-1.5 h-1.5 bg-white rounded-full" />)}
            </div>
            <div>
              <h3 className="text-white font-semibold text-sweep-light mt-10" style={{ fontSize: "clamp(36px, 4vw, 54px)", letterSpacing: "-0.04em" }}>AI Agents</h3>
            </div>
            <p className="text-white/50 text-[15px] leading-relaxed max-w-[280px]">Autonomous agents that handle research, outreach, data extraction, and beyond — 24/7.</p>
          </GlassCard>

          {/* 04 + 05: Right Stack — 2 cols */}
          <div className="md:col-span-2 flex flex-col gap-5">
            <GlassCard className="flex-1 rounded-[32px] p-8 flex flex-col justify-center">
              <p className="text-white italic font-medium leading-[1.6] text-[13px]">
                "Within 2 weeks, they built us an agent that replaced 3 manual roles."
              </p>
              <span className="text-white/30 text-[9px] uppercase font-bold mt-4 tracking-[0.1em]">— Head of Ops, Fintech</span>
            </GlassCard>
            <GlassCard className="h-[160px] rounded-[32px] flex items-center justify-center px-8">
              <div className="flex items-end gap-2 h-12">
                {barHeights.map((h, i) => (
                  <div key={i} className="bar-item w-1.5 bg-[#49C88B]/60 rounded-full origin-bottom" style={{ height: `${h}%` }} />
                ))}
              </div>
            </GlassCard>
          </div>

          {/* 06: Process Automation — 6 cols */}
          <GlassCard className="md:col-span-6 rounded-[32px] p-14 flex flex-col justify-between min-h-[460px] relative">
            <div className="absolute bottom-0 right-0 w-[55%] h-[55%] pointer-events-none opacity-[0.04]">
              <svg className="w-full h-full" viewBox="0 0 200 100" fill="none">
                <path d="M0 50 Q50 20 100 50 T200 50" stroke="white" strokeWidth="2.5" fill="none" />
                <path d="M0 65 Q50 35 100 65 T200 65" stroke="white" strokeWidth="2.5" fill="none" />
                <path d="M0 80 Q50 50 100 80 T200 80" stroke="white" strokeWidth="2.5" fill="none" />
              </svg>
            </div>
            <div>
              <span className="text-white/20 text-[12px] font-bold block mb-4">02</span>
              <h3 className="text-white font-semibold text-sweep-light leading-[0.95]" style={{ fontSize: "clamp(48px, 6vw, 84px)", letterSpacing: "-0.04em" }}>
                Process<br />Automation
              </h3>
              <p className="text-white/50 text-[17px] leading-relaxed max-w-[340px] mt-8">
                We map your repetitive operations and replace them with AI pipelines that run 24/7 without a single human touch.
              </p>
            </div>
            <MagneticButton>
              <button className="bg-white text-black px-8 py-3.5 rounded-full text-sm font-semibold mt-10 w-fit">
                Learn more ↗
              </button>
            </MagneticButton>
          </GlassCard>

          {/* 07: Web Development — 6 cols */}
          <GlassCard className="md:col-span-6 rounded-[32px] p-14 flex flex-col justify-between min-h-[460px] relative" style={{ "--card-glow": "#B39DDB" } as React.CSSProperties}>
            <div className="absolute bottom-10 right-10 w-64 h-64 opacity-[0.04]">
              <div className="w-full h-full border-[2.5px] border-white rounded-full border-dashed" />
              <div className="absolute inset-8 border-[2.5px] border-white rounded-full border-dashed" />
              <div className="absolute inset-16 border-[2.5px] border-white rounded-full border-dashed" />
              <div className="absolute inset-0 m-auto w-12 h-12 bg-white rounded-full" />
            </div>
            <div>
              <span className="text-white/20 text-[12px] font-bold block mb-4">03</span>
              <h3 className="text-white font-semibold text-sweep-light leading-[0.95]" style={{ fontSize: "clamp(48px, 6vw, 84px)", letterSpacing: "-0.04em" }}>
                Web<br />Development
              </h3>
              <p className="text-white/50 text-[17px] leading-relaxed max-w-[340px] mt-8">
                High-performance, beautifully designed websites and apps. Built fast, designed to convert, and shipped in days.
              </p>
            </div>
            <MagneticButton>
              <button className="bg-white text-black px-8 py-3.5 rounded-full text-sm font-semibold mt-10 w-fit">
                Learn more ↗
              </button>
            </MagneticButton>
          </GlassCard>

        </div>
      </div>
    </section>
  );
};

export default Services;
