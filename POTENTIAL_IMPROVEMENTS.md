# Amalby Potential Improvements 🚀

This document tracks high-impact visual and technical improvements to elevate the Amalby website architecture and aesthetics.

## 1. WebGL & GLSL Enhancements
Integrating hardware-accelerated graphics to move from a flat UI to an immersive experience.

### ✦ Hero "Neural Surface" (GLSL)
- **Concept:** Replace the static background highlights with a custom GLSL noise shader.
- **Effect:** A slow-moving, dark fluid surface that ripples on cursor movement.
- **Goal:** Create an immediate "wow" factor upon landing.

### ✦ 3D "Agent" Point Cloud (Three.js)
- **Location:** Services Section -> AI Agents Card.
- **Concept:** Swap the 2D SVG dot grid for a real-time Three.js particle system.
- **Effect:** Thousands of particles forming a morphing geometric shape that reacts to mouse hover.

### ✦ Post-Processing "Grain Flow" (GLSL)
- **Concept:** A global shader pass adding subtle film grain and chromatic aberration at section edges.
- **Effect:** Gives the site a tactile, analog texture that feels premium and "expensive."

### ✦ The "Crystal Core" (Three.js Refraction)
- **Location:** CTA Section.
- **Concept:** A high-fidelity 3D glass/chrome object on the "Talk to Agent" card.
- **Effect:** Uses refraction shaders to distort the background realistically as the user scrolls.

## 2. Motion Narrative & Typography
Small UX "micro-moments" and fluid typography that reinforce the brand's premium quality.

- [ ] **Character Scramble Reveal:** Move beyond simple fades to a character-scramble or "clipped slide-up" for headings.
- [ ] **Velocity-Based Variable Weight:** Animate `font-weight` of key headings based on scroll velocity, making the type feel "alive."
- [ ] **Typography Reveal:** Implement a high-end "split-text" GSAP animation for main headings with staggered character entrance.
- [ ] **Magnetic Navigation:** Implement "Magnetic" pull for Navbar links and CTA buttons, creating a tactile physical connection to the cursor.

## 3. Material Depth & Materiality
Expanding the physical presence of the digital interface.

- [ ] **Post-Processing "Grain Flow" (GLSL):** A global shader pass adding subtle film grain and chromatic aberration at section edges to kill "flat digital" flatness.
- [ ] **Real-Time Lighting:** Map the lighting/glows inside Bento cards to the global cursor position, so cards look "lit" by the mouse rather than just tilted.
- [ ] **Section Compression:** Implement an "overlay" scroll effect where current sections subtly scale down (95%) and blur as the next section slides over them.
- [ ] **Adaptive Theming:** Smoothly transition the global `body` background color between sections (e.g., #f2f2f2 to deep charcoal) with a 1.2s ease.

## 4. Interactive Micro-Details & Performance
- [ ] **Connected Marquee:** Link the Marquee loop speed to the user's scroll speed—swiping fast makes the toolset "whirl," then settle.
- [ ] **Dynamic Data Visuals:** Make the Services bar chart reactive; bars should "ripple" or "bounce" with an Elastic ease when the cursor passes over them.
- [ ] **Custom Cursor:** A magnet-reactive "liquid" cursor that expands over bento cells and "swallows" buttons with a shape-morph.
- [ ] **Asset Preloading:** Implement a strategy for heavy WebGL textures/models to ensure zero jank on first interactive.
- [ ] **Bento Grid Responsiveness:** Further refine the grid for tablet and landscape mobile views.

---
*Last Updated: 2026-03-13*
