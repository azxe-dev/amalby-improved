"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);
  const labelRef   = useRef<HTMLParagraphElement>(null);
  const subRef     = useRef<HTMLDivElement>(null);
  const bgRef      = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    const card    = cardRef.current;
    const left    = leftRef.current;
    const right   = rightRef.current;
    const label   = labelRef.current;
    const sub     = subRef.current;
    const bg      = bgRef.current;

    if (!section || !wrapper || !card || !left || !right || !bg) return;

    // ── 1. Entrance animation ──────────────────────────────────────────────
    // Pre-promote left/right to GPU layers VIA TRANSFORM first, THEN set blur.
    // This prevents mid-frame GPU layer creation (which causes a 1-frame stutter).
    // The layer must exist and be composited before any filter is applied.
    gsap.set([left, right], { z: 0.01, willChange: "filter, opacity" });
    gsap.set([left, right], { opacity: 1, filter: "blur(14px)" });

    const leftChars  = left.querySelectorAll(".hero-char");
    const rightChars = right.querySelectorAll(".hero-char");
    gsap.set([...leftChars, ...rightChars], { opacity: 0 });

    const entrance = gsap.timeline({
      delay: 0.15,
      defaults: { force3D: true },
    });

    entrance
      // Left chars stagger in (opacity only — fastest GPU op)
      .to(leftChars,  { opacity: 1, duration: 0.5, stagger: 0.04, ease: "power2.out" })
      // Simultaneously resolve parent blur
      .to(left,       { filter: "blur(0px)", duration: 0.7, ease: "power3.out" }, 0)
      // Right chars follow with a slight offset
      .to(rightChars, { opacity: 1, duration: 0.5, stagger: 0.04, ease: "power2.out" }, "<0.22")
      .to(right,      { filter: "blur(0px)", duration: 0.7, ease: "power3.out" }, "<0")
      .fromTo(label,  { opacity: 0 }, { opacity: 1, duration: 0.7, ease: "power2.out" }, "-=0.35")
      // Release GPU blur layer once entrance is done — frees VRAM
      // Also kill CSS shimmer animation on chars — it ran its course, save CPU
      .add(() => {
        gsap.set([left, right], { willChange: "auto" });
        document.querySelectorAll(".hero-char").forEach(el => {
          (el as HTMLElement).style.animation = "none";
        });
      });

    // Keep subtitle invisible until scroll reveals it
    if (sub) gsap.set(sub, { opacity: 0, y: 50 });

    // ── 2. Scroll-driven split animation ──────────────────────────────────
    //
    // KEY PERFORMANCE NOTES:
    //
    // a) boxShadow is NOT animating on scrub frames anymore.
    //    Box-shadow causes a full REPAINT on every scroll frame. Instead, it's
    //    triggered once via onStart with a one-time smooth tween. Same visual
    //    result, runs once instead of hundreds of times during scroll.
    //
    // b) fastScrollEnd: true — without this, the scrub travels slightly PAST
    //    the rest position when scrolling stops quickly, then snaps back (that
    //    subtle rubber-band / overshoot feeling). This option eliminates it.
    //
    // c) force3D: true on defaults — every transform in the timeline is computed
    //    via a 3D GPU matrix (matrix3d) instead of being re-parsed each frame.
    //
    // d) scrub: 0.6 — tighter than 0.8, feels more directly connected to finger/
    //    wheel. Letâ€™s the user feel in control without being jumpy.

    const tl = gsap.timeline({
      defaults: { force3D: true, overwrite: "auto" },
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        // scrub: 1 = perfect 1-second physical lag — feels like genuine momentum,
        // more silk than 0.6 which can feel slightly jerky under fast scroll
        scrub: 1,
        invalidateOnRefresh: true,
        fastScrollEnd: true,

        // Trigger the box-shadow ONCE when scroll begins, as a separate tween.
        // This decouples an expensive repaint-causing property from the per-frame scrub.
        onToggle: (self) => {
          if (self.isActive) {
            gsap.to(card, {
              boxShadow: "0 0 0 1px rgba(100,200,255,0.06), 0 0 80px -10px rgba(50,170,255,0.10), 0 0 220px -40px rgba(0,140,255,0.05)",
              duration: 0.8,
              ease: "power2.out",
              overwrite: "auto",
            });
          } else {
            // Only reset if scrolled fully back to top
            if (self.progress === 0) {
              gsap.to(card, {
                boxShadow: "none",
                duration: 0.5,
                ease: "power2.inOut",
                overwrite: "auto",
              });
            }
          }
        },
      },
    });

    tl
      // Wrapper padding opens — creates the "card receding into viewport" feel
      .to(wrapper, {
        padding: "16px",
        duration: 1,
        ease: "power1.inOut",
      }, 0)

      // Card border-radius rounds — boxShadow handled separately above
      .to(card, {
        borderRadius: "40px",
        duration: 1,
        ease: "power1.inOut",
      }, 0)

      // BG parallax — scale from exact center, smooth as silk
      .fromTo(bg,
        { scale: 1.15 },
        { scale: 1.0, duration: 1, ease: "power1.inOut", transformOrigin: "center center" },
        0
      )

      // Left text flies out to the left (x, y, opacity, scale — all composited)
      .to(left, {
        x: "-25vw",
        y: -40,
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        ease: "power2.inOut",
      }, 0)

      // Right text flies out to the right
      .to(right, {
        x: "25vw",
        y: -40,
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        ease: "power2.inOut",
      }, 0)

      // Scroll hint fades and lifts away
      .to(label, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: "power1.inOut",
      }, 0)

      // Subtitle rises in cinematically
      .fromTo(sub,
        { opacity: 0, y: 80, scale: 0.96 },
        { opacity: 1, y: 0,  scale: 1,    duration: 0.7, ease: "power3.out" },
        0.3
      );

    // ── 3. Subtitle word shimmer (runs once visible, repeating) ──────────
    // Delay starting the shimmer until the subtitle has scrolled into view.
    // Originally this started on mount: wasted CPU animating invisible elements.
    ScrollTrigger.create({
      trigger: sub,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.to(section.querySelectorAll(".shim-silver"), {
          backgroundPosition: "200% center",
          duration: 8,
          ease: "none",
          repeat: -1,
        });
      },
    });

  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative will-change-transform"
      style={{ height: "200vh", background: "transparent" }}
    >
      {/* CSS shimmer — background-position runs on compositor thread, zero JS per frame */}
      <style>{`
        @keyframes hero-shimmer {
          0%   { background-position: 100% center; }
          100% { background-position: -100% center; }
        }
        .hero-char {
          animation: hero-shimmer 10s linear infinite;
        }
      `}</style>

      {/*
        Sticky wrapper — padding is animated 0 → 16px on scroll.
        NOTE: will-change-[padding] has been removed intentionally.
        "padding" cannot be GPU-composited, so that hint created a wasted layer.
        The wrapper has no will-change because it's not being transformed directly.
      */}
      <div
        ref={wrapperRef}
        className="sticky top-0 h-screen"
        style={{ background: "transparent", padding: "0px" }}
      >
        {/*
          Card: will-change-transform (not will-change-[border-radius]).
          "border-radius" alone can't be composited. "transform" promotes the element
          to its own GPU layer so border-radius clipping happens at composite time,
          not at paint time. This is the correct hint for a rounded animated element.
        */}
        <div
          ref={cardRef}
          className="relative w-full h-full overflow-hidden will-change-transform"
          style={{ background: "#0A0A0A", borderRadius: "0px" }}
        >
          {/* GIF Background Overlay */}
          <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
            <img
              ref={bgRef}
              src="/hero-bg.gif"
              alt=""
              className="w-full h-full object-cover opacity-[0.22] grayscale-[0.3] will-change-transform"
              style={{ transformOrigin: "center center" }}
            />
            {/* Soft vignette — keeps visual focus on center text */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 via-transparent to-[#0A0A0A]/60" />
          </div>
        </div>

        {/* Text layers — positioned on the WRAPPER so they sit above the card clip */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none select-none">
          <div
            ref={leftRef}
            className="font-semibold text-right will-change-transform whitespace-nowrap"
            style={{
              fontSize: "clamp(44px, 5.2vw, 86px)",
              lineHeight: "1.15",
              paddingBottom: "10px",
              letterSpacing: "-0.035em",
            }}
          >
            {"Less talk.".split("").map((char, i) => (
              <span
                key={i}
                className="hero-char inline-block"
                style={{
                  background: "linear-gradient(90deg, #555555 0%, #ffffff 50%, #555555 100%)",
                  backgroundSize: "200% auto",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  opacity: 0,
                  // No per-char will-change — parent wrapper is the GPU layer.
                  // 25 individual layers for opacity is wasteful compositing overhead.
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>

          <div style={{ width: "clamp(12px, 1vw, 24px)", flexShrink: 0 }} />

          <div
            ref={rightRef}
            className="font-semibold text-left will-change-transform whitespace-nowrap"
            style={{
              fontSize: "clamp(44px, 5.2vw, 86px)",
              lineHeight: "1.15",
              paddingBottom: "10px",
              letterSpacing: "-0.035em",
            }}
          >
            {"More agents.".split("").map((char, i) => (
              <span
                key={i}
                className="hero-char inline-block"
                style={{
                  background: "linear-gradient(90deg, #555555 0%, #ffffff 50%, #555555 100%)",
                  backgroundSize: "200% auto",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  opacity: 0,
                  // No per-char will-change — parent wrapper is the GPU layer.
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <p
          ref={labelRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white/30 text-[11px] uppercase tracking-[0.25em] font-medium pointer-events-none select-none"
          style={{ opacity: 0 }}
        >
          Scroll to explore
        </p>

        {/* Subtitle — revealed during scroll */}
        <div
          ref={subRef}
          className="absolute z-20 w-full flex items-center justify-center pointer-events-none select-none will-change-transform"
          style={{
            top: "50%",
            left: 0,
            transform: "translateY(-50%)",
            paddingLeft:  "clamp(32px, 6vw, 120px)",
            paddingRight: "clamp(32px, 6vw, 120px)",
            opacity: 0,
          }}
        >
          <p
            className="text-white font-semibold text-center leading-tight"
            style={{
              fontSize: "clamp(32px, 4.2vw, 68px)",
              letterSpacing: "-0.025em",
              maxWidth: "820px",
            }}
          >
            Whether it&apos;s simple or complex, our agents
            help you <span className="shim-silver" style={{
              background: "linear-gradient(90deg, #555555 0%, #ffffff 50%, #555555 100%)",
              backgroundSize: "200% auto",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}>save</span> <span className="shim-silver" style={{
              background: "linear-gradient(90deg, #555555 0%, #ffffff 50%, #555555 100%)",
              backgroundSize: "200% auto",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}>time</span> and <span className="shim-silver" style={{
              background: "linear-gradient(90deg, #555555 0%, #ffffff 50%, #555555 100%)",
              backgroundSize: "200% auto",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}>revenue</span>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
