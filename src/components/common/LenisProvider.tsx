"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * GSAP Global Configuration — runs once
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
 * LenisProvider
 * Initialises Lenis and feeds its RAF into GSAP's ticker
 * so ScrollTrigger stays perfectly synced with smooth scroll.
 *
 * Key fix: we store the exact RAF callback reference so it
 * can be properly removed on cleanup (avoids ghost tickers).
 */
export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2,
    });

    // Expose on window for other components to optionally read
    (window as Window & { __lenis?: Lenis }).__lenis = lenis;

    // Sync GSAP ScrollTrigger with Lenis scroll events
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis from GSAP's ticker — single unified RAF loop
    const rafCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      gsap.ticker.remove(rafCallback);
      delete (window as Window & { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return <>{children}</>;
}
