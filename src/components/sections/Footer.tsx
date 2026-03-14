"use client";

import React, { useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Static Data ─────────────────────────────────────────────────── */
const SOCIALS = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: "X / Twitter",
    href: "https://twitter.com",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.259 5.631L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    name: "Email",
    href: "mailto:hello@amalby.com",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

const PRIMARY_NAV = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/contact" },
];

const SECONDARY_NAV = [
  { label: "Privacy Notice", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

/* ── Component: SocialTile ────────────────────────────────────────── */
const SocialTile = ({ name, href, icon }: { name: string; href: string; icon: React.ReactNode }) => {
  const tileRef = useRef<HTMLAnchorElement>(null);

  const handleEnter = useCallback(() => {
    gsap.to(tileRef.current, {
      scale: 1.08,
      y: -6,
      boxShadow: "0 16px 32px rgba(0,0,0,0.25)",
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });
  }, []);

  const handleLeave = useCallback(() => {
    gsap.to(tileRef.current, {
      scale: 1,
      y: 0,
      boxShadow: "0 0px 0px rgba(0,0,0,0)",
      duration: 0.45,
      ease: "power3.out",
      overwrite: "auto",
    });
  }, []);

  return (
    <a
      ref={tileRef}
      href={href}
      target={href.startsWith("mailto") ? "_self" : "_blank"}
      rel="noopener noreferrer"
      aria-label={name}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="bg-white text-black flex items-center justify-center cursor-pointer"
      style={{
        borderRadius: "24px",
        width: "120px",
        height: "120px",
        willChange: "transform, box-shadow",
      }}
    >
      {icon}
    </a>
  );
};

/* ── Component: FooterNavLink ────────────────────────────────────── */
const FooterNavLink = ({ label, href, isSecondary = false }: { label: string; href: string; isSecondary?: boolean }) => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleEnter = useCallback(() => {
    gsap.to(linkRef.current, {
      scale: 1.3,
      x: -12,
      z: 0.01, // Force 3D context to prevent blur
      duration: 0.45,
      ease: "back.out(1.7)",
      force3D: true,
      overwrite: "auto",
    });
  }, []);

  const handleLeave = useCallback(() => {
    gsap.to(linkRef.current, {
      scale: 1,
      x: 0,
      z: 0.01,
      duration: 0.6,
      ease: "power3.out",
      force3D: true,
      overwrite: "auto",
    });
  }, []);

  return (
    <Link
      ref={linkRef}
      href={href}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`font-semibold leading-tight inline-block antialiased ${isSecondary ? 'text-black/60' : 'text-black'}`}
      style={{ 
        fontSize: isSecondary ? "clamp(12px, 1vw, 14px)" : "clamp(14px, 1.2vw, 17px)",
        transformOrigin: "right center",
        willChange: "transform, opacity",
        backfaceVisibility: "hidden",
        WebkitFontSmoothing: "subpixel-antialiased"
      }}
    >
      {label}
    </Link>
  );
};

/* ── Component: Footer ────────────────────────────────────────────── */
const Footer = () => {
  const [year, setYear] = React.useState<number | null>(null);
  const greenCardRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  useGSAP(() => {
    const card = greenCardRef.current;
    if (!card) return;

    const sweepElements = card.querySelectorAll(".text-sweep, .text-sweep-light");
    sweepElements.forEach((el) => {
      gsap.to(el, {
        backgroundPosition: "0% 0%",
        duration: 1.8,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });
  }, { scope: greenCardRef });

  const handleCardMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = greenCardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    gsap.to(card, {
      rotateY: x * 4,
      rotateX: -y * 4,
      scale: 1.012,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 1000,
      overwrite: "auto",
    });
  }, []);

  const handleCardMouseLeave = useCallback(() => {
    gsap.to(greenCardRef.current, {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      duration: 0.7,
      ease: "power3.out",
      overwrite: "auto",
    });
  }, []);

  return (
    <footer className="bg-[#f2f2f2] px-[12px] md:px-[20px] pt-0 pb-[12px]">
      <div className="max-w-[1800px] mx-auto bg-black overflow-hidden" style={{ borderRadius: "48px" }}>
        <div className="flex flex-col md:flex-row items-stretch p-6 gap-6">

          {/* ── Left: Social grid ───────────────────────────── */}
          <div className="grid grid-cols-2 gap-4 shrink-0">
            {SOCIALS.map((s) => (
              <SocialTile key={s.name} {...s} />
            ))}
          </div>

          {/* ── Right: Green CTA card ──────────────────────── */}
          <div
            ref={greenCardRef}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            className="flex-1 flex flex-col justify-between relative overflow-hidden cursor-default"
            style={{
              background: "#49C88B",
              borderRadius: "36px",
              padding: "40px 44px 40px 48px",
              minHeight: "264px",
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
          >
            <div className="flex justify-between items-start gap-10">
              <h2
                className="text-black font-semibold leading-[1.1] text-sweep"
                style={{ fontSize: "clamp(32px, 3vw, 48px)", letterSpacing: "-0.01em", maxWidth: "420px" }}
              >
                Work with Amalby.<br />
                Then make it all happen.
              </h2>

              <div className="shrink-0 flex flex-col gap-0 text-right">
                <div className="flex flex-col gap-[2px] mb-4">
                  {PRIMARY_NAV.map((item) => (
                    <FooterNavLink key={item.label} {...item} />
                  ))}
                </div>

                <div className="flex flex-col gap-[2px]">
                  {SECONDARY_NAV.map((item) => (
                    <FooterNavLink key={item.label} {...item} isSecondary />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-auto pt-6">
              <span className="text-black/60 font-medium" style={{ fontSize: "13px" }}>
                © {year || "2026"} Amalby. All rights reserved.
              </span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
