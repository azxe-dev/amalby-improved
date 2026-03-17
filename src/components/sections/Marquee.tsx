"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ══ SVG Icons ══════════════════════════════════════════════════ */

const OpenAIIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" width="48" height="48">
    <path d="M22.28 9.82a5.98 5.98 0 0 0-.52-4.91 6.05 6.05 0 0 0-6.51-2.9 6.07 6.07 0 0 0-10.27 2.19 5.98 5.98 0 0 0-4 2.9 6.05 6.05 0 0 0 .74 7.1 5.98 5.98 0 0 0 .51 4.91 6.05 6.05 0 0 0 6.51 2.9A5.98 5.98 0 0 0 13.26 24a6.06 6.06 0 0 0 5.77-4.21 5.99 5.99 0 0 0 4-2.9 6.06 6.06 0 0 0-.75-7.07zM13.26 22.43a4.48 4.48 0 0 1-2.88-1.04l.14-.08 4.78-2.76a.79.79 0 0 0 .39-.68V10.2l2.02 1.17a.07.07 0 0 1 .04.05v5.58a4.5 4.5 0 0 1-4.49 4.43zm-9.66-4.12a4.47 4.47 0 0 1-.53-3.01l.14.08 4.78 2.76a.77.77 0 0 0 .78 0l5.84-3.37v2.33a.08.08 0 0 1-.03.06L9.74 19.95a4.5 4.5 0 0 1-6.14-1.64zM1.77 8.65a4.49 4.49 0 0 1 2.37-1.97v5.68a.77.77 0 0 0 .39.68l5.81 3.35-2.02 1.17a.08.08 0 0 1-.07 0L3.7 14.7a4.5 4.5 0 0 1-.93-6.05zm16.6 3.87-5.84-3.37 2.02-1.17a.08.08 0 0 1 .07 0l4.83 2.79a4.5 4.5 0 0 1-.68 8.1v-5.67a.79.79 0 0 0-.4-.68zm2.01-3.03-.14-.09-4.77-2.78a.78.78 0 0 0-.79 0L9.41 9.95V7.62a.07.07 0 0 1 .03-.06l4.83-2.79a4.5 4.5 0 0 1 6.11 4.72zM8.3 12.87 6.28 11.7a.08.08 0 0 1-.04-.06V6.06a4.5 4.5 0 0 1 7.38-3.45l-.14.08-4.78 2.76a.79.79 0 0 0-.4.68zm1.1-2.37 2.6-1.5 2.6 1.5v3l-2.6 1.5-2.6-1.5v-3z" />
  </svg>
);

const ClaudeIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" width="48" height="48">
    <path d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z" />
  </svg>
);

const GeminiIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" width="48" height="48">
    <path d="M12 2l2.09 7.91H22l-6.55 4.76 2.5 7.7L12 18l-5.95 4.37 2.5-7.7L2 9.91h7.91z" />
  </svg>
);

const ReactIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" width="48" height="48">
    <ellipse cx="12" cy="12" rx="10.5" ry="3.8" stroke="white" strokeWidth="1.4" fill="none" />
    <ellipse cx="12" cy="12" rx="10.5" ry="3.8" stroke="white" strokeWidth="1.4" fill="none" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10.5" ry="3.8" stroke="white" strokeWidth="1.4" fill="none" transform="rotate(120 12 12)" />
    <circle cx="12" cy="12" r="2" fill="white" />
  </svg>
);

const N8NIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" width="48" height="48">
    <path d="M21.4737 5.6842c-1.1772 0-2.1663.8051-2.4468 1.8947h-2.8955c-1.235 0-2.289.893-2.492 2.111l-.1038.623a1.263 1.263 0 0 1-1.246 1.0555H11.289c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947s-2.1663.8051-2.4467 1.8947H4.973c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947C1.1311 9.4737 0 10.6047 0 12s1.131 2.5263 2.5263 2.5263c1.1772 0 2.1663-.8051 2.4468-1.8947h1.4223c.2804 1.0896 1.2696 1.8947 2.4467 1.8947 1.1772 0 2.1663-.8051 2.4468-1.8947h1.0008a1.263 1.263 0 0 1 1.2459 1.0555l.1038.623c.203 1.218 1.257 2.111 2.492 2.111h.3692c.2804 1.0895 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263c-1.1772 0-2.1664.805-2.4468 1.8947h-.3692a1.263 1.263 0 0 1-1.246-1.0555l-.1037-.623A2.52 2.52 0 0 0 13.9607 12a2.52 2.52 0 0 0 .821-1.4794l.1038-.623a1.263 1.263 0 0 1 1.2459-1.0555h2.8955c.2805 1.0896 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263m0 1.2632a1.263 1.263 0 0 1 1.2631 1.2631 1.263 1.263 0 0 1-1.2631 1.2632 1.263 1.263 0 0 1-1.2632-1.2632 1.263 1.263 0 0 1 1.2632-1.2631M2.5263 10.7368A1.263 1.263 0 0 1 3.7895 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 1.2632 12a1.263 1.263 0 0 1 1.2631-1.2632m6.3158 0A1.263 1.263 0 0 1 10.1053 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 7.579 12a1.263 1.263 0 0 1 1.2632-1.2632m10.1053 3.7895a1.263 1.263 0 0 1 1.2631 1.2632 1.263 1.263 0 0 1-1.2631 1.2631 1.263 1.263 0 0 1-1.2632-1.2631 1.263 1.263 0 0 1 1.2632-1.2632" />
  </svg>
);

const NextJSIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" width="48" height="48">
    <path d="M11.572 0C5.179 0 0 5.178 0 11.571c0 6.394 5.179 11.572 11.572 11.572 2.657 0 5.11-.9 7.06-2.4l-7.486-10.24v6.284H9.43V8.569h2.28l6.84 9.342a11.52 11.52 0 0 0 2.022-6.34C20.572 5.178 15.393 0 11.572 0z" />
  </svg>
);

// Removed TS and AG per request

const VercelIcon = () => (
  <svg viewBox="0 0 24 21" fill="white" width="48" height="42">
    <path d="M12 0L24 21H0L12 0z" />
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" width="48" height="48">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const SupabaseIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" width="48" height="48">
    <path d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C.111 12.876.636 14 1.663 14H12.5v8.933c.015.986 1.26 1.41 1.874.637l9.262-11.653c.653-.826.128-1.95-.899-1.95H12.5V1.036z" />
  </svg>
);

const ZapierIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" width="48" height="48">
    <path d="M14.47 0H9.53L8.8 8.8 2.7 3.58 0 7.79l6.73 3.88a6.09 6.09 0 0 0 0 .66L0 16.21l2.7 4.21 6.1-5.22.73 8.8h4.94l.73-8.8 6.1 5.22L24 16.21l-6.73-3.88c0-.22.01-.44.01-.66L24 7.79 21.3 3.58l-6.1 5.22z" />
  </svg>
);

const PythonIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" width="48" height="48">
    <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.9S0 5.789 0 11.969c0 6.18 3.403 5.963 3.403 5.963h2.031v-2.868s-.109-3.403 3.35-3.403h5.766s3.24.052 3.24-3.13V3.13S18.28 0 11.914 0zm-3.21 1.809a1.044 1.044 0 1 1 0 2.088 1.044 1.044 0 0 1 0-2.088z" />
    <path d="M12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.007-2.752H12v-.826h8.121S24 18.211 24 12.031c0-6.18-3.403-5.963-3.403-5.963H18.566v2.868s.109 3.403-3.35 3.403H9.45s-3.24-.052-3.24 3.13v5.402S5.72 24 12.086 24zm3.21-1.809a1.044 1.044 0 1 1 0-2.088 1.044 1.044 0 0 1 0 2.088z" />
  </svg>
);

const LangChainIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" width="48" height="48">
    <path d="M6.0988 5.9175C2.7359 5.9175 0 8.6462 0 12s2.736 6.0825 6.0988 6.0825h11.8024C21.2641 18.0825 24 15.3538 24 12s-2.736-6.0825-6.0988-6.0825ZM5.9774 7.851c.493.0124 1.02.2496 1.273.6228.3673.4592.4778 1.0668.8944 1.4932.5604.6118 1.199 1.1505 1.7161 1.802.4892.5954.8386 1.2937 1.1436 1.9975.1244.2335.1257.5202.31.7197.0908.1204.5346.4483.4383.5645.0555.1204.4702.286.3263.4027-.1944.04-.4129.0476-.5616-.1074-.0549.126-.183.0596-.2819.0432a4 4 0 0 0-.025.0736c-.3288.0219-.5754-.3126-.732-.565-.3111-.168-.6642-.2702-.982-.446-.0182.2895.0452.6485-.231.8353-.014.5565.8436.0656.9222.4804-.061.0067-.1286-.0095-.1774.0373-.2239.2172-.4805-.1645-.7385-.007-.3464.174-.3808.3161-.8096.352-.0237-.0359-.0143-.0592.0059-.0811.1207-.1399.1295-.3046.3356-.3643-.2122-.0334-.3899.0833-.5686.1757-.2323.095-.2304-.2141-.5878.0164-.0396-.0322-.0208-.0615.0018-.0864.0908-.1107.2102-.127.345-.1208-.663-.3686-.9751.4507-1.2813.0432-.092.0243-.1265.1068-.1845.1652-.05-.0548-.0123-.1212-.0099-.1857-.0598-.028-.1356-.041-.1179-.1366-.1171-.0395-.1988.0295-.286.0952-.0787-.0608.0532-.1492.0776-.2125.0702-.1216.23-.025.3111-.1126.2306-.1308.552.0814.8155.0455.203.0255.4544-.1825.3526-.39-.2171-.2767-.179-.6386-.1839-.9695-.0268-.1929-.491-.4382-.6252-.6462-.1659-.1873-.295-.4047-.4243-.6182-.4666-.9008-.3198-2.0584-.9077-2.8947-.266.1466-.6125.0774-.8418-.119-.1238.1125-.1292.2598-.139.4161-.297-.2962-.2593-.8559-.022-1.1855.0969-.1302.2127-.2373.342-.3316.0292-.0213.0391-.0419.0385-.0747.1174-.5267.5764-.7391 1.0694-.7267m12.4071.46c.5575 0 1.0806.2159 1.474.6082s.61.9145.61 1.4704c0 .556-.2167 1.078-.61 1.4698v.0006l-.902.8995a2.08 2.08 0 0 1-.8597.5166l-.0164.0047-.0058.0164a2.05 2.05 0 0 1-.474.7308l-.9018.8995c-.3934.3924-.917.6083-1.4745.6083s-1.0806-.216-1.474-.6083c-.813-.8107-.813-2.1294 0-2.9402l.9019-.8995a2.056 2.056 0 0 1 .858-.5143l.017-.0053.0058-.0158a2.07 2.07 0 0 1 .4752-.7337l.9018-.8995c.3934-.3924.9171-.6083 1.4745-.6083zm0 .8965a1.18 1.18 0 0 0-.8388.3462l-.9018.8995a1.181 1.181 0 0 0-.3427.9252l.0053.0572c.0323.2652.149.5044.3374.6917.13.1296.2733.2114.4471.2686a.9.9 0 0 1 .014.1582.884.884 0 0 1-.2609.6304l-.0554.0554c-.3013-.1028-.5525-.253-.7794-.4792a2.06 2.06 0 0 1-.5761-1.0968l-.0099-.0578-.0461.0368a1.1 1.1 0 0 0-.0876.0794l-.9024.8995c-.4623.461-.4623 1.212 0 1.673.2311.2305.535.346.8394.3461.3043 0 .6077-.1156.8388-.3462l.9019-.8995c.4623-.461.4623-1.2113 0-1.673a1.17 1.17 0 0 0-.4367-.2749 1 1 0 0 1-.014-.1611c0-.2591.1023-.505.2901-.6923.3019.1028.57.2694.7962.495.3007.2999.4994.679.5756 1.0968l.0105.0578.0455-.0373a1.1 1.1 0 0 0 .0887-.0794l.902-.8996c.4622-.461.4628-1.2124 0-1.6735a1.18 1.18 0 0 0-.8395-.3462Zm-9.973 5.1567-.0006.0006c-.0793.3078-.1048.8318-.506.847-.033.1776.1228.2445.2655.1874.141-.0645.2081.0508.2557.1657.2177.0317.5394-.0725.5516-.3298-.325-.1867-.4253-.5418-.5662-.8709" />
  </svg>
);

const MakeIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" width="48" height="48">
    <path d="M13.38 3.498c-.27 0-.511.19-.566.465L9.85 18.986a.578.578 0 0 0 .453.678l4.095.826a.58.58 0 0 0 .682-.455l2.963-15.021a.578.578 0 0 0-.453-.678l-4.096-.826a.589.589 0 0 0-.113-.012zm-5.876.098a.576.576 0 0 0-.516.318L.062 17.697a.575.575 0 0 0 .256.774l3.733 1.877a.578.578 0 0 0 .775-.258l6.926-13.781a.577.577 0 0 0-.256-.776L7.762 3.658a.571.571 0 0 0-.258-.062zm11.74.115a.576.576 0 0 0-.576.576v15.426c0 .318.258.578.576.578h4.178a.58.58 0 0 0 .578-.578V4.287a.578.578 0 0 0-.578-.576Z" />
  </svg>
);

/* ══ Data ════════════════════════════════════════════════════════ */

interface Tool { name: string; bg: string; icon: React.ReactNode; }

const TILE_SIZE = 160;
const TILE_GAP = 12;

const ROW1: Tool[] = [
  { name: "OpenAI",      bg: "#a29bfe", icon: <OpenAIIcon /> }, 
  { name: "Claude",      bg: "#49C88B", icon: <ClaudeIcon /> }, 
  { name: "React",       bg: "#ff7675", icon: <ReactIcon /> },  
  { name: "Gemini",      bg: "#4285F4", icon: <GeminiIcon /> }, 
  { name: "n8n",         bg: "#fdcb6e", icon: <N8NIcon /> },    
  { name: "Next.js",     bg: "#6c5ce7", icon: <NextJSIcon /> }, 
  { name: "Supabase",    bg: "#636e72", icon: <SupabaseIcon /> }, 
  { name: "Python",      bg: "#0984e3", icon: <PythonIcon /> }, 
];

const ROW2: Tool[] = [
  { name: "GitHub",      bg: "#2d3436", icon: <GitHubIcon /> }, // Dark
  { name: "Vercel",      bg: "#00b894", icon: <VercelIcon /> }, // Green
  { name: "Python",      bg: "#0984e3", icon: <PythonIcon /> }, // Blue
  { name: "Zapier",      bg: "#e84393", icon: <ZapierIcon /> }, // Pink
  { name: "Supabase",    bg: "#636e72", icon: <SupabaseIcon /> }, // Gray
  { name: "LangChain",   bg: "#d63031", icon: <LangChainIcon /> }, // Red
  { name: "Make",        bg: "#223fa3", icon: <MakeIcon /> },    // Indigo
  { name: "Claude",      bg: "#49C88B", icon: <ClaudeIcon /> }, // Mint again
];

/* ══ GSAP Marquee Row ════════════════════════════════════════════ */

function useMarquee(
  trackRef: React.RefObject<HTMLDivElement | null>,
  direction: "left" | "right",
  duration: number
) {
  useGSAP(() => {
    const track = trackRef.current;
    if (!track) return;

    // 1. Create the base endless loop
    const timeline = gsap.timeline({
      repeat: -1,
      defaults: { ease: "none", force3D: true }
    });

    if (direction === "left") {
      timeline.to(track, {
        xPercent: -50,
        duration,
      });
    } else {
      gsap.set(track, { xPercent: -50 });
      timeline.to(track, {
        xPercent: 0,
        duration,
      });
    }

    // 2. Map scroll velocity to marquee timeScale (speed)
    // We want the marquee to "whirl" (up to 8x speed) and then smoothly "settle"
    ScrollTrigger.create({
      onUpdate: (self) => {
        const velocity = Math.abs(self.getVelocity());
        if (velocity > 10) {
          // Map velocity (approx 0-5000) to timeScale (1-8)
          const targetScale = 1 + (velocity / 600);
          gsap.to(timeline, { 
            timeScale: targetScale, 
            duration: 0.3, 
            ease: "power2.out",
            overwrite: true 
          });
        }
      }
    });

    // 3. Continuously "settle" back to 1.0 speed when not over-scrolling
    // Guard: skip entirely if already at rest (< 1.005) to avoid wasted RAF work
    const ticker = () => {
      const current = timeline.timeScale();
      // Dead-zone: if within 0.5% of 1.0, snap to exactly 1.0 and stop looping body
      if (current <= 1.005) {
        if (current !== 1) timeline.timeScale(1);
        return;
      }
      // Exponential decay: feels like genuine inertia
      timeline.timeScale(gsap.utils.interpolate(current, 1, 0.05));
    };
    
    gsap.ticker.add(ticker);

    return () => {
      gsap.ticker.remove(ticker);
      timeline.kill();
    };

  }, { scope: trackRef });
}

/* ══ Row Component ══════════════════════════════════════════════ */

const MarqueeRow = ({ tools, direction, duration }: { tools: Tool[]; direction: "left" | "right"; duration: number }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  
  // Duplicate for seamless loop
  const doubledTools = [...tools, ...tools];

  useMarquee(trackRef, direction, duration);

  return (
    <div className="w-full overflow-visible py-4 -my-4 relative z-10">
      <div 
        ref={trackRef} 
        className="flex" 
        style={{ width: "max-content", gap: `${TILE_GAP}px`, willChange: "transform" }}
      >
        {doubledTools.map((tool, i) => (
          <div
            key={`${tool.name}-${i}`}
            className="flex flex-col items-center justify-center shrink-0 cursor-default"
            style={{
              width: TILE_SIZE,
              height: TILE_SIZE,
              borderRadius: "32px",
              background: tool.bg,
              transition: "box-shadow 0.3s ease",
            }}
            onPointerEnter={(e) => {
              gsap.to(e.currentTarget, { 
                scale: 1.05, 
                boxShadow: "0 20px 40px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.2)",
                duration: 0.4, 
                ease: "back.out(1.5)",
                overwrite: "auto",
              });
            }}
            onPointerLeave={(e) => {
              gsap.to(e.currentTarget, { 
                scale: 1, 
                boxShadow: "0 0px 0px rgba(0,0,0,0), inset 0 0 0 0px rgba(255,255,255,0)",
                duration: 0.5, 
                ease: "power3.out",
                overwrite: "auto",
              });
            }}
          >
            <div className="flex items-center justify-center scale-110 pointer-events-none">
              {tool.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ══ Main Section ═══════════════════════════════════════════════ */

const MarqueeSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <div className="px-[12px] md:px-[20px] bg-transparent py-[6px]">
      <section 
        ref={sectionRef} 
        className="bg-[#000000] py-24 overflow-hidden relative rounded-[32px] md:rounded-[48px]"
        style={{ boxShadow: "0 0 0 1px rgba(100,200,255,0.06), 0 0 80px -10px rgba(50,170,255,0.10), 0 0 220px -40px rgba(0,140,255,0.05)" }}
      >
        {/* Edge Fades */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#000000] to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#000000] to-transparent z-20 pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 mb-16 relative z-10">
        <h2 
          className="text-white font-semibold leading-[1.1] tracking-tight"
          style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
        >
          Built with the best<br />
          <span className="text-white/30">AI ecosystem.</span>
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        {/* Row 1 - Left */}
        <MarqueeRow tools={ROW1} direction="left" duration={25} />
        
        {/* Row 2 - Right (Offset handled by direction start point) */}
        <MarqueeRow tools={ROW2} direction="right" duration={30} />
      </div>
    </section>
  </div>
  );
};

export default MarqueeSection;
