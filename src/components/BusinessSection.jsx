import { useState, useEffect, useRef } from "react";
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

// ─── LAYOUT CONSTANTS ─────────────────────────────────────────────────────────
const MAX_VISIBLE = 7;
const CARD_W = 228;
const STEP_X = 250;
const CURVE_DEPTH = 340;
const EDGE_INSET = 150;
const ANIM_SPEED = 500;

// ─── MATH ────────────────────────────────────────────────────────────────────
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

// ─── ARROW SVG ───────────────────────────────────────────────────────────────
function ArrowLeft() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 5l-7 7 7 7" />
    </svg>
  );
}
function ArrowRight() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function BusinessSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef(null);
  const [dims, setDims] = useState({ w: 1200, h: 700 });

  // Measure slider container
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

  // Reset position on tab switch
  useEffect(() => {
    setStartIndex(0);
  }, [activeTab]);

  const data = sliderData[activeTab] || [];
  const actualVisible = Math.min(data.length, MAX_VISIBLE);
  const maxStart = Math.max(0, data.length - actualVisible);

  const cx = dims.w / 2;
  const cy = dims.h - 320;
  const totalLayoutWidth = Math.max(0, (actualVisible - 1) * STEP_X) + CARD_W;
  const startX = cx - totalLayoutWidth / 2;

  // Build visible card list
  const visibleCards = Array.from({ length: actualVisible }, (_, i) => {
    const dataIndex = (startIndex + i) % data.length;
    return { ...data[dataIndex], slot: i };
  });

  function moveNext() {
    if (isAnimating || startIndex >= maxStart) return;
    setIsAnimating(true);
    setStartIndex((s) => s + 1);
    setTimeout(() => setIsAnimating(false), ANIM_SPEED);
  }

  function movePrev() {
    if (isAnimating || startIndex <= 0) return;
    setIsAnimating(true);
    setStartIndex((s) => s - 1);
    setTimeout(() => setIsAnimating(false), ANIM_SPEED);
  }

  const tabs = [
    { label: (<>building<br />partnerships</>) },
    { label: (<>startup<br />successes</>) },
    { label: (<>ecosystems, programs &<br />initiatives</>) },
  ];

  return (
    <>
      {/* ── Scoped styles ── */}
      <style>{`
        .bs-section {
          background: rgba(26, 30, 32, 1);
          padding-top: 192px;
          position: relative;
          font-family: 'Poppins', sans-serif;
          min-height: 100vh;
        }

        /* ── Tabs ── */
        .bs-tabs {
          display: flex;
          justify-content: space-around;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 15px;
          margin-bottom: 50px;
        }
        .bs-tab {
          color: rgba(255, 255, 255, 0.25);
          font-size: 20px;
          font-weight: 350;
          text-transform: capitalize;
          text-align: center;
          position: relative;
          cursor: pointer;
          transition: color 0.3s ease;
          line-height: 1.02;
          font-stretch: expanded;
        }
        .bs-tab.active {
          color: rgba(0, 176, 245, 1);
          font-weight: 500;
        }
        .bs-tab.active::before {
          content: "";
          position: absolute;
          bottom: -15px;
          left: 0;
          right: 0;
          width: 100%;
          height: 2px;
          background: rgba(0, 176, 245, 1);
        }

        /* ── Nav arrows ── */
        .bs-nav-btn {
          position: absolute;
          top: 60%;
          z-index: 20;
          width: 65px;
          height: 65px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.29);
          background: transparent;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: border-color 0.2s, opacity 0.2s;
        }
        .bs-nav-btn:hover:not(:disabled) { border-color: #fff; }
        .bs-nav-btn:disabled { opacity: 0.25; cursor: not-allowed; }
        .bs-nav-btn.prev { left: 20px; }
        .bs-nav-btn.next { right: 20px; }

        /* ── Slider container ── */
        .bs-slider {
          position: relative;
          min-height: 100vh;
          background-size: cover;
          background-position: center;
          overflow: hidden;
        }

        /* 4-edge vignette */
        .bs-slider::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 3;
          background:
            linear-gradient(
              to right,
              rgba(26, 30, 32, 1) 0%,
              rgba(26, 30, 32, 0) 20%,
              rgba(26, 30, 32, 0) 80%,
              rgba(26, 30, 32, 1) 100%
            ),
            linear-gradient(
              to bottom,
              rgba(26, 30, 32, 1) 0%,
              rgba(26, 30, 32, 0) 20%,
              rgba(26, 30, 32, 0) 80%,
              rgba(26, 30, 32, 1) 100%
            );
        }

        /* ── Card ── */
        .bs-card {
          position: absolute;
          width: 228px;
          min-height: 160px;
          padding: 20px 15px 80px;
          background: rgba(217, 217, 217, 0.06);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          color: rgba(255, 255, 255, 1);
          font-family: 'Poppins', sans-serif;
          font-size: 13px;
          font-weight: 400;
          transition:
            left ${ANIM_SPEED}ms cubic-bezier(0.25, 1, 0.5, 1),
            top ${ANIM_SPEED}ms cubic-bezier(0.25, 1, 0.5, 1),
            opacity ${ANIM_SPEED}ms;
          z-index: 2;
        }

        /* left-side bottom accent line */
        .bs-card::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 64px;
          height: 2px;
          background: linear-gradient(to right, rgba(0, 176, 245, 1) 0%, rgba(0, 176, 245, 0) 100%);
        }

        /* last card flips the accent line to the right */
        .bs-card.last::after {
          left: auto;
          right: 0;
          background: linear-gradient(to left, rgba(0, 176, 245, 1) 0%, rgba(0, 176, 245, 0) 100%);
        }

        /* Month label */
        .bs-card-date {
          position: absolute;
          bottom: -30px;
          left: 0;
          color: rgba(0, 176, 245, 1);
          font-weight: 700;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-stretch: expanded;
        }
        .bs-card.last .bs-card-date {
          left: auto;
          right: 0;
        }

        /* ── Container wrapper ── */
        .bs-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
        }
      `}</style>

      <section className="bs-section">
        {/* ── Nav Buttons ── */}
        <button
          className="bs-nav-btn prev"
          onClick={movePrev}
          disabled={startIndex <= 0}
          aria-label="Previous"
        >
          <ArrowLeft />
        </button>
        <button
          className="bs-nav-btn next"
          onClick={moveNext}
          disabled={startIndex >= maxStart}
          aria-label="Next"
        >
          <ArrowRight />
        </button>

        <div className="bs-container">
          {/* ── Tabs ── */}
          <div className="bs-tabs">
            {tabs.map((tab, idx) => (
              <div
                key={idx}
                className={`bs-tab${activeTab === idx ? " active" : ""}`}
                onClick={() => { if (!isAnimating) setActiveTab(idx); }}
              >
                <p>{tab.label}</p>
              </div>
            ))}
          </div>

          {/* ── Slider ── */}
          <div
            ref={containerRef}
            className="bs-slider"
            style={{
              // ⬇ Replace this URL with your actual background image path
               backgroundImage: `url(${businessimg})`,
            }}
          >
            {visibleCards.map((card, i) => {
              const s = getSlotStyle(card.slot, actualVisible, cx, cy, startX);
              const isLast = i === visibleCards.length - 1;
              return (
                <div
                  key={`${activeTab}-${startIndex}-${i}`}
                  className={`bs-card${isLast ? " last" : ""}`}
                  style={{
                    left: s.x,
                    top: s.y,
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
        </div>
      </section>
    </>
  );
}