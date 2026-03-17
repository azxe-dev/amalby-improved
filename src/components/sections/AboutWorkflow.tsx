"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutWorkflow = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      section.querySelectorAll(".workflow-card"),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-[#f2f2f2] px-[12px] md:px-[20px] py-[40px]">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
        
        <div 
          className="workflow-card col-span-1 bg-white rounded-[40px] p-10 flex flex-col justify-between min-h-[300px] border border-black/5"
        >
          <span className="text-[12px] uppercase font-bold tracking-[0.2em] text-[#49C88B]">Established</span>
          <div>
            <h3 className="text-[64px] font-semibold leading-none tracking-tighter mb-2 text-[#0D0D0D]">2026</h3>
            <p className="text-[#0D0D0D]/50 text-[15px] leading-relaxed">
              Started at the beginning of the agentic shift. Built to stay lean and ship fast.
            </p>
          </div>
        </div>

        <div 
          className="workflow-card col-span-1 md:col-span-2 bg-[#0D0D0D] rounded-[40px] p-10 flex flex-col justify-between min-h-[300px] overflow-hidden relative"
        >
          <div className="relative z-10">
            <span className="text-[12px] uppercase font-bold tracking-[0.2em] text-[#49C88B]">Velocity</span>
            <h3 className="text-[42px] md:text-[56px] text-white font-semibold leading-[1.1] tracking-tight mt-6 mb-4">
              Weeks, not months.
            </h3>
            <p className="text-white/50 text-[18px] max-w-[480px] leading-relaxed">
              No procurement cycles, no extra layers, no hand-offs. We scope, build, and deliver. That&apos;s the whole process.
            </p>
          </div>
          
          {/* Abstract speed line pattern */}
          <div className="absolute top-0 right-0 h-full w-1/2 opacity-20 pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none">
              {[...Array(20)].map((_, i) => (
                <line 
                  key={i} 
                  x1={400} y1={i * 25} x2={400 - (i * 20)} y2={(i * 25) + 100} 
                  stroke="white" strokeWidth="1" 
                />
              ))}
            </svg>
          </div>
        </div>

        <div 
          className="workflow-card col-span-1 md:col-span-2 bg-[#49C88B] rounded-[40px] p-10 flex flex-col justify-between min-h-[350px] relative overflow-hidden"
        >
          <div className="relative z-10">
            <span className="text-[12px] uppercase font-bold tracking-[0.2em] text-black/40">The Stack</span>
            <h3 className="text-[42px] md:text-[56px] text-black font-semibold leading-[1.1] tracking-tight mt-6 mb-10">
              Built with the<br />
              right tools.
            </h3>
            <div className="flex flex-wrap gap-3">
              <span className="bg-black/10 px-5 py-2 rounded-full text-black font-semibold text-[14px]">n8n</span>
              <span className="bg-black/10 px-5 py-2 rounded-full text-black font-semibold text-[14px]">OpenAI</span>
              <span className="bg-black/10 px-5 py-2 rounded-full text-black font-semibold text-[14px]">Claude</span>
              <span className="bg-black/10 px-5 py-2 rounded-full text-black font-semibold text-[14px]">Supabase</span>
              <span className="bg-black/10 px-5 py-2 rounded-full text-black font-semibold text-[14px]">Next.js</span>
            </div>
          </div>
          
          {/* Subtle node-line pattern */}
          <div className="absolute bottom-[-50px] right-[-50px] opacity-10 pointer-events-none">
             <svg width="300" height="300" viewBox="0 0 300 300" fill="none">
               <circle cx="150" cy="150" r="100" stroke="black" strokeWidth="2" strokeDasharray="10 10" />
               <circle cx="150" cy="150" r="60" stroke="black" strokeWidth="2" />
               <line x1="150" y1="50" x2="150" y2="250" stroke="black" strokeWidth="2" />
               <line x1="50" y1="150" x2="250" y2="150" stroke="black" strokeWidth="2" />
             </svg>
          </div>
        </div>

        <div 
          className="workflow-card col-span-1 bg-[#F2F2F2] rounded-[40px] p-10 border border-black/10 flex flex-col justify-between min-h-[350px]"
        >
          <span className="text-[12px] uppercase font-bold tracking-[0.2em] text-black/30">What We Do</span>
          <div>
            <h3 className="text-[32px] text-black font-semibold leading-tight mb-4">
              We build. We ship. We maintain.
            </h3>
            <p className="text-black/60 text-[15px] leading-relaxed">
              Automations, AI agents, web products, SEO, and GEO. All custom, all scoped to what your business actually needs. We don&apos;t do retainer packages or one-size-fits-all.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutWorkflow;
