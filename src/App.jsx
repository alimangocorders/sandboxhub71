import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Hero from "./components/Hero";
import Nav from "./components/Nav";
import ImpactReport from "./components/ImpactReport";
import ProgressSection from "./components/ProgressSection";
import Sectors from "./components/Sectors";
import Programs from "./components/programs";
import GrowthSection from "./components/GrowthSection";
import GatewaySection from "./components/GatewaySection";
import CollabSection from "./components/CollabSection";
import EmpowerSection from "./components/EmpowerSection";
import KnowledgeBuilding from "./components/KnowledgeBuilding";
import Footer from "./components/Footer";
import LeadSlider from "./components/LeadSlider";
import ImpactSection from "./components/ImpactSection";
import BusinessSection from "./components/BusinessSection";
import HubSection from "./components/HubSection";
import DeliveringImpact from "./components/DeliveringImpact";

// ─────────────────────────────────────────────────────────────
// REGISTER GSAP PLUGINS ONLY ONCE
// ─────────────────────────────────────────────────────────────
gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────
// GLOBAL SCROLLTRIGGER CONFIG
// ─────────────────────────────────────────────────────────────
ScrollTrigger.defaults({
  ignoreMobileResize: true,
  preventOverlaps: true,
});

// 🔥 VERY IMPORTANT
// Helps prevent pin jumping / overlap glitches
ScrollTrigger.normalizeScroll(true);

const App = () => {
  useEffect(() => {
    // 🔥 ONLY ONE REFRESH
    // Multiple refreshes were causing layout recalculations
    // while scrolling between pinned sections

    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <>
      <Nav />

      <Hero />

      <ImpactReport />

      <LeadSlider />
      
      <ImpactSection />

      <BusinessSection />

      <HubSection />

      <DeliveringImpact />

      <ProgressSection />

      <Sectors />

      <Programs />

      <GrowthSection />

      <GatewaySection />

      <CollabSection />

      <EmpowerSection />

      <KnowledgeBuilding />

      <Footer />
    </>
  );
};

export default App;