import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import LenisProvider from "@/components/common/LenisProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import PageTransition from "@/components/providers/PageTransition";

const tomatoGrotesk = localFont({
  src: [
    {
      path: "../../public/fonts/TomatoGrotesk-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/TomatoGrotesk-ExtraLight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/TomatoGrotesk-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/TomatoGrotesk-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/TomatoGrotesk-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/TomatoGrotesk-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/TomatoGrotesk-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/TomatoGrotesk-ExtraBold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/TomatoGrotesk-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-tomato-grotesk",
});

export const metadata: Metadata = {
  title: "Amalby | AI Implementation Agency — EU, UK & UAE",
  description: "Amalby builds AI automations, custom agents, and web products for businesses in the EU, UK, and UAE. Custom work only — no templates, no packages.",
  other: {
    "color-scheme": "light",
  },
};

const NoiseGrain = () => (
  // Pure SVG noise, rendered once. Absolutely zero JS execution, zero layout shift.
  // pointer-events-none prevents clicking, z-50 puts it over everything.
  // mix-blend-mode: overlay ensures it textures light and dark areas naturally.
  <div 
    className="pointer-events-none fixed inset-0 z-[999] h-full w-full opacity-[0.035] mix-blend-overlay"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    }}
  />
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload the hero background GIF — eliminates the blank first-paint frame
            while the image downloads (it's large, so this matters a lot for LCP) */}
        <link rel="preload" href="/hero-bg.gif" as="image" type="image/gif" />
      </head>
      <body className={`${tomatoGrotesk.variable} font-tomato-grotesk antialiased`}>
        <LenisProvider>
          <PageTransition>
            <CustomCursor />
            <NoiseGrain />
            <Navbar />
            {children}
          </PageTransition>
        </LenisProvider>
      </body>
    </html>
  );
}
