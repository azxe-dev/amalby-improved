import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import LenisProvider from "@/components/common/LenisProvider";
import CustomCursor from "@/components/ui/CustomCursor";

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
  title: "Amalby | AI Implementation Agency",
  description: "Boutique AI agency specializing in AI implementation, AI Agents, and Web Development for SMBs.",
  other: {
    "color-scheme": "light",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${tomatoGrotesk.variable} font-tomato-grotesk antialiased`}>
        <LenisProvider>
          <CustomCursor />
          <Navbar />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
