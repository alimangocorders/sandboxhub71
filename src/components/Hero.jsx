import React from 'react';
import heroVideo from '../assets/hero1.mp4';
import { Download } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative h-screen w-full bg-[#030808] overflow-hidden">
      {/* 1. SVG Mask Definition */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <clipPath id="impact-clip">
            <text 
              x="0" 
              y="110" 
              className="uppercase font-roc"
              style={{
                fontFamily: '"Roc Grotesk", sans-serif',
                fontWeight: 900,
                fontSize: '150px',
              }}
            >
              IMPACT
            </text>
          </clipPath>
        </defs>
      </svg>

      {/* 2. Main Background Video - Using the imported variable */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0 scale-105"
        src={heroVideo} autoPlay loop muted playsInline
      />

      {/* 3. Depth Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#030808] via-[#030808]/20 to-transparent w-full opacity-80" />

      {/* 4. Content Layer */}
      <div className="relative z-20 h-full w-full flex flex-col justify-end">
        <div className="hero-title select-none max-w-fit hero-left">
          <div className="relative">
            {/* The Masked Video Container */}
            <div 
              style={{ 
                clipPath: 'url(#impact-clip)', 
                WebkitClipPath: 'url(#impact-clip)',
                width: '700px',
                height: '140px'
              }}
              className="relative overflow-hidden"
            >
              <video 
                src={heroVideo} autoPlay loop muted playsInline 
                className="w-full h-full object-cover scale-150 brightness-110"
              />
            </div>

            <h2 className="text-[85px] font-roc font-light uppercase tracking-[2px] leading-none ml-40 -mt-6 text-white/80">
              Defined
            </h2>
          </div>

          {/* Download Column */}
          <div className="flex flex-col gap-6 items-end">
            <div className="h-96 w-[1px] bg-white/10 ml-auto mr-5"></div>
            
            <a href="https://sandboxhub71.trianglemena.xyz/impact-report/2026/impact-report-2026.pdf" 
               className="flex items-center gap-6 group" 
               download
            >
                <span className="text-white uppercase tracking-[0.25em] text-[10px] font-roc font-bold opacity-80 group-hover:opacity-100 transition-opacity">
                    Impact Report
                </span>
                <div className="w-12 h-12 border border-white/20 text-white hover:text-black rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                  <Download />
                </div>
            </a>
          </div>
        </div>

        <div className="absolute bottom-12 right-12 max-w-[340px]">
          <p className="text-white text-[14px] leading-[1.6] font-poppins font-light opacity-80 text-right">
            Innovation is most powerful when it drives meaningful impact, and Hub71 is leveraging this progress to shape a future focused ecosystem.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;