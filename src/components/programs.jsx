import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

const PROGRAM_DATA = [
  {
    id: 0,
    title: "Init",
    desc: "Operated by partner venture builders, it guides founders through problem identification, product development, and early validation.",
    logos: {
      big: "https://sandboxhub71.trianglemena.xyz/impact-report/2026/images/init-logo-big.png",
      normal: "https://sandboxhub71.trianglemena.xyz/impact-report/2026/images/init-logo-normal.png"
    },
    stages: ["Ideation", "Pre-seed"]
  },
  {
    id: 1,
    title: "Access",
    desc: "Provides high-potential startups with capital, market access, and in-kind support to scale their ventures from Abu Dhabi to the world.",
    logos: {
      big: "https://sandboxhub71.trianglemena.xyz/impact-report/2026/images/access-logo-normal.png",
      normal: "https://sandboxhub71.trianglemena.xyz/impact-report/2026/images/access-logo-normal.png"
    },
    stages: ["Seed", "Series A"]
  },
  {
    id: 2,
    title: "Bright",
    desc: "Startups in Bright are positioned to enter new markets, secure significant funding rounds and strengthen their global presence.",
    logos: {
      big: "https://sandboxhub71.trianglemena.xyz/impact-report/2026/images/bright-logo-big.png",
      normal: "https://sandboxhub71.trianglemena.xyz/impact-report/2026/images/bright-logo-normal.png"
    },
    stages: ["Series B", "Series C"]
  }
];

const ProgramSlider = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isInside, setIsInside] = useState(false); // Controls cursor visibility
  const [isDragging, setIsDragging] = useState(false);

  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const STEP_WIDTH = 440;

  useEffect(() => {
    x.set(-activeIndex * STEP_WIDTH);
  }, [activeIndex, x]);

  const handleDragEnd = (event, info) => {
    setIsDragging(false);
    const dragThreshold = 100;
    if (info.offset.x < -dragThreshold && activeIndex < PROGRAM_DATA.length - 1) {
      setActiveIndex(prev => prev + 1);
    } else if (info.offset.x > dragThreshold && activeIndex > 0) {
      setActiveIndex(prev => prev - 1);
    } else {
      x.set(-activeIndex * STEP_WIDTH);
    }
  };

  return (
    <section 
      className="relative bg-[#E4E7E8] py-32 overflow-hidden select-none"
      style={{ cursor: isInside ? 'none' : 'auto' }} // Only hide real cursor inside section
      onMouseMove={(e) => setCursorPos({ x: e.clientX, y: e.clientY })}
      onMouseEnter={() => setIsInside(true)}
      onMouseLeave={() => setIsInside(false)}
    >
      {/* Custom Drag Cursor restricted to this section */}
      <AnimatePresence>
        {isInside && (
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: isDragging ? 0.8 : 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed top-0 left-0 z-[9999] pointer-events-none bg-black text-white text-[13px] uppercase font-light px-5 py-2 rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
            style={{ 
              x: cursorPos.x, 
              y: cursorPos.y,
              left: 0, 
              top: 0 
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 300, mass: 0.5 }}
          >
            Drag
          </motion.div>
        )}
      </AnimatePresence>

      {/* Title & Description */}
      <div className="text-center mb-16 px-4">
        <h3 className="text-5xl md:text-[56px] font-medium uppercase tracking-tight leading-none mb-6 max-w-2xl mx-auto">
          Hub71's programs have evolved
        </h3>
        <p className="font-light text-gray-600 font-sans">
          Supporting startups at every stage of their journey
        </p>
      </div>

      {/* Slider Container */}
      <div className="relative h-[650px] flex items-center">
        <motion.div
          drag="x"
          dragConstraints={{ left: -(PROGRAM_DATA.length - 1) * STEP_WIDTH, right: 0 }}
          style={{ x: springX }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          className="flex gap-[90px] px-[calc(50%-175px)]"
        >
          {PROGRAM_DATA.map((prog, i) => (
            <Card key={prog.id} program={prog} isActive={activeIndex === i} />
          ))}
        </motion.div>
      </div>

      {/* Global Timeline */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[436px] h-20 overflow-hidden">
        <div className="absolute bottom-[5px] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#8F60D9] to-transparent z-0" />
        <motion.div 
          className="flex w-full h-full"
          animate={{ x: `-${activeIndex * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {PROGRAM_DATA.map((prog) => (
            <div key={prog.id} className="min-w-full flex justify-around items-end pb-1 relative z-10">
              {prog.stages.map((stage) => (
                <div key={stage} className="flex flex-col items-center gap-4">
                  <span className="text-[#8358C5] font-sans font-medium text-base">{stage}</span>
                  <div className="w-1.5 h-1.5 bg-[#8358C5] rounded-full translate-y-1/2" />
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ program, isActive }) => {
  return (
    <motion.div
      animate={{ 
        scale: isActive ? 1.2 : 1,
        opacity: isActive ? 1 : 0.7 
      }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
      className="flex-shrink-0 w-[350px] min-h-[500px] bg-white rounded-[20px] p-12 relative flex flex-col items-center justify-center"
    >
      <div className="absolute top-5 left-5 w-2.5 h-2.5 border-t border-l border-black" />
      <div className="absolute top-5 right-5 w-2.5 h-2.5 border-t border-r border-black" />
      <div className="absolute bottom-5 left-5 w-2.5 h-2.5 border-b border-l border-black" />
      <div className="absolute bottom-5 right-5 w-2.5 h-2.5 border-b border-r border-black" />

      <div className="relative h-28 w-full flex items-center justify-center mb-10">
        <motion.img 
          src={program.logos.big} 
          className="absolute w-[300px] max-w-none"
          animate={{ opacity: isActive ? 0 : 1, y: isActive ? -10 : 0 }}
        />
        <motion.img 
          src={program.logos.normal} 
          className="absolute w-48"
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
        />
      </div>

      <motion.p 
        className="text-center font-sans font-light text-[15px] leading-relaxed text-gray-800"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
      >
        {program.desc}
      </motion.p>
    </motion.div>
  );
};

export default ProgramSlider;