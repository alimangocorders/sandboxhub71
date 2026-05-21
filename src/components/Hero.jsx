import { useEffect, useState, useRef, useCallback, useMemo, memo } from 'react';
import { Download } from "lucide-react";

// ⚡ OPTIMIZATION: point this to your optimized, compressed version (hero1-opt.mp4)
import heroVideo from '../assets/hero1.mp4';

// Derive clip configuration metrics from the panel's actual rendered width
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
  const primaryVideoRef = useRef(null);
  const secondaryVideoRef = useRef(null);

  // Predict a stable initial fallback state to completely prevent Cumulative Layout Shift (CLS)
  const [clip, setClip] = useState({
    fontSize: 120,
    textY: 88,
    boxW: 554,
    boxH: 114,
  });

  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  const measure = useCallback(() => {
    if (!panelRef.current) return;
    const panelW = panelRef.current.offsetWidth;
    
    // OPTIMIZATION: Use requestAnimationFrame to batch DOM reads/writes and avoid layout thrashing
    requestAnimationFrame(() => {
      setIsMobile(window.innerWidth < 768);
      setClip(getClipFromPanelWidth(panelW));
    });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure, { passive: true });

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

  // OPTIMIZATION: Sync secondary masked text video with primary background video to maximize local caching
  useEffect(() => {
    const primary = primaryVideoRef.current;
    const secondary = secondaryVideoRef.current;
    
    if (!primary || !secondary) return;

    const handlePlay = () => {
      secondary.play().catch(() => {});
    };

    const handlePause = () => {
      secondary.pause();
    };

    const handleSeek = () => {
      secondary.currentTime = primary.currentTime;
    };

    primary.addEventListener('playing', handlePlay);
    primary.addEventListener('pause', handlePause);
    primary.addEventListener('seeking', handleSeek);
    
    return () => {
      primary.removeEventListener('playing', handlePlay);
      primary.removeEventListener('pause', handlePause);
      primary.removeEventListener('seeking', handleSeek);
    };
  }, []);

  // OPTIMIZATION: Memoize geometric layout parameters to block unnecessary tree reconciliations
  const derivedStyles = useMemo(() => {
    const fontSize = Math.round(clip.fontSize * (85 / 150));
    const marginLeft = Math.round(clip.boxW * 0.229);
    const marginTop = Math.round(fontSize * -0.10) - (isMobile ? 0 : 6);
    return { fontSize, marginLeft, marginTop };
  }, [clip, isMobile]);

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
        @media (max-width: 1300px) { .hero-left { max-width: 560px; } }
        @media (max-width: 1200px) { .hero-left { max-width: 530px; } }
        @media (max-width: 1100px) { .hero-left { max-width: 460px; } }
        @media (max-width: 992px)  { .hero-left { max-width: 400px; } }
        @media (max-width: 767px) {
          .hero-left {
            max-width: 100%;
            width: 100%;
            height: auto;
            padding: clamp(20px, 6vw, 40px) clamp(14px, 4vw, 24px) clamp(16px, 4vw, 24px) clamp(14px, 4vw, 24px);
            justify-content: flex-start;
            gap: clamp(12px, 3vw, 20px);
          }
        }
        .prog-item { transition: color 0.3s ease; pointer-events: none; }
      `}</style>

      <section className="relative h-screen w-full bg-[#030808] overflow-hidden">
        <h1 className="sr-only">Hub71 Impact Ecosystem Dashboard</h1>

        {/* Dynamic Vector Clip Definition Boundary */}
        <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
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

        {/* PRIMARY VIDEO BACKGROUND: Handles core data delivery and triggers browser caching */}
        <video
          ref={primaryVideoRef}
          className="absolute inset-0 w-full h-full object-cover z-0 scale-105"
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          width="1920"
          height="1080"
        >
          <track kind="captions" srcLang="en" label="English display track" default />
        </video>

        {/* Premium overlay canvas styling gradient block */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#030808] via-[#030808]/20 to-transparent w-full opacity-80" />

        <div className="relative z-20 h-full w-full flex flex-col justify-end">
          <div ref={panelRef} className="hero-left select-none">
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
                {/* SECONDARY VIDEO: Set to preload="none" to kill concurrent multi-stream connections */}
                <video
                  ref={secondaryVideoRef}
                  src={heroVideo}
                  loop
                  muted
                  playsInline
                  preload="none"
                  className="w-full h-full object-cover scale-150 brightness-110"
                  aria-hidden="true"
                >
                  <track kind="captions" srcLang="en" label="English internal clip track" />
                </video>
              </div>

              <h2
                className="font-roc font-light uppercase tracking-[2px] leading-none text-white/95"
                style={{
                  fontSize: `${derivedStyles.fontSize}px`,
                  marginLeft: `${derivedStyles.marginLeft}px`,
                  marginTop: `${derivedStyles.marginTop}px`,
                }}
              >
                Defined
              </h2>
            </div>

            {/* DESKTOP REPORT LINK DOWNLOAD CONTROL */}
            <div className="hidden md:flex flex-col gap-6 items-end">
              <div className="h-96 w-[1px] bg-white/10 ml-auto mr-5" />
              <a
                href="https://sandboxhub71.trianglemena.xyz/impact-report/2026/impact-report-2026.pdf"
                className="impact-report flex items-center gap-6 group min-w-[44px] min-h-[44px] "
                download
                aria-label="Download the full Hub71 2026 Annual Impact Report document in PDF format"
              >
                <span className="text-white uppercase tracking-[0.25em] text-[10px] font-roc font-bold opacity-90 group-hover:opacity-100 transition-opacity">
                  Impact Report
                </span>
                <div className="w-12 h-12 border border-white/20 text-white rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                  <Download size={20} aria-hidden="true" />
                </div>
              </a>
            </div>

            {/* MOBILE REPORT LINK DOWNLOAD CONTROL */}
            <div className="flex md:hidden">
              <a
                href="https://sandboxhub71.trianglemena.xyz/impact-report/2026/impact-report-2026.pdf"
                className="flex items-center gap-4 group self-end min-w-[48px] min-h-[48px] p-2 md:visible invisible"
                download
                aria-label="Download mobile viewport optimized Hub71 Annual Impact Report copy"
              >
                <span className="text-white uppercase tracking-[0.25em] text-[10px] font-roc font-bold opacity-90 group-hover:opacity-100 transition-opacity">
                  Impact Report
                </span>
                <div className="w-11 h-11 border border-white/20 text-white rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                  <Download size={16} aria-hidden="true" />
                </div>
              </a>
            </div>
          </div>

          {/* Description Copy Placement Layer */}
          <div
            className="absolute"
            style={
              isMobile
                ? { bottom: '14px', left: 0, right: 0, padding: '0 clamp(14px,4vw,24px)' }
                : { bottom: '48px', right: '48px', maxWidth: '340px' }
            }
          >
            <p
              className="font-poppins font-light text-white/95 leading-[1.6]"
              style={{
                fontSize: isMobile ? 'clamp(11px,2.8vw,13px)' : '14px',
                textAlign: isMobile ? 'left' : 'right',
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

export default memo(Hero);