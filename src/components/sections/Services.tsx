"use client";

import React, { useRef, useMemo, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

// ─── Glass Card ──────────────────────────────────────────────────────────────
interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const GlassCard = ({ children, className = "", style }: CardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback(() => {
    gsap.to(ref.current, {
      y: -4,
      scale: 1.006,
      borderColor: "rgba(255, 255, 255, 0.15)",
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    gsap.to(ref.current, {
      y: 0,
      scale: 1,
      borderColor: "rgba(255, 255, 255, 0.08)",
      duration: 0.45,
      ease: "power3.out",
      overwrite: "auto",
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

    // Simple, performant scroll-triggered entrance — no pinning, no scrub
    gsap.fromTo(
      section.querySelectorAll(".glass-card"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      }
    );

    // Bar chart animation
    gsap.fromTo(
      section.querySelectorAll(".bar-item"),
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 0.6,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
        },
      }
    );

    // Section label
    gsap.fromTo(
      section.querySelector(".section-label"),
      { opacity: 0, x: -16 },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: section, start: "top 85%", once: true },
      }
    );

    // Text sweep
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
    <section ref={sectionRef} className="bg-[#f2f2f2] px-[6px] py-[6px] font-tomato">
      <div className="relative w-full bg-[#0A0A0A] rounded-[40px] md:rounded-[48px] p-6 md:p-14 overflow-hidden">

        {/* Subtle static glow — no blur animation, just ambient lighting */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-0 left-[5%] w-[45%] h-[50%] rounded-full opacity-[0.07]"
            style={{ background: "radial-gradient(ellipse at center, #4F8EF7 0%, transparent 70%)" }}
          />
          <div
            className="absolute bottom-0 right-[5%] w-[40%] h-[40%] rounded-full opacity-[0.06]"
            style={{ background: "radial-gradient(ellipse at center, #49C88B 0%, transparent 70%)" }}
          />
        </div>

        <p className="section-label text-white/30 text-[11px] uppercase tracking-[0.3em] font-bold mb-8 md:mb-10 px-1">
          The Capability Layer
        </p>

        {/* Responsive Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 relative z-10">

          {/* 01: Intro Card */}
          <GlassCard className="sm:col-span-1 lg:col-span-2 rounded-[28px] md:rounded-[32px] p-7 md:p-10 flex flex-col justify-between min-h-[300px] md:min-h-[440px]">
            <div>
              <span className="text-white/30 text-[9px] uppercase tracking-[0.25em] font-bold">Already Building</span>
              <h2 className="text-white font-semibold leading-[1.05] mt-8 text-sweep-light" style={{ fontSize: "clamp(24px, 2.5vw, 36px)", letterSpacing: "-0.04em" }}>
                AI that works at scale.
              </h2>
            </div>
            <p className="text-white/40 text-[14px] md:text-[15px] leading-relaxed">Across industries.<br />From day one.</p>
          </GlassCard>

          {/* 02: Stats Card */}
          <GlassCard className="sm:col-span-1 lg:col-span-4 rounded-[28px] md:rounded-[32px] p-7 md:p-10 flex flex-col justify-between" style={{ "--card-glow": "#49C88B" } as React.CSSProperties}>
            <div>
              <span className="text-white/40 text-[10px] uppercase tracking-[0.25em] font-bold">Automations Shipped</span>
              <div className="text-white font-semibold text-sweep-light mt-4" style={{ fontSize: "clamp(56px, 8vw, 96px)", letterSpacing: "-0.06em", lineHeight: 1 }}>50+</div>
            </div>
            <div>
              <span className="text-white/40 text-[10px] uppercase tracking-[0.25em] font-bold">Client Satisfaction</span>
              <div className="flex items-center gap-4 mt-4">
                <div className="text-white font-semibold text-sweep-light" style={{ fontSize: "clamp(40px, 6vw, 72px)", letterSpacing: "-0.04em", lineHeight: 1 }}>4.9/5</div>
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-[20px] text-white">✦</div>
              </div>
            </div>
          </GlassCard>

          {/* 03: AI Agents Card */}
          <GlassCard className="sm:col-span-2 lg:col-span-4 rounded-[28px] md:rounded-[32px] p-7 md:p-10 flex flex-col justify-between relative" style={{ "--card-glow": "#49C88B" } as React.CSSProperties}>
            <div className="absolute top-8 right-8 grid grid-cols-5 gap-2 opacity-[0.1]">
              {[...Array(25)].map((_, i) => <div key={i} className="w-1.5 h-1.5 bg-white rounded-full" />)}
            </div>
            <div>
              <h3 className="text-white font-semibold text-sweep-light mt-8" style={{ fontSize: "clamp(32px, 4vw, 54px)", letterSpacing: "-0.04em" }}>AI Agents</h3>
            </div>
            <p className="text-white/50 text-[14px] md:text-[15px] leading-relaxed max-w-[280px]">Autonomous agents that handle research, outreach, data extraction, and beyond — 24/7.</p>
          </GlassCard>

          {/* 04 + 05: Right Stack */}
          <div className="sm:col-span-1 lg:col-span-2 flex flex-row sm:flex-col gap-4">
            <GlassCard className="flex-1 rounded-[28px] md:rounded-[32px] p-6 md:p-8 flex flex-col justify-center">
              <p className="text-white italic font-medium leading-[1.6] text-[13px]">
                &quot;Within 2 weeks, they built us an agent that replaced 3 manual roles.&quot;
              </p>
              <span className="text-white/30 text-[9px] uppercase font-bold mt-4 tracking-[0.1em]">— Head of Ops, Fintech</span>
            </GlassCard>
            <GlassCard className="flex-1 sm:h-[160px] rounded-[28px] md:rounded-[32px] flex items-center justify-center px-6">
              <div className="flex items-end gap-2 h-12">
                {barHeights.map((h, i) => (
                  <div key={i} className="bar-item w-1.5 bg-[#49C88B]/60 rounded-full origin-bottom" style={{ height: `${h}%` }} />
                ))}
              </div>
            </GlassCard>
          </div>

          {/* 06: Process Automation */}
          <GlassCard className="sm:col-span-2 lg:col-span-6 rounded-[28px] md:rounded-[32px] p-8 md:p-14 flex flex-col justify-between min-h-[380px] md:min-h-[460px] relative">
            <div className="absolute bottom-0 right-0 w-[55%] h-[55%] pointer-events-none opacity-[0.04]">
              <svg className="w-full h-full" viewBox="0 0 200 100" fill="none">
                <path d="M0 50 Q50 20 100 50 T200 50" stroke="white" strokeWidth="2.5" fill="none" />
                <path d="M0 65 Q50 35 100 65 T200 65" stroke="white" strokeWidth="2.5" fill="none" />
                <path d="M0 80 Q50 50 100 80 T200 80" stroke="white" strokeWidth="2.5" fill="none" />
              </svg>
            </div>
            <div>
              <span className="text-white/20 text-[12px] font-bold block mb-4">02</span>
              <h3 className="text-white font-semibold text-sweep-light leading-[0.95]" style={{ fontSize: "clamp(40px, 6vw, 84px)", letterSpacing: "-0.04em" }}>
                Process<br />Automation
              </h3>
              <p className="text-white/50 text-[15px] md:text-[17px] leading-relaxed max-w-[340px] mt-6 md:mt-8">
                We map your repetitive operations and replace them with AI pipelines that run 24/7 without a single human touch.
              </p>
            </div>
            <MagneticButton>
              <button className="bg-white text-black px-7 py-3 rounded-full text-sm font-semibold mt-8 w-fit hover:bg-white/90 transition-colors">
                Learn more ↗
              </button>
            </MagneticButton>
          </GlassCard>

          {/* 07: Web Development */}
          <GlassCard className="sm:col-span-2 lg:col-span-6 rounded-[28px] md:rounded-[32px] p-8 md:p-14 flex flex-col justify-between min-h-[380px] md:min-h-[460px] relative" style={{ "--card-glow": "#B39DDB" } as React.CSSProperties}>
            <div className="absolute bottom-8 right-8 w-56 h-56 opacity-[0.04]">
              <div className="w-full h-full border-[2.5px] border-white rounded-full border-dashed" />
              <div className="absolute inset-8 border-[2.5px] border-white rounded-full border-dashed" />
              <div className="absolute inset-16 border-[2.5px] border-white rounded-full border-dashed" />
              <div className="absolute inset-0 m-auto w-10 h-10 bg-white rounded-full" />
            </div>
            <div>
              <span className="text-white/20 text-[12px] font-bold block mb-4">03</span>
              <h3 className="text-white font-semibold text-sweep-light leading-[0.95]" style={{ fontSize: "clamp(40px, 6vw, 84px)", letterSpacing: "-0.04em" }}>
                Web<br />Development
              </h3>
              <p className="text-white/50 text-[15px] md:text-[17px] leading-relaxed max-w-[340px] mt-6 md:mt-8">
                High-performance, beautifully designed websites and apps. Built fast, designed to convert, and shipped in days.
              </p>
            </div>
            <MagneticButton>
              <button className="bg-white text-black px-7 py-3 rounded-full text-sm font-semibold mt-8 w-fit hover:bg-white/90 transition-colors">
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
