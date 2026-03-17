# Visual & Technical Breakdown: Antimetal

This document provides a deep dive into the high-performance design patterns of [antimetal.com](https://antimetal.com).

## 1. High-Level Tech Stack
*   **Framework:** Next.js (React)
*   **Build Tool:** Turbopack (extremely fast development and build cycles).
*   **Animation Engine:** GSAP (GreenSock) for complex scroll-triggered pinning and Framer Motion for UI-level transitions.
*   **Smooth Scroll:** **Lenis** (crucial for the "fluid" momentum-based feel).
*   **Rendering:** WebGL (via `<canvas>`) for backgrounds and interactive micro-animations.
*   **Styling:** Tailwind CSS.

---

## 2. The "Fluid" Secret Sauce: WebGL + Canvas
Unlike many sites that rely purely on DOM elements, Antimetal offloads its most complex visuals to the **GPU using `<canvas>`**.

### Key Observations:
- **Interactive Backgrounds:** The grainy, ethereal gradients you see are painted on a canvas. This allows for thousands of "particles" or color shifts per frame without the lag that thousands of `<div>` tags would cause.
- **Mouse Response:** Notice how elements glow or shift slightly as you hover—this is often a shader effect on a canvas layer, making it feel "alive" and highly responsive.

---

## 3. Section Stacking & Pinning
The site uses a mix of native CSS and JS-driven pinning to create its stacked layout.

### Implementation Details:
1.  **Lenis Smooth Scroll:** normalizes the scroll speed.
2.  **Pinned Sections (GSAP):** As you scroll into a new phase (e.g., the "Handle everything..." section), the background and main heading "pin" in place.
3.  **Layered Entry:** New content (like the code blocks and UI previews) "stacks" on top of the pinned background, often using `z-index` and `backdrop-filter: blur(20px)` for that premium frosted-glass look.
4.  **Sticky Elements:** Sub-headers use `position: sticky; top: x;` to remain contextually relevant as you scroll through long lists of features.

---

## 4. Image Performance & Optimization
Despite the high visual density, the site is exceptionally fast.
- **WebP Transition:** Virtually all image assets are served in WebP format.
- **Vector over Raster:** High-fidelity graphics that look like images are often SVGs or canvas-drawn, which are resolution-independent and lightweight.
- **Incremental Initialization:** Components like the 3D-feeling planet or network graphs are only initialized (`useEffect` in Next.js) when they approach the viewport.

---

## 5. Design Tokens

### Typography
- **Primary:** Modern sans-serif with tight tracking and a focus on readability at larger scales.
- **Style:** Clean, technical, and high-contrast (pure white on deep blues/blacks).

### Color Palette
| Component | Color | Role |
| :--- | :--- | :--- |
| **Primary BG** | Deep Midnight Blue | Foundation |
| **Accent 1** | Electric Lime | Call to Action / Interactive |
| **Overlay** | Glass (Low Opacity White) | Card Backgrounds |
| **Gradients** | Blue to Violet | Fluid Transitions |

---

## 6. How to Recreate (Practical Tips)
1.  **Smooth Scaling:** Use `transform: scale(0.95)` on parent sections and animate them to `1` on scroll entry using GSAP's `scrub` option.
2.  **Glassmorphism:**
    ```css
    .glass-card {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    ```
3.  **Canvas Noise:** Add a static or animated "grain" shader over your backgrounds to replicate that high-end textured look.
