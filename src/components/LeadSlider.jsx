import { useState, useRef, useEffect } from "react";
import alwan from "../assets/images/alwan.png";
import jasim from "../assets/images/jasim.png";

const slides = [
  {
    eyebrow: "Guided by our visionary leadership",
    name: ["AHMAD", "ALI ALWAN"],
    ghostName: ["H.E AHMED", "JASIM AL ZAABI"],
    title: "CEO OF HUB71",
    desc: "Hub71 will continue enabling technology companies to realise their long-term ambitions. We remain focused on supporting founders as they build enduring technology businesses and contribute to the evolving startup ecosystem in Abu Dhabi.",
    img: alwan,
    imgAlt: "Ahmad Ali Alwan",
  },
  {
    eyebrow: "Guided by our visionary leadership",
    name: ["H.E AHMED", "JASIM AL ZAABI"],
    ghostName: null,
    title: "CHAIRMAN OF HUB71",
    desc: "Abu Dhabi has never waited for the world to catch up. As Hub71 grows in ambition and reach, so does Abu Dhabi's leadership in shaping the future of innovation-led economies. The foundations are in place, and the best of what we are building is yet to come.",
    img: jasim,
    imgAlt: "H.E Ahmed Jasim Al Zaabi",
  },
];

export default function LeadershipSlider() {
  const [current, setCurrent] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const animating = useRef(false);

  const goTo = (idx) => {
    if (animating.current || idx === current) return;
    animating.current = true;
    setLeaving(true);

    setTimeout(() => {
      setCurrent(idx);
      setLeaving(false);
      setTimeout(() => {
        animating.current = false;
      }, 560);
    }, 260);
  };

  return (
    <section
      className="
        relative w-[100%] overflow-hidden
        min-h-screen md:h-screen
        bg-[#14151d]
        text-white
        font-[Poppins]
        flex flex-col md:block
      "
    >

      {/* IMAGES CONTAINER */}
      {/* FIXED: Restructured container width and layout to limit portrait images from scaling exponentially */}
      <div className="relative h-[45vh] sm:h-[50vh] md:absolute md:top-0 md:left-0 md:h-full w-full md:w-[45%] lg:w-[40%] xl:w-[35%] flex items-end justify-center">
        {slides.map((s, i) => (
          <img
            key={i}
            src={s.img}
            alt={s.imgAlt}
            className="
              absolute bottom-0
              pointer-events-none object-contain object-bottom
              transition-opacity duration-700
              w-auto max-w-[90%] md:max-w-[110%] h-full max-h-[95%] md:max-h-[90vh]
              z-10
            "
            style={{
              opacity: i === current ? 1 : 0,
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 85%, transparent 100%)",
              maskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 85%, transparent 100%)",
            }}
          />
        ))}
        {/* Mobile-only gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#14151d] via-transparent to-transparent md:hidden z-20" />
      </div>

      {/* CONTENT PANEL */}
      {/* ADJUSTED: Width and alignment offsets to give the typography breathing room away from the asset container */}
      <div
        className="
          relative z-10
          w-full md:w-[55%] lg:w-[60%] md:absolute md:top-0 md:right-0 md:h-full
          flex items-center
          overflow-hidden
        "
      >
        <div
          className="flex w-full"
          style={{
            transform: `translateX(-${current * 100}%)`,
            transition: "transform 0.55s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          {slides.map((s, i) => (
            <SlideContent
              key={i}
              slide={s}
              isActive={i === current}
              isLeaving={i === current && leaving}
            />
          ))}
        </div>
      </div>

      {/* NAVIGATION CONTROLS */}
      {/* FIXED: Shifted position rules dynamically based on the revised text panel bounds */}
      <div
        className="
          relative md:absolute z-20 
          flex gap-3 sm:gap-4
          pb-10 pt-4 md:p-0
          md:bottom-12
          justify-center md:justify-start
          md:left-[calc(45%+40px)] lg:left-[calc(40%+64px)] xl:left-[calc(35%+80px)]
        "
      >
        <ArrowButton
          direction="left"
          disabled={current === 0}
          onClick={() => goTo(current - 1)}
        />
        <ArrowButton
          direction="right"
          disabled={current === slides.length - 1}
          onClick={() => goTo(current + 1)}
        />
      </div>
    </section>
  );
}

function SlideContent({ slide, isActive, isLeaving }) {
  const getBaseStyle = (delay = "0s", yOffset = "12px") => ({
    opacity: isLeaving ? 0 : isActive ? 1 : 0,
    transform: isLeaving
      ? "translateY(-8px)"
      : isActive
      ? "translateY(0)"
      : `translateY(${yOffset})`,
    transition: `opacity 0.5s ease ${delay}, transform 0.5s ease ${delay}`,
  });

  const ghostStyle = {
    opacity: isActive && !isLeaving && slide.ghostName ? 0.05 : 0,
    transform: isActive ? "translateX(0)" : "translateX(20px)",
    transition: "all 0.8s ease",
  };

  return (
    <div
      className="
        flex-shrink-0
        w-full
        flex flex-col justify-center
        px-6 sm:px-12 md:px-10 lg:px-16 xl:px-24
        py-4 md:py-0
        min-h-[380px] md:h-full
        box-border
      "
      style={{
        pointerEvents: isActive ? "auto" : "none",
      }}
    >
      <p
        className="
          uppercase tracking-[0.2em] mb-3 md:mb-6
          text-[10px] sm:text-xs md:text-sm
        "
        style={{ color: "#00b0f5", fontWeight: 400, ...getBaseStyle("0s", "10px") }}
      >
        {slide.eyebrow}
      </p>

      {/* NAME SECTION */}
      <div className="relative mb-3 md:mb-5">
        <h2
          className="
            uppercase leading-[1.1]
            text-[30px] sm:text-[44px] md:text-[46px] lg:text-[56px] xl:text-[64px]
            font-bold tracking-tight
          "
          style={{
            opacity: isLeaving ? 0.2 : isActive ? 1 : 0.2,
            transition: "opacity 0.5s ease",
          }}
        >
          {slide.name[0]} <br />
          {slide.name[1]}
        </h2>

        {/* GHOST NAME */}
        {slide.ghostName && (
          <p
            className="
              hidden lg:block
              absolute top-0 left-[55%] xl:left-[60%]
              uppercase pointer-events-none whitespace-nowrap
              text-[46px] lg:text-[56px] xl:text-[64px]
              font-light italic
            "
            style={ghostStyle}
          >
            {slide.ghostName[0]} <br />
            {slide.ghostName[1]}
          </p>
        )}
      </div>

      <p
        className="
          uppercase tracking-[0.15em] mb-4 md:mb-8
          text-xs sm:text-sm md:text-base lg:text-lg
        "
        style={{ fontWeight: 300, ...getBaseStyle("0.09s") }}
      >
        {slide.title}
      </p>

      {/* ACCENT LINE */}
      <div
        className="w-16 md:w-full mb-6 md:mb-10 h-[2px] md:h-[1px]"
        style={{
          background: "linear-gradient(to right, #00b0f5, transparent)",
          transformOrigin: "left",
          ...getBaseStyle("0.12s"),
        }}
      />

      <p
        className="
          text-[13px] sm:text-[15px] md:text-[16px]
          leading-relaxed
          max-w-full md:max-w-[480px] lg:max-w-[540px]
          opacity-80
        "
        style={{
          color: "rgba(255,255,255,0.85)",
          ...getBaseStyle("0.25s"),
        }}
      >
        {slide.desc}
      </p>
    </div>
  );
}

function ArrowButton({ direction, disabled, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="
        group
        w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16
        rounded-full
        border border-white/20 hover:border-[#00b0f5]
        flex items-center justify-center
        transition-all
        active:scale-90
        bg-[#14151d]/50 md:bg-transparent
        backdrop-blur-sm md:backdrop-blur-none
      "
      style={{
        opacity: disabled ? 0.2 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      <svg
        width="18"
        height="18"
        className="md:w-5 md:h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        {direction === "left" ? (
          <path d="M15 18l-6-6 6-6" />
        ) : (
          <path d="M9 18l6-6-6-6" />
        )}
      </svg>
    </button>
  );
}