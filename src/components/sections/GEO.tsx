"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/ui/MagneticButton";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    number: "01",
    tag: "The Shift",
    heading: "People stopped Googling.",
    body: "Over 60% of product searches now start with an AI tool. ChatGPT, Perplexity, Claude — someone asks a question and trusts the answer. Your competitors are already in those answers.",
    accent: "#4F8EF7",
  },
  {
    number: "02",
    tag: "The Problem",
    heading: "You're invisible to machines.",
    body: "SEO puts you in Google's index. GEO puts you in the model's answer. Two completely different problems — and almost no one is solving the second one yet.",
    accent: "#F7914F",
  },
  {
    number: "03",
    tag: "The Solution",
    heading: "We fix that.",
    body: "We structure your content, authority signals, and brand data so AI tools know who you are and surface you when it matters. Organic reach for the next era.",
    accent: "#49C88B",
  },
];

const GEO = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Entrance animations
    gsap.fromTo(
      section.querySelectorAll(".geo-anim"),
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.09,
        scrollTrigger: { trigger: section, start: "top 78%", once: true },
      }
    );

    // Step cards
    gsap.fromTo(
      section.querySelectorAll(".geo-card"),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: section, start: "top 72%", once: true },
      }
    );

    // Counter
    const counterEl = section.querySelector<HTMLElement>(".geo-counter");
    if (counterEl) {
      const proxy = { val: 0 };
      gsap.to(proxy, {
        val: 60,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: { trigger: section, start: "top 70%", once: true },
        onUpdate: () => { counterEl.textContent = Math.round(proxy.val) + "%"; },
      });
    }
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="bg-transparent px-[6px] pb-[6px] font-tomato"
    >
      <div
        className="relative w-full bg-[#0A0A0A] rounded-[40px] md:rounded-[48px] overflow-hidden p-6 md:p-14"
        style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.05), 0 0 80px -10px rgba(79,142,247,0.08)" }}
      >
        {/* ── Header row ─────────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <p className="geo-anim text-white/20 text-[11px] font-bold mb-5" style={{ letterSpacing: "0.1em" }}>
              GEO — Generative Engine Optimisation
            </p>
            <h2
              className="geo-anim text-white font-semibold leading-[0.93]"
              style={{ fontSize: "clamp(44px, 6vw, 88px)", letterSpacing: "-0.04em" }}
            >
              SEO is<br />
              <span style={{ color: "rgba(255,255,255,0.18)" }}>yesterday.</span>
            </h2>
          </div>

          {/* Stat */}
          <div className="geo-anim shrink-0 text-right">
            <span
              className="geo-counter text-white font-semibold leading-none block"
              style={{ fontSize: "clamp(64px, 8vw, 112px)", letterSpacing: "-0.06em", lineHeight: 1 }}
            >
              0%
            </span>
            <p className="text-white/25 text-[13px] mt-2 text-right max-w-[220px] ml-auto leading-relaxed">
              of AI-driven searches surface your brand right now.
            </p>
          </div>
        </div>

        {/* ── Divider ─────────────────────────────────────────────────── */}
        <div className="geo-anim h-px bg-white/5 mb-12 md:mb-16" />

        {/* ── Step cards ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 md:mb-16">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="geo-card bg-white/[0.03] border border-white/[0.06] rounded-[24px] p-7 md:p-9 flex flex-col gap-6"
            >
              {/* Accent + number */}
              <div className="flex items-center justify-between">
                <div className="h-[2px] w-8 rounded-full" style={{ background: step.accent }} />
                <span className="text-white/15 text-[11px] font-bold tabular-nums">{step.number}</span>
              </div>

              {/* Tag */}
              <p className="text-[11px] font-medium" style={{ color: step.accent, opacity: 0.8 }}>
                {step.tag}
              </p>

              {/* Heading */}
              <h3
                className="text-white font-semibold leading-[1.1]"
                style={{ fontSize: "clamp(20px, 2vw, 26px)", letterSpacing: "-0.03em" }}
              >
                {step.heading}
              </h3>

              {/* Body */}
              <p className="text-white/35 text-[14px] md:text-[15px] leading-relaxed">
                {step.body}
              </p>
            </div>
          ))}
        </div>

        {/* ── Bottom row — context + CTA ───────────────────────────────── */}
        <div className="geo-anim flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
          <p className="text-white/20 text-[13px] leading-relaxed max-w-[360px]">
            We&apos;re one of the first agencies offering GEO as a dedicated service.
            The models being trained right now are the ones that will matter for years.
          </p>

          <MagneticButton>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black font-semibold text-[15px] px-8 py-4 rounded-full hover:bg-white/90 transition-colors shrink-0"
            >
              Start now ↗
            </Link>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

export default GEO;
