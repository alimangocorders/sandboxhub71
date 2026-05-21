import React, { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gateaway from "../assets/images/gateway.mp4";

gsap.registerPlugin(ScrollTrigger);

const CARDS_DATA = [
  {
    id: "01",
    bg: "bg-blue-700",
    content: "In 2024, Google for Startups launched an exclusive program for Hub71 startups, offering technical mentorship, AI development resources and cloud computing credits, further strengthening Abu Dhabi's position as a global hub for AI innovation and ensuring founders have the tools they need to scale their ventures worldwide.",
  },
  {
    id: "02",
    bg: "bg-green-700",
    content: "We hosted a collaborative workshop with ADNOC, where ClimaTech startups gained direct insights into Abu Dhabi's regulatory landscape and pilot pitching strategies, empowering them to turn innovation into real-world impact through meaningful corporate partnerships.",
  },
  {
    id: "03",
    bg: "bg-blue-700",
    content: "Hub71 partnered with Microsoft to provide startups access to Azure cloud services, AI tools and global networks, enabling founders to build and scale next-generation solutions with enterprise-grade infrastructure and world-class technical support.",
  },
  {
    id: "04",
    bg: "bg-green-700",
    content: "Through our partnership with Abu Dhabi Global Market, startups benefit from streamlined regulatory pathways, sandboxed testing environments and direct access to one of the world's most progressive financial regulatory frameworks.",
  },
];

export default function GatewaySection() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  
  const [activeStep, setActiveStep] = useState(0);

  // OPTIMIZATION 1: Atomic state throttle control tracking to protect React context lifecycles
  const activeStepRef = useRef(0);
  const updateStepState = (newStep) => {
    if (activeStepRef.current !== newStep) {
      activeStepRef.current = newStep;
      setActiveStep(newStep);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // OPTIMIZATION 2: Single structural responsive media configuration tracking loop
      ScrollTrigger.matchMedia({
        // DESKTOP SYSTEM LAYOUT TIMELINES
        "(min-width: 768px)": () => {
          const track = trackRef.current;
          const cards = cardRefs.current;
          if (!track) return;

          const totalScrollDistance = track.scrollHeight - (window.innerHeight * 0.6);

          // Native translation layout animations
          gsap.fromTo(track, 
            { y: "300px" },
            {
              y: () => `-${totalScrollDistance}px`,
              ease: "none",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: () => `+=${totalScrollDistance + 600}`,
                pin: true,
                scrub: 0.5, // Reduced lag buffer delay timings
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                  const currentProgress = self.progress;
                  const targetStep = Math.min(
                    Math.floor(currentProgress * CARDS_DATA.length),
                    CARDS_DATA.length - 1
                  );
                  updateStepState(targetStep);
                }
              }
            }
          );

          // Clean card focus fade configurations running entirely on the GPU thread
          cards.forEach((card, idx) => {
            if (!card) return;
            gsap.fromTo(card, 
              { opacity: 0.4 },
              {
                opacity: 1,
                scrollTrigger: {
                  trigger: containerRef.current,
                  start: () => `top+=${(idx * (totalScrollDistance / CARDS_DATA.length))} top`,
                  end: () => `top+=${((idx + 1) * (totalScrollDistance / CARDS_DATA.length))} top`,
                  scrub: true,
                  toggleActions: "play reverse play reverse",
                }
              }
            );
          });
        },

        // MOBILE VARIANT INTERSECTION OBSERVERS BOUND INSIDE SYSTEM PARALLAX MECHANICS
        "(max-width: 767px)": () => {
          const mobileCards = cardRefs.current;
          const observers = [];

          mobileCards.forEach((el, i) => {
            if (!el) return;
            const obs = new IntersectionObserver(
              ([entry]) => {
                if (entry.isIntersecting) updateStepState(i);
              },
              { rootMargin: "-30% 0px -30% 0px", threshold: 0.1 }
            );
            obs.observe(el);
            observers.push(obs);
          });

          return () => observers.forEach((o) => o.disconnect());
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Smooth layout anchors triggering native target position mappings
  const handleScrollToStep = (index) => {
    if (window.innerWidth >= 768) {
      const st = ScrollTrigger.getById(containerRef.current);
      if (!st) {
        // Fallback smooth native transitions if tracking hooks fail on initial state passes
        cardRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
      const scrollPosition = st.start + (index / (CARDS_DATA.length - 1)) * (st.end - st.start);
      window.scrollTo({ top: scrollPosition, behavior: "smooth" });
    } else {
      cardRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full bg-black font-['Poppins'] select-none overflow-x-hidden">
      
      {/* ─── DESKTOP VIEW SYSTEM GRID ─── */}
      <section className="hidden md:grid relative h-screen grid-cols-2 overflow-hidden">
        <video
          src={gateaway}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f1b] to-[#1a1f1b]/0 z-[1]" />
        <div className="absolute top-0 left-[68px] w-[1px] h-full bg-white/10 z-[1]" />

        {/* LEFT INFRASTRUCTURE DETAILS CONTAINER */}
        <div className="relative z-[2] flex flex-col justify-center pl-20 pr-14 h-full">
          <div className="mb-8 uppercase pl-[65px]">
            <span className="font-light text-[clamp(1.5rem,3vw,56px)] text-white block">Abu Dhabi:</span>
            <span className="text-[clamp(2.5rem,5vw,56px)] text-white block leading-none">Gateway to<br />the World</span>
          </div>

          {/* DOT NAVIGATION LINE */}
          <div className="flex items-center gap-[58px] mb-14 relative -translate-x-4 pl-[65px]">
            <div className="absolute h-[1px] w-[1000px] bg-gradient-to-r from-white/10 to-transparent left-[65px] z-[-1]" />
            {CARDS_DATA.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleScrollToStep(i)}
                aria-label={`Jump directly to data section panel slide sequence ${i + 1}`}
                className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 outline-none ${
                  activeStep === i ? "bg-[#00b0f5] scale-[1.3]" : "bg-white/25 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          <h2 className="font-bold text-[clamp(1rem,1.8vw,28px)] uppercase text-white mb-5 max-w-[930px] leading-[110%] pl-[65px]">
            Partnering with leaders in tech and regulatory infrastructure
          </h2>
          <p className="text-white font-light pl-[65px] leading-relaxed text-[clamp(0.85rem,1.1vw,1rem)] text-white/80">
            Innovation thrives where advanced technology meets progressive regulation. Startups need an environment that supports smooth market entry, compliance and integration into the wider economy. A key strength of Hub71 is its collaboration with global tech leaders and providing startups access to mentorship, funding and critical resources to accelerate growth and scale internationally.
          </p>
        </div>

        {/* RIGHT CARDS SCROLL TRACK STACK */}
        <div className="relative z-[2] h-full flex flex-col justify-center items-end px-10 xl:px-24 py-20 overflow-hidden">
          <div ref={trackRef} className="flex flex-col gap-6 w-full max-w-[420px] will-change-transform">
            {CARDS_DATA.map((card, idx) => (
              <div
                key={`desktop-${card.id}`}
                ref={(el) => (cardRefs.current[idx] = el)}
                className={`w-full shrink-0 px-8 xl:px-12 py-9 xl:py-11 flex flex-col justify-between min-h-[200px] xl:min-h-[220px] relative overflow-hidden cursor-default transition-opacity duration-300 ${card.bg}`}
              >
                <p className="text-[0.88rem] xl:text-[0.93rem] leading-[1.72] text-white/90 font-light flex-1">
                  {card.content}
                </p>
                <div className="font-['Bebas_Neue'] text-[1.4rem] tracking-widest text-white/50 mt-7 flex items-center gap-4">
                  {card.id}
                  <div className="flex-1 h-[1px] bg-white/20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MOBILE VIEW SYSTEM STROLL LIST ─── */}
      <section className="block md:hidden relative w-full h-auto flex flex-col bg-[#1a1f1b]">
        {/* FIXED HEADER VIDEO STICKY NODE */}
        <div className="sticky top-0 z-0 w-full h-[40vh] min-h-[260px] overflow-hidden">
          <video src={gateaway} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f1b] via-[#1a1f1b]/50 to-black/40 z-[1]" />
          <div className="absolute top-0 left-4 w-[1px] h-full bg-white/10 z-[1]" />
        </div>

        {/* MOBILE OVERVIEW TEXT */}
        <div className="relative z-10 w-full bg-[#1a1f1b] px-4 pt-6 pb-4">
          <div className="mb-4 uppercase pl-4">
            <span className="font-light text-[18px] tracking-tight text-white block">Abu Dhabi:</span>
            <span className="text-[28px] font-medium text-white block leading-tight mt-0.5">Gateway to<br />the World</span>
          </div>
          <h2 className="font-bold text-[13px] uppercase text-white mb-3 leading-snug pl-4">
            Partnering with leaders in tech and regulatory infrastructure
          </h2>
          <p className="text-white/75 font-light leading-relaxed text-[11px] max-w-full pl-4">
            Innovation thrives where advanced technology meets progressive regulation. Hub71 collaborates with global tech leaders to give startups access to mentorship, funding and critical resources.
          </p>

          {/* INDICATORS ROW */}
          <div className="flex items-center flex-wrap gap-4 mt-5 pl-4">
            {CARDS_DATA.map((_, i) => (
              <button
                key={`dot-${i}`}
                type="button"
                onClick={() => handleScrollToStep(i)}
                aria-label={`Go to section slide card item ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-all duration-300 outline-none ${
                  activeStep === i ? "bg-[#00b0f5] scale-[1.4]" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* MOBILE CARD ACCORDION STACK STRIP */}
        <div className="relative z-10 w-full bg-[#1a1f1b] px-4 pt-4 pb-20 flex flex-col gap-4">
          {CARDS_DATA.map((card, idx) => (
            <div
              key={`mobile-${card.id}`}
              ref={(el) => {
                if (window.innerWidth < 768) cardRefs.current[idx] = el;
              }}
              className={`w-full max-w-[480px] mx-auto px-5 py-6 flex flex-col justify-between min-h-[170px] relative overflow-hidden rounded-sm transition-all duration-500 ease-out ${
                card.bg
              } ${activeStep === idx ? "opacity-100 scale-100" : "opacity-35 scale-[0.97]"}`}
            >
              <p className="text-[12px] leading-relaxed text-white font-light flex-1">
                {card.content}
              </p>
              <div className="font-['Bebas_Neue'] text-[1.1rem] tracking-widest text-white/50 mt-4 flex items-center gap-3">
                {card.id}
                <div className="flex-1 h-[1px] bg-white/20" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}