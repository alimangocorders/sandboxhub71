import { useState, useEffect, useRef, useCallback } from "react";
import businessimg from "../assets/images/business-img.png";

// ─── DATA ────────────────────────────────────────────────────────────────────
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

// ─── DESKTOP CONSTANTS ────────────────────────────────────────────────────────
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

// ─── ICONS ───────────────────────────────────────────────────────────────────
function ArrowLeft({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 5l-7 7 7 7" />
    </svg>
  );
}
function ArrowRight({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

const tabs = [
  { label: (<>building<br />partnerships</>) },
  { label: (<>startup<br />successes</>) },
  { label: (<>ecosystems, programs &<br />initiatives</>) },
];

// ─── DESKTOP SLIDER ───────────────────────────────────────────────────────────
function DesktopSlider({ activeTab }) {
  const [startIndex, setStartIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const containerRef = useRef(null);
  const [dims, setDims] = useState({ w: 1200, h: 700 });

  useEffect(() => {
    function update() {
      if (containerRef.current) {
        const r = containerRef.current.getBoundingClientRect();
        setDims({ w: r.width, h: r.height });
      }
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => { setStartIndex(0); }, [activeTab]);

  const data = sliderData[activeTab] || [];
  const actualVisible = Math.min(data.length, MAX_VISIBLE);
  const maxStart = Math.max(0, data.length - actualVisible);
  const cx = dims.w / 2;
  const cy = dims.h - 320;
  const totalLayoutWidth = Math.max(0, (actualVisible - 1) * STEP_X) + CARD_W;
  const startX = cx - totalLayoutWidth / 2;

  const visibleCards = Array.from({ length: actualVisible }, (_, i) => {
    const dataIndex = (startIndex + i) % data.length;
    return { ...data[dataIndex], slot: i };
  });

  function moveNext() {
    if (animating || startIndex >= maxStart) return;
    setAnimating(true);
    setStartIndex((s) => s + 1);
    setTimeout(() => setAnimating(false), ANIM_SPEED);
  }
  function movePrev() {
    if (animating || startIndex <= 0) return;
    setAnimating(true);
    setStartIndex((s) => s - 1);
    setTimeout(() => setAnimating(false), ANIM_SPEED);
  }

  return (
    <>
      <button className="bs-nav-btn prev" onClick={movePrev} disabled={startIndex <= 0} aria-label="Previous">
        <ArrowLeft />
      </button>
      <button className="bs-nav-btn next" onClick={moveNext} disabled={startIndex >= maxStart} aria-label="Next">
        <ArrowRight />
      </button>
      <div ref={containerRef} className="bs-slider" style={{ backgroundImage: `url(${businessimg})` }}>
        {visibleCards.map((card, i) => {
          const s = getSlotStyle(card.slot, actualVisible, cx, cy, startX);
          const isLast = i === visibleCards.length - 1;
          return (
            <div
              key={`${activeTab}-${startIndex}-${i}`}
              className={`bs-card${isLast ? " last" : ""}`}
              style={{ left: s.x, top: s.y, zIndex: s.zIndex, opacity: s.opacity }}
            >
              <p>{card.title}</p>
              <span className="bs-card-date">{card.date}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}

// ─── MOBILE SWIPER ────────────────────────────────────────────────────────────
// cardsPerView = 1 (< 576px) or 2 (576–767px)
function MobileSwiper({ activeTab, cardsPerView }) {
  const data = sliderData[activeTab] || [];

  // Pages = groups of cardsPerView cards
  const totalPages = Math.ceil(data.length / cardsPerView);
  const [page, setPage] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const isHorizRef = useRef(null);
  const trackRef = useRef(null);

  // Reset when tab or cardsPerView changes
  useEffect(() => { setPage(0); setDragOffset(0); }, [activeTab, cardsPerView]);

  const goToPage = useCallback((p) => {
    const clamped = Math.max(0, Math.min(p, totalPages - 1));
    setPage(clamped);
    setDragOffset(0);
  }, [totalPages]);

  // Touch
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
    if (isHorizRef.current === null) isHorizRef.current = Math.abs(dx) > Math.abs(dy);
    if (isHorizRef.current) { e.preventDefault(); setDragOffset(dx); }
  };
  const onTouchEnd = () => {
    setIsDragging(false);
    const threshold = 60;
    if (dragOffset < -threshold) goToPage(page + 1);
    else if (dragOffset > threshold) goToPage(page - 1);
    else setDragOffset(0);
    isHorizRef.current = null;
  };

  // Mouse drag
  const onMouseDown = (e) => { startXRef.current = e.clientX; setIsDragging(true); };
  const onMouseMove = (e) => { if (!isDragging) return; setDragOffset(e.clientX - startXRef.current); };
  const onMouseUp = () => {
    setIsDragging(false);
    const threshold = 60;
    if (dragOffset < -threshold) goToPage(page + 1);
    else if (dragOffset > threshold) goToPage(page - 1);
    else setDragOffset(0);
  };

  // translateX: each "page" is 100% of the track wrapper width
  const translateX = -(page * 100) + (dragOffset / (trackRef.current?.offsetWidth || 350)) * 100;

  // Cards are grouped into pages; each page slot = 100%/cardsPerView wide
  const slideWidthPct = 100 / cardsPerView;

  // Counter values
  const firstCardOnPage = page * cardsPerView + 1;
  const lastCardOnPage = Math.min((page + 1) * cardsPerView, data.length);

  return (
    <div className="ms-root">
      <div className="ms-bg" style={{ backgroundImage: `url(${businessimg})` }} />

      {/* Track */}
      <div
        ref={trackRef}
        className="ms-track-wrapper"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <div
          className="ms-track"
          style={{
            transform: `translateX(${translateX}%)`,
            transition: isDragging ? "none" : "transform 420ms cubic-bezier(0.25,1,0.5,1)",
            cursor: isDragging ? "grabbing" : "grab",
          }}
        >
          {data.map((card, i) => (
            <div
              key={i}
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

      {/* Controls row: prev · dots · next */}
      <div className="ms-arrows">
        <button
          className="ms-arrow-btn"
          onClick={() => goToPage(page - 1)}
          disabled={page === 0}
          aria-label="Previous"
        >
          <ArrowLeft size={18} />
        </button>

        <div className="ms-dots">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i)}
              aria-label={`Go to page ${i + 1}`}
              className={`ms-dot${i === page ? " active" : ""}`}
            />
          ))}
        </div>

        <button
          className="ms-arrow-btn"
          onClick={() => goToPage(page + 1)}
          disabled={page === totalPages - 1}
          aria-label="Next"
        >
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Counter */}
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
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function BusinessSection() {
  const [activeTab, setActiveTab] = useState(0);

  // Track screen width for: desktop (≥768), 2-up mobile (576–767), 1-up mobile (<576)
  const getLayout = () => {
    if (typeof window === "undefined") return "desktop";
    if (window.innerWidth >= 768) return "desktop";
    if (window.innerWidth >= 576) return "two";
    return "one";
  };
  const [layout, setLayout] = useState(getLayout);

  useEffect(() => {
    const onResize = () => setLayout(getLayout());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <style>{`
        /* ── Section ── */
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

        /* ── Tabs ── */
        .bs-tabs {
          display: flex;
          justify-content: space-around;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding-bottom: 15px;
          margin-bottom: 50px;
          gap: 4px;
        }
        .bs-tab {
          color: rgba(255,255,255,0.25);
          font-size: clamp(10px,2.2vw,20px);
          font-weight: 350;
          text-transform: capitalize;
          text-align: center;
          position: relative;
          cursor: pointer;
          transition: color 0.3s;
          line-height: 1.2;
          flex: 1;
          padding: 0 2px;
          user-select: none;
        }
        .bs-tab.active { color: rgba(0,176,245,1); font-weight: 500; }
        .bs-tab.active::before {
          content: "";
          position: absolute;
          bottom: -15px; left: 0; right: 0;
          height: 2px;
          background: rgba(0,176,245,1);
        }

        /* ── DESKTOP NAV ARROWS — z-index raised to 200 ── */
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

        /* ── DESKTOP SLIDER ── */
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
            linear-gradient(to right,
              rgba(26,30,32,1) 0%,
              rgba(26,30,32,0) 20%,
              rgba(26,30,32,0) 80%,
              rgba(26,30,32,1) 100%
            ),
            linear-gradient(to bottom,
              rgba(26,30,32,1) 0%,
              rgba(26,30,32,0) 20%,
              rgba(26,30,32,0) 80%,
              rgba(26,30,32,1) 100%
            );
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
          transition:
            left ${ANIM_SPEED}ms cubic-bezier(0.25,1,0.5,1),
            top ${ANIM_SPEED}ms cubic-bezier(0.25,1,0.5,1),
            opacity ${ANIM_SPEED}ms;
          z-index: 2;
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

        /* ══════════════════════════════════════
           MOBILE SWIPER
        ══════════════════════════════════════ */
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
          /* slides are sized inline via style prop */
        }
        /* Each slide: padding creates gutter between 2-up cards */
        .ms-slide {
          box-sizing: border-box;
          padding: 0 clamp(6px,2vw,12px);
        }
        /* Outer edges: remove extra padding on first/last */
        .ms-slide:first-child { padding-left: clamp(16px,5vw,24px); }
        .ms-slide:last-child  { padding-right: clamp(16px,5vw,24px); }

        /* The card */
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

        /* Controls row */
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
          width: 40px; height: 40px;
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

        /* Dots — one per PAGE (not per card) */
        .ms-dots {
          display: flex;
          align-items: center;
          gap: 7px;
          flex-wrap: wrap;
          justify-content: center;
          flex: 1;
          padding: 0 8px;
        }
        .ms-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          border: none;
          background: rgba(255,255,255,0.22);
          cursor: pointer;
          padding: 0;
          flex-shrink: 0;
          transition: background 0.25s, width 0.25s, border-radius 0.25s;
        }
        .ms-dot.active {
          background: rgba(0,176,245,1);
          width: 18px;
          border-radius: 3px;
        }

        /* Counter */
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
          <div className="bs-tabs">
            {tabs.map((tab, idx) => (
              <div
                key={idx}
                className={`bs-tab${activeTab === idx ? " active" : ""}`}
                onClick={() => setActiveTab(idx)}
              >
                <p>{tab.label}</p>
              </div>
            ))}
          </div>
        </div>

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
      </section>
    </>
  );
}