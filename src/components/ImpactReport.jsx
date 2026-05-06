import React from 'react';

import Socialvideo from '../assets/social.mp4';

const ImpactReport = () => {


  return (
    <section className="bg-[#0A0F1E] min-h-screen w-full py-20 px-10 flex flex-col items-center font-roc">
      
      {/* Top Small Label */}
      <div className="mb-12">
        <p className="text-[#14b8a6] uppercase tracking-[0.4em] text-[10px] font-bold opacity-60">
          Impact Report 2026
        </p>
      </div>

      {/* Main Image Section with Asymmetrical Text */}
      <div className="relative w-full max-w-6xl mb-32">
        
        {/* Left Side Text */}
        <div className="absolute -left-12 top-10 z-10">
          <p className="text-white/40 uppercase tracking-widest text-xs mb-1 ml-1">From</p>
          <h2 className="text-white text-6xl font-black tracking-tighter uppercase leading-none">
            Abu Dhabi
          </h2>
        </div>

        {/* The Image Container */}
        <div className="w-full h-[350px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                      <video 
                src={Socialvideo } autoPlay loop muted playsInline 
                className="w-full h-full object-cover scale-150 brightness-110"
              />
        </div>

        {/* Right Side Text */}
        <div className="absolute -right-8 bottom-10 z-10 text-right">
          <p className="text-white/40 uppercase tracking-widest text-xs mb-1 mr-1">To the</p>
          <h2 className="text-white text-6xl font-black tracking-tighter uppercase leading-none">
            World
          </h2>
        </div>
      </div>

      {/* Bottom Content Area */}
      <div className="w-full max-w-6xl">
        {/* Decorative Divider Line */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#14b8a6]/30 to-transparent mb-16"></div>

        <div className="flex justify-between items-start">
          {/* Innovation Bracket Tag */}
          <div className="relative px-8 py-2 border-l border-r border-[#14b8a6]/30">
            <div className="absolute top-0 left-0 w-2 h-[1px] bg-[#14b8a6]/30"></div>
            <div className="absolute bottom-0 left-0 w-2 h-[1px] bg-[#14b8a6]/30"></div>
            <div className="absolute top-0 right-0 w-2 h-[1px] bg-[#14b8a6]/30"></div>
            <div className="absolute bottom-0 right-0 w-2 h-[1px] bg-[#14b8a6]/30"></div>
            <span className="text-white text-xs uppercase tracking-widest opacity-80 font-medium">
              Innovation
            </span>
          </div>

          {/* Right-aligned description */}
          <div className="max-w-md">
            <p className="text-white/70 text-sm leading-relaxed font-light">
              Abu Dhabi's emergence as a global technology hub is no longer a vision, 
              it is a reality taking shape through innovation, ambition, and bold execution.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactReport;