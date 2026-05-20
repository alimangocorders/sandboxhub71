import React from "react";
import footervideo from "../assets/images/video2.mp4";
import facebook from "../assets/images/facebook.svg";
import insta from "../assets/images/insta.svg";
import twitter from "../assets/images/twitter.svg";
import linkedin from "../assets/images/linkedin.svg";

import { Download, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const socials = [
    { name: "facebook", icon: facebook },
    { name: "insta", icon: insta },
    { name: "twitter", icon: twitter },
    { name: "linkedin", icon: linkedin },
  ];

  return (
    <footer className="relative w-full min-h-[85vh] overflow-hidden mt-10 sm:mt-20 font-[Poppins]">

      {/* BACKGROUND VIDEO */}
      <video
        src={footervideo}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

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
      ">

        {/* LEFT SIDE */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-[31px] w-full sm:w-auto">

          {/* DOWNLOAD */}
          <div className="flex items-center gap-3 sm:gap-4">

            <button className="group relative w-12 h-12 sm:w-[55px] sm:h-[55px] rounded-full flex items-center justify-center bg-[#14151d] overflow-hidden border-gradient-green">
              <Download className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </button>

            <p className="m-0 text-center sm:text-left">
              Full impact report
            </p>
          </div>

          {/* SOCIALS */}
          <div className="flex gap-1.5 items-center flex-wrap justify-center sm:justify-start">

            {socials.map((social, i) => (
              <div
                key={i}
                className="
                  w-10 h-9 sm:w-[50px] sm:h-[36px]
                  border border-white/20
                  rounded-[10px]
                  flex items-center justify-center
                  hover:bg-white/10
                  transition-colors
                "
              >
                <a href="#">
                  <img
                    src={social.icon}
                    alt={social.name}
                    className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
                  />
                </a>
              </div>
            ))}

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3 sm:gap-4">

          <p className="m-0">go up</p>

          <button
            onClick={scrollToTop}
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
            <ArrowUp className="w-4 h-4 sm:w-[18px] text-white group-hover:-translate-y-1 transition-transform" />
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
      <style jsx>{`
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
          -webkit-mask: linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
      `}</style>
    </footer>
  );
};

export default Footer;