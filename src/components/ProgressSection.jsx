import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import progressimg from "../assets/images/prog.png";

gsap.registerPlugin(ScrollTrigger);

const PROGRAMS = [
  {
    num: "[01]",
    name: "Hub71 +ClimaTech",
    sub: "+CLIMATECH",
    desc: "Hub71+ClimaTech empowers startups driving climate solutions, connecting them to capital, mentorship, and markets to tackle the most pressing environmental challenges.",
  },
  {
    num: "[02]",
    name: "HUB71 +AI",
    sub: "+AI",
    desc: "Launched in 2024, Hub71+AI enables startups to unlock the full potential of artificial intelligence to transform industries, address global challenges, and position Abu Dhabi as a leader in the AI-driven future.",
  },
  {
    num: "[03]",
    name: "Hub71 +Digital Assets",
    sub: "+DIGITAL",
    desc: "Hub71+Digital Assets supports blockchain and Web3 startups building the next generation of decentralized financial infrastructure and tokenized asset platforms.",
  },
];

const PAD_ACTIVE   = 44;
const PAD_INACTIVE = 20;
const DESC_HEIGHT  = 400;

const ProgressSection = () => {
  const containerRef = useRef(null);
  const sectionRef   = useRef(null);
  const subRef       = useRef(null);
  const circleRef    = useRef(null);
  const itemsRef     = useRef([]);
  const descRefs     = useRef([]);
  const numRefs      = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items  = itemsRef.current;
      const descs  = descRefs.current;
      const nums   = numRefs.current;
      const circle = circleRef.current;

      const radius        = 266;
      const circumference = 2 * Math.PI * radius;
      const segment       = circumference / PROGRAMS.length;

      gsap.set(circle, {
        strokeDasharray:  `${segment} ${circumference - segment}`,
        strokeDashoffset: 0,
      });

      // ── Initial States ──────────────────────────────
      items.forEach((el, i) => {
        if (i === 0) {
          el.classList.add("active");
          gsap.set(el,      { paddingTop: PAD_ACTIVE, paddingBottom: PAD_ACTIVE });
          gsap.set(nums[i], { color: "#2ecc8f" });
          gsap.set(descs[i],{ height: DESC_HEIGHT, opacity: 1, marginTop: 18 });
        } else {
          gsap.set(el,      { paddingTop: PAD_INACTIVE, paddingBottom: PAD_INACTIVE });
          gsap.set(nums[i], { color: "rgba(255,255,255,0.22)" });
          gsap.set(descs[i],{ height: 0, opacity: 0, marginTop: 0 });
        }
      });

      if (subRef.current) subRef.current.innerText = PROGRAMS[0].sub;

      // ── Timeline ───────────────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start:   "top top",
          end:     "+=400%",
          scrub:   1.2,
          pin:     true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const index = Math.round(self.progress * (PROGRAMS.length - 1));
            if (subRef.current && subRef.current.innerText !== PROGRAMS[index].sub)
              subRef.current.innerText = PROGRAMS[index].sub;
            items.forEach((el, i) =>
              i === index ? el.classList.add("active") : el.classList.remove("active")
            );
          },
        },
      });

      PROGRAMS.forEach((_, i) => {
        if (i >= PROGRAMS.length - 1) return;
        const next = i + 1;
        const t    = i;

        // Circle advances
        tl.to(circle, {
          strokeDashoffset: -(segment * next),
          duration: 1,
          ease: "power2.inOut",
        }, t);

        // Collapse current — desc first, then padding
        tl.to(descs[i], {
          height: 0, opacity: 0, marginTop: 0,
          duration: 0.4, ease: "expo.in",
        }, t)
        .to(items[i], {
          paddingTop: PAD_INACTIVE, paddingBottom: PAD_INACTIVE,
          duration: 0.45, ease: "expo.inOut",
        }, t + 0.08)
        .to(nums[i], {
          color: "rgba(255,255,255,0.22)",
          duration: 0.3,
        }, t);

        // Expand next — padding opens, desc follows
        tl.to(items[next], {
          paddingTop: PAD_ACTIVE, paddingBottom: PAD_ACTIVE,
          duration: 0.45, ease: "expo.out",
        }, t + 0.38)
        .to(nums[next], {
          color: "#2ecc8f",
          duration: 0.3,
        }, t + 0.38)
        .to(descs[next], {
          height: DESC_HEIGHT, opacity: 1, marginTop: 18,
          duration: 0.5, ease: "expo.out",
        }, t + 0.46);
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

        .prog {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          height: 100vh;
          width: 100%;
          color: #fff;
          position: relative;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          overflow: hidden;
          font-family: 'Poppins', sans-serif;
        }

        .prog-bg-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(3,8,8,0.95) 0%,
            rgba(3,8,8,0.70) 30%,
            rgba(3,8,8,0.40) 60%
          );
          pointer-events: none;
          z-index: 0;
        }

        /* ── LEFT ── */
        .prog-left {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .prog-circle-container {
          width: 536px;
          height: 536px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .prog-svg-main {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
          z-index: 0;
        }

        .prog-label-wrap {
          position: relative;
          z-index: 5;
          text-align: center;
          user-select: none;
        }

        .prog-label-wrap .main-brand {
          font-weight: 800;
          font-size: 52px;
          letter-spacing: 0.08em;
          display: block;
          line-height: 0.9;
          text-transform: uppercase;
        }

        .prog-label-wrap .sub-brand {
          font-weight: 700;
          font-size: 28px;
          color: #2ecc8f;
          letter-spacing: 0.05em;
          display: block;
          margin-top: 10px;
          text-transform: uppercase;
        }

        .prog-decoration { position: absolute; z-index: 3; pointer-events: none; }
        .icon-cloud { top: -70px; left: 50%; transform: translateX(-50%); opacity: 0.7; }
        .icon-cloud img { width: 36px; }

        .line-vertical-top {
          position: absolute;
          top: 25px; left: 50%;
          width: 1px; height: 40px;
          background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.3));
          transform: translateX(-50%);
        }
        .line-diag-right {
          position: absolute;
          bottom: 140px; right: 63px;
          width: 1px; height: 35px;
          background: linear-gradient(to top, rgba(255,255,255,0), rgba(255,255,255,0.3));
          transform: rotate(315deg);
        }
        .line-diag-left {
          position: absolute;
          bottom: 130px; left: 70px;
          width: 1px; height: 35px;
          background: linear-gradient(to top, rgba(255,255,255,0), rgba(255,255,255,0.3));
          transform: rotate(45deg);
        }
        .icon-monitor { bottom: 75px; left: -20px; opacity: 0.6; }
        .icon-monitor img { width: 24px; }
        .icon-spark { bottom: 75px; right: -10px; z-index: 4; }
        .icon-spark img { width: 26px; filter: drop-shadow(0 0 5px #2ecc8f); }

        /* ── RIGHT ── */
        .prog-right {
          position: relative;
          z-index: 1;

          /* KEY FIX: top-align the card list so card[01] is anchored
             at the top and cards below flow downward naturally.
             We use padding-top to visually center the block. */
          display: flex;
          flex-direction: column;
          justify-content: flex-start;   /* ← was "center" — this is the core fix */
          
          background: rgba(255,255,255,0.02);
          backdrop-filter: blur(50px);
          -webkit-backdrop-filter: blur(50px);
          border-left: 1px solid rgba(255,255,255,0.06);
          
          /* Manual vertical centering: push cards down so the full
             block (all 3 collapsed) sits roughly in the middle.
             Adjust this value to taste. */
          padding: 0 10%;
          width: 95%;
        }

        /* This wrapper is what we shift down to optically center
           the card stack at rest, instead of relying on flexbox center */
        .prog-cards-inner {
          margin-top: calc(50vh - 260px);
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          height: 100%;
        }

        /* ── Cards — NO CSS padding, GSAP owns it ── */
        .prog-card {
          position: relative;
          padding-top: 0;
          padding-bottom: 0;
          will-change: padding-top, padding-bottom;
        }

        .prog-card + .prog-card {
          border-top: 1px solid rgba(255,255,255,0.08);
        }

        .prog-card-header {
          display: flex;
          align-items: flex-start;
          gap: 25px;
        }

        .prog-card-num {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.15em;
          flex-shrink: 0;
          padding-top: 10px;
          font-family: monospace;
          will-change: color;
        }

        .prog-card-title {
          font-weight: 700;
          font-size: clamp(24px, 3.2vw, 42px);
          letter-spacing: -0.01em;
          line-height: 1.1;
          text-transform: uppercase;
          color: #fff;
          transition: color 0.4s ease;
        }

        .prog-card:not(.active) .prog-card-title {
          color: rgba(255,255,255,0.45);
        }

        .prog-card-body {
          overflow: hidden;
          height: 0;
          opacity: 0;
          margin-top: 0;
          padding-left: 58px;
          will-change: height, opacity, margin-top;
        }

        .prog-card-body p {
          font-size: 16px;
          font-weight: 300;
          color: rgba(255,255,255,0.62);
          max-width: 440px;
          line-height: 1.85;
          margin: 0;
          padding-bottom: 4px;
        }

        /* ── Responsive ── */
        @media (max-width: 1200px) {
          .prog-circle-container { width: 420px; height: 420px; }
          .prog-label-wrap .main-brand { font-size: 42px; }
          .prog-label-wrap .sub-brand  { font-size: 22px; }
        }

        @media (max-width: 991px) {
          .prog { grid-template-columns: 1fr; overflow-y: auto; }
          .prog-left { min-height: 60vh; padding: 50px 0; }
          .prog-right {
            border-left: none;
            border-top: 1px solid rgba(255,255,255,0.1);
            padding: 60px 5%;
            min-height: 50vh;
          }
          .prog-cards-inner { margin-top: 0; }
          .prog-circle-container { width: 320px; height: 320px; }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="prog"
        style={{ backgroundImage: `url(${progressimg})` }}
      >
        <div className="prog-bg-overlay" />

        {/* ── LEFT ── */}
        <div className="prog-left">
          <div className="prog-circle-container">
            <div className="prog-label-wrap">
              <span className="main-brand">HUB71</span>
              <span ref={subRef} className="sub-brand" />
            </div>

            <div className="prog-decoration icon-cloud">
              <img src="https://sandboxhub71.trianglemena.xyz/impact-report/2026/images/CloudSun.svg" alt="Cloud" />
            </div>
            <div className="line-vertical-top" />
            <div className="line-diag-right" />
            <div className="line-diag-left" />
            <div className="prog-decoration icon-monitor">
              <img src="https://sandboxhub71.trianglemena.xyz/impact-report/2026/images/MonitorPlay.svg" alt="Monitor" />
            </div>
            <div className="prog-decoration icon-spark">
              <img src="https://sandboxhub71.trianglemena.xyz/impact-report/2026/images/spark.svg" alt="Spark" />
            </div>

            <svg viewBox="0 0 536 536" className="prog-svg-main">
              <circle
                cx="268" cy="268" r="266"
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1.5"
              />
              <circle
                ref={circleRef}
                cx="268" cy="268" r="266"
                fill="none"
                stroke="#2ecc8f"
                strokeWidth="3.5"
                strokeLinecap="round"
                transform="rotate(-90 268 268)"
                style={{ filter: "drop-shadow(0 0 8px rgba(46,204,143,0.4))" }}
              />
            </svg>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="prog-right">
          {/* 
            prog-cards-inner: top-anchored block.
            Card [01] always stays at its position.
            Cards below it expand downward as they activate.
          */}
          <div className="prog-cards-inner">
            {PROGRAMS.map((item, i) => (
              <div
                key={i}
                ref={(el) => (itemsRef.current[i] = el)}
                className="prog-card"
              >
                <div className="prog-card-header">
                  <span ref={(el) => (numRefs.current[i] = el)} className="prog-card-num">
                    {item.num}
                  </span>
                  <span className="prog-card-title">{item.name}</span>
                </div>

                <div ref={(el) => (descRefs.current[i] = el)} className="prog-card-body">
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>
    </div>
  );
};

export default ProgressSection;