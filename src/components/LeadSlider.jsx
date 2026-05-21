import { useState, useRef, memo } from "react";
import alwan from "../assets/images/alwan.webp";
import jasim from "../assets/images/jasim.webp";

const slides = [
  {
    eyebrow: "Guided by our visionary leadership",
    name: ["AHMAD", "ALI ALWAN"],
    ghostName: ["H.E AHMED", "JASIM AL ZAABI"],
    title: "CEO OF HUB71",
    desc: "Hub71 will continue enabling technology companies to realise their long-term ambitions...",
    img: alwan,
    imgAlt: "Ahmad Ali Alwan",
  },
  {
    eyebrow: "Guided by our visionary leadership",
    name: ["H.E AHMED", "JASIM AL ZAABI"],
    ghostName: null,
    title: "CHAIRMAN OF HUB71",
    desc: "Abu Dhabi has never waited for the world to catch up...",
    img: jasim,
    imgAlt: "H.E Ahmed Jasim Al Zaabi",
  },
];

export default function LeadershipSlider() {
  const [current, setCurrent] = useState(0);
  const animating = useRef(false);

  const goTo = (idx) => {
    if (animating.current || idx === current) return;
    animating.current = true;

    setCurrent(idx);

    setTimeout(() => {
      animating.current = false;
    }, 600);
  };

  return (
    <section
      aria-label="Leadership slider"
      className="relative w-full overflow-hidden min-h-screen md:h-screen bg-[#14151d] text-white font-[Poppins] flex flex-col md:block"
    >
      {/* IMAGES */}
      <div className="relative h-[45vh] sm:h-[50vh] md:absolute md:top-0 md:left-0 md:h-full w-full md:w-[45%] lg:w-[40%] xl:w-[35%] flex items-end justify-center">
        {slides.map(
          (s, i) =>
            i === current && (
              <img
                key={i}
                src={s.img}
                alt={s.imgAlt}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                width="500"
                height="700"
                className="absolute bottom-0 pointer-events-none object-contain object-bottom w-auto max-w-[90%] md:max-w-[110%] h-full max-h-[95%] md:max-h-[90vh] z-10 transition-opacity duration-700 image-mask"
              />
            )
        )}

        {/* Mobile gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#14151d] via-transparent to-transparent md:hidden z-20" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 w-full md:w-[55%] lg:w-[60%] md:absolute md:top-0 md:right-0 md:h-full flex items-center overflow-hidden">
        <div
          className={`flex w-full slider slider-${current}`}
        >
          {slides.map((s, i) => (
            <SlideContent
              key={i}
              slide={s}
              isActive={i === current}
            />
          ))}
        </div>
      </div>

      {/* NAV */}
      <div className="relative md:absolute z-20 flex gap-3 sm:gap-4 pb-10 pt-4 md:p-0 md:bottom-12 justify-center md:justify-start md:left-[calc(45%+40px)] lg:left-[calc(40%+64px)] xl:left-[calc(35%+80px)]">
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

/* ========================= */
/* SLIDE CONTENT (MEMOIZED) */
/* ========================= */

const SlideContent = memo(function SlideContent({ slide, isActive }) {
  return (
    <div
      className={`flex-shrink-0 w-full flex flex-col justify-center px-6 sm:px-12 md:px-10 lg:px-16 xl:px-24 py-4 md:py-0 min-h-[380px] md:h-full box-border transition-all duration-500 ${
        isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <p className="uppercase tracking-[0.2em] mb-3 md:mb-6 text-[10px] sm:text-xs md:text-sm text-[#00b0f5]">
        {slide.eyebrow}
      </p>

      <div className="relative mb-3 md:mb-5">
        <h2 className="uppercase leading-[1.1] text-[30px] sm:text-[44px] md:text-[46px] lg:text-[56px] xl:text-[64px] font-bold tracking-tight">
          {slide.name[0]} <br />
          {slide.name[1]}
        </h2>

        {slide.ghostName && (
          <p className="hidden lg:block absolute top-0 left-[55%] xl:left-[60%] uppercase pointer-events-none whitespace-nowrap text-[46px] lg:text-[56px] xl:text-[64px] font-light italic opacity-10">
            {slide.ghostName[0]} <br />
            {slide.ghostName[1]}
          </p>
        )}
      </div>

      <p className="uppercase tracking-[0.15em] mb-4 md:mb-8 text-xs sm:text-sm md:text-base lg:text-lg font-light">
        {slide.title}
      </p>

      <div className="w-16 md:w-full mb-6 md:mb-10 h-[2px] md:h-[1px] bg-gradient-to-r from-[#00b0f5] to-transparent" />

      <p className="text-[13px] sm:text-[15px] md:text-[16px] leading-relaxed max-w-full md:max-w-[480px] lg:max-w-[540px] opacity-80">
        {slide.desc}
      </p>
    </div>
  );
});

/* ========================= */
/* BUTTON */
/* ========================= */

function ArrowButton({ direction, disabled, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Previous slide" : "Next slide"}
      className="group w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border border-white/20 hover:border-[#00b0f5] flex items-center justify-center transition-all active:scale-90 bg-[#14151d]/50 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none"
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