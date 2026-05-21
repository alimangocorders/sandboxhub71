import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";

import accessimage from "../assets/images/icon-access.webp";
import brightimage from "../assets/images/icon-bright.webp";
import initiate from "../assets/images/icon-initiate.webp";

const PROGRAM_DATA = [
  {
    id: 0,
    title: "Init",
    desc: "Operated by partner venture builders, it guides founders through problem identification, product development, and early validation.",
    logos: { big: initiate, normal: initiate },
    stages: ["Ideation", "Pre-seed"],
  },
  {
    id: 1,
    title: "Access",
    desc: "Provides high-potential startups with capital, market access, and in-kind support to scale their ventures from Abu Dhabi to the world.",
    logos: { big: accessimage, normal: accessimage },
    stages: ["Seed", "Series A"],
  },
  {
    id: 2,
    title: "Bright",
    desc: "Startups in Bright are positioned to enter new markets, secure significant funding rounds and strengthen their global presence.",
    logos: { big: brightimage, normal: brightimage },
    stages: ["Series B", "Series C"],
  },
];

const ProgramSlider = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isInside, setIsInside] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [cardWidth, setCardWidth] = useState(350);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  };

  useEffect(() => {
    const updateWidth = () => {
      const currentWidth = window.innerWidth;
      setWindowWidth(currentWidth);
      if (currentWidth < 640) {
        setCardWidth(currentWidth - 64);
      } else if (currentWidth < 1024) {
        setCardWidth(360);
      } else {
        setCardWidth(350);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const gap = useMemo(() => (windowWidth < 640 ? 24 : 90), [windowWidth]);
  const STEP_WIDTH = useMemo(() => cardWidth + gap, [cardWidth, gap]);

  useEffect(() => {
    const centerOffset = (windowWidth - cardWidth) / 2;
    x.set(-(activeIndex * STEP_WIDTH) + centerOffset);
  }, [activeIndex, x, STEP_WIDTH, cardWidth, windowWidth]);

  const handleDragEnd = (event, info) => {
    setIsDragging(false);
    const dragThreshold = 80;

    if (info.offset.x < -dragThreshold && activeIndex < PROGRAM_DATA.length - 1) {
      setActiveIndex((prev) => prev + 1);
    } else if (info.offset.x > dragThreshold && activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    } else {
      const centerOffset = (windowWidth - cardWidth) / 2;
      x.set(-(activeIndex * STEP_WIDTH) + centerOffset);
    }
  };

  return (
    <section
      className="relative overflow-hidden bg-[#E4E7E8] py-16 sm:py-20 lg:py-32 select-none"
      style={{ cursor: isInside ? "none" : "auto" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsInside(true)}
      onMouseLeave={() => setIsInside(false)}
    >
      {/* CUSTOM CURSOR */}
      <AnimatePresence>
        {isInside && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: isDragging ? 0.8 : 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-black px-5 py-2 text-[13px] font-light uppercase text-white flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
            style={{
              x: cursorX,
              y: cursorY,
            }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
              mass: 0.5,
            }}
          >
            Drag
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADING */}
      <div className="mb-12 sm:mb-16 px-5 text-center">
        <h3 className="mx-auto max-w-[900px] text-[32px] leading-[1.1] font-medium uppercase tracking-tight sm:text-[44px] md:text-[52px] lg:text-[56px] text-gray-900">
          Hub71&apos;s programs have evolved
        </h3>
        <p className="mt-5 text-sm font-light text-gray-600 sm:text-base">
          Supporting startups at every stage of their journey
        </p>
      </div>

      {/* SLIDER */}
      <div className="relative flex items-center overflow-hidden h-[500px] sm:h-[560px] lg:h-[650px]">
        <motion.div
          drag="x"
          dragConstraints={{
            left: -(PROGRAM_DATA.length - 1) * STEP_WIDTH + (windowWidth - cardWidth) / 2,
            right: (windowWidth - cardWidth) / 2,
          }}
          style={{ x: springX }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          className="flex items-center"
        >
          {PROGRAM_DATA.map((prog, i) => (
            <div
              key={prog.id}
              style={{
                width: cardWidth,
                marginRight: i === PROGRAM_DATA.length - 1 ? 0 : gap,
              }}
              className="flex-shrink-0"
            >
              <Card program={prog} isActive={activeIndex === i} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* TIMELINE */}
      <div className="relative mt-2 mx-auto w-[92%] max-w-[436px] h-20 overflow-hidden">
        {/* Adjusted gradient to use the high-contrast purple tone */}
        <div className="absolute bottom-[5px] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#6339A6] to-transparent z-0" />

        <motion.div
          className="flex h-full w-full"
          animate={{ x: `-${activeIndex * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {PROGRAM_DATA.map((prog) => (
            <div key={prog.id} className="relative z-10 flex min-w-full items-end justify-around pb-1">
              {prog.stages.map((stage) => (
                <div key={stage} className="flex flex-col items-center gap-3 sm:gap-4">
                  {/* OPTIMIZATION: Updated to text-[#6339A6] to hit safe 4.85:1 contrast requirements */}
                  <span className="text-center text-xs font-medium text-[#6339A6] sm:text-sm md:text-base tracking-wide">
                    {stage}
                  </span>
                  <div className="h-1.5 w-1.5 translate-y-1/2 rounded-full bg-[#6339A6]" />
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Card = React.memo(({ program, isActive }) => {
  return (
    <motion.div
      animate={{
        scale: isActive ? 1.05 : 0.92,
        opacity: isActive ? 1 : 0.55,
      }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
      className="relative flex min-h-[420px] w-full flex-col items-center justify-center rounded-[20px] bg-white px-6 py-10 sm:min-h-[480px] sm:px-8 lg:min-h-[500px] lg:px-12"
    >
      <div className="absolute left-5 top-5 h-2.5 w-2.5 border-l border-t border-black" />
      <div className="absolute right-5 top-5 h-2.5 w-2.5 border-r border-t border-black" />
      <div className="absolute bottom-5 left-5 h-2.5 w-2.5 border-b border-l border-black" />
      <div className="absolute bottom-5 right-5 h-2.5 w-2.5 border-b border-r border-black" />

      <div className="relative mb-8 flex h-24 w-full items-center justify-center sm:h-28 lg:mb-10">
        <motion.img
          src={program.logos.big}
          alt=""
          className="absolute w-[180px] sm:w-[240px] lg:w-[300px] object-contain"
          animate={{
            opacity: isActive ? 0 : 1,
            y: isActive ? -10 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.img
          src={program.logos.normal}
          alt=""
          className="absolute w-32 sm:w-40 lg:w-48 object-contain"
          animate={{
            opacity: isActive ? 1 : 0,
            y: isActive ? 0 : 10,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="overflow-hidden w-full">
        <motion.p
          className="text-center font-sans text-sm font-light leading-relaxed text-gray-800 sm:text-[15px] lg:text-base"
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isActive ? "auto" : 0,
            opacity: isActive ? 1 : 0,
          }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          {program.desc}
        </motion.p>
      </div>
    </motion.div>
  );
});

Card.displayName = "Card";

export default ProgramSlider;