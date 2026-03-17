# Visual & Technical Breakdown: Joby Aviation

This document analyzes the design and engineering "secret sauce" of [jobyaviation.com](https://www.jobyaviation.com).

## 1. High-Level Tech Stack
*   **Framework:** Next.js (hosted on Vercel).
*   **Animation Engine:** GSAP (GreenSock Animation Platform) + [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/).
*   **Styling:** SCSS Modules (clean, scoped CSS).
*   **Media Delivery:** Cloudflare R2 (for high-bandwidth video) + Sanity CDN (for optimized WebP/AVIF images).
*   **Smooth Scroll:** Likely GSAP [ScrollSmoother](https://gsap.com/docs/v3/Plugins/ScrollSmoother/) or Lenis to achieve that heavy, cinematic inertial feel.

---

## 2. Section Stacking Mechanics
The "fluid" feel you noticed is a combination of **Pinning** and **Scrubbing**.

### How it works:
1.  **GSAP Pinning:** A section is fixed (`position: fixed` or `sticky`) to the viewport for a set "distance" of scrolling.
2.  **Scroll Scrubbing:** The animation progress (e.g., an image scaling from 1 to 1.5) is linked 1-to-1 with the scrollbar position (`scrub: true`).
3.  **The "Window" Reveal:**
    *   Many transitions use a **Mask/Clip-Path** effect.
    *   They use an SVG shape (the aircraft window) as a mask for the background video.
    *   As you scroll, GSAP scales the mask up or down, revealing the layer beneath it. This creates the illusion of moving *through* the aircraft into the scene.

---

## 3. Smoothness with Heavy Images/Video
The site handles massive assets without lag due to:
*   **Partial Content Requests (HTTP 206):** Background videos are streamed in chunks, so they don't block the initial page load.
*   **GPU Acceleration:** Animations target `transform` (scale, translate) and `opacity` rather than height/width. This offloads the work from the CPU to the GPU.
*   **Next/Image Optimization:** Automatic serving of WebP images tailored to the user's screen size and resolution.
*   **IntersectionObserver:** Heavy background layers are only initialized/played when they enter the viewport.

---

## 4. Design Tokens & Data

### Typography
*   **Headings:** `Joby Sans Display` (Font weight: 500-550).
*   **Body:** `Joby Sans Text` (Font weight: 400).
*   **Style Nuance:** Tight tracking (`letter-spacing: -0.03em`) on large headings to feel premium.

### Color Palette
| Name | Hex Code | Usage |
| :--- | :--- | :--- |
| **Joby Blue** | `#0076FF` | Brand Primary / Interaction |
| **Deep Space** | `#003366` | Secondary Layers / Gradients |
| **Warm Sand** | `#F5F4DF` | Navigation / Backgrounds |
| **Pure White** | `#FFFFFF` | Primary Content |

---

## 5. Recreation Strategy (How to DIY)
To build a section like theirs in your project:
1.  **Setup GSAP:** Install `gsap` and `ScrollTrigger`.
2.  **Parent Container:** Set a section to `min-height: 200vh` (scrollable distance).
3.  **Sticky Wrapper:** Inside, create a `position: sticky; top: 0; overflow: hidden;` element.
4.  **The Mask:** Use a `clip-path: url(#my-svg-mask)` on your top image/video layer.
5.  **GSAP Logic:**
    ```javascript
    gsap.to(".mask-element", {
      clipPath: "inset(0% 0% 0% 0%)", // or scale the SVG
      scrollTrigger: {
        trigger: ".parent-container",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        pin: true
      }
    });
    ```
