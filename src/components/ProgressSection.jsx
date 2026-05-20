import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import progressimg from "../assets/images/prog.png";

// ── Do NOT call gsap.registerPlugin here — App.jsx handles it globally

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

const arcMap = [
  { start: -90, end: 30  },
  { start: 30,  end: 150 },
  { start: 150, end: 270 },
];

const ProgressSection = () => {
  const sectionRef     = useRef(null);
  const circleMainRef  = useRef(null);
  const circleSubRef   = useRef(null);
  const itemsRef       = useRef([]);
  const svgArcRef      = useRef(null);
  const currentStep    = useRef(-1);
  const stRef          = useRef(null);

  const drawArc = (index) => {
    if (!svgArcRef.current) return;
    const { el, circumference, cx, cy } = svgArcRef.current;
    const { start, end } = arcMap[index];
    let span = end - start;
    if (span <= 0) span += 360;
    const dashLength = (span / 360) * circumference;
    const gapLength  = circumference - dashLength;
    gsap.to(el, {
      duration: 1.2,
      ease: "power2.inOut",
      attr: {
        "stroke-dasharray":  `${dashLength} ${gapLength}`,
        "stroke-dashoffset": 0,
        transform:           `rotate(${start}, ${cx}, ${cy})`,
      },
    });
  };

  const updateLabel = (index) => {
    const main = circleMainRef.current;
    const sub  = circleSubRef.current;
    if (!main || !sub) return;
    gsap.to([main, sub], {
      opacity: 0, y: -8, duration: 0.3,
      onComplete() {
        main.textContent = "HUB71";
        sub.textContent  = PROGRAMS[index].sub;
        gsap.to([main, sub], { opacity: 1, y: 0, duration: 0.5 });
      },
    });
  };

  const setActive = (index) => {
    if (index === currentStep.current) return;
    currentStep.current = index;
    itemsRef.current.forEach((el, i) => {
      if (!el) return;
      el.classList.toggle("prog-item--active", i === index);
    });
    updateLabel(index);
    drawArc(index);
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // ── Inject SVG arc ────────────────────────────────────────────────────
    const circleEl = section.querySelector(".prog-circle");
    if (circleEl && !circleEl.querySelector("svg.prog-arc-svg")) {
      const r  = 266, cx = 268, cy = 268;
      const circumference = 2 * Math.PI * r;

      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", "0 0 536 536");
      svg.classList.add("prog-arc-svg");
      svg.style.cssText =
        "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;overflow:visible;z-index:0;";

      const track = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      track.setAttribute("cx", cx); track.setAttribute("cy", cy); track.setAttribute("r", r);
      track.setAttribute("fill", "none");
      track.setAttribute("stroke", "rgba(255,255,255,0.1)");
      track.setAttribute("stroke-width", "1.5");

      const arc = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      arc.setAttribute("cx", cx); arc.setAttribute("cy", cy); arc.setAttribute("r", r);
      arc.setAttribute("fill", "none");
      arc.setAttribute("stroke", "#2ecc8f");
      arc.setAttribute("stroke-width", "2.5");
      arc.setAttribute("stroke-linecap", "round");
      arc.setAttribute("stroke-dasharray", `0 ${circumference}`);
      arc.setAttribute("stroke-dashoffset", "0");
      arc.style.filter = "drop-shadow(0 0 8px rgba(46,204,143,0.5))";

      svg.appendChild(track);
      svg.appendChild(arc);
      circleEl.appendChild(svg);
      svgArcRef.current = { el: arc, circumference, cx, cy };
    }

    setActive(0);

    // ── Unified ST creator ────────────────────────────────────────────────
    const createST = () => {
      if (stRef.current) {
        stRef.current.kill();
        stRef.current = null;
      }

stRef.current = ScrollTrigger.create({
  trigger: section,



  start: "top top",

  end: `+=${PROGRAMS.length * 280}vh`,

  pin: true,

  pinSpacing: true,

  // 🔥 IMPORTANT
  refreshPriority: 1,

  preventOverlaps: true,

  anticipatePin: 1,

  invalidateOnRefresh: true,

  onUpdate(self) {
    const step = Math.min(
      Math.floor(self.progress * PROGRAMS.length),
      PROGRAMS.length - 1
    );

    setActive(step);
  },
});

      ScrollTrigger.refresh();
    };

    createST();

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => { createST(); }, 200);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
      if (stRef.current) stRef.current.kill();
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

        .prog {
          display: grid;
          grid-template-columns: 3fr 2fr;
          min-height: 100dvh;
          color: #fff;
          position: relative;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          font-family: 'Poppins', sans-serif;
          /*
            KEY FIX: isolation:isolate + z-index:1 creates a self-contained
            stacking context. This prevents HubSection's overflow:visible Swiper
            cards from painting on top of this section during GSAP pin.
            overflow:hidden is intentionally NOT set here — GSAP pin needs to
            be able to calculate and control the section's scroll position.
          */
          isolation: isolate;
          z-index: 1;
        }

        .prog-bg-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(5,10,18,0.85) 0%,
            rgba(5,10,18,0.55) 55%,
            rgba(5,10,18,0.25) 100%
          );
          pointer-events: none;
          z-index: 0;
        }

        .prog-left {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100dvh;
          padding: 2rem;
          box-sizing: border-box;
        }

        .prog-circle-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: min(536px, 90%);
          aspect-ratio: 1 / 1;
        }

        .prog-circle {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.15);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .prog-circle-label {
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .prog-circle-label .main {
          font-weight: 800;
          font-size: clamp(22px, 4vw, 48px);
          letter-spacing: 0.05em;
          line-height: 1;
          display: block;
        }

        .prog-circle-label .sub {
          font-weight: 700;
          font-size: clamp(16px, 2.5vw, 36px);
          color: #2ecc8f;
          letter-spacing: 0.04em;
          display: block;
          margin-top: 6px;
        }

        .prog-icon-tl {
          position: absolute;
          top: -11%;
          left: 50%;
          transform: translateX(-50%);
          opacity: 0.65;
        }
        .prog-icon-tl img { width: clamp(20px, 3.5vw, 34px); height: auto; }

        .prog-icon-line-t1 {
          position: absolute;
          top: 5.5%;
          left: 50%;
          width: 1px;
          height: 6%;
          background: rgba(255,255,255,0.2);
          transform: translateX(-50%);
        }

        .prog-icon-line-t2 {
          position: absolute;
          bottom: 26%;
          right: 12.5%;
          width: 1px;
          height: 6%;
          background: rgba(255,255,255,0.2);
          transform: rotate(311deg);
          transform-origin: top center;
        }

        .prog-icon-line-t3 {
          position: absolute;
          bottom: 26%;
          left: 12.5%;
          width: 1px;
          height: 6%;
          background: rgba(255,255,255,0.2);
          transform: rotate(-311deg);
          transform-origin: top center;
        }

        .prog-icon-bl {
          position: absolute;
          bottom: 15%;
          left: -3%;
          opacity: 0.5;
        }
        .prog-icon-bl img { width: clamp(14px, 2.5vw, 22px); height: auto; }

        .prog-spark {
          position: absolute;
          bottom: 15%;
          right: -2%;
        }
        .prog-spark img {
          width: clamp(14px, 2.5vw, 24px);
          height: auto;
          filter: drop-shadow(0 0 6px #2ecc8f);
        }

        .prog-right {
          position: relative;
          z-index: 1;
          background: rgba(217, 217, 217, 0.07);
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
          border-left: 1px solid rgba(255,255,255,0.07);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(40px, 6vh, 80px) clamp(28px, 5vw, 75px);
          min-height: 100dvh;
          box-sizing: border-box;
          width: 95%;
        }

        .prog-item {
          padding-block: clamp(18px, 2.5vh, 30px);
          border-top:    1px solid transparent;
          border-bottom: 1px solid transparent;
          transition:
            border-color 0.4s ease,
            padding-bottom 0.55s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .prog-item:first-child { border-top: none; }
        .prog-item:last-child  { border-bottom: none; }

        .prog-item--active {
          padding-bottom: clamp(120px, 18vh, 220px);
          border-top-color:    rgba(255,255,255,0.08) !important;
          border-bottom-color: rgba(255,255,255,0.08) !important;
        }

        .prog-item--active .prog-name { color: #ffffff; }

        .prog-item--active .prog-desc {
          max-height: 350px;
          opacity: 1;
          padding-top: 14px;
        }

        .prog-item-header {
          display: flex;
          align-items: center;
          gap: clamp(12px, 2vw, 26px);
        }

        .prog-num {
          font-size: clamp(10px, 1.1vw, 13px);
          font-weight: 500;
          color: rgba(255,255,255,0.3);
          flex-shrink: 0;
          font-family: monospace;
          letter-spacing: 0.1em;
        }

        .prog-name {
          font-weight: 700;
          font-size: clamp(16px, 2.2vw, 30px);
          color: rgba(255,255,255,0.4);
          transition: color 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.02em;
          line-height: 1.15;
        }

        .prog-desc {
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          padding-top: 0;
          padding-left: clamp(28px, 3.5vw, 58px);
          transition:
            max-height  0.55s cubic-bezier(0.4, 0, 0.2, 1),
            opacity     0.4s  ease 0.1s,
            padding-top 0.4s  ease;
        }

        .prog-desc p {
          font-size: clamp(13px, 1.3vw, 17px);
          font-weight: 400;
          color: rgba(255,255,255,0.68);
          max-width: 440px;
          line-height: 1.8;
          margin: 0;
          padding-bottom: 6px;
        }

        @media (min-width: 1400px) {
          .prog { grid-template-columns: 55% 45%; }
        }

        @media (max-width: 1400px) {
          .prog-right { width: 600px; }
        }

        @media (max-width: 1024px) {
          .prog { grid-template-columns: 1fr 1fr; }
          .prog-right { padding-inline: clamp(24px, 4vw, 52px); }
        }

        @media (max-width: 1100px) {
          .prog {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto;
            min-height: 100vh;
          }
          .prog-left { min-height: 55vw; padding: 48px 20px; }
          .prog-circle-wrap { width: min(380px, 72vw); }
          .prog-right {
            min-height: auto;
            width: 100%;
            border-left: none;
            border-top: 1px solid rgba(255,255,255,0.08);
            padding: 40px clamp(20px, 6vw, 56px);
            justify-content: flex-start;
          }
          .prog-item--active { padding-bottom: clamp(80px, 14vw, 140px); }
        }

        @media (max-width: 768px) {
          .prog-left { min-height: 60vw; padding: 40px 16px; }
          .prog-circle-wrap { width: min(300px, 68vw); }
          .prog-right { padding: 32px 20px; }
          .prog-item--active { padding-bottom: clamp(60px, 10vw, 100px); }
          .prog-name { font-size: clamp(15px, 4.5vw, 22px); }
          .prog-desc p { font-size: clamp(12px, 3.5vw, 15px); }
        }

        @media (max-width: 480px) {
          .prog-left { min-height: 56vw; padding: 32px 12px; }
          .prog-circle-wrap { width: min(240px, 72vw); }
          .prog-right { padding: 28px 16px; }
          .prog-item { padding-block: 14px; }
          .prog-item--active { padding-bottom: 72px; }
          .prog-item-header { gap: 10px; }
          .prog-name { font-size: clamp(14px, 5vw, 20px); }
          .prog-desc { padding-left: 22px; }
          .prog-desc p { font-size: 13px; line-height: 1.7; }
          .prog-circle-label .main { font-size: clamp(18px, 7vw, 26px); }
          .prog-circle-label .sub  { font-size: clamp(13px, 5vw, 20px); }
          .prog-icon-line-t2,
          .prog-icon-line-t3 { display: none; }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="prog"
        style={{ backgroundImage: `url(${progressimg})` }}
      >
        <div className="prog-bg-overlay" />

        <div className="prog-left">
          <div className="prog-circle-wrap">
            <div className="prog-circle">
              <div className="prog-circle-label">
                <span className="main" ref={circleMainRef}>HUB71</span>
                <span className="sub"  ref={circleSubRef}>+CLIMATECH</span>
              </div>

              <div className="prog-icon-tl">
                <img
                  src="https://sandboxhub71.trianglemena.xyz/impact-report/2026/images/CloudSun.svg"
                  alt="Cloud"
                />
              </div>
              <div className="prog-icon-line-t1" />
              <div className="prog-icon-line-t2" />
              <div className="prog-icon-line-t3" />

              <div className="prog-icon-bl">
                <img
                  src="https://sandboxhub71.trianglemena.xyz/impact-report/2026/images/MonitorPlay.svg"
                  alt="Monitor"
                />
              </div>
              <div className="prog-spark">
                <img
                  src="https://sandboxhub71.trianglemena.xyz/impact-report/2026/images/spark.svg"
                  alt="Spark"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="prog-right">
          {PROGRAMS.map((item, i) => (
            <div
              key={i}
              ref={(el) => (itemsRef.current[i] = el)}
              className="prog-item"
            >
              <div className="prog-item-header">
                <span className="prog-num">{item.num}</span>
                <span className="prog-name">{item.name}</span>
              </div>
              <div className="prog-desc">
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default ProgressSection;