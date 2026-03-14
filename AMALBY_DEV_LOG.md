# Amalby Development Log - Phase 1: Foundation & Navbar

**Project:** Amalby Agency Website (AI Implementation Agency)  
**Date:** March 12, 2026  
**Status:** Scaffolding complete. High-fidelity Navbar finalized.

---

## 🚀 1. Project Initialization & Setup
- **Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS v4, GSAP, Framer Motion.
- **Folder Structure:** 
  - `src/components/layout`, `src/components/sections`, `src/components/ui`.
  - Routes established for `/`, `/work`, `/contact`, `/privacy`, `/terms`.
- **Design Tokens:** Implemented in `globals.css` using Tailwind v4 `@theme` syntax.
  - Background: `#F8F8F6` (Off-white)
  - Primary Text / Dark Background: `#0D0D0D`
  - Border: `#E8E8E6`
- **Typography:**
  - **Cabinet Grotesk**: Integrated via Fontshare CDN (Headlines).
  - **Inter**: Integrated via `next/font/google` (Body/UI).

---

## 💎 2. The Navbar Evolution (The Sunday.ai Saga)
Building a navbar that morphs from a floating capsule into a full navigation panel was the core challenge.

### 🛠 Mistakes & Course Corrections

#### Attempt 1: Component Swapping (Framer Motion)
- **Mistake:** Swapping two different components (`Pill` and `Panel`) inside `AnimatePresence`.
- **The Bug:** Created a visible "blink" where the navbar would disappear for a frame during the trade-off.
- **The Fix:** Refactored to a **single persistent container** that morphs its own dimensions.

#### Attempt 2: Spring Animation Jitter
- **Mistake:** Relying on default spring physics for the layout transition.
- **The Bug:** Closing felt bouncy and "cheap" rather than premium. Also, opening felt too slow and floaty.
- **The Fix:** Switched to **GSAP** for industry-standard motion control.

#### Attempt 3: Multiple Timelines Conflict
- **Mistake:** Creating fresh timelines on every click.
- **The Bug:** If clicked rapidly, the animations would "stutter" as multiple timelines fought to control the same properties.
- **The Fix:** Implemented a **Single Reversible GSAP Timeline**. One `tl.current` is built once; it simply plays forward or backward. Zero jitter.

#### Attempt 4: The Icon Morph
- **Mistake:** Using a separate "X" button and hamburger icon.
- **The Bug:** Closing the menu felt disjointed because the "X" would fade out while the hamburger faded in.
- **The Fix:** Created a **morphed icon**. Two horizontal lines that GSAP physically rotates and crosses into an "✕". The icon morphs in perfect sync with the box expansion.

---

## 🏗️ 3. Technical Mastery
- **Tailwind v4 Optimization:** Leveraged the new `@theme` block in CSS to centralize design tokens, avoiding the need for a complex `tailwind.config.js`.
- **GSAP Precision:** Used `expo.inOut` easing for that distinct "Apple/Agency" acceleration feel.
- **Hardware Acceleration:** Applied `will-change` properties to ensure smooth layout shifts without repainting lag.

---

## ✅ 4. Summary of Work Done
- [x] Initialized Next.js 14 project with strict TS and Tailwind v4.
- [x] Configured global design system (colors, fonts, hierarchy).
- [x] Built placeholder architecture for multi-page routing.
- [x] Engineered the high-fidelity morphing Navbar.
- [x] Integrated GSAP with `@gsap/react` for modern performance.

---
*End of Phase 1 Log.*

---

## 🛡️ 5. Strict Core Tech Stack Rules
> **CRITICAL DIRECTIVE:** Do NOT revert to inferior options. These are the mandatory standards for Amalby:
> 
> 1. **Animations & Transitions**: *PURE GSAP ONLY*. Do not use CSS `transition`, `transform` outside of GSAP, or Framer Motion for complex sequences. Do not use React `useEffect` with `setTimeout` for timing. Timeline synchronization and ScrollTrigger must drive the experience.
> 2. **Layout Changes**: No component swapping for animations (`AnimatePresence` etc). Use single persistent DOM elements and morph them via GSAP `width/height/opacity`.
> 3. **Visibility & States**: No `MutationObserver` for CSS classes to trigger React state. Use GSAP `onUpdate` or direct GSAP callbacks to manage DOM visibility natively.
> 4. **Text Scaling**: Never animate text scaling *down* from a large `font-size` (e.g., `font-size: 18vw` to `scale: 0.1`), as browsers pixelate the rasterization. Instead, define the `font-size` at its *smallest* destination size (e.g., `font-size: 24px`) and use GSAP to animate *from* a massive scale (`scale: 12`) down to `scale: 1`.
> 5. **Typography**: Premium geometric/grotesk fonts ONLY. Plus Jakarta Sans or Inter (tightly tracked) are the standards, mimicking top-tier choices like Matter (Robot.com).
