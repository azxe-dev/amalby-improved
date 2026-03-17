"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/ui/MagneticButton";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const TeamCTA = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [randomCircles, setRandomCircles] = React.useState<{id: number, cx: number, cy: number, r: number}[]>([]);

  React.useEffect(() => {
    // Generate random circles once after mount to keep the render function pure
    const circles = [...Array(12)].map((_, i) => ({
      id: i,
      cx: Math.random() * 1000,
      cy: Math.random() * 1000,
      r: 20 + Math.random() * 40,
    }));
    setRandomCircles(circles);
  }, []);

  useGSAP(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.fromTo(
      card,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-[#f2f2f2] px-[12px] md:px-[20px] py-[40px] mb-[40px]">
      <div className="max-w-[1800px] mx-auto">
        <div
          ref={cardRef}
          className="relative overflow-hidden flex flex-col justify-between items-center text-center"
          style={{
            background: "#F2D049",
            borderRadius: "48px",
            padding: "80px 48px",
            minHeight: "450px",
          }}
        >
          {/* Abstract team-like pattern or icons */}
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.05] pointer-events-none select-none">
             <svg width="100%" height="100%" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
               {randomCircles.map((circle) => (
                 <circle key={circle.id} cx={circle.cx} cy={circle.cy} r={circle.r} fill="black" />
               ))}
             </svg>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <h2
              className="text-black font-semibold leading-[1.1] mb-8"
              style={{ fontSize: "clamp(48px, 6vw, 96px)", letterSpacing: "-0.04em" }}
            >
              Got a project<br />
              in mind?
            </h2>

            <p className="text-black/60 text-[18px] md:text-[21px] leading-relaxed mb-12 max-w-xl mx-auto font-medium">
              We&apos;re a focused team working on real problems for businesses in the EU, UK, and UAE. If you have something to build, let&apos;s talk.
            </p>

            <MagneticButton>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-black text-white font-semibold text-[16px] px-10 py-5 rounded-full hover:bg-black/80 transition-all"
              >
                Get in touch <span className="text-[20px]">→</span>
              </Link>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamCTA;
