import React, { useState, useEffect, useRef, useMemo } from 'react';
import empowerimg from '../assets/images/image-3.webp';

// OPTIMIZATION 1: Isolated structural data outside component limits to avoid memory trash collection
const hotspotsData = [
  {
    id: 1,
    top: '25%',
    left: '15%',
    mobileLeft: '10%',
    label: 'Talent sourcing<br>& integration',
    tooltip: 'Information about sourcing top talent globally and integrating them effectively.',
    type: 'interactive',
  },
  {
    id: 2,
    top: '25%',
    left: '50%',
    mobileLeft: '45%',
    type: 'dot',
  },
  {
    id: 3,
    top: '25%',
    left: '85%',
    mobileLeft: '80%',
    type: 'interactive',
    label: 'Strategic talent<br>partnership',
    tooltip: 'Details on long-term partnerships and capability building.',
  },
  {
    id: 4,
    top: '60%',
    left: '50%',
    mobileLeft: '45%',
    type: 'dot',
  },
  {
    id: 5,
    top: '60%',
    left: '85%',
    mobileLeft: '80%',
    type: 'interactive',
    label: 'R&D access',
    tooltip: 'Unlock innovation through our extensive research and development resources.',
  },
];

const EmpowerSection = () => {
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // OPTIMIZATION 2: Single Resize Event listener controlling an explicit boolean hook safely
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    handleResize(); // Initialize check on load
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Global click tracking to close tooltips smoothly
  useEffect(() => {
    const handleClickOutside = () => setActiveHotspot(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleToggle = (e, id) => {
    e.stopPropagation();
    setActiveHotspot(activeHotspot === id ? null : id);
  };

  return (
    <section
      className="relative w-full min-h-[420px] sm:min-h-[500px] md:min-h-[600px] overflow-hidden bg-cover bg-center pb-10 sm:pb-16 md:pb-20 font-inter bg-black/90"
      style={{
        backgroundImage: `url(${empowerimg})`,
      }}
    >
      {/* HEADLINE */}
      <div className="absolute bottom-[6%] sm:bottom-[8%] left-[4%] sm:left-[5%] z-[2] max-w-[90%] sm:max-w-[70%]">
        <h1 className="font-roc-grotesk text-[clamp(22px,4.5vw,56px)] font-medium leading-[1.08] text-white uppercase font-stretch-expanded">
          Empowering Tomorrow&apos;s<br />Talent Today
        </h1>
      </div>

      {/* GRID AREA */}
      <div className="absolute top-0 right-0 sm:right-[10%] w-full sm:w-[65%] h-full pointer-events-none">
        
        {/* Horizontal Lines (Optimized using hardware composite rendering styles) */}
        <div
          className="absolute left-0 sm:left-[-10%] w-full sm:w-[120%] h-px bg-gradient-to-r from-transparent via-white/40 to-transparent transform translate-z-0"
          style={{ top: '25%' }}
        />
        <div
          className="absolute left-0 sm:left-[-10%] w-full sm:w-[120%] h-px bg-gradient-to-r from-transparent via-white/40 to-transparent transform translate-z-0"
          style={{ top: '60%' }}
        />

        {/* Vertical Lines */}
        <div
          className="absolute top-0 w-px h-[80%] bg-gradient-to-b from-transparent via-white/40 to-transparent transform translate-z-0"
          style={{ left: '15%' }}
        />
        <div
          className="absolute top-0 w-px h-[80%] bg-gradient-to-b from-transparent via-white/40 to-transparent transform translate-z-0"
          style={{ left: '50%' }}
        />
        <div
          className="absolute top-0 w-px h-[80%] bg-gradient-to-b from-transparent via-white/40 to-transparent transform translate-z-0"
          style={{ left: '85%' }}
        />

        {/* HOTSPOTS LOOP */}
        {hotspotsData.map((item) => {
          const calculatedLeft = isMobile ? item.mobileLeft : item.left;
          const isActive = activeHotspot === item.id;

          return (
            <div
              key={item.id}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 pointer-events-auto flex items-center justify-center will-change-transform"
              style={{
                top: item.top,
                left: calculatedLeft,
              }}
            >
              {item.type === 'dot' ? (
                <div className="w-1.5 h-1.5 sm:w-1 sm:h-1 bg-white rounded-full" />
              ) : (
                // OPTIMIZATION 3: Isolated sub-elements within custom internal nodes to skip execution tree re-processing
                <HotspotCell 
                  item={item} 
                  isActive={isActive} 
                  onToggle={(e) => handleToggle(e, item.id)} 
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

// OPTIMIZATION 4: Created an isolated Hotspot Cell component so opening one tooltip doesn't force performance checks on other active pins
const HotspotCell = React.memo(({ item, isActive, onToggle }) => {
  return (
    <div className="relative flex items-center justify-center">
      {/* PLUS BUTTON */}
      <button
        onClick={onToggle}
        aria-label={`Toggle tooltip details view for ${item.label?.replace('<br />', ' ')}`}
        className={`
          text-white 
          text-xl sm:text-2xl 
          font-light 
          p-2 sm:p-2.5 
          flex items-center justify-center 
          transition-transform duration-300 ease-out
          hover:scale-125 
          ${isActive ? 'rotate-45' : 'rotate-0'}
        `}
      >
        +
      </button>

      {/* LABEL */}
      <div
        className="
          absolute 
          top-[110%] sm:top-[90%] 
          left-1/2 sm:left-full 
          -translate-x-1/2 sm:translate-x-0
          text-white 
          font-bold 
          whitespace-nowrap 
          font-roc-grotesk 
          font-stretch-expanded 
          text-[10px] sm:text-[clamp(12px,1.1vw,28px)]
          pointer-events-none
        "
        dangerouslySetInnerHTML={{ __html: item.label }}
      />

      {/* TOOLTIP */}
      <div
        className={`
          absolute 
          top-full 
          left-1/2 
          -translate-x-1/2
          w-[180px] sm:w-max 
          max-w-[220px] sm:max-w-[250px]
          bg-[#111] 
          text-white 
          p-2 sm:p-3 
          rounded-md 
          text-[11px] sm:text-[13px] 
          text-center 
          shadow-2xl 
          border border-white/10 
          z-20 
          transition-all duration-300 ease-out
          ${
            isActive
              ? 'opacity-100 visible translate-y-[-10px]'
              : 'opacity-0 invisible translate-y-2'
          }
        `}
      >
        {item.tooltip}
        {/* ARROW */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 rotate-180 border-[6px] border-t-[#111] border-x-transparent border-b-transparent" />
      </div>
    </div>
  );
});

HotspotCell.displayName = "HotspotCell";

export default EmpowerSection;