"use client";

import React, { useRef, useCallback } from "react";
import { gsap } from "gsap";

/**
 * MagneticButton
 * ──────────────────────────────────────────────────────
 * Rewritten to use GSAP springs instead of Framer Motion.
 * This keeps the magnetic effect on the same unified ticker
 * as Lenis + ScrollTrigger + CustomCursor — zero competing RAF loops.
 */
export const MagneticButton = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouse = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const { height, width, left, top } = el.getBoundingClientRect();
    const middleX = e.clientX - (left + width / 2);
    const middleY = e.clientY - (top + height / 2);

    gsap.to(el, {
      x: middleX * 0.1,
      y: middleY * 0.1,
      scale: 1.02,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });
  }, []);

  const reset = useCallback(() => {
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: "elastic.out(1, 0.4)",
      overwrite: "auto",
    });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className={`inline-block ${className}`}
      style={{ willChange: "auto" }} 
    >
      {children}
    </div>
  );
};
