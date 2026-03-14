"use client";

import React from "react";
import AboutHero from "@/components/sections/AboutHero";
import AboutWorkflow from "@/components/sections/AboutWorkflow";
import TeamCTA from "@/components/sections/TeamCTA";
import Footer from "@/components/sections/Footer";

export default function AboutPage() {
  return (
    <main className="bg-[#f2f2f2] min-h-screen">
      <AboutHero />
      <AboutWorkflow />
      <TeamCTA />
      <Footer />
    </main>
  );
}
