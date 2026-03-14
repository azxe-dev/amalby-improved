"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const LegalLayout = ({ 
  title, 
  subtitle, 
  children 
}: { 
  title: string; 
  subtitle: string; 
  children: React.ReactNode 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });
    
    tl.fromTo(headerRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, delay: 0.2 }
    )
    .fromTo(contentRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0 },
      "-=0.6"
    );
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="min-h-screen bg-[#f2f2f2] px-5 md:px-6 py-20 md:py-32">
      <div className="max-w-[1200px] mx-auto">
        {/* Back Button */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-black/40 hover:text-black transition-colors mb-20 group"
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="group-hover:-translate-x-1 transition-transform"
          >
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span className="font-semibold text-sm tracking-tight">Return Home</span>
        </Link>

        {/* Header Section */}
        <div ref={headerRef} className="mb-24">
          <h1 
            className="text-black font-semibold leading-[1.05] tracking-tight mb-6"
            style={{ fontSize: "clamp(48px, 6vw, 96px)" }}
          >
            {title}
          </h1>
          <p className="text-black/40 font-medium text-lg md:text-xl max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Content Area */}
        <div ref={contentRef} className="flex flex-col gap-8 md:gap-12">
          {children}
        </div>

        {/* Footer Note */}
        <div className="mt-32 pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between gap-6">
          <p className="text-black/30 text-sm font-medium">
            © 2026 Amalby. All rights reserved.
          </p>
          <p className="text-black/30 text-sm font-medium">
            Last updated: March 13, 2026
          </p>
        </div>
      </div>
    </main>
  );
};

export const LegalSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <section className="bg-white p-8 md:p-12 rounded-[32px] md:rounded-[40px] shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
    <h2 className="text-black font-semibold text-2xl md:text-3xl mb-8 tracking-tight border-b border-black/5 pb-6">
      {title}
    </h2>
    <div className="prose prose-neutral max-w-none text-black/70 leading-relaxed font-medium">
      {children}
    </div>
  </section>
);

export default LegalLayout;
