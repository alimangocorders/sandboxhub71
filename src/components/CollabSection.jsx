import React, { useState, useEffect, useRef } from 'react';
import collabimg from '../assets/images/new-img-2.jpg';
import { MoveRight } from 'lucide-react';

const SLIDE_TIME = 5000;

const slides = [
  {
    eyebrow: "Driving impact through a connected ecosystem",
    title: "Startup – To – Startup<br class='hidden xs:block'> Collaborations",
    desc: "Fuze and Bit2Me collaborated to strengthen digital asset infrastructure across key markets.",
    label: "Startup – To – Startup<br class='hidden md:block'> Collaborations"
  },
  {
    eyebrow: "Shaping the future of policy",
    title: "Regulatory<br class='hidden xs:block'> Advancements",
    desc: "Leading discussions with global regulators to create a sustainable digital economy.",
    label: "Regulatory<br class='hidden md:block'> Advancements"
  },
  {
    eyebrow: "Fueling high-growth ventures",
    title: "Investor<br class='hidden xs:block'> Partnerships",
    desc: "Connecting world-class capital with the most ambitious founders in the region.",
    label: "Investor<br class='hidden md:block'> Partnerships"
  },
  {
    eyebrow: "National scale innovation",
    title: "Government-Backed<br class='hidden xs:block'> Initiatives",
    desc: "Partnering with public sectors to deploy blockchain solutions for citizens.",
    label: "Government-Backed<br class='hidden md:block'> Initiatives"
  },
  {
    eyebrow: "The foundation of success",
    title: "Angel Support<br class='hidden xs:block'> Network",
    desc: "Providing mentorship and early-stage funding to the next generation of unicorns.",
    label: "Angel Support<br class='hidden md:block'> Network"
  },
  {
    eyebrow: "Bridging corporate and agile",
    title: "Corporate<br class='hidden xs:block'> Partnerships",
    desc: "Creating synergy between industry giants and disruptive startup technologies.",
    label: "Corporate<br class='hidden md:block'> Partnerships"
  }
];

const CollabSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isCursorLeft, setIsCursorLeft] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  const sectionRef = useRef(null);
  const timerRef = useRef(null);

  // Check if user is using a touch platform on component mounting
  useEffect(() => {
    const checkDevice = () => {
      setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);
    };
    checkDevice();
  }, []);

  // Auto-slide logic
  useEffect(() => {
    startTimer();
    return () => clearTimeout(timerRef.current);
  }, [currentIndex]);

  const startTimer = () => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      handleNext();
    }, SLIDE_TIME);
  };

  const handleNext = () => {
    changeSlide((currentIndex + 1) % slides.length);
  };

  const handlePrev = () => {
    changeSlide((currentIndex - 1 + slides.length) % slides.length);
  };

  const changeSlide = (index) => {
    if (index === currentIndex) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsAnimating(false);
    }, 400);
  };

  // Custom Cursor Logic
  const handleMouseMove = (e) => {
    if (isTouchDevice) return;
    
    setCursorPos({ x: e.clientX, y: e.clientY });
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      setIsCursorLeft(e.clientX - rect.left < rect.width / 2);
    }
  };

  const handleSectionClick = (e) => {
    if (e.target.closest('.tab-item')) return;
    if (isCursorLeft) handlePrev();
    else handleNext();
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .no-scroller::-webkit-scrollbar { display: none !important; width: 0 !important; height: 0 !important; }
        .no-scroller { -ms-overflow-style: none !important; scrollbar-width: none !important; }
      `}} />

      <section 
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={handleSectionClick}
        className="relative w-full h-auto md:h-screen flex flex-col justify-between overflow-hidden bg-center bg-cover transition-all duration-700 select-none cursor-default md:cursor-none"
        style={{ backgroundImage: `url(${collabimg})` }}
      >
        {/* Dark readability masking filter overlay */}
        <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none" />

        {/* Custom follow cursor tracking mechanism (Active on Desktop pointer states) */}
        {!isTouchDevice && (
          <div 
            className="fixed top-0 left-0 w-[101px] h-[101px] rounded-full border border-white/30 bg-white/10 backdrop-blur-[2px] pointer-events-none z-[9999] flex items-center justify-center transition-opacity duration-300 -translate-x-1/2 -translate-y-1/2"
            style={{ 
              left: cursorPos.x, 
              top: cursorPos.y,
              opacity: isHovering ? 1 : 0,
              transform: `translate(-50%, -50%) rotate(${isCursorLeft ? '180deg' : '0deg'})`,
              transition: 'opacity 0.3s ease, transform 0.4s ease'
            }}
          >
            <MoveRight className="text-white w-5 h-5" />
          </div>
        )}

        {/* TOP COMPONENT LAYERING: Header Title Elements */}
        <div className="relative z-10 w-full pt-10 pb-4 px-5 xs:px-6 sm:px-12 md:pt-14 md:px-20 box-border">
          <div className="space-y-2 md:space-y-4 max-w-full">
            <p className={`text-white text-[11px] xs:text-xs sm:text-sm md:text-lg lg:text-[24px] uppercase font-light tracking-widest leading-normal opacity-90 transition-all duration-700 ${isAnimating ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'}`}>
              {slides[currentIndex].eyebrow}
            </p>
            <h1 
              className={`text-white text-xl xs:text-2xl sm:text-3xl md:text-[40px] lg:text-[52px] font-medium leading-[1.25] tracking-tight transition-all duration-700 delay-100 ${isAnimating ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'}`}
              dangerouslySetInnerHTML={{ __html: slides[currentIndex].title }}
            />
          </div>
        </div>

        {/* MIDDLE COMPONENT LAYERING: Fluid Content Block */}
        <div className="relative z-10 w-full pt-4 pb-12 md:pb-6 px-5 xs:px-6 sm:px-12 md:px-20 box-border flex justify-start sm:justify-end">
          <p className={`w-full sm:max-w-[360px] md:max-w-[420px] text-[12px] xs:text-[13px] sm:text-[15px] md:text-[16px] leading-relaxed font-light text-white/80 text-left sm:text-right sm:mr-12 font-['Poppins'] transition-all duration-700 delay-200 ${isAnimating ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'}`}>
            {slides[currentIndex].desc}
          </p>
        </div>

        {/* BOTTOM COMPONENT LAYERING: Seamless Card Grid Matrix */}
        <div className="relative z-10 w-full bg-black/60 md:bg-black/20 backdrop-blur-md border-t border-white/10 mt-auto">
          <nav className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 overflow-hidden no-scroller">
            {slides.map((slide, i) => (
              <div 
                key={i}
                onClick={(e) => { e.stopPropagation(); changeSlide(i); }}
                className={`tab-item group px-4 py-5 sm:p-5 md:p-6 cursor-pointer transition-all duration-300 border-b border-r border-white/10 last:border-r-0 md:border-b-0 ${currentIndex === i ? 'bg-white/15 md:bg-white/5' : 'hover:bg-white/5'}`}
              >
                <div className="flex items-center justify-between md:block mb-2">
                  <span className={`block text-[11px] sm:text-xs md:text-sm transition-colors duration-300 ${currentIndex === i ? 'text-white font-bold' : 'text-white/40'}`}>
                    0{i + 1}
                  </span>
                  
                  {/* Miniature Sync Loading Bar Track */}
                  <div className="w-10 md:w-full h-[2px] bg-white/20 relative overflow-hidden rounded-full md:mt-2">
                    <div 
                      className="absolute top-0 left-0 h-full bg-white transition-none"
                      style={{ 
                        width: currentIndex === i ? '100%' : '0%',
                        transition: currentIndex === i ? `width ${SLIDE_TIME}ms linear` : 'none'
                      }}
                    />
                  </div>
                </div>

                {/* Perfected Card Font Layout Sizing */}
                <span 
                  className={`text-[11px] xs:text-[12px] md:text-[13px] lg:text-[14px] uppercase font-medium leading-tight tracking-wide block transition-all duration-300 ${currentIndex === i ? 'text-white opacity-100 font-semibold' : 'text-white/60 font-normal'}`}
                  dangerouslySetInnerHTML={{ __html: slide.label }}
                />
              </div>
            ))}
          </nav>
        </div>
      </section>
    </>
  );
};

export default CollabSection;