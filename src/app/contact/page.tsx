"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Footer from "@/components/sections/Footer";

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      containerRef.current?.querySelectorAll(".contact-anim") ?? [],
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.85, ease: "power3.out", stagger: 0.1, delay: 0.1 }
    );
  }, []);

  return (
    <main className="bg-[#f2f2f2] min-h-screen">
      <div ref={containerRef} className="pt-[180px] pb-[80px] px-[12px] md:px-[20px]">
        <div className="max-w-[1400px] mx-auto">

          {/* ── Heading ───────────────────────────────────────────── */}
          <span className="contact-anim text-[11px] uppercase tracking-[0.3em] font-bold text-[#49C88B] block mb-6">
            Contact
          </span>
          <h1
            className="contact-anim text-[#0D0D0D] font-semibold leading-[1.05] tracking-tight mb-14"
            style={{ fontSize: "clamp(48px, 8vw, 96px)" }}
          >
            Say hello.
          </h1>

          {/* ── Contact Grid ───────────────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Email Card */}
            <a
              href="mailto:hello@amalby.com"
              className="contact-anim group bg-white rounded-[32px] p-8 md:p-10 flex flex-col justify-between min-h-[220px] border border-black/5 hover:border-black/10 transition-colors"
            >
              <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-black/30">Email</span>
              <div>
                <p
                  className="text-[#0D0D0D] font-semibold leading-tight group-hover:text-[#49C88B] transition-colors"
                  style={{ fontSize: "clamp(18px, 1.8vw, 24px)" }}
                >
                  hello@amalby.com
                </p>
                <p className="text-black/40 text-[14px] mt-2">We reply within 24 hours.</p>
              </div>
            </a>

            {/* Instagram Card */}
            <a
              href="https://instagram.com/amalby.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-anim group bg-white rounded-[32px] p-8 md:p-10 flex flex-col justify-between min-h-[220px] border border-black/5 hover:border-black/10 transition-colors"
            >
              <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-black/30">Instagram</span>
              <div>
                <p
                  className="text-[#0D0D0D] font-semibold leading-tight group-hover:text-[#49C88B] transition-colors"
                  style={{ fontSize: "clamp(18px, 1.8vw, 24px)" }}
                >
                  @amalby.ai
                </p>
                <p className="text-black/40 text-[14px] mt-2">Follow us for updates.</p>
              </div>
            </a>

            {/* LinkedIn Card */}
            <a
              href="https://linkedin.com/in/alkeshjames"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-anim group bg-white rounded-[32px] p-8 md:p-10 flex flex-col justify-between min-h-[220px] border border-black/5 hover:border-black/10 transition-colors"
            >
              <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-black/30">LinkedIn</span>
              <div>
                <p
                  className="text-[#0D0D0D] font-semibold leading-tight group-hover:text-[#49C88B] transition-colors"
                  style={{ fontSize: "clamp(18px, 1.8vw, 24px)" }}
                >
                  Alkesh James
                </p>
                <p className="text-black/40 text-[14px] mt-2">Connect directly.</p>
              </div>
            </a>
          </div>

          {/* ── Note ────────────────────────────────────────────────── */}
          <p className="contact-anim text-black/40 text-[14px] md:text-[15px] leading-relaxed mt-10 max-w-[480px]">
            We work with businesses in the EU, UK, and UAE. Pricing is always scoped to your project — get in touch with a rough brief and we&apos;ll take it from there.
          </p>

        </div>
      </div>

      <Footer />
    </main>
  );
}
