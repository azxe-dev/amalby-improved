"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { MagneticButton } from "@/components/ui/MagneticButton";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const isDark = useRef(false);

  const navRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const tl = useRef<gsap.core.Timeline | null>(null);
  const scrollTween = useRef<gsap.core.Tween | null>(null);

  // ── Theme application logic ──────────────────────────────────────
  const applyTheme = useCallback((dark: boolean, force = false) => {
    if (dark === isDark.current && !force) return;
    isDark.current = dark;

    const container = containerRef.current;
    if (!container) return;

    const duration = 0.5;
    const ease = "power2.out";
    const overwrite = "auto";

    if (dark) {
      gsap.to(container, { backgroundColor: "rgba(13, 13, 13, 0.75)", borderColor: "rgba(255,255,255,0.12)", duration, ease, overwrite });
      gsap.to(container.querySelectorAll(".nav-invertible"), { color: "#ffffff", duration, ease, overwrite });
      gsap.to(container.querySelectorAll(".nav-line"), { backgroundColor: "#ffffff", duration, ease, overwrite });
      gsap.to(container.querySelectorAll(".nav-icon rect"), { fill: "#ffffff", duration, ease, overwrite });
      gsap.to(container.querySelectorAll(".nav-icon circle"), { fill: "#0D0D0D", duration, ease, overwrite });
    } else {
      gsap.to(container, { backgroundColor: "rgba(248, 248, 246, 0.75)", borderColor: "rgba(0,0,0,0.05)", duration, ease, overwrite });
      gsap.to(container.querySelectorAll(".nav-invertible"), { color: "#0D0D0D", duration, ease, overwrite });
      gsap.to(container.querySelectorAll(".nav-line"), { backgroundColor: "#0D0D0D", duration, ease, overwrite });
      gsap.to(container.querySelectorAll(".nav-icon rect"), { fill: "#0D0D0D", duration, ease, overwrite });
      gsap.to(container.querySelectorAll(".nav-icon circle"), { fill: "#F8F8F6", duration, ease, overwrite });
    }
  }, []);

  // ── Entrance animation ───────────────────────────────────────────
  useGSAP(() => {
    gsap.to(navRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power4.out",
      delay: 0.15,
      overwrite: "auto",
    });
  }, []);

  // ── Color inversion + scroll visibility ────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const HERO_THRESHOLD = window.innerHeight * 0.85;

      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY.current + 4) {
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY.current - 4) {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;

      // Update theme if panel is closed
      if (!isOpen) {
        applyTheme(currentScrollY > HERO_THRESHOLD);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen, applyTheme]);

  // ── Drive scroll-hide tween from isVisible state ─────────────────
  useEffect(() => {
    const tween = scrollTween.current;
    if (!tween) return;
    if (isVisible) tween.reverse();
    else tween.play();
  }, [isVisible]);

  // ── Handle Open/Close state transitions ───────────────────────
  useEffect(() => {
    const container = containerRef.current;
    const timeline = tl.current;
    if (!container || !timeline) return;

    if (isOpen) {
      // Force light theme when open
      const duration = 0.3;
      const ease = "power2.out";
      const overwrite = "auto";

      gsap.to(container, { backgroundColor: "rgba(248, 248, 246, 0.95)", borderColor: "rgba(0,0,0,0.08)", duration, ease, overwrite });
      gsap.to(container.querySelectorAll(".nav-invertible"), { color: "#0D0D0D", duration, ease, overwrite });
      gsap.to(container.querySelectorAll(".nav-line"), { backgroundColor: "#0D0D0D", duration, ease, overwrite });
      gsap.to(container.querySelectorAll(".nav-icon rect"), { fill: "#0D0D0D", duration, ease, overwrite });
      gsap.to(container.querySelectorAll(".nav-icon circle"), { fill: "#F8F8F6", duration, ease, overwrite });

      timeline.play();
    } else {
      timeline.reverse();
      // Restore theme based on current scroll position
      const pastHero = window.scrollY > window.innerHeight * 0.85;
      applyTheme(pastHero, true);
    }
  }, [isOpen, applyTheme]);

  // ── Setup GSAP timelines ONCE ─────────────────────────────────────
  useGSAP(() => {
    // 1. Scroll hide tween
    scrollTween.current = gsap.to(navRef.current, {
      y: -90,
      duration: 0.6,
      ease: "power2.inOut",
      paused: true,
    });

    // 2. Open/Close morph timeline
    const isMobile = window.innerWidth < 768;
    const targetWidth = isMobile ? "92vw" : 740;
    const targetHeight = isMobile ? 540 : 480;

    tl.current = gsap.timeline({ paused: true })
      .to(containerRef.current, {
        width: targetWidth,
        height: targetHeight,
        borderRadius: 32,
        boxShadow: "0 24px 48px rgba(0,0,0,0.14)",
        duration: 0.65,
        ease: "expo.inOut",
      }, 0)
      .to(".line-1", { rotate: 45, y: 2.25, width: 18, duration: 0.65, ease: "expo.inOut" }, 0)
      .to(".line-2", { rotate: -45, y: -2.25, width: 18, duration: 0.65, ease: "expo.inOut" }, 0)
      .to(contentRef.current, {
        opacity: 1, y: 0, pointerEvents: "auto",
        duration: 0.4, ease: "power2.out",
      }, "-=0.25")
      .from(".nav-link-anim", {
        opacity: 0, y: 20,
        stagger: 0.04, duration: 0.5, ease: "power3.out",
      }, "-=0.35");
  }, { scope: navRef });

  // ── Hover effects ──────────────────────────────────────────────
  const onHoverEnter = useCallback(() => {
    if (isOpen) return;
    gsap.to(containerRef.current, {
      y: -3,
      borderColor: isDark.current ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.1)",
      boxShadow: isDark.current
        ? "0 12px 32px rgba(0,0,0,0.25), 0 0 15px rgba(255,255,255,0.03)"
        : "0 12px 32px rgba(0,0,0,0.08), 0 0 15px rgba(255,255,255,0.1)",
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto"
    });
  }, [isOpen]);

  const onHoverLeave = useCallback(() => {
    if (isOpen) return;
    gsap.to(containerRef.current, {
      y: 0,
      borderColor: isDark.current ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.05)",
      boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
      duration: 0.7,
      ease: "power3.out",
      overwrite: "auto"
    });
  }, [isOpen]);

  const navLinks = useMemo(() => [
    { name: "Services", href: "/#services" },
    { name: "Work", href: "/work" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ], []);

  return (
    <nav
      ref={navRef}
      className="fixed top-8 left-0 right-0 z-[100] flex justify-center pointer-events-none"
      style={{ opacity: 0, transform: "translateY(-20px)" }}
    >
      <div
        ref={containerRef}
        className="overflow-hidden flex flex-col pointer-events-auto will-change-[width,height,transform,background-color]"
        onPointerEnter={onHoverEnter}
        onPointerLeave={onHoverLeave}
        style={{
          width: 360,
          height: 64,
          borderRadius: 20,
          backgroundColor: "rgba(248, 248, 246, 0.75)",
          border: "1px solid rgba(0, 0, 0, 0.05)",
          boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        {/* ── Persistent pill row ──────────────────────────── */}
        <div
          className="h-[64px] min-h-[64px] px-6 flex items-center justify-between cursor-pointer w-full relative"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center">
            <svg className="nav-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect width="20" height="20" rx="4" fill="#0D0D0D" />
              <circle cx="10" cy="10" r="5" fill="#F8F8F6" />
            </svg>
          </div>

          <span className="nav-invertible font-semibold text-xl tracking-tight absolute left-1/2 -translate-x-1/2 text-[#0D0D0D]">
            amalby
          </span>

          <div className="w-5 h-5 relative flex items-center justify-end">
            <span className="nav-line line-1 absolute w-[18px] h-[1.5px] bg-[#0D0D0D] block origin-center" style={{ top: "calc(50% - 2.25px)" }} />
            <span className="nav-line line-2 absolute w-[18px] h-[1.5px] bg-[#0D0D0D] block origin-center" style={{ top: "calc(50% + 2.25px)" }} />
          </div>
        </div>

        {/* ── Expanded panel content ───────────────────────── */}
        <div
          ref={contentRef}
          className="px-8 md:px-10 pb-10 flex-grow flex flex-col opacity-0 pointer-events-none"
          style={{ transform: "translateY(-15px)" }}
        >
          <div className="w-full h-px bg-black/10 mb-6" />

          <div className="flex flex-col md:flex-row gap-8 flex-grow">
            <div className="flex flex-col gap-2 md:gap-3 md:w-1/2">
              {navLinks.map((link) => (
                <div key={link.name} className="nav-link-anim">
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-5xl font-semibold leading-tight hover:opacity-50 transition-opacity block"
                  >
                    {link.name}
                  </Link>
                </div>
              ))}
            </div>

            <div className="hidden md:flex flex-grow md:w-1/2 nav-link-anim min-h-[220px]">
              <div className="w-full h-full bg-[#f4f4f2] rounded-2xl p-6 md:p-8 flex flex-col justify-end overflow-hidden relative group">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center brightness-[0.8] grayscale-[0.3] transition-transform duration-1000 group-hover:scale-105" />
                <div className="relative z-10">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/70 mb-1 block">Internal Standard</span>
                  <h4 className="text-2xl text-white font-semibold leading-tight">Zero fluff delivery.</h4>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-black/10 flex justify-between items-center text-[10px] md:text-[11px] uppercase tracking-[0.15em] font-medium text-black/40 nav-link-anim">
            <div className="flex gap-4 md:gap-6">
              <span className="hidden sm:inline">AI Partner</span>
              <span>Beta Access</span>
            </div>
            <MagneticButton>
              <Link href="/contact" onClick={() => setIsOpen(false)} className="text-black flex items-center gap-2 group font-semibold">
                Start a Project
                <span className="group-hover:translate-x-1 inline-block transition-transform">→</span>
              </Link>
            </MagneticButton>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
