"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * GSAP Global Configuration
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  
  ScrollTrigger.config({
    ignoreMobileResize: true,
    limitCallbacks: true,
  });

  gsap.config({
    nullTargetWarn: false,
  });
}

/**
 * LenisProvider — Actual Smooth Scroller
 * Integrates Lenis with GSAP ScrollTrigger for a premium, synced experience.
 */
export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 1. Initialize Lenis
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 2,
    });

    // 2. Sync GSAP ScrollTrigger with Lenis
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Initial Refresh
    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  return <>{children}</>;
}
