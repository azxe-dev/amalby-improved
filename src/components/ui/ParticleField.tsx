"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Props {
  /** Percentage of green-brand particles (0–1) */
  greenRatio?: number;
  /** Overall opacity of the canvas */
  opacity?: number;
}

/**
 * ParticleField — Three.js WebGL particle system.
 * Designed to sit absolutely inside a relative container,
 * fully transparent background so the card colour shows through.
 */
const ParticleField = ({ greenRatio = 0.35, opacity = 1 }: Props) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth;
    const H = mount.clientHeight;

    /* ── Renderer ────────────────────────────────────────────────── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.pointerEvents = "none";
    mount.appendChild(renderer.domElement);

    /* ── Scene & Camera ──────────────────────────────────────────── */
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
    camera.position.z = 35;

    /* ── Particles ───────────────────────────────────────────────── */
    const COUNT = 200;
    const pos   = new Float32Array(COUNT * 3);
    const col   = new Float32Array(COUNT * 3);

    // Brand colour: #49C88B → rgb(0.286, 0.784, 0.545)
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 80;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;

      const green = Math.random() < greenRatio;
      col[i * 3]     = green ? 0.286 : 0.9;
      col[i * 3 + 1] = green ? 0.784 : 0.9;
      col[i * 3 + 2] = green ? 0.545 : 0.9;
    }

    /* Custom shader material for soft glowing circles */
    const shaderMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      vertexColors: true,
      vertexShader: `
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = 4.0 * (300.0 / -mvPos.z);
          gl_Position  = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float d = distance(gl_PointCoord, vec2(0.5));
          if (d > 0.5) discard;
          float alpha = smoothstep(0.5, 0.1, d) * 0.65;
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
    });

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("color",    new THREE.BufferAttribute(col, 3));

    const points = new THREE.Points(geo, shaderMat);
    scene.add(points);

    /* ── Mouse ───────────────────────────────────────────────────── */
    let mx = 0, my = 0;
    const onMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);

    /* ── Animation loop ──────────────────────────────────────────── */
    const clock = new THREE.Clock();
    let frame: number;

    const animate = () => {
      frame = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Gentle drift rotation + subtle mouse influence
      points.rotation.y = t * 0.04 + mx * 0.08;
      points.rotation.x = t * 0.02 + my * 0.05;

      renderer.render(scene, camera);
    };
    animate();

    /* ── Resize ──────────────────────────────────────────────────── */
    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      mount.removeEventListener("mousemove", onMove);
      geo.dispose();
      shaderMat.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [greenRatio]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0"
      style={{ opacity, zIndex: 0, pointerEvents: "none" }}
    />
  );
};

export default ParticleField;
