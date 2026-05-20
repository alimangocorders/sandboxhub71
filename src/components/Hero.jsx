import React, { useEffect, useState, useRef, useCallback } from 'react';
import heroVideo from '../assets/hero1.mp4';
import { Download } from "lucide-react";

// ─── Derive clip config from the PANEL's actual rendered width ────────────────
function getClipFromPanelWidth(panelW) {
  const CHAR_RATIO = 4.62;
  const TARGET_FILL = 0.9;

  const fontSize = Math.round((panelW * TARGET_FILL) / CHAR_RATIO);
  const boxW = Math.round(fontSize * CHAR_RATIO);
  const textY = Math.round(fontSize * 0.74);
  const boxH = Math.round(fontSize * 0.95);

  return { fontSize, boxW, boxH, textY };
}

const Hero = () => {
  const panelRef = useRef(null);

  const [clip, setClip] = useState({
    fontSize: 150,
    textY: 110,
    boxW: 700,
    boxH: 140,
  });

  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined'
      ? window.innerWidth < 768
      : false
  );

  const measure = useCallback(() => {
    if (!panelRef.current) return;

    const panelW = panelRef.current.offsetWidth;

    setIsMobile(window.innerWidth < 768);
    setClip(getClipFromPanelWidth(panelW));
  }, []);

  useEffect(() => {
    measure();

    window.addEventListener('resize', measure);

    let ro;

    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(measure);

      if (panelRef.current) {
        ro.observe(panelRef.current);
      }
    }

    return () => {
      window.removeEventListener('resize', measure);
      ro?.disconnect();
    };
  }, [measure]);

  const definedFontSize = Math.round(
    clip.fontSize * (85 / 150)
  );

  const definedMarginLeft = Math.round(
    clip.boxW * 0.229
  );

  const definedMarginTop =
    Math.round(definedFontSize * -0.10) -
    (isMobile ? 0 : 6);

  return (
    <>
      <style>{`
        .hero-left {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 180px 50px 64px 58px;
          max-width: 650px;
          width: 100%;
          height: 100%;
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
          isolation: isolate;
        }

        @media (max-width: 1300px) {
          .hero-left {
            max-width: 560px;
          }
        }

        @media (max-width: 1200px) {
          .hero-left {
            max-width: 530px;
          }
        }

        @media (max-width: 1100px) {
          .hero-left {
            max-width: 460px;
          }
        }

        @media (max-width: 992px) {
          .hero-left {
            max-width: 400px;
          }
        }

        @media (max-width: 767px) {
          .hero-left {
            max-width: 100%;
            width: 100%;
            height: auto;
            padding:
              clamp(20px, 6vw, 40px)
              clamp(14px, 4vw, 24px)
              clamp(16px, 4vw, 24px)
              clamp(14px, 4vw, 24px);

            justify-content: flex-start;
            gap: clamp(12px, 3vw, 20px);
          }
        }

        .prog-item {
          transition: color 0.3s ease;
          pointer-events: none;
        }

        .prog-right {
          background: rgba(217,217,217,0.1);
          display: flex;
          flex-direction: column;
          padding-top: 50px;
          backdrop-filter: blur(40px);
          padding-inline: 75px;
          justify-content: center;
          width: 703px;
        }
      `}</style>

      <section className="relative h-screen w-full bg-[#030808] overflow-hidden">

        {/* SVG Clip */}
        <svg
          style={{
            position: 'absolute',
            width: 0,
            height: 0,
            overflow: 'hidden',
          }}
        >
          <defs>
            <clipPath id="impact-clip">
              <text
                x="0"
                y={clip.textY}
                style={{
                  fontFamily: '"Roc Grotesk", sans-serif',
                  fontWeight: 900,
                  fontSize: `${clip.fontSize}px`,
                }}
              >
                IMPACT
              </text>
            </clipPath>
          </defs>
        </svg>

        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0 scale-105"
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#030808] via-[#030808]/20 to-transparent w-full opacity-80" />

        {/* Content */}
        <div className="relative z-20 h-full w-full flex flex-col justify-end">

          {/* Left Panel */}
          <div
            ref={panelRef}
            className="hero-left select-none"
          >

            {/* IMPACT */}
            <div className="relative">

              <div
                style={{
                  clipPath: 'url(#impact-clip)',
                  WebkitClipPath: 'url(#impact-clip)',
                  width: `${clip.boxW}px`,
                  height: `${clip.boxH}px`,
                }}
                className="relative overflow-hidden max-w-full"
              >
                <video
                  src={heroVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover scale-150 brightness-110"
                />
              </div>

              <h2
                className="font-roc font-light uppercase tracking-[2px] leading-none text-white/80"
                style={{
                  fontSize: `${definedFontSize}px`,
                  marginLeft: `${definedMarginLeft}px`,
                  marginTop: `${definedMarginTop}px`,
                  
                }}
              >
                Defined
              </h2>
            </div>

            {/* Desktop Download */}
            <div className="hidden md:flex flex-col gap-6 items-end">
              <div className="h-96 w-[1px] bg-white/10 ml-auto mr-5" />

              <a
                href="https://sandboxhub71.trianglemena.xyz/impact-report/2026/impact-report-2026.pdf"
                className="impact-report flex items-center gap-6 group"
                download
              >
                <span className="text-white uppercase tracking-[0.25em] text-[10px] font-roc font-bold opacity-80 group-hover:opacity-100 transition-opacity">
                  Impact Report
                </span>

                <div className="w-12 h-12 border border-white/20 text-white rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                  <Download size={20} />
                </div>
              </a>
            </div>

            {/* Mobile Download */}
            <div className="flex md:hidden">
              <a
                href="https://sandboxhub71.trianglemena.xyz/impact-report/2026/impact-report-2026.pdf"
                className="flex items-center gap-4 group self-end invisible"
                download
              >
                <span className="text-white uppercase tracking-[0.25em] text-[10px] font-roc font-bold opacity-80 group-hover:opacity-100 transition-opacity">
                  Impact Report
                </span>

                <div className="w-10 h-10 border border-white/20 text-white rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                  <Download size={15} />
                </div>
              </a>
            </div>

          </div>

          {/* Description */}
          <div
            className="absolute"
            style={
              isMobile
                ? {
                    bottom: '14px',
                    left: 0,
                    right: 0,
                    padding: '0 clamp(14px,4vw,24px)',
                  }
                : {
                    bottom: '48px',
                    right: '48px',
                    maxWidth: '340px',
                  }
            }
          >
            <p
              className="font-poppins font-light opacity-80 text-white leading-[1.6]"
              style={{
                fontSize: isMobile
                  ? 'clamp(11px,2.8vw,13px)'
                  : '14px',

                textAlign: isMobile
                  ? 'left'
                  : 'right',
              }}
            >
              Innovation is most powerful when it drives meaningful impact,
              and Hub71 is leveraging this progress to shape a future focused ecosystem.
            </p>
          </div>

        </div>
      </section>
    </>
  );
};

export default Hero;