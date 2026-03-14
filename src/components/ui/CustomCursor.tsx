"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";

/**
 * CustomCursor
 * ─────────────────────────────────────────────────────
 * A two-layer "liquid" cursor:
 *   • dot  – instantly snaps to pointer (1:1 precision)
 *   • ring – follows with lerp lag, morphs on hover targets
 *
 * States
 *   default  → small ring, small dot
 *   hover    → ring expands, blurs backdrop like a lens, dot fades
 *   swallow  → ring covers the hovered element edge-to-edge, dot gone
 *   text     → ring squishes to a thin I-beam bar
 *
 * No deps beyond GSAP (already installed).
 */

const LERP_FACTOR  = 0.12;        // ring lag — slightly slower for elegance
const DOT_SIZE     = 6;           // px — smaller, more precise
const RING_DEFAULT = 36;          // px
const RING_HOVER   = 72;          // px
const RING_SWALLOW = 100;         // px

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Position & Velocity tracking
  const mouse    = useRef({ x: 0, y: 0 });
  const lastMouse = useRef({ x: 0, y: 0 });
  const ringPos  = useRef({ x: 0, y: 0 });
  const vel      = useRef({ x: 0, y: 0 });
  const rafId    = useRef<number>(0);
  const cursorState = useRef<"default" | "hover" | "swallow" | "text">("default");

  // ─── Pointer tracking ────────────────────────────────────────────
  const onMove = useCallback((e: MouseEvent) => {
    mouse.current.x = e.clientX;
    mouse.current.y = e.clientY;
  }, []);

  // ─── Hover target detection ──────────────────────────────────────
  const getState = useCallback((el: Element | null): typeof cursorState.current => {
    if (!el) return "default";
    // Walk up the DOM
    let node: Element | null = el;
    while (node) {
      const tag = node.tagName?.toLowerCase();
      if (tag === "button" || tag === "a" || node.getAttribute("role") === "button") return "swallow";
      if (node.classList.contains("bento-cell") || node.classList.contains("cursor-expand")) return "hover";
      if (node.classList.contains("cursor-text") || tag === "textarea" || tag === "input") return "text";
      node = node.parentElement;
    }
    return "default";
  }, []);

  const applyState = useCallback((state: typeof cursorState.current) => {
    const ring = ringRef.current;
    const dot  = dotRef.current;
    if (!ring || !dot) return;
    cursorState.current = state;

    const defaults = { ease: "expo.out", duration: 0.6, overwrite: "auto" as const };

    switch (state) {
      case "hover":
        gsap.to(ring, { width: RING_HOVER, height: RING_HOVER, borderRadius: "50%", opacity: 0.7, borderColor: "rgba(255,255,255,0.7)", backgroundColor: "transparent", ...defaults });
        gsap.to(dot,  { opacity: 0.3, scale: 0.5, ...defaults });
        break;
      case "swallow":
        gsap.to(ring, { width: RING_SWALLOW, height: RING_SWALLOW, borderRadius: "50%", opacity: 0.2, borderColor: "rgba(255,255,255,0.3)", backgroundColor: "transparent", ...defaults });
        gsap.to(dot,  { opacity: 0, scale: 0, ...defaults });
        break;
      case "text":
        gsap.to(ring, { width: 3, height: 36, borderRadius: 2, opacity: 1, borderColor: "rgba(255,255,255,0.9)", backgroundColor: "transparent", ...defaults });
        gsap.to(dot,  { opacity: 0, ...defaults });
        break;
      default:
        gsap.to(ring, { width: RING_DEFAULT, height: RING_DEFAULT, borderRadius: "50%", opacity: 0.9, borderColor: "rgba(255,255,255,0.35)", backgroundColor: "transparent", ...defaults });
        gsap.to(dot,  { opacity: 1, scale: 1, ...defaults });
    }
  }, []);

  const onOver = useCallback((e: MouseEvent) => {
    applyState(getState(e.target as Element));
  }, [applyState, getState]);

  const onOut = useCallback(() => {
    applyState("default");
  }, [applyState]);

  // ─── Visibility on enter/leave window ────────────────────────────
  const onEnter = useCallback(() => {
    gsap.to([dotRef.current, ringRef.current], { opacity: 1, duration: 0.4 });
  }, []);

  const onLeave = useCallback(() => {
    gsap.to([dotRef.current, ringRef.current], { opacity: 0, duration: 0.4 });
  }, []);

  // ─── Click pulse ─────────────────────────────────────────────────
  const onDown = useCallback(() => {
    gsap.to(ringRef.current, { scale: 0.7, duration: 0.15, ease: "power2.in" });
    gsap.to(dotRef.current,  { scale: 1.8, duration: 0.15, ease: "power2.in" });
  }, []);

  const onUp = useCallback(() => {
    gsap.to(ringRef.current, { scale: 1, duration: 0.5, ease: "elastic.out(1.2, 0.4)" });
    gsap.to(dotRef.current,  { scale: 1, duration: 0.5, ease: "elastic.out(1.2, 0.4)" });
  }, []);

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    // Move tick inside useEffect to avoid exhaustive-deps issues with recursive RAF
    const tick = () => {
      const ring = ringRef.current;
      if (!ring) return;

      // 1. Position Lerping
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * LERP_FACTOR;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * LERP_FACTOR;

      // 2. Velocity Calculation
      const dx = mouse.current.x - lastMouse.current.x;
      const dy = mouse.current.y - lastMouse.current.y;
      vel.current.x += (dx - vel.current.x) * 0.15;
      vel.current.y += (dy - vel.current.y) * 0.15;
      lastMouse.current = { ...mouse.current };

      // 3. Transformation (Stretch + Rotate)
      const speed = Math.sqrt(vel.current.x ** 2 + vel.current.y ** 2);
      const stretch = Math.min(speed * 0.05, 1.2); 
      const angle = Math.atan2(vel.current.y, vel.current.x) * (180 / Math.PI);

      const rSize = cursorState.current === "hover" ? RING_HOVER : 
                    cursorState.current === "swallow" ? RING_SWALLOW : 
                    cursorState.current === "text" ? 40 : RING_DEFAULT;

      if (cursorState.current !== "swallow" && cursorState.current !== "text") {
        gsap.set(ring, {
          x: ringPos.current.x - rSize / 2,
          y: ringPos.current.y - rSize / 2,
          rotate: angle,
          scaleX: 1 + stretch,
          scaleY: 1 - stretch * 0.4,
        });
      } else {
        gsap.set(ring, {
          x: ringPos.current.x - rSize / 2,
          y: ringPos.current.y - rSize / 2,
          rotate: 0,
          scaleX: 1,
          scaleY: 1,
        });
      }

      if (dotRef.current) {
        gsap.set(dotRef.current, {
          x: mouse.current.x - DOT_SIZE / 2,
          y: mouse.current.y - DOT_SIZE / 2,
        });
      }

      rafId.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove",   onMove,  { passive: true });
    window.addEventListener("mouseover",   onOver,  { passive: true });
    window.addEventListener("mouseout",    onOut,   { passive: true });
    window.addEventListener("mouseenter",  onEnter, { passive: true });
    window.addEventListener("mouseleave",  onLeave, { passive: true });
    window.addEventListener("mousedown",   onDown,  { passive: true });
    window.addEventListener("mouseup",     onUp,    { passive: true });

    rafId.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mouseover",  onOver);
      window.removeEventListener("mouseout",   onOut);
      window.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown",  onDown);
      window.removeEventListener("mouseup",    onUp);
    };
  }, [onMove, onOver, onOut, onEnter, onLeave, onDown, onUp]);

  return (
    <>
      {/* ── Precision dot ──────────────────────────────── */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 bg-white pointer-events-none mix-blend-difference"
        style={{
          width:           DOT_SIZE,
          height:          DOT_SIZE,
          borderRadius:    "50%",
          zIndex:          99999,
          opacity:         0,
          willChange:      "transform, opacity",
          transform:       "translate(-100px, -100px)",
        }}
      />

      {/* ── Magnetic Liquid Core ───────────────────────── */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 border pointer-events-none mix-blend-difference"
        style={{
          width:           RING_DEFAULT,
          height:          RING_DEFAULT,
          borderRadius:    "50%",
          borderColor:     "rgba(255,255,255,0.4)",
          backgroundColor: "transparent",
          pointerEvents:   "none",
          zIndex:          99998,
          opacity:         0,
          willChange:      "transform, width, height, opacity, border-radius",
          transform:       "translate(-100px, -100px)",
        }}
      />
    </>
  );
}
