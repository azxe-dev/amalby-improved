"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * ─── GSAP Global Configuration (runs once, module level) ────────────────────
 * Registering plugins here prevents the "duplicate plugin" warning that happens
 * when individual components also call gsap.registerPlugin().
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.config({
    // Don't trigger re-calculations on every mobile safari resize event
    ignoreMobileResize: true,
    // Only fire callbacks when a trigger actually changes state (not every frame)
    limitCallbacks: true,
    // Let Lenis report the scroll position — don't use native scroll events
    syncInterval: 40,
  });

  gsap.config({
    nullTargetWarn: false,
    // Force3D ensures transforms always use the GPU matrix path
    force3D: true,
  });
}

/**
 * ─── LenisProvider ──────────────────────────────────────────────────────────
 *
 * The GOLDEN RULE of Lenis + GSAP sync:
 *   ONE loop only. GSAP is the loop. Lenis rides it.
 *
 *   gsap.ticker → calls lenis.raf() → Lenis emits "scroll" → ScrollTrigger.update()
 *
 * This means:
 *   • No separate requestAnimationFrame anywhere in the app
 *   • No competing scroll listeners
 *   • Everything timed to the exact same frame
 *
 * lagSmoothing(0) is non-negotiable: if GSAP tries to "catch up" after a tab
 * comes back into focus, it will pass a huge delta to lenis.raf() causing a
 * violent snap-scroll. 0 prevents this entirely.
 */
export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      // 1.1s: snappy enough to feel responsive, long enough to feel silky
      duration: 1.1,
      // Pure expo-out: the gold standard for smooth scroll feel.
      // Fast initial response (doesn't feel like it's fighting you),
      // very long tail (coasts rather than braking sharply).
      easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // 1.0 is the "truthful" multiplier — scroll exactly as much as you scrolled
      // Going higher makes it feel twitchy; lower makes it feel sluggish
      wheelMultiplier: 1.0,
      // Touch: slightly faster than wheel so mobile feels native
      touchMultiplier: 1.5,
      // Infinite: false is default, but explicit is clear
      infinite: false,
    });

    // Expose on window so any child component can call lenis.stop() / lenis.start()
    // e.g. to lock scroll when a modal is open
    (window as Window & { __lenis?: Lenis }).__lenis = lenis;

    // ── The sync chain ───────────────────────────────────────────────────────
    // Step 1: Whenever Lenis scrolls, immediately tell ScrollTrigger.
    //         This keeps scrub animations in perfect sync on every frame.
    lenis.on("scroll", ScrollTrigger.update);

    // Step 2: GSAP's ticker is the ONE RAF loop — it calls lenis.raf() each frame.
    //         time comes in seconds from GSAP, Lenis expects milliseconds.
    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);

    // Step 3: lagSmoothing(0) — absolutely critical.
    //         Without this, if the tab loses focus and comes back, GSAP sends
    //         a massive time delta to lenis.raf() causing a violent scroll jump.
    gsap.ticker.lagSmoothing(0);

    // Step 4: Unlock 120fps — on regular 60Hz screens this is identical.
    //         On ProMotion / high-refresh screens this makes animations visibly silk.
    gsap.ticker.fps(120);

    // Step 5: Defer the initial ScrollTrigger measurement by 150ms.
    //         Fonts + images finishing layout shifts can cause incorrect trigger
    //         positions if we measure immediately. 150ms catches most of them.
    const refreshId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    // ── Cleanup ──────────────────────────────────────────────────────────────
    return () => {
      clearTimeout(refreshId);
      lenis.destroy();
      gsap.ticker.remove(onTick);
      delete (window as Window & { __lenis?: Lenis }).__lenis;
      gsap.ticker.fps(60);
    };
  }, []);

  return <>{children}</>;
}
