"use client";

import React, { useRef, useCallback, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────────── */

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  /* ── Tool avatar dots ─────────────────────────────────────────────── */
  const dots = useMemo(() => [
    { color: "#a29bfe", label: "AI" },
    { color: "#49C88B", label: "CL" },
    { color: "#fdcb6e", label: "N8" },
    { color: "#4285F4", label: "GM" },
    { color: "#6c5ce7", label: "NX" },
    { color: "#ff7675", label: "RC" },
    { color: "#0984e3", label: "PY" },
    { color: "#00b894", label: "VC" },
  ], []);

  /* ── 3D GSAP tilt helpers ─────────────────────────────────────────── */
  const tiltIn = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    gsap.to(el, {
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  }, []);

  const tiltOut = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    gsap.to(el, {
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      boxShadow: "0 0 0 rgba(0,0,0,0)",
      duration: 0.7,
      ease: "power3.out",
      overwrite: "auto",
    });
  }, []);

  /* ── Animations ───────────────────────────────────────────────────── */
  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    /* ── Staggered card entrance ──────────────────────────────────── */
    gsap.fromTo(
      section.querySelectorAll(".feat-card"),
      { opacity: 0, y: 70, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 1,
        ease: "power4.out",
        stagger: { each: 0.12, from: "start" },
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
      }
    );

    /* ── Label ────────────────────────────────────────────────────── */
    gsap.fromTo(
      section.querySelector(".feat-label"),
      { opacity: 0, x: -24 },
      {
        opacity: 1, x: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 85%" },
      }
    );

    /* ── Color Sweep Animation ───────────────────────────────────── */
    const sweepElements = section.querySelectorAll(".text-sweep, .text-sweep-light");
    sweepElements.forEach((el) => {
      gsap.to(el, {
        backgroundPosition: "0% 0%",
        duration: 1.8,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          toggleActions: "play none none none", // Only once
        },
      });
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-[#f2f2f2] px-[12px] md:px-[20px] py-[6px]">
      <div 
        className="relative max-w-[1800px] mx-auto bg-[#0D0D0D] rounded-[40px] md:rounded-[56px] overflow-hidden px-10 pt-14 pb-12 md:px-16 md:pt-20 md:pb-16"
      >
        {/* Label */}
        <div className="feat-label relative z-10 flex items-center gap-3 mb-12 opacity-0">
          <span className="text-[12px] uppercase tracking-[0.3em] font-bold bg-white text-black px-6 py-3 rounded-full">
            Why Amalby
          </span>
        </div>

        {/* ══ Bento Grid ════════════════════════════════════════════ */}
        <div
          className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-[1fr_1.55fr_1.15fr]"
          style={{ gridTemplateRows: "auto" }}
        >

          {/* ── Card 1 · Mint · Social proof ──────────────────────── */}
          <div
            className="feat-card flex flex-col justify-between cursor-default overflow-hidden will-change-transform xl:col-start-1 xl:row-start-1"
            style={{
              background: "#49C88B", 
              borderRadius: "32px",
              padding: "40px 36px", 
              minHeight: "280px",
              border: "1px solid rgba(0,0,0,0.03)",
            }}
            onPointerEnter={tiltIn} onPointerLeave={tiltOut}
          >
            <h3 className="text-black font-semibold leading-[1.1] text-sweep"
              style={{ fontSize: "clamp(24px, 2.2vw, 34px)", letterSpacing: "-0.02em" }}>
              Trusted by<br />50+ businesses
            </h3>
            <div className="flex flex-wrap gap-2.5 mt-auto pt-5">
              {dots.map((d, i) => (
                <div key={i} className="feat-dot rounded-full flex items-center justify-center text-white font-bold shrink-0"
                  style={{ 
                    width: 48, height: 48, 
                    background: d.color, 
                    fontSize: 10, 
                    letterSpacing: "0.08em",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}>
                  {d.label.slice(0, 2)}
                </div>
              ))}
            </div>
          </div>

          {/* ── Card 2 · Sky blue · Always-on ─────────────────────── */}
          <div
            className="feat-card flex flex-col justify-between cursor-default overflow-hidden will-change-transform xl:col-start-1 xl:row-start-2"
            style={{
              background: "#74B9FF", 
              borderRadius: "32px",
              padding: "40px 36px",
              minHeight: "280px",
              border: "1px solid rgba(0,0,0,0.03)",
            }}
            onPointerEnter={tiltIn} onPointerLeave={tiltOut}
          >
            <h3 className="text-black font-semibold leading-[1.15] text-sweep"
              style={{ fontSize: "clamp(20px, 1.8vw, 28px)", letterSpacing: "-0.01em" }}>
              Zero downtime.<br />Fully managed.<br />Always on.
            </h3>
            <div className="mt-auto pt-4 space-y-2.5">
              <div className="flex items-center gap-3 bg-white/50 backdrop-blur-md rounded-2xl px-5 py-4">
                <span className="status-dot-live w-2.5 h-2.5 rounded-full bg-green-500 shrink-0" />
                <span className="text-black/80 text-[13px] font-semibold">Agent active — 99.9% uptime</span>
              </div>
              <div className="flex items-center gap-3 bg-black/5 rounded-2xl px-5 py-4">
                <span className="w-2.5 h-2.5 rounded-full bg-black/20 shrink-0" />
                <span className="text-black/40 text-[13px] font-medium">Monitoring: live</span>
              </div>
            </div>
          </div>

          {/* ── Card 3 · Center tall · Clean Typography Card ───────── */}
          <div
            className="feat-card relative flex flex-col justify-between cursor-default overflow-hidden will-change-transform md:col-span-2 xl:col-span-1 xl:col-start-2 xl:row-start-1 xl:row-span-2"
            style={{
              background: "#0D0D0D", 
              borderRadius: "32px",
              padding: "48px 40px 40px",
              minHeight: "560px",
              border: "1px solid rgba(255,255,255,0.04)",
            }}
            onPointerEnter={tiltIn} onPointerLeave={tiltOut}
          >
            {/* Big floating headline */}
            <div className="feat-float select-none">
              <p
                className="text-white font-semibold leading-[1.0] text-sweep-light"
                style={{
                  fontSize: "clamp(48px, 5.5vw, 84px)",
                  letterSpacing: "-0.02em",
                }}
              >
                Maximum
              </p>
              <p
                className="font-semibold leading-[1.0] text-sweep-light"
                style={{
                  fontSize: "clamp(48px, 5.5vw, 84px)",
                  letterSpacing: "-0.02em",
                  color: "#49C88B",
                  marginLeft: "0.01em", // Slight indent for the slanted 'A'
                }}
              >
                Automation.
              </p>
              <p className="text-white/40 font-medium mt-10 leading-relaxed"
                style={{ fontSize: "clamp(15px, 1.1vw, 17px)", maxWidth: "340px", letterSpacing: "-0.01em" }}>
                From trigger to result —<br />we build agents that run without<br />any human intervention.
              </p>
            </div>

            {/* Pipeline rows - Refined high-end look */}
            <div className="flex flex-col gap-2.5 mt-auto">
              {[
                { step: "01", label: "Trigger detected", done: true },
                { step: "02", label: "Agent processes request", done: true },
                { step: "03", label: "Action executed", done: true },
                { step: "04", label: "Result confirmed ✓", done: true },
              ].map(({ step, label, done }) => (
                <div
                  key={step}
                  className="flex items-center gap-4 px-5 py-4 rounded-[20px]"
                  style={{ 
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <span className="text-[11px] font-bold tracking-[0.2em] text-white/20">{step}</span>
                  <span className="text-[15px] font-medium flex-1 tracking-tight" style={{ color: done ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)" }}>{label}</span>
                  {done && (
                    <div className="flex items-center justify-center w-6 h-6">
                      <div className="w-2 h-2 rounded-full" style={{ background: "#49C88B", boxShadow: "0 0 12px #49C88B" }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── Card 4 · Lavender · 24/7 autonomous ───────────────── */}
          <div
            className="feat-card flex flex-col justify-between cursor-default overflow-hidden will-change-transform xl:col-start-3 xl:row-start-1"
            style={{
              background: "#DDD6FF", 
              borderRadius: "32px",
              padding: "40px 36px",
              minHeight: "280px",
              border: "1px solid rgba(0,0,0,0.03)",
            }}
            onPointerEnter={tiltIn} onPointerLeave={tiltOut}
          >
            <h3 className="text-black font-semibold leading-[1.15] text-sweep"
              style={{ fontSize: "clamp(20px, 1.8vw, 28px)", letterSpacing: "-0.01em" }}>
              24/7 autonomous —<br />no human needed.
            </h3>
            <div className="mt-auto pt-6 space-y-3">
              <div className="rounded-2xl px-5 py-4 text-[13px] font-semibold"
                style={{ background: "#B39DDB", maxWidth: "92%", color: "#1a1a2e", boxShadow: "0 4px 12px rgba(179,157,219,0.3)" }}>
                Task completed: lead qualified ✓
              </div>
              <div className="rounded-2xl px-5 py-4 text-[13px] font-semibold ml-auto"
                style={{ background: "#6D28D9", maxWidth: "86%", color: "white", boxShadow: "0 4px 12px rgba(109,40,217,0.3)" }}>
                Agent: 47 leads processed tonight
              </div>
            </div>
          </div>

          {/* ── Card 5 · Navy · Animated stat ─────────────────────── */}
          <div
            className="feat-card relative flex flex-col justify-between cursor-default overflow-hidden will-change-transform xl:col-start-3 xl:row-start-2"
            style={{
              background: "#08082B", 
              borderRadius: "32px",
              padding: "40px 36px",
              minHeight: "280px",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
            onPointerEnter={tiltIn} onPointerLeave={tiltOut}
          >
            <div className="absolute bottom-0 right-0 opacity-[0.2] pointer-events-none">
              <svg width="240" height="240" viewBox="0 0 200 200" fill="none">
                <circle cx="100" cy="100" r="90" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
                <ellipse cx="100" cy="100" rx="55" ry="90" stroke="white" strokeWidth="0.5" />
                <ellipse cx="100" cy="100" rx="90" ry="33" stroke="white" strokeWidth="0.5" />
                <ellipse cx="100" cy="100" rx="90" ry="60" stroke="white" strokeWidth="0.5" />
                <line x1="10" y1="100" x2="190" y2="100" stroke="white" strokeWidth="0.5" />
                <line x1="100" y1="10" x2="100" y2="190" stroke="white" strokeWidth="0.5" />
              </svg>
            </div>

            <h3 className="text-white font-semibold leading-[1.1] text-sweep-light"
              style={{ fontSize: "clamp(26px, 2.8vw, 42px)", letterSpacing: "-0.02em" }}>
              <span style={{ color: "#49C88B" }}>200,000+</span>
              {" "}hours saved<br />since 2024.
            </h3>
            <p className="text-white/40 text-[14px] font-medium mt-auto tracking-tight">
              Optimizing operations for 50+<br />forward-thinking businesses.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;
