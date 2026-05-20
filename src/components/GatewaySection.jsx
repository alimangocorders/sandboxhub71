import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import collabimg from '../assets/images/image2.webp';
import gateaway from "../assets/images/gateway.mp4";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    id: "01",
    bg: "bg-blue-700",
    content:
      "In 2024, Google for Startups launched an exclusive program for Hub71 startups, offering technical mentorship, AI development resources and cloud computing credits, further strengthening Abu Dhabi's position as a global hub for AI innovation and ensuring founders have the tools they need to scale their ventures worldwide.",
  },
  {
    id: "02",
    bg: "bg-green-700",
    content:
      "We hosted a collaborative workshop with ADNOC, where ClimaTech startups gained direct insights into Abu Dhabi's regulatory landscape and pilot pitching strategies, empowering them to turn innovation into real-world impact through meaningful corporate partnerships.",
  },
  {
    id: "03",
    bg: "bg-blue-700",
    content:
      "Hub71 partnered with Microsoft to provide startups access to Azure cloud services, AI tools and global networks, enabling founders to build and scale next-generation solutions with enterprise-grade infrastructure and world-class technical support.",
  },
  {
    id: "04",
    bg: "bg-green-700",
    content:
      "Through our partnership with Abu Dhabi Global Market, startups benefit from streamlined regulatory pathways, sandboxed testing environments and direct access to one of the world's most progressive financial regulatory frameworks.",
  },
];

/* ─────────────────────────────────────────────
   DESKTOP variant  (≥ 768 px)
   Pinned-scroll, cards scroll up one by one
───────────────────────────────────────────── */
const DesktopGateway = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const rightRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const right = rightRef.current;

    const START_OFFSET = 300;
    const getScrollDistance = () => track.scrollHeight - right.offsetHeight;

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${getScrollDistance() + START_OFFSET}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const total = getScrollDistance() + START_OFFSET;
        const raw = self.progress * total;
        const offset = START_OFFSET - raw;
        gsap.set(track, { y: offset });

        const scrolled = Math.max(0, raw - START_OFFSET);
        const step = Math.min(
          Math.floor((scrolled / getScrollDistance()) * cards.length),
          cards.length - 1
        );
        setActiveStep(step);
      },
    });

    return () => st.kill();
  }, []);

  const goToStep = (index) => {
    const start = sectionRef.current.offsetTop;
    const track = trackRef.current;
    const right = rightRef.current;
    const distance =
      (index / (cards.length - 1)) *
      (track.scrollHeight - right.offsetHeight + 300);
    window.scrollTo({ top: start + distance, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-screen grid grid-cols-2 overflow-hidden bg-black font-['Poppins']"
    >
      {/* Background Video */}
      <video
        src={gateaway}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f1b] to-[#1a1f1b]/0 z-[1]" />
      <div className="absolute top-0 left-[68px] w-[1px] h-full bg-white/10 z-[1]" />

      {/* LEFT */}
      <div className="relative z-[2] flex flex-col justify-center pl-20 pr-14 h-full">
        <div className="mb-8 uppercase pl-[65px]">
          <span className="font-light text-[clamp(1.5rem,3vw,56px)] text-white block">
            Abu Dhabi:
          </span>
          <span className="text-[clamp(2.5rem,5vw,56px)] text-white block leading-none">
            Gateway to
            <br />
            the World
          </span>
        </div>

        {/* Dots */}
        <div className="flex items-center gap-[58px] mb-14 relative -translate-x-4 pl-[65px]">
          <div className="absolute h-[1px] w-[1000px] bg-gradient-to-r from-white/10 to-transparent left-[65px] z-[-1]" />
          {cards.map((_, i) => (
            <span
              key={i}
              onClick={() => goToStep(i)}
              className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                activeStep === i
                  ? "bg-[#00b0f5] scale-[1.3]"
                  : "bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        <h2 className="font-bold text-[clamp(1rem,1.8vw,28px)] uppercase text-white mb-5 max-w-[930px] leading-[110%] pl-[65px]">
          Partnering with leaders in tech and regulatory infrastructure
        </h2>

        <p className="text-white font-light pl-[65px] leading-relaxed text-[clamp(0.85rem,1.1vw,1rem)]">
          Innovation thrives where advanced technology meets progressive
          regulation. Startups need an environment that supports smooth market
          entry, compliance and integration into the wider economy. A key
          strength of Hub71 is its collaboration with global tech leaders and
          providing startups access to mentorship, funding and critical resources
          to accelerate growth and scale internationally.
        </p>
      </div>

      {/* RIGHT – animated card stack */}
      <div
        ref={rightRef}
        className="relative z-[2] h-full flex flex-col justify-center items-end px-10 xl:px-24 py-20 overflow-hidden"
      >
        <div
          ref={trackRef}
          className="flex flex-col gap-6 w-full max-w-[420px] will-change-transform"
          style={{ transform: "translateY(300px)" }}
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className={`w-full shrink-0 px-8 xl:px-12 py-9 xl:py-11 flex flex-col justify-between min-h-[200px] xl:min-h-[220px] relative overflow-hidden cursor-default transition-opacity duration-500 ${card.bg} ${
                activeStep === index ? "opacity-100" : "opacity-40"
              }`}
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
  );
};

/* ─────────────────────────────────────────────
   MOBILE variant  (< 768 px) - PERFECTED FOR 350PX SCREENS
   Uses responsive, adaptive dynamic padding blocks 
   to completely eliminate text truncation or hidden heights.
───────────────────────────────────────────── */
const MobileGateway = () => {
  const [activeStep, setActiveStep] = useState(0);
  const cardRefs = useRef([]);

  /* Observe each card item tracking state changes */
  useEffect(() => {
    const observers = [];

    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveStep(i);
        },
        { 
          rootMargin: "-25% 0px -25% 0px", // Expand intersection thresholds for compact screen heights
          threshold: 0.2
        }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollToCard = (index) => {
    cardRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="relative bg-[#1a1f1b] font-['Poppins'] w-full h-auto flex flex-col overflow-x-hidden">
      
      {/* FIXED CONTAINER: Adaptive Sticky Video Header Frame */}
      <div className="sticky top-0 z-0 w-full h-[40vh] min-h-[260px] xs:min-h-[280px] overflow-hidden shrink-0">
        <video
          src={gateaway}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f1b] via-[#1a1f1b]/50 to-black/40 z-[1]" />
        <div className="absolute top-0 left-4 xs:left-6 w-[1px] h-full bg-white/10 z-[1]" />
      </div>

      {/* FLOATING BLOCK INTERPOLATION: Text Content Wrapper */}
      <div className="relative z-10 w-full bg-[#1a1f1b] px-4 xs:px-6 pt-6 pb-4 box-border">
        <div className="mb-4 uppercase pl-4 xs:pl-6">
          <span className="font-light text-[18px] xs:text-[22px] tracking-tight text-white block">
            Abu Dhabi:
          </span>
          <span className="text-[28px] xs:text-[34px] font-medium text-white block leading-tight mt-0.5">
            Gateway to<br />the World
          </span>
        </div>

        <h2 className="font-bold text-[13px] xs:text-[15px] uppercase text-white mb-3 leading-snug pl-4 xs:pl-6">
          Partnering with leaders in tech and regulatory infrastructure
        </h2>

        <p className="text-white/75 font-light leading-relaxed text-[11px] xs:text-[12px] max-w-full pl-4 xs:pl-6">
          Innovation thrives where advanced technology meets progressive
          regulation. Hub71 collaborates with global tech leaders to give
          startups access to mentorship, funding and critical resources.
        </p>

        {/* Dynamic Nav Indicators */}
        <div className="flex items-center flex-wrap gap-4 mt-5 pl-4 xs:pl-6">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToCard(i)}
              aria-label={`Go to card ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeStep === i ? "bg-[#00b0f5] scale-[1.4]" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* FLOATING BLOCK INTERPOLATION: Card Navigation List Strip */}
      <div className="relative z-10 w-full bg-[#1a1f1b] px-4 xs:px-6 pt-4 pb-20 flex flex-col gap-4 box-border">
        {cards.map((card, index) => (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            className={`
              w-full max-w-[480px] mx-auto
              px-5 py-6 flex flex-col justify-between
              min-h-[170px] relative overflow-hidden rounded-sm
              transition-all duration-500 ease-out
              ${card.bg}
              ${activeStep === index ? "opacity-100 scale-100" : "opacity-35 scale-[0.97]"}
            `}
          >
            <p className="text-[12px] xs:text-[13px] leading-relaxed text-white font-light flex-1">
              {card.content}
            </p>
            <div className="font-['Bebas_Neue'] text-[1.1rem] tracking-widest text-white/50 mt-4 flex items-center gap-3">
              {card.id}
              <div className="flex-1 h-[1px] bg-white/20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Root – picks variant based on window width
───────────────────────────────────────────── */
const GatewaySection = () => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <MobileGateway /> : <DesktopGateway />;
};

export default GatewaySection;