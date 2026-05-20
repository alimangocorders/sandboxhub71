import React from 'react';
import social from "../assets/social.mp4";

const SocialSection = () => {
  return (
    <section className="bg-[#0a0f1e] text-white flex flex-col pt-[72px] pb-[100px]">
      
      {/* 1. Gradient Label */}
      <p className="text-center tracking-[0.49em] text-[12px] font-normal uppercase bg-gradient-to-r from-[#0d594c] via-[#10676e] to-[#09414a] bg-clip-text text-transparent">
        Impact Report 2025
      </p>

      {/* 2. Hero Section */}
      <div className="relative w-3/4 min-h-[420px] px-12 py-5 mx-auto flex items-center justify-center">
        
        {/* Left Text Layer */}
        <div className="absolute top-[15%] left-[-10%] z-10 flex flex-col">
          <span className="font-light text-[clamp(22px,3vw,30px)] tracking-[0.12em] text-white/85 leading-none uppercase">
            From
          </span>
          <span className="font-medium text-[clamp(40px,6vw,56px)] tracking-[0.04em] text-white leading-none uppercase" style={{ fontStretch: 'expanded' }}>
            Abu Dhabi
          </span>
        </div>

        {/* Video Wrapper */}
        <div className="w-full h-[300px] rounded-[20px] overflow-hidden aspect-video bg-[#111827] shadow-2xl">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover"
          >
            <source src={social} type="video/mp4" />
          </video>
        </div>

        {/* Right Text Layer */}
        <div className="absolute bottom-[35%] right-[-10%] flex flex-col items-end">
          <span className="font-light text-[clamp(22px,3vw,30px)] tracking-[0.12em] text-white/85 leading-none uppercase">
            To the
          </span>
          <span className="font-medium text-[clamp(40px,6vw,56px)] tracking-[0.04em] text-white leading-none uppercase" style={{ fontStretch: 'expanded' }}>
            World
          </span>
        </div>
      </div>

      {/* 3. Gradient Divider */}
      <div className="w-[90%] md:w-[70%] h-px mx-auto bg-gradient-to-r from-[#056145] via-[#00b0f5] to-white/30 border-none" />

      {/* 4. Bottom Content */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center  px-[60px] lg:px-[200px] py-12 gap-10">
        
        {/* Innovation Bracket Tag */}
        <div className="inline-flex items-center justify-center">
          <div className="relative px-10 py-5">
            {/* Top-Left Bracket */}
            <div className="absolute top-0 left-0 w-[18px] h-[18px] border-t border-l border-[#16445b]" />
            {/* Bottom-Right Bracket */}
            <div className="absolute bottom-0 right-0 w-[18px] h-[18px] border-b border-r border-[#16445b]" />
            
            <span className="relative font-light text-white font-['Poppins']">
              Innovation
              {/* Top-Right Bracket */}
              <div className="absolute top-[-20px] right-[-40px] w-[18px] h-[18px] border-t border-r border-[#16445b]" />
              {/* Bottom-Left Bracket */}
              <div className="absolute bottom-[-20px] left-[-40px] w-[18px] h-[18px] border-b border-l border-[#16445b]" />
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="font-['Poppins'] font-light text-white leading-[130%] max-w-[500px]">
          Abu Dhabi's emergence as a global technology hub is no longer a vision, it is a reality taking
          shape through innovation, ambition, and bold execution.
        </p>
      </div>
    </section>
  );
};

export default SocialSection;