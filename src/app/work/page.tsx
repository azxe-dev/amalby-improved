"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Footer from "@/components/sections/Footer";
import { MagneticButton } from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    number: "01",
    title: "Automations",
    description:
      "Repetitive tasks are expensive. We map your workflows and replace the manual parts with AI pipelines — reporting, data entry, routing, notifications. Set up once, runs forever.",
  },
  {
    number: "02",
    title: "AI Infrastructure",
    description:
      "The backbone your AI stack needs to work at scale. We build the systems that connect your data, tools, and models into something coherent and maintainable.",
  },
  {
    number: "03",
    title: "Custom AI Agents",
    description:
      "Agents built for specific jobs — outreach, research, lead qualification, internal knowledge retrieval. Not generic chatbots. Purpose-built tools that actually do the work.",
  },
  {
    number: "04",
    title: "Web Development",
    description:
      "Fast, clean websites and web apps. Built with Next.js, designed to convert, and shipped in days. If you need something that works and looks good, we do that.",
  },
  {
    number: "05",
    title: "SEO",
    description:
      "Organic search that compounds over time. We write content that ranks, fix what's broken technically, and build the kind of presence that keeps paying off.",
  },
  {
    number: "06",
    title: "GEO",
    description:
      "Generative Engine Optimisation — making sure your brand shows up when people ask AI tools like ChatGPT and Perplexity questions in your space. Newer discipline, real results.",
  },
];

export default function WorkPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      heroRef.current?.querySelectorAll(".hero-anim") ?? [],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.12, delay: 0.1 }
    );

    gsap.fromTo(
      gridRef.current?.querySelectorAll(".service-card") ?? [],
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <main className="bg-[#f2f2f2] min-h-screen">
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="pt-[180px] pb-[80px] px-[12px] md:px-[20px]"
      >
        <div className="max-w-[1400px] mx-auto">
          <span className="hero-anim text-[11px] uppercase tracking-[0.3em] font-bold text-[#49C88B] block mb-6">
            Work
          </span>
          <h1
            className="hero-anim text-[#0D0D0D] font-semibold leading-[1.05] tracking-tight mb-10"
            style={{ fontSize: "clamp(48px, 8vw, 96px)" }}
          >
            Early stage.<br />
            <span className="text-[#0D0D0D]/30">Serious work.</span>
          </h1>
          <p className="hero-anim text-[#0D0D0D]/60 font-medium max-w-[560px] leading-relaxed" style={{ fontSize: "clamp(17px, 1.4vw, 21px)" }}>
            We&apos;re currently working with our first clients across the EU, UK, and UAE. No case studies yet — but here&apos;s exactly the kind of work we take on.
          </p>
        </div>
      </section>

      {/* ── Service Grid ─────────────────────────────────────────────── */}
      <section
        ref={gridRef}
        className="px-[12px] md:px-[20px] py-[20px]"
      >
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((s) => (
            <div
              key={s.number}
              className="service-card bg-white rounded-[32px] p-8 md:p-10 flex flex-col justify-between min-h-[280px] border border-black/5"
            >
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/20">
                  {s.number}
                </span>
                <h2
                  className="text-[#0D0D0D] font-semibold leading-tight mt-5 mb-4"
                  style={{ fontSize: "clamp(22px, 2vw, 28px)" }}
                >
                  {s.title}
                </h2>
                <p className="text-[#0D0D0D]/50 text-[15px] leading-relaxed">
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────── */}
      <section className="px-[12px] md:px-[20px] py-[40px] mb-[40px]">
        <div className="max-w-[1400px] mx-auto">
          <div
            className="bg-[#0D0D0D] rounded-[40px] p-12 md:p-20 flex flex-col md:flex-row items-start md:items-end justify-between gap-10"
          >
            <div>
              <h2
                className="text-white font-semibold leading-[1.05] tracking-tight mb-4"
                style={{ fontSize: "clamp(36px, 5vw, 72px)" }}
              >
                Got a project?<br />
                <span className="text-white/30">Let&apos;s talk.</span>
              </h2>
              <p className="text-white/50 text-[16px] md:text-[18px] leading-relaxed max-w-[400px]">
                Tell us what you&apos;re building. We&apos;ll scope it, price it honestly, and get back to you within 24 hours.
              </p>
            </div>
            <MagneticButton>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-white text-black font-semibold text-[16px] px-10 py-5 rounded-full hover:bg-white/90 transition-all shrink-0"
              >
                Get in touch <span>↗</span>
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
