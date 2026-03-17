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
  glowColor?: string;
}

const GlassCard = ({ children, className = "", style, glowColor }: CardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback(() => {
    gsap.to(ref.current, {
      y: -6,
      scale: 1.012,
      borderColor: "rgba(255, 255, 255, 0.18)",
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });
    if (glowColor) {
      gsap.to(ref.current, {
        boxShadow: `0 0 0 1px rgba(255,255,255,0.1), 0 20px 60px -12px ${glowColor}55`,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  }, [glowColor]);

  const handleMouseLeave = useCallback(() => {
    gsap.to(ref.current, {
      y: 0,
      scale: 1,
      borderColor: "rgba(255, 255, 255, 0.08)",
      boxShadow: "none",
      duration: 0.5,
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
  const barHeights = useMemo(() => [30, 55, 38, 72, 35, 62, 48], []);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Section header slides in
    gsap.fromTo(
      section.querySelectorAll(".header-anim"),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: section, start: "top 85%", once: true },
      }
    );

    // Cards stagger in with a slight y and scale
    gsap.fromTo(
      section.querySelectorAll(".glass-card"),
      { opacity: 0, y: 36, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.07,
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          once: true,
        },
      }
    );

    // Bar chart animation
    gsap.fromTo(
      section.querySelectorAll(".bar-item"),
      { scaleY: 0, opacity: 0 },
      {
        scaleY: 1,
        opacity: 1,
        duration: 0.7,
        stagger: 0.06,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
        },
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
    <section ref={sectionRef} className="bg-transparent px-[6px] py-[6px] font-tomato">
      <div className="relative w-full bg-[#0A0A0A] rounded-[40px] md:rounded-[48px] p-6 md:p-14 overflow-hidden" style={{ boxShadow: "0 0 0 1px rgba(100,200,255,0.06), 0 0 80px -10px rgba(50,170,255,0.10), 0 0 220px -40px rgba(0,140,255,0.05)" }}>

        {/* Ambient glow orbs — static, zero perf cost */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-0 left-[5%] w-[50%] h-[55%] rounded-full opacity-[0.09]"
            style={{ background: "radial-gradient(ellipse at center, #4F8EF7 0%, transparent 65%)" }}
          />
          <div
            className="absolute bottom-0 right-[5%] w-[45%] h-[45%] rounded-full opacity-[0.07]"
            style={{ background: "radial-gradient(ellipse at center, #49C88B 0%, transparent 65%)" }}
          />
          <div
            className="absolute top-[40%] right-[25%] w-[30%] h-[30%] rounded-full opacity-[0.04]"
            style={{ background: "radial-gradient(ellipse at center, #B39DDB 0%, transparent 70%)" }}
          />
        </div>

        {/* Section header */}
        <div className="mb-10 md:mb-14 px-1 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="header-anim section-label text-white/30 text-[11px] uppercase tracking-[0.3em] font-bold mb-3">
              What We Do
            </p>
            <h2 className="header-anim text-white font-semibold leading-[1.0] tracking-tight" style={{ fontSize: "clamp(32px, 4vw, 56px)", letterSpacing: "-0.03em" }}>
              Six services.<br />
              <span className="text-white/25">One team.</span>
            </h2>
          </div>
          <p className="header-anim text-white/35 text-[14px] leading-relaxed max-w-[260px] text-right hidden sm:block">
            EU · UK · UAE<br />Custom pricing on every project.
          </p>
        </div>

        {/* Responsive Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 relative z-10">

          {/* 01: Identity Card */}
          <GlassCard
            className="sm:col-span-1 lg:col-span-2 rounded-[28px] md:rounded-[32px] p-7 md:p-10 flex flex-col justify-between min-h-[300px] md:min-h-[440px] relative overflow-hidden"
            glowColor="#4F8EF7"
          >
            {/* Decorative corner accent */}
            <div className="absolute bottom-0 right-0 w-24 h-24 opacity-[0.06]">
              <svg viewBox="0 0 100 100" fill="none">
                <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="1.5" />
                <circle cx="100" cy="100" r="50" stroke="white" strokeWidth="1.5" />
                <circle cx="100" cy="100" r="20" stroke="white" strokeWidth="1.5" />
              </svg>
            </div>
            <div>
              <span className="text-white/25 text-[9px] uppercase tracking-[0.25em] font-bold">EU · UK · UAE</span>
              <h2 className="text-white font-semibold leading-[1.05] mt-7 text-sweep-light" style={{ fontSize: "clamp(22px, 2.2vw, 32px)", letterSpacing: "-0.04em" }}>
                No templates.<br />No packages.
              </h2>
            </div>
            <p className="text-white/35 text-[13px] md:text-[14px] leading-relaxed">Every project scoped<br />from scratch.</p>
          </GlassCard>

          {/* 02: Speed Card */}
          <GlassCard
            className="sm:col-span-1 lg:col-span-4 rounded-[28px] md:rounded-[32px] p-7 md:p-10 flex flex-col justify-between relative overflow-hidden"
            style={{ "--card-glow": "#49C88B" } as React.CSSProperties}
            glowColor="#49C88B"
          >
            {/* Speed lines */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
              <svg width="100%" height="100%" viewBox="0 0 300 300" fill="none">
                {[0,1,2,3,4,5,6,7].map(i => (
                  <line key={i} x1={20 + i*38} y1="0" x2={i*38} y2="300" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                ))}
              </svg>
            </div>
            <div>
              <span className="text-white/35 text-[10px] uppercase tracking-[0.25em] font-bold">How We Work</span>
              <div className="text-white font-semibold text-sweep-light mt-3" style={{ fontSize: "clamp(64px, 9vw, 108px)", letterSpacing: "-0.06em", lineHeight: 0.9 }}>
                Fast.
              </div>
            </div>
            <div>
              <span className="text-white/35 text-[10px] uppercase tracking-[0.25em] font-bold">Pricing</span>
              <p className="text-white/55 text-[14px] md:text-[15px] mt-2 leading-relaxed">
                Custom on every<br />project. No hidden costs.
              </p>
            </div>
          </GlassCard>

          {/* 03: AI Agents Card */}
          <GlassCard
            className="sm:col-span-2 lg:col-span-4 rounded-[28px] md:rounded-[32px] p-7 md:p-10 flex flex-col justify-between relative overflow-hidden"
            style={{ "--card-glow": "#49C88B" } as React.CSSProperties}
            glowColor="#49C88B"
          >
            {/* Node pattern */}
            <div className="absolute top-6 right-6 grid grid-cols-5 gap-[7px] opacity-[0.14]">
              {[...Array(25)].map((_, i) => (
                <div key={i} className="w-[5px] h-[5px] bg-white rounded-full" />
              ))}
            </div>
            {/* Connecting lines between dots */}
            <div className="absolute top-6 right-6 opacity-[0.06] pointer-events-none w-[86px] h-[86px]">
              <svg width="86" height="86" viewBox="0 0 86 86" fill="none">
                <line x1="8" y1="8" x2="78" y2="78" stroke="white" strokeWidth="1" />
                <line x1="78" y1="8" x2="8" y2="78" stroke="white" strokeWidth="1" />
                <circle cx="43" cy="43" r="20" stroke="white" strokeWidth="1" />
              </svg>
            </div>
            <div>
              <span className="text-white/25 text-[10px] uppercase tracking-[0.25em] font-bold">01</span>
              <h3 className="text-white font-semibold text-sweep-light mt-4" style={{ fontSize: "clamp(30px, 3.8vw, 50px)", letterSpacing: "-0.04em" }}>AI Agents</h3>
            </div>
            <p className="text-white/45 text-[14px] md:text-[15px] leading-relaxed max-w-[260px]">
              Purpose-built for specific jobs — outreach, research, data extraction, internal ops. They run while you don&apos;t.
            </p>
          </GlassCard>

          {/* 04 + 05: Right Stack */}
          <div className="sm:col-span-1 lg:col-span-2 flex flex-row sm:flex-col gap-4">
            <GlassCard className="flex-1 rounded-[28px] md:rounded-[32px] p-6 md:p-7 flex flex-col justify-between">
              <span className="text-white/20 text-[9px] uppercase tracking-[0.2em] font-bold">Status</span>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-[#49C88B]" style={{ boxShadow: "0 0 6px #49C88B" }} />
                  <span className="text-white/60 text-[11px] font-semibold uppercase tracking-[0.15em]">Active</span>
                </div>
                <p className="text-white/50 font-medium leading-[1.5] text-[12px]">
                  Taking on new projects in the EU, UK, and UAE.
                </p>
              </div>
            </GlassCard>
            <GlassCard className="flex-1 sm:h-[150px] rounded-[28px] md:rounded-[32px] flex flex-col items-start justify-end px-5 pb-5 pt-4 gap-1 relative overflow-hidden">
              <span className="text-white/20 text-[9px] uppercase tracking-[0.2em] font-bold mb-1">Activity</span>
              <div className="flex items-end gap-[5px] h-10 w-full">
                {barHeights.map((h, i) => (
                  <div
                    key={i}
                    className="bar-item flex-1 bg-[#49C88B]/50 rounded-sm origin-bottom"
                    style={{ height: `${h}%`, borderRadius: "2px 2px 0 0" }}
                  />
                ))}
              </div>
            </GlassCard>
          </div>

          {/* 06: Process Automation */}
          <GlassCard
            className="sm:col-span-2 lg:col-span-6 rounded-[28px] md:rounded-[32px] p-8 md:p-14 flex flex-col justify-between min-h-[380px] md:min-h-[480px] relative overflow-hidden"
            glowColor="#4F8EF7"
          >
            {/* Wave decoration */}
            <div className="absolute bottom-0 right-0 w-[60%] h-[50%] pointer-events-none opacity-[0.07]">
              <svg className="w-full h-full" viewBox="0 0 240 120" fill="none" preserveAspectRatio="xMaxYMax slice">
                <path d="M0 60 Q40 20 80 60 T160 60 T240 60" stroke="white" strokeWidth="2" fill="none" />
                <path d="M0 78 Q40 38 80 78 T160 78 T240 78" stroke="white" strokeWidth="2" fill="none" />
                <path d="M0 96 Q40 56 80 96 T160 96 T240 96" stroke="white" strokeWidth="2" fill="none" />
                <path d="M0 114 Q40 74 80 114 T160 114 T240 114" stroke="white" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
            <div>
              <span className="text-white/20 text-[12px] font-bold block mb-5">02</span>
              <h3 className="text-white font-semibold text-sweep-light leading-[0.93]" style={{ fontSize: "clamp(38px, 5.5vw, 80px)", letterSpacing: "-0.04em" }}>
                Process<br />Automation
              </h3>
              <p className="text-white/45 text-[15px] md:text-[16px] leading-relaxed max-w-[320px] mt-6 md:mt-8">
                Repetitive work has a cost. We map it, rebuild it as an AI pipeline, and take the human out of the loop — inbox triage, reporting, routing, data entry.
              </p>
            </div>
            <MagneticButton>
              <a href="/contact" className="bg-white text-black px-7 py-3 rounded-full text-[13px] font-semibold mt-8 w-fit hover:bg-white/90 transition-colors inline-block">
                Start a project ↗
              </a>
            </MagneticButton>
          </GlassCard>

          {/* 07: Web Development */}
          <GlassCard
            className="sm:col-span-2 lg:col-span-6 rounded-[28px] md:rounded-[32px] p-8 md:p-14 flex flex-col justify-between min-h-[380px] md:min-h-[480px] relative overflow-hidden"
            style={{ "--card-glow": "#B39DDB" } as React.CSSProperties}
            glowColor="#B39DDB"
          >
            {/* Orbit decoration */}
            <div className="absolute bottom-4 right-4 w-64 h-64 opacity-[0.07] pointer-events-none">
              <svg width="100%" height="100%" viewBox="0 0 256 256" fill="none">
                <circle cx="128" cy="128" r="110" stroke="white" strokeWidth="1.5" strokeDasharray="6 8" />
                <circle cx="128" cy="128" r="72" stroke="white" strokeWidth="1.5" />
                <circle cx="128" cy="128" r="34" stroke="white" strokeWidth="1.5" strokeDasharray="4 6" />
                <circle cx="128" cy="18" r="6" fill="white" />
                <circle cx="238" cy="128" r="4" fill="white" />
                <circle cx="56" cy="128" r="3" fill="white" />
              </svg>
            </div>
            <div>
              <span className="text-white/20 text-[12px] font-bold block mb-5">03</span>
              <h3 className="text-white font-semibold text-sweep-light leading-[0.93]" style={{ fontSize: "clamp(38px, 5.5vw, 80px)", letterSpacing: "-0.04em" }}>
                Web<br />Development
              </h3>
              <p className="text-white/45 text-[15px] md:text-[16px] leading-relaxed max-w-[320px] mt-6 md:mt-8">
                Built properly, shipped fast. We handle the full thing — design, build, and deployment. Sites that actually load, convert, and hold up over time.
              </p>
            </div>
            <MagneticButton>
              <a href="/contact" className="bg-white text-black px-7 py-3 rounded-full text-[13px] font-semibold mt-8 w-fit hover:bg-white/90 transition-colors inline-block">
                Start a project ↗
              </a>
            </MagneticButton>
          </GlassCard>

        </div>
      </div>
    </section>
  );
};

export default Services;
