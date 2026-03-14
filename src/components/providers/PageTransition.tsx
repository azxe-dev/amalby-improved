"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

/**
 * PageTransition
 * ─────────────────────────────────────────────────────
 * A two-phase curtain:
 *   ENTER  → curtain sweeps in from left (covers screen)
 *   EXIT   → curtain sweeps out to right (reveals page)
 *
 * Deliberately avoids ScrollTrigger and Lenis — it only
 * runs during the brief moment between route changes.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const curtainRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isFirst = useRef(true);

  useEffect(() => {
    const curtain = curtainRef.current;
    if (!curtain) return;

    // Skip animation on the very first load
    if (isFirst.current) {
      isFirst.current = false;
      gsap.set(curtain, { xPercent: -100, display: "none" });
      return;
    }

    // Route changed — play the EXIT curtain (reveals new page)
    gsap.timeline()
      .set(curtain, { display: "block", xPercent: 100 })
      .to(curtain, {
        xPercent: 0,
        duration: 0.55,
        ease: "expo.inOut",
      })
      .to(curtain, {
        xPercent: -100,
        duration: 0.55,
        ease: "expo.inOut",
        delay: 0.05,
        onComplete: () => {
          gsap.set(curtain, { display: "none" });
        },
      });
  }, [pathname]);

  return (
    <>
      {/* ── Curtain overlay ─────────────────────────── */}
      <div
        ref={curtainRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          background: "#0A0A0A",
          zIndex: 999999,
          pointerEvents: "none",
          display: "none",
          willChange: "transform",
        }}
      />
      {children}
    </>
  );
}
