import React, { useState, useEffect, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X } from "lucide-react";

import logo from "../assets/images/logo2.svg";
import facebook from "../assets/images/facebook.svg";
import insta from "../assets/images/insta.svg";
import twitter from "../assets/images/twitter.svg";
import linkedin from "../assets/images/linkedin.svg";

// OPTIMIZATION 1: Hoisted immutable data loops out of the render lifecycle to prevent GC thrashing
const MENU_LINKS = [
  "intro",
  "impact in numbers",
  "sectors breakdown",
  "hub71 programs",
  "scaling from abu dhabi",
  "empowering talent",
  "innovation from abu dhabi",
  "key timelines",
  "emerging sectors",
  "unlocking growth",
  "a connected ecosystem",
  "building knowledge",
];

const SOCIAL_ICONS = [
  { name: "facebook", icon: facebook },
  { name: "insta", icon: insta },
  { name: "twitter", icon: twitter },
  { name: "linkedin", icon: linkedin },
];

// OPTIMIZATION 2: Extracted Sub-Component cleanly out of parent context to block layout destruction passes
const HeaderContent = memo(({ variant, onClose, onOpen }) => (
  <div
    className={`
      relative flex items-center justify-between
      w-full max-w-[95vw] sm:max-w-[92vw] md:max-w-[640px]
      rounded-full bg-black/55 backdrop-blur-2xl
      border border-white/10 px-2 sm:px-3 md:px-2 py-2
      shadow-[0_10px_40px_rgba(0,0,0,0.35)]
      transition-all duration-300
      ${variant === "fixed" ? "mx-auto" : "relative"}
    `}
  >
    {/* LEFT: Download Button */}
    <div className="flex items-center gap-2 sm:gap-4 pl-1 sm:pl-3">
      <button 
        type="button"
        aria-label="Download impact report"
        className="relative w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/10 grid place-items-center overflow-hidden flex-shrink-0"
      >
        <div className="absolute inset-0 rounded-full p-[1.5px] bg-gradient-to-b from-[#056145]/50 via-[#056145]/10 to-[#056145] [mask-image:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [mask-composite:xor]" />
        <Download className="text-white w-4 h-4 sm:w-5 sm:h-5" />
      </button>
      <p className="hidden xs:block text-white text-[10px] sm:text-[11px] md:text-[12px] uppercase tracking-[0.16em] whitespace-nowrap">
        impact report
      </p>
    </div>

    {/* CENTER: Logo */}
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <img
        src={logo}
        alt="Hub71 Logo"
        className="w-[72px] sm:w-[90px] md:w-[112px] h-auto"
        loading="eager"
      />
    </div>

    {/* RIGHT: Menu/Close Toggle */}
    <div className="flex items-center gap-2 sm:gap-4 pr-1 sm:pr-3">
      <p className="hidden sm:block text-white text-[10px] md:text-[12px] uppercase tracking-[0.16em] whitespace-nowrap">
        {onClose ? "close" : "menu"}
      </p>
      <button
        type="button"
        onClick={onClose || onOpen}
        aria-label={onClose ? "Close navigation menu" : "Open navigation menu"}
        className="relative w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-[#14151d] flex items-center justify-center transition-transform duration-200 active:scale-95 overflow-hidden"
      >
        <div className="absolute inset-0 rounded-full p-[1.5px] bg-gradient-to-b from-[#056145]/50 via-[#056145]/10 to-[#056145] [mask-image:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [mask-composite:xor]" />
        {onClose ? (
          <X className="text-white w-4 h-4 sm:w-5 sm:h-5" />
        ) : (
          <div className="relative z-[2] flex flex-col justify-center items-end gap-1 sm:gap-1.5">
            <div className="h-[1.5px] bg-white w-4 sm:w-5" />
            <div className="h-[1.5px] bg-white w-6 sm:w-[30px]" />
          </div>
        )}
      </button>
    </div>
  </div>
));
HeaderContent.displayName = "HeaderContent";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFixedVisible, setIsFixedVisible] = useState(false);

  // ─── SCROLL HANDLER (Optimized with a lightweight tick-check boundary guard) ─────────────────
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const shouldShow = window.scrollY > 130;
          // OPTIMIZATION 3: Blocks redundant state pushes if value hasn't crossed the breakpoint
          setIsFixedVisible((prev) => (prev !== shouldShow ? shouldShow : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ─── BODY SCROLL LOCK ───────────────────────────────────────────────────────
  useEffect(() => {
    const bodyStyle = document.body.style;
    const docStyle = document.documentElement.style;

    if (isMenuOpen) {
      bodyStyle.overflow = "hidden";
      docStyle.overflow = "hidden";
    } else {
      bodyStyle.overflow = "";
      docStyle.overflow = "";
    }
    return () => {
      bodyStyle.overflow = "";
      docStyle.overflow = "";
    };
  }, [isMenuOpen]);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      {/* ─── INLINE SCROLLBAR CSS CLEANUP ─── */}
      <style>{`
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; width: 0; height: 0; }
      `}</style>

      {/* ─── DEFAULT STATIC HEADER ───────────────────────────────────────────── */}
      <header className="absolute top-0 left-0 right-0 z-[100] flex items-center justify-between px-3 py-4 min-[400px]:px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 pointer-events-none">
        <div className="pointer-events-auto">
          <img
            src={logo}
            alt="Hub71 Logo"
            className="w-[72px] min-[400px]:w-[82px] sm:w-[95px] md:w-[112px] h-auto"
            loading="eager"
          />
        </div>

        <button
          type="button"
          onClick={openMenu}
          className="relative flex items-center gap-2 sm:gap-4 rounded-full bg-black/40 backdrop-blur-2xl border border-white/10 py-1.5 pl-3 pr-1.5 sm:py-2 sm:pl-5 sm:pr-2 pointer-events-auto transition-all duration-300 hover:bg-black/60"
        >
          <span className="text-white text-[10px] sm:text-[12px] uppercase tracking-[0.18em] whitespace-nowrap">
            Menu
          </span>
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-[#14151d] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 rounded-full p-[1.5px] bg-gradient-to-b from-[#056145]/50 via-[#056145]/10 to-[#056145] [mask-image:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [mask-composite:xor]" />
            <div className="relative z-[2] flex flex-col justify-center items-end gap-1 sm:gap-1.5">
              <div className="h-[1.5px] bg-white w-4 sm:w-5" />
              <div className="h-[1.5px] bg-white w-6 sm:w-[30px]" />
            </div>
          </div>
        </button>
      </header>

      {/* ─── STICKY HEADER (Visible on Scroll) ───────────────────────────────── */}
      <div
        className={`
          fixed top-3 sm:top-4 md:top-5 left-1/2 -translate-x-1/2 z-[55555] w-full px-3 sm:px-4 transition-all duration-500 transform-gpu
          ${isFixedVisible && !isMenuOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-10 invisible"}
        `}
      >
        <HeaderContent variant="fixed" onOpen={openMenu} />
      </div>

      {/* ─── FULLSCREEN MENU OVERLAY ─────────────────────────────────────────── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60000] bg-black/45 backdrop-blur-xl flex flex-col items-center overflow-hidden px-3 py-4 sm:px-5 sm:py-6 md:px-6 md:py-8"
          >
            {/* Overlay Header */}
            <div className="w-full flex justify-center flex-shrink-0">
              <HeaderContent variant="menu" onClose={closeMenu} />
            </div>

            {/* Menu Links Scrollable Area */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex-1 w-full max-w-[95vw] sm:max-w-[92vw] md:max-w-[640px] my-4 sm:my-5 md:my-6 overflow-y-auto overflow-x-hidden hide-scrollbar rounded-[28px] sm:rounded-[36px] md:rounded-[43px] bg-black/40 backdrop-blur-3xl border border-white/10 px-5 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12 will-change-transform"
            >
              <nav>
                <ul className="flex flex-col items-center gap-5 sm:gap-6 md:gap-7">
                  {MENU_LINKS.map((link, idx) => (
                    <motion.li
                      key={link}
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: Math.min(idx * 0.02, 0.2) }} // Capped delays to prevent slow mobile list rendering
                      className="list-none text-center"
                    >
                      <a
                        href={`#${link.replace(/\s+/g, "-")}`}
                        onClick={closeMenu}
                        className="text-white text-[13px] min-[400px]:text-[14px] sm:text-base md:text-lg lg:text-xl font-medium uppercase tracking-[0.18em] transition-colors duration-200 hover:text-[#00d68c] break-words"
                      >
                        {link}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </motion.div>

            {/* Footer */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap flex-shrink-0">
              {SOCIAL_ICONS.map((social) => (
                <a
                  key={social.name}
                  href={`https://${social.name}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${social.name}`}
                  className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl border border-white/20 flex items-center justify-center transition-all duration-200 hover:bg-white/10"
                >
                  <img
                    src={social.icon}
                    alt=""
                    className="h-3.5 sm:h-4 object-contain"
                  />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default memo(Navbar);