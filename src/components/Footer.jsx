import React, { useState, useEffect, useRef, useMemo } from "react";

// OPTIMIZATION 1: Cherry-picked sub-path imports to bypass library bundle parsing bloat
import Download from "lucide-react/dist/esm/icons/download";
import ArrowUp from "lucide-react/dist/esm/icons/arrow-up";

import footervideo from "../assets/images/video2.mp4";
import facebook from "../assets/images/facebook.svg";
import insta from "../assets/images/insta.svg";
import twitter from "../assets/images/twitter.svg";
import linkedin from "../assets/images/linkedin.svg";

const Footer = () => {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const footerRef = useRef(null);

  // OPTIMIZATION 2: Intersection Observer to defer heavy video media loading until near visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // Starts fetching slightly before scroll-entry
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // OPTIMIZATION 3: Cached data objects outside iteration cycles to avoid Garbage Collection sweeps
  const socials = useMemo(() => [
    { name: "facebook", icon: facebook },
    { name: "insta", icon: insta },
    { name: "twitter", icon: twitter },
    { name: "linkedin", icon: linkedin },
  ], []);

  return (
    <footer 
      ref={footerRef} 
      className="relative w-full min-h-[85vh] overflow-hidden mt-10 sm:mt-20 font-[Poppins]"
    >
      {/* BACKGROUND VIDEO */}
      {shouldLoadVideo ? (
        <video
          src={footervideo}
          autoPlay
          loop
          muted
          playsInline
          preload="none" // Blocks default main-thread stream allocation
          className="absolute inset-0 w-full h-full object-cover will-change-[transform]"
        />
      ) : (
        // Performance Fallback Shell while offscreen
        <div className="absolute inset-0 bg-[#0d1117]" />
      )}

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/40 z-[1]" />

      {/* FLOATING FOOTER BAR */}
      <div className="
        absolute z-[11]
        bottom-6 sm:bottom-10 md:bottom-[60px]
        left-1/2 -translate-x-1/2
        w-[92%] sm:w-[90%] md:w-[812px]
        flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0
        bg-white/10 backdrop-blur-[20px]
        px-3 sm:px-4 md:px-2 py-4 sm:py-5
        rounded-[24px] sm:rounded-[60px] md:rounded-[100px]
        uppercase text-[10px] sm:text-[11px] md:text-[12px]
        text-white
        will-change-transform
      ">
        {/* LEFT SIDE */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-[31px] w-full sm:w-auto">
          {/* DOWNLOAD */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button 
              className="group relative w-12 h-12 sm:w-[55px] sm:h-[55px] rounded-full flex items-center justify-center bg-[#14151d] overflow-hidden border-gradient-green"
              aria-label="Download full impact report"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </button>
            <p className="m-0 text-center sm:text-left tracking-wide">
              Full impact report
            </p>
          </div>

          {/* SOCIALS */}
          <div className="flex gap-1.5 items-center flex-wrap justify-center sm:justify-start">
            {socials.map((social, i) => (
              <div
                key={`${social.name}-${i}`}
                className="
                  w-10 h-9 sm:w-[50px] sm:h-[36px]
                  border border-white/20
                  rounded-[10px]
                  flex items-center justify-center
                  hover:bg-white/10
                  transition-colors
                "
              >
                <a href="#" aria-label={`Follow Hub71 on ${social.name}`}>
                  <img
                    src={social.icon}
                    alt=""
                    loading="lazy" // Prevents fetching offscreen SVG node networks
                    className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
                  />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3 sm:gap-4">
          <p className="m-0 tracking-wide">go up</p>
          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top of the screen"
            className="
              relative
              w-12 h-12 sm:w-[55px] sm:h-[55px]
              rounded-full
              flex items-center justify-center
              bg-white/10
              overflow-hidden
              group
            "
          >
            {/* OPTIMIZATION 4: Fixed layout translation vectors using safe translate3d composites */}
            <ArrowUp className="w-4 h-4 sm:w-[18px] text-white transform translate-z-0 group-hover:translate-y-[-4px] transition-transform duration-200" />
          </button>
        </div>
      </div>

      {/* COPYRIGHT */}
      <p className="
        absolute bottom-2 sm:bottom-[15px]
        left-1/2 -translate-x-1/2
        z-[11]
        text-white text-[9px] sm:text-[10px] md:text-[11px]
        uppercase tracking-widest opacity-80 text-center w-full px-4
      ">
        Copyright © 2026 HUB71. All rights reserved
      </p>

      {/* BORDER GLOW */}
      <style>{`
        .border-gradient-green::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 50%;
          padding: 2px;
          background: linear-gradient(
            to bottom,
            rgba(5, 97, 69, 0.5),
            rgba(5, 97, 69, 0.13),
            rgba(5, 97, 69, 1)
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
      `}</style>
    </footer>
  );
};

export default Footer;