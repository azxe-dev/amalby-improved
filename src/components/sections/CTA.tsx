"use client";

import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { supabase } from "@/lib/supabase";

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      section.querySelectorAll(".cta-card"),
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: { trigger: section, start: "top 80%" },
        overwrite: "auto",
      }
    );

    // Color sweep for headings
    const sweepElements = section.querySelectorAll(".text-sweep, .text-sweep-light");
    sweepElements.forEach((el) => {
      gsap.to(el, {
        backgroundPosition: "0% 0%",
        duration: 1.8,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    });
  }, { scope: sectionRef });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contacts')
        .insert([
          { 
            name: formData.name, 
            email: formData.email, 
            message: formData.message,
            created_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting form:', err);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} className="bg-transparent px-[12px] md:px-[20px] py-[6px]">
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* ── LEFT CARD: Project Form ──────────────────────────────── */}
        <div
          className="cta-card relative overflow-hidden flex flex-col justify-between border border-white/5"
          style={{
            background: "#0A0A0A",
            borderRadius: "40px",
            padding: "clamp(28px, 5vw, 52px) clamp(24px, 4vw, 48px) clamp(28px, 5vw, 48px)",
            minHeight: "clamp(360px, 50vw, 480px)",
            boxShadow: "0 0 0 1px rgba(100,200,255,0.06), 0 0 80px -10px rgba(50,170,255,0.10), 0 0 220px -40px rgba(0,140,255,0.05)",
          }}
        >
          {/* Decorative squiggle lines — top right */}
          <div className="absolute top-0 right-0 w-48 h-48 opacity-15 pointer-events-none select-none">
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M160 20 Q180 60 160 100 Q140 140 160 180" stroke="white" strokeWidth="3" fill="none"/>
              <path d="M140 20 Q160 60 140 100 Q120 140 140 180" stroke="white" strokeWidth="3" fill="none"/>
              <path d="M120 20 Q140 60 120 100 Q100 140 120 180" stroke="white" strokeWidth="3" fill="none"/>
            </svg>
          </div>

          <div>
            <h2
              className="text-white font-semibold leading-[1.1] mb-6 text-sweep-light"
              style={{ fontSize: "clamp(36px, 4.5vw, 64px)", letterSpacing: "-0.02em" }}
            >
              Got a project?<br />
              Tell us about it.
            </h2>

            <p className="text-white/70 text-[16px] leading-relaxed mb-8 max-w-sm">
              Start with a rough idea — we&apos;ll scope it, price it honestly, and get moving fast.
            </p>
          </div>

          {submitted ? (
            <div className="bg-white text-black rounded-2xl px-6 py-5 font-tomato font-semibold text-base animate-in fade-in slide-in-from-bottom-2 duration-500">
              ✅ Got it — we&apos;ll be in touch within 24 hours.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="flex-1 bg-white/5 border border-white/10 placeholder-white/20 text-white font-tomato text-[15px] px-4 py-3.5 rounded-full outline-none focus:border-white/40 focus:bg-white/10 transition-all"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="flex-1 bg-white/5 border border-white/10 placeholder-white/20 text-white font-tomato text-[15px] px-4 py-3.5 rounded-full outline-none focus:border-white/40 focus:bg-white/10 transition-all"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-end">
                <input
                  type="text"
                  placeholder="What are you building?"
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="flex-1 bg-white/5 border border-white/10 placeholder-white/20 text-white font-tomato text-[15px] px-4 py-3.5 rounded-full outline-none focus:border-white/40 focus:bg-white/10 transition-all"
                />
                <MagneticButton>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-white text-black font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-white/90 transition-all whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : 'Submit ↗'}
                  </button>
                </MagneticButton>
              </div>
            </form>
          )}
        </div>

        {/* ── RIGHT CARD: Talk to Agent ─────────────────────────────── */}
        <div
          className="cta-card relative overflow-hidden flex flex-col justify-between border border-white/5"
          style={{
            background: "#0A0A0A",
            borderRadius: "40px",
            padding: "clamp(28px, 5vw, 52px) clamp(24px, 4vw, 48px) clamp(28px, 5vw, 48px)",
            minHeight: "clamp(360px, 50vw, 480px)",
            boxShadow: "0 0 0 1px rgba(100,200,255,0.06), 0 0 80px -10px rgba(50,170,255,0.10), 0 0 220px -40px rgba(0,140,255,0.05)",
          }}
        >
          {/* Agent illustration placeholder */}
          <div className="absolute bottom-0 right-6 opacity-10 pointer-events-none select-none">
            <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="80" cy="80" r="70" stroke="white" strokeWidth="8"/>
              <circle cx="55" cy="70" r="8" fill="white"/>
              <circle cx="105" cy="70" r="8" fill="white"/>
              <path d="M55 105 Q80 125 105 105" stroke="white" strokeWidth="6" strokeLinecap="round" fill="none"/>
            </svg>
          </div>

          <div>
            <h2
              className="text-white font-semibold leading-[1.1] mb-6 text-sweep-light"
              style={{ fontSize: "clamp(36px, 4.5vw, 64px)", letterSpacing: "-0.02em" }}
            >
              Not sure where<br />
              to start?
            </h2>

            <p className="text-white/70 text-[16px] leading-relaxed mb-10 max-w-sm">
              Our AI agent can help you scope your project, answer questions, and connect you with our team — any time.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <MagneticButton>
              <a
                href="/contact"
                className="flex items-center gap-2 bg-white text-black font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-white/90 transition-all"
              >
                Talk to our agent <span>↗</span>
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="mailto:hello@amalby.com"
                className="flex items-center gap-2 bg-white text-black font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-white/90 transition-all"
              >
                Email us <span>↗</span>
              </a>
            </MagneticButton>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CTA;
