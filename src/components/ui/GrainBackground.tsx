"use client";

import React, { useEffect, useRef } from "react";

const GrainBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const generateNoise = () => {
      const noiseCanvas = document.createElement("canvas");
      noiseCanvas.width = 128;
      noiseCanvas.height = 128;
      const noiseCtx = noiseCanvas.getContext("2d")!;
      const noiseData = noiseCtx.createImageData(128, 128);
      const data = noiseData.data;

      for (let i = 0; i < data.length; i += 4) {
        const val = Math.random() * 255;
        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
        data[i + 3] = 25; // Opacity
      }
      noiseCtx.putImageData(noiseData, 0, 0);
      return noiseCanvas;
    };

    const noisePattern = generateNoise();
    const pattern = ctx.createPattern(noisePattern, "repeat")!;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Randomly offset the pattern to make it "wiggle" like film grain
      const ox = Math.random() * 128;
      const oy = Math.random() * 128;
      
      ctx.save();
      ctx.translate(ox, oy);
      ctx.fillStyle = pattern;
      ctx.fillRect(-ox, -oy, width, height);
      ctx.restore();
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      render();
    };

    window.addEventListener("resize", handleResize);
    
    let frameId: number;
    const loop = () => {
      render();
      frameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.4] select-none mix-blend-overlay"
    />
  );
};

export default GrainBackground;
