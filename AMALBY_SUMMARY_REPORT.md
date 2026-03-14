# Amalby: Comprehensive Project State & Implementation Report

**Status:** Phase 1 & 2 Complete. Site is fully responsive, animated, and brand-consistent.
**Primary Tech Stack:** Next.js 14, TypeScript, Tailwind CSS v4, GSAP 3, Lenis Scroll.

---

## 🎨 1. Design & Typography (The Brand Identity)

The core objective was to move away from generic "agency" looks towards a high-end, boutique AI studio aesthetic inspired by **Slush.app**, **Sunday.ai**, and **Ctrl.xyz**.

### 🍅 Tomato Grotesk Integration
- **Objective:** Establish a unique, bold, yet refined type system.
- **Action:** Extracted 18 local OTF weights from `Tomato-Grotesk-Font-Family.zip`.
- **Implementation:** 
  - Integrated via `next/font/local` in `src/app/layout.tsx`.
  - Created a global CSS override in `globals.css` using `!important` on all base elements (`h1-h6`, `p`, `span`, `a`, `div`, `input`, `button`) to ensure zero fallback to system fonts.
  - Purged all Google Font dependencies (Inter, Plus Jakarta Sans, Barlow Condensed) for a cleaner bundle and 100% brand consistency.
- **Weight Refinement:** Moved from "Heavy/Black" to "SemiBold/ExtraBold" (600/800) for a more sophisticated, readable look across all components.

### 🎭 Visual Philosophy
- **Color Palette:** 
  - Primary Background: `#f2f2f2` (Light mode) / `#0D0D0D` (Dark mode headers/footers).
  - Accent Color: `#49C88B` (Emerald Green).
  - High Contrast: Pure black text on off-white, and pure white text on dark cards.
- **Component Geometry:** Large border radii (`24px` to `48px`) for containers to create a "capsule" or "card" feel.

---

## 🛠 2. Structural Components

### 🏗 Navigation (The Morphing Header)
- **Engine:** GSAP Timeline (`tl.current`).
- **Functionality:** 
  - Floating capsule pill that expands into a full-screen menu overlay.
  - **Inversion Logic:** Implemented `gsap` scroll triggers that detect dark sections (like Hero/Features) and invert the navbar's text colors to ensure visibility.
  - **Icon Morph:** Hamburg icon physical morphs into an "X" using synchronized GSAP rotation and translation.
  - **Interactive Links:** Large typography with hover opacity shifts.

### ⚡ Hero Section
- **Content:** Headline *"Using your social account or Google."*
- **Aesthetics:** 
  - Bordered container with `borderRadius: "40px"`.
  - Subtle "Glassmorphic" glows (radial gradients) in the background.
  - Static "amalby" wordmark for brand presence.

### 📦 Services Section
- **Interactivity:** Integrated card-tilt effects using GSAP mouse-tracking.
- **Layout:** 2-column grid of high-contrast colorful cards (Pastel Green, Lavender, Yellow).
- **Typography:** Removed condensed/italic forcing for a cleaner, modern grotesk look. Standard casing used for better readability.

### 🧪 Features Section
- **Objective:** "No Fluff" messaging for serious AI clients.
- **Design:** Dark section with high-contrast emerald tag.
- **Refinement:** Divided into numbered items with thin `divide-white/10` lines, matching the high-end digital agency look.

### 📩 CTA & Contact Section
- **Implementation:** A split-grid layout featuring a "Talk to our Agent" card and a direct project briefing form.
- **refinements:** Simplified typography, semi-bold weights for buttons, and rounded-full interaction states.

### 🦶 Footer
- **Design:** Replicated the Slush.app footer structure.
- **Features:** 
  - 2x2 Interactive Social Grid (LinkedIn, X, Instagram, Email).
  - Large Green "Work with Amalby" CTA card with built-in GSAP mouse-tilt physics.
  - Clean secondary nav for Privacy/Terms.

---

## 🚀 3. Motion & Performance

### 🌊 Smooth Scroll System
- **Provider:** `LenisProvider.tsx`.
- **Optimization:** 
  - `lerp: 0.1` added for a weighted, "buttery" feel.
  - **Ticker Sync:** `gsap.ticker.add` used to synchronize Lenis frames with GSAP animations, eliminating jitter.
  - **Global CSS Reset:** `scroll-behavior: auto !important` ensures zero conflict with native browser scrolling.

### 🧲 Interaction Physics
- **Magnetic Buttons:** Custom `MagneticButton.tsx` wrapper that uses GSAP to pull elements toward the cursor, heightening the "boutique" feel.
- **Section Transitions:** GSAP ScrollTrigger used to manage entrance animations across the page.

### 🧹 Code Quality
- **Simplified globals.css:** Removed experimental Tailwind classes and aliased variables in favor of a clean, strict theme.
- **Asset Management:** Centralized local fonts in `public/fonts/`.
- **Lint Passing:** Configured to handle Tailwind v4 `@theme` and `@utility` rules gracefully.

---

## ✅ Summary of Key Refinements
- [x] Migrated from heavy, all-caps italics to refined, upright SemiBold grotesk.
- [x] Removed redundant components (Marquee) to maintain "High Fluff-Free" brand.
- [x] Reinforced Navbar visibility with dynamic color inversion.
- [x] Normalized casing across the site (Sentence case instead of forced Uppercase).
- [x] Perfected the "Magnetic" and "Tilt" interaction delays.

*Report generated March 13, 2026.*
