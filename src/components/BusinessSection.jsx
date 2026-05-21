import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import businessimg from "../assets/images/business-img.webp";

// ─── DATA (Moved outside component to prevent garbage collection sweeps) ─────
const sliderData = {
  0: [
    { title: "Hub71 onboarded Saudi Awwal Bank (SAB) as market partner", date: "JAN" },
    { title: "Shorooq Capital won the Sheikh Khalifa Excellence Award.", date: "FEB" },
    { title: "Hub71 entered a strategic partnership with Borouge", date: "MAR" },
    { title: "Jasoor Ventures onboarded as Hub71 capital partner", date: "MAR" },
    { title: "Hub71 partnered with NVIDIA to provide startups with access to the NVIDIA Inception Programme", date: "MAR" },
    { title: "Hub71 joined Abu Dhabi's HELM cluster to advance HealthTech and Life Sciences innovation", date: "APR" },
    { title: "Hub71 partnered with Yas Investments to strengthen Tech Barza's role in connecting family offices with startups", date: "MAY" },
    { title: "Hub71 and JETRO signed a partnership to connect Japanese startups with Abu Dhabi's ecosystem", date: "MAY" },
    { title: "Stryde acquired Qora71 forming Stryde71 and strengthening early-stage capital formation in Abu Dhabi", date: "JUN" },
    { title: "Hub71 partnered with ADGM, TII and ASPIRE to launch UAE's first quantum-secure communications testbed", date: "AUG" },
    { title: "Hub71 joined the Presight AI-Startup Accelerator as a strategic partner", date: "AUG" },
    { title: "National Founders Programme was launched in partnership with Mubadala and Antler", date: "SEP" },
    { title: "Hub71 partnered with NJ Economic Development Authority to unlock cross-border expansion opportunities", date: "OCT" },
    { title: "Hub71 partnered with Numou to unlock SME access to funding", date: "OCT" },
    { title: "Hub71 partnered with Emirates Growth Fund to strengthen the UAE's economy", date: "DEC" },
  ],
  1: [
    { title: "Basetwo advanced industrial AI to scale physics-based manufacturing intelligence", date: "JAN" },
    { title: "Bluewhale secured $100 million to expand multichain infrastructure", date: "JAN" },
    { title: "Mamotest secured a $1.6 million investment from Philips Foundation", date: "JAN" },
    { title: "BioTwin partnered with Cleveland Clinic Abu Dhabi and Microsoft to advance AI-breast cancer screening", date: "JAN" },
    { title: "44.01 secured an additional $4.9 million in Series A funding", date: "FEB" },
    { title: "Seez was acquired by UK-based Pinewood AI for $46.2 million", date: "FEB" },
    { title: "25 Hub71 startups were named among the Future 100 at Investopia 2025", date: "FEB" },
    { title: "NymCard raised $33 million in Series B round", date: "APR" },
    { title: "Thndr raised $15.7 million", date: "MAY" },
    { title: "Fuze secured $12.3 million in a Series A funding round", date: "MAY" },
    { title: "Bit2Me raised $34.7 million, with Tether Ventures taking a strategic stake", date: "AUG" },
    { title: "Clarity raised $12 million to scale AI-powered enterprise solutions", date: "SEP" },
    { title: "KingPin raised $3.5 million to scale AI-driven revenue intelligence", date: "NOV" },
    { title: "Planys raised $12 million to scale subsea intelligence", date: "DEC" },
    { title: "Syd Life AI secured a $1 billion commitment to advance preventive healthcare", date: "DEC" },
  ],
  2: [
    { title: "Hub71 onboarded 27 startups as part of Cohort 16", date: "FEB" },
    { title: "Hub71 sponsored Step Conference Dubai", date: "FEB" },
    { title: "Hub71 joined the Abu Dhabi Investment Forums in Beijing and Shanghai", date: "FEB" },
    { title: "Hub71 joined an Abu Dhabi delegation to Hong Kong and China", date: "MAR" },
    { title: "28 Hub71 startups joined Google for Startups Accelerator Programme", date: "MAY" },
    { title: "Hub71 joined the Abu Dhabi Investment Forum in Tokyo", date: "MAY" },
    { title: "Hub71 showcased Abu Dhabi's innovation ecosystem at SusHi Tech Tokyo", date: "MAY" },
    { title: "Abu Dhabi's startup ecosystem ranked 3rd in MENA in Startup Genome's Global Report", date: "JUN" },
    { title: "Hub71 attended VivaTech in Paris", date: "JUN" },
    { title: "Hub71 onboarded 26 startups as part of Cohort 17", date: "SEP" },
    { title: "Hub71 attended Climate Week NYC", date: "SEP" },
    { title: "Hub71+ AI expanded with 16 new partners", date: "OCT" },
    { title: "Hub71 launched Hub71+ Life Sciences with 12 partners", date: "OCT" },
    { title: "Hub71 participated at Web Summit with startups and partners", date: "NOV" },
    { title: "Hub71 delivered ADFW Activate on the sidelines of Abu Dhabi Finance Week", date: "DEC" },
  ],
};

const MAX_VISIBLE = 7;
const CARD_W = 228;
const STEP_X = 250;
const CURVE_DEPTH = 340;
const EDGE_INSET = 150;
const ANIM_SPEED = 500;

function getSlotStyle(i, actualVisible, cx, cy, startX) {
  let x = startX + i * STEP_X;
  if (i === 0) x += EDGE_INSET;
  else if (i === actualVisible - 1) x -= EDGE_INSET;
  else if (i < 0) x += EDGE_INSET;
  else if (i >= actualVisible) x -= EDGE_INSET;
  const progress = actualVisible > 1 ? (i / (actualVisible - 1)) * 2 - 1 : 0;
  const y = cy - Math.pow(progress, 2) * CURVE_DEPTH;
  const zIndex = Math.round((1 - Math.abs(progress)) * 100);
  const opacity = i < 0 || i >= actualVisible ? 0 : 1;
  return { x, y, zIndex, opacity };
}

const ArrowLeft = React.memo(({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
));

const ArrowRight = React.memo(({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
));

const tabs = [
  { label: (<>building<br />partnerships</>) },
  { label: (<>startup<br />successes</>) },
  { label: (<>ecosystems, programs &<br />initiatives</>) },
];

// ─── DESKTOP SLIDER ──────────────────────────────────────────────────────────
const DesktopSlider = React.memo(({ activeTab }) => {
  const [startIndex, setStartIndex] = useState(0);
  const animatingRef = useRef(false);
  const containerRef = useRef(null);
  const [dims, setDims] = useState({ w: 1200, h: 700 });

  useEffect(() => {
    let timeoutId = null;
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setDims({ w: width || 1200, h: height || 700 });
      }, 40);
    });

    if (containerRef.current) resizeObserver.observe(containerRef.current);
    return () => {
      resizeObserver.disconnect();
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => { setStartIndex(0); }, [activeTab]);

  const data = useMemo(() => sliderData[activeTab] || [], [activeTab]);
  const actualVisible = Math.min(data.length, MAX_VISIBLE);
  const maxStart = Math.max(0, data.length - actualVisible);
  const cx = dims.w / 2;
  const cy = dims.h - 320;
  const totalLayoutWidth = Math.max(0, (actualVisible - 1) * STEP_X) + CARD_W;
  const startX = cx - totalLayoutWidth / 2;

  const visibleCards = useMemo(() => {
    return Array.from({ length: actualVisible }, (_, i) => {
      const dataIndex = (startIndex + i) % data.length;
      return { ...data[dataIndex], slot: i };
    });
  }, [startIndex, data, actualVisible]);

  const moveNext = useCallback(() => {
    if (animatingRef.current || startIndex >= maxStart) return;
    animatingRef.current = true;
    setStartIndex((s) => s + 1);
    setTimeout(() => { animatingRef.current = false; }, ANIM_SPEED);
  }, [startIndex, maxStart]);

  const movePrev = useCallback(() => {
    if (animatingRef.current || startIndex <= 0) return;
    animatingRef.current = true;
    setStartIndex((s) => s - 1);
    setTimeout(() => { animatingRef.current = false; }, ANIM_SPEED);
  }, [startIndex]);

  return (
    <>
      <button className="bs-nav-btn prev" onClick={movePrev} disabled={startIndex <= 0} aria-label="Previous slide">
        <ArrowLeft />
      </button>
      <button className="bs-nav-btn next" onClick={moveNext} disabled={startIndex >= maxStart} aria-label="Next slide">
        <ArrowRight />
      </button>
      <div ref={containerRef} className="bs-slider" style={{ backgroundImage: `url(${businessimg})` }}>
        {visibleCards.map((card, i) => {
          const s = getSlotStyle(card.slot, actualVisible, cx, cy, startX);
          const isLast = i === visibleCards.length - 1;
          return (
            <div
              key={`${activeTab}-${card.title}-${i}`}
              className={`bs-card${isLast ? " last" : ""}`}
              style={{
                transform: `translate3d(${s.x}px, ${s.y}px, 0)`,
                zIndex: s.zIndex,
                opacity: s.opacity,
              }}
            >
              <p>{card.title}</p>
              <span className="bs-card-date">{card.date}</span>
            </div>
          );
        })}
      </div>
    </>
  );
});

// ─── MOBILE SWIPER ────────────────────────────────────────────────────────────
const MobileSwiper = React.memo(({ activeTab, cardsPerView }) => {
  const data = useMemo(() => sliderData[activeTab] || [], [activeTab]);
  const totalPages = Math.ceil(data.length / cardsPerView);
  const [page, setPage] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const isHorizRef = useRef(null);
  const trackRef = useRef(null);
  const widthRef = useRef(350);

  useEffect(() => { 
    setPage(0); 
    setDragOffset(0); 
    if (trackRef.current) {
      widthRef.current = trackRef.current.offsetWidth || 350;
    }
  }, [activeTab, cardsPerView]);

  const goToPage = useCallback((p) => {
    const clamped = Math.max(0, Math.min(p, totalPages - 1));
    setPage(clamped);
    setDragOffset(0);
  }, [totalPages]);

  const onTouchStart = (e) => {
    startXRef.current = e.touches[0].clientX;
    startYRef.current = e.touches[0].clientY;
    isHorizRef.current = null;
    setIsDragging(true);
  };
  
  const onTouchMove = (e) => {
    if (!isDragging) return;
    const dx = e.touches[0].clientX - startXRef.current;
    const dy = e.touches[0].clientY - startYRef.current;
    if (isHorizRef.current === null) {
      isHorizRef.current = Math.abs(dx) > Math.abs(dy);
    }
    if (isHorizRef.current) { 
      if (e.cancelable) e.preventDefault();
      setDragOffset(dx); 
    }
  };
  
  const onTouchEnd = () => {
    setIsDragging(false);
    const threshold = 60;
    if (dragOffset < -threshold) goToPage(page + 1);
    else if (dragOffset > threshold) goToPage(page - 1);
    else setDragOffset(0);
    isHorizRef.current = null;
  };

  const onMouseDown = (e) => { startXRef.current = e.clientX; setIsDragging(true); };
  const onMouseMove = (e) => { if (!isDragging) return; setDragOffset(e.clientX - startXRef.current); };

  const translateX = -(page * 100) + (dragOffset / widthRef.current) * 100;
  const slideWidthPct = 100 / cardsPerView;
  const firstCardOnPage = page * cardsPerView + 1;
  const lastCardOnPage = Math.min((page + 1) * cardsPerView, data.length);

  return (
    <div className="ms-root">
      <div className="ms-bg" style={{ backgroundImage: `url(${businessimg})` }} />
      <div className="ms-overlay" />

      <div
        ref={trackRef}
        className="ms-track-wrapper"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onTouchEnd}
        onMouseLeave={onTouchEnd}
      >
        <div
          className="ms-track"
          style={{
            transform: `translate3d(${translateX}%, 0, 0)`,
            transition: isDragging ? "none" : "transform 420ms cubic-bezier(0.25,1,0.5,1)",
            cursor: isDragging ? "grabbing" : "grab",
          }}
        >
          {data.map((card, i) => (
            <div
              key={`${activeTab}-${card.title}-${i}`}
              className="ms-slide"
              style={{ flex: `0 0 ${slideWidthPct}%`, width: `${slideWidthPct}%` }}
            >
              <div className="ms-card">
                <div className="ms-card-top-accent" />
                <div className="ms-card-month">{card.date}</div>
                <p className="ms-card-text">{card.title}</p>
                <div className="ms-card-bottom-accent" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="ms-arrows">
        <button className="ms-arrow-btn" onClick={() => goToPage(page - 1)} disabled={page === 0} aria-label="Previous page">
          <ArrowLeft size={18} />
        </button>

        {/* ACCESSIBILITY FIX: Applied expanded hitboxes onto interactive dot controls */}
        <div className="ms-dots" role="tablist" aria-label="Slideshow pagination tracks">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === page}
              onClick={() => goToPage(i)}
              aria-label={`Go to section page ${i + 1}`}
              className={`ms-dot-container ${i === page ? "active" : ""}`}
            >
              <span className="ms-dot-visual" />
            </button>
          ))}
        </div>

        <button className="ms-arrow-btn" onClick={() => goToPage(page + 1)} disabled={page === totalPages - 1} aria-label="Next page">
          <ArrowRight size={18} />
        </button>
      </div>

      <div className="ms-counter">
        <span className="ms-counter-current">
          {cardsPerView > 1
            ? `${String(firstCardOnPage).padStart(2,"0")}–${String(lastCardOnPage).padStart(2,"0")}`
            : String(firstCardOnPage).padStart(2,"0")}
        </span>
        <span className="ms-counter-sep"> / </span>
        <span className="ms-counter-total">{String(data.length).padStart(2,"0")}</span>
      </div>
    </div>
  );
});

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function BusinessSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [layout, setLayout] = useState("desktop");

  useEffect(() => {
    const getLayout = () => {
      const width = window.innerWidth;
      if (width >= 768) return "desktop";
      if (width >= 576) return "two";
      return "one";
    };
    
    setLayout(getLayout());

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setLayout(getLayout());
      }, 60); 
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <>
      <style>{`
        .bs-section {
          background: rgba(26,30,32,1);
          padding-top: clamp(60px,10vw,192px);
          position: relative;
          font-family: 'Poppins', sans-serif;
          min-height: 100vh;
          overflow: hidden;
        }
        .bs-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 clamp(12px,3vw,20px);
        }

        /* ACCESSIBILITY FIX: Increased label base contrast against dark/light grey patterns */
        .bs-tabs {
          display: flex;
          justify-content: space-around;
          border-bottom: 1px solid rgba(255,255,255,0.12);
          padding-bottom: 15px;
          margin-bottom: 50px;
          gap: 4px;
        }
        .bs-tab {
          background: transparent;
          border: none;
          outline: none;
          color: rgba(255, 255, 255, 0.65); /* Escalated from 0.25 to hit WCAG AA standards */
          font-size: clamp(10px,2.2vw,20px);
          font-weight: 400;
          text-transform: capitalize;
          text-align: center;
          position: relative;
          cursor: pointer;
          transition: color 0.3s, font-weight 0.3s;
          line-height: 1.2;
          flex: 1;
          padding: 0 2px;
          user-select: none;
        }
        .bs-tab:hover { color: rgba(255,255,255,0.95); }
        .bs-tab.active { color: rgba(0,176,245,1); font-weight: 600; }
        .bs-tab.active::before {
          content: "";
          position: absolute;
          bottom: -15px; left: 0; right: 0;
          height: 2px;
          background: rgba(0,176,245,1);
        }

        .bs-nav-btn {
          position: absolute;
          top: 60%;
          z-index: 200;
          width: clamp(44px,5vw,65px);
          height: clamp(44px,5vw,65px);
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.29);
          background: rgba(26,30,32,0.6);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: border-color 0.2s, opacity 0.2s, background 0.2s;
        }
        .bs-nav-btn:hover:not(:disabled) { border-color: #fff; background: rgba(26,30,32,0.85); }
        .bs-nav-btn:disabled { opacity: 0.25; cursor: not-allowed; }
        .bs-nav-btn.prev { left: clamp(4px,1.5vw,20px); }
        .bs-nav-btn.next { right: clamp(4px,1.5vw,20px); }

        .bs-slider {
          position: relative;
          min-height: 100vh;
          background-size: cover;
          background-position: center;
          overflow: hidden;
        }
        .bs-slider::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 3;
          background:
            linear-gradient(to right, rgba(26,30,32,1) 0%, rgba(26,30,32,0) 20%, rgba(26,30,32,0) 80%, rgba(26,30,32,1) 100%),
            linear-gradient(to bottom, rgba(26,30,32,1) 0%, rgba(26,30,32,0) 20%, rgba(26,30,32,0) 80%, rgba(26,30,32,1) 100%);
        }
        .bs-card {
          position: absolute;
          width: 228px;
          min-height: 160px;
          padding: 20px 15px 80px;
          background: rgba(217,217,217,0.06);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          color: #fff;
          font-size: 13px;
          font-weight: 400;
          transition: transform ${ANIM_SPEED}ms cubic-bezier(0.25,1,0.5,1), opacity ${ANIM_SPEED}ms;
          z-index: 2;
          will-change: transform, opacity;
        }
        .bs-card::after {
          content: "";
          position: absolute;
          left: 0; bottom: 0;
          width: 64px; height: 2px;
          background: linear-gradient(to right, rgba(0,176,245,1) 0%, rgba(0,176,245,0) 100%);
        }
        .bs-card.last::after {
          left: auto; right: 0;
          background: linear-gradient(to left, rgba(0,176,245,1) 0%, rgba(0,176,245,0) 100%);
        }
        .bs-card-date {
          position: absolute;
          bottom: -30px; left: 0;
          color: rgba(0,176,245,1);
          font-weight: 700;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .bs-card.last .bs-card-date { left: auto; right: 0; }

        .ms-root {
          position: relative;
          overflow: hidden;
          padding-bottom: 80px;
        }
        .ms-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          z-index: 0;
        }
        .ms-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(160deg, rgba(26,30,32,0.82) 0%, rgba(26,30,32,0.95) 100%);
          z-index: 1;
        }

        .ms-track-wrapper {
          position: relative;
          z-index: 2;
          overflow: hidden;
          padding: 200px 0 48px;
          touch-action: pan-y;
        }
        .ms-track {
          display: flex;
          will-change: transform;
        }
        .ms-slide {
          box-sizing: border-box;
          padding: 0 clamp(6px,2vw,12px);
        }
        .ms-slide:first-child { padding-left: clamp(16px,5vw,24px); }
        .ms-slide:last-child  { padding-right: clamp(16px,5vw,24px); }

        .ms-card {
          position: relative;
          background: rgba(217,217,217,0.07);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.08);
          padding: clamp(16px,4vw,24px) clamp(14px,4vw,22px) clamp(20px,5vw,28px);
          min-height: clamp(150px,38vw,210px);
          display: flex;
          flex-direction: column;
          gap: 10px;
          overflow: hidden;
          user-select: none;
          height: 100%;
        }
        .ms-card-top-accent {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(to right, rgba(0,176,245,1) 0%, rgba(0,176,245,0.3) 60%, transparent 100%);
        }
        .ms-card-month {
          color: rgba(0,176,245,1);
          font-size: clamp(9px,2.5vw,12px);
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .ms-card-text {
          color: rgba(255,255,255,0.9);
          font-size: clamp(11px,3vw,13.5px);
          line-height: 1.6;
          font-weight: 400;
          flex: 1;
          margin: 0;
        }
        .ms-card-bottom-accent {
          position: absolute;
          bottom: 0; left: 0;
          width: clamp(36px,12vw,64px);
          height: 2px;
          background: linear-gradient(to right, rgba(0,176,245,1) 0%, rgba(0,176,245,0) 100%);
        }

        .ms-arrows {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 clamp(16px,5vw,32px);
          margin-top: 4px;
        }
        .ms-arrow-btn {
          width: 44px; height: 44px; /* Scaled past 40px minimum targets */
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.25);
          background: transparent;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, opacity 0.2s;
          flex-shrink: 0;
        }
        .ms-arrow-btn:hover:not(:disabled) { border-color: rgba(0,176,245,1); color: rgba(0,176,245,1); }
        .ms-arrow-btn:disabled { opacity: 0.2; cursor: not-allowed; }

        .ms-dots {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
          padding: 0 8px;
          min-height: 44px; /* Guaranteed interaction row window height constraint */
        }
        
        /* ACCESSIBILITY FIX: The outer container handles the 44px tap target without changing visual size */
        .ms-dot-container {
          background: transparent;
          border: none;
          outline: none;
          padding: 0;
          width: 24px;   /* Explicitly spaced out horizontal boundary anchors */
          height: 44px;  /* Full WCAG height specification threshold */
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .ms-dot-visual {
          width: 6px; 
          height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.22);
          transition: background 0.25s, width 0.25s, border-radius 0.25s;
          display: block;
        }
        .ms-dot-container.active .ms-dot-visual {
          background: rgba(0,176,245,1);
          width: 18px;
          border-radius: 3px;
        }

        .ms-counter {
          position: relative;
          z-index: 2;
          text-align: center;
          margin-top: 10px;
          font-size: 11px;
          letter-spacing: 0.06em;
        }
        .ms-counter-current { color: rgba(0,176,245,1); font-weight: 700; }
        .ms-counter-sep     { color: rgba(255,255,255,0.2); margin: 0 3px; }
        .ms-counter-total   { color: rgba(255,255,255,0.35); }
      `}</style>

      <section className="bs-section">
        <div className="bs-container">
          <div className="bs-tabs" role="tablist" aria-label="Milestone Categories">
            {tabs.map((tab, idx) => (
              <button
                key={idx}
                role="tab"
                id={`tab-${idx}`}
                aria-controls={`panel-${idx}`}
                aria-selected={activeTab === idx}
                className={`bs-tab${activeTab === idx ? " active" : ""}`}
                onClick={() => setActiveTab(idx)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div id={`panel-${activeTab}`} role="tabpanel" aria-labelledby={`tab-${activeTab}`}>
          {layout === "desktop" ? (
            <div className="bs-container" style={{ position: "relative" }}>
              <DesktopSlider activeTab={activeTab} />
            </div>
          ) : (
            <div className="bs-container">
              <MobileSwiper
                activeTab={activeTab}
                cardsPerView={layout === "two" ? 2 : 1}
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}