import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/images/logo2.svg";
import { Download, X } from "lucide-react";
import facebook from "../assets/images/facebook.svg";
import insta from "../assets/images/insta.svg";
import twitter from "../assets/images/twitter.svg";
import linkedin from "../assets/images/linkedin.svg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFixedVisible, setIsFixedVisible] = useState(false);

  // ─── SCROLL HANDLER ─────────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      setIsFixedVisible(window.scrollY > 130);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ─── BODY SCROLL LOCK ───────────────────────────────────────────────────────
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isMenuOpen]);

  // ─── MENU LINKS ─────────────────────────────────────────────────────────────
  const menuLinks = [
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

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);


  const socialIcons = [
  { name: "facebook", icon: facebook },
  { name: "insta", icon: insta },
  { name: "twitter", icon: twitter },
  { name: "linkedin", icon: linkedin },
];

  // ─── SHARED HEADER COMPONENT ───────────────────────────────────────────────
  const HeaderContent = ({ variant, onClose }) => (
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
        <button className="relative w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/10 grid place-items-center overflow-hidden flex-shrink-0">
          <div className="absolute inset-0 rounded-full p-[1.5px] bg-gradient-to-b from-[#056145]/50 via-[#056145]/10 to-[#056145] [mask-image:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [mask-composite:xor]" />
         <Download className="text-white" />
        </button>
        <p className="hidden xs:block text-white text-[10px] sm:text-[11px] md:text-[12px] uppercase tracking-[0.16em] whitespace-nowrap">
          impact report
        </p>
      </div>

      {/* CENTER: Logo */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <img
          src={logo}
          alt="logo"
          className="w-[72px] sm:w-[90px] md:w-[112px] h-auto"
        />
      </div>

      {/* RIGHT: Menu/Close Toggle */}
      <div className="flex items-center gap-2 sm:gap-4 pr-1 sm:pr-3">
        <p className="hidden sm:block text-white text-[10px] md:text-[12px] uppercase tracking-[0.16em] whitespace-nowrap">
          {onClose ? "close" : "menu"}
        </p>
        <button
          onClick={onClose || openMenu}
          className="relative w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-[#14151d] flex items-center justify-center transition-transform duration-200 active:scale-95 overflow-hidden"
        >
          <div className="absolute inset-0 rounded-full p-[1.5px] bg-gradient-to-b from-[#056145]/50 via-[#056145]/10 to-[#056145] [mask-image:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [mask-composite:xor]" />
          {onClose ? (
           <X  className="text-white" />
          ) : (
            <div className="relative z-[2] flex flex-col justify-center items-end gap-1 sm:gap-1.5">
              <div className="h-[1.5px] bg-white w-4 sm:w-5" />
              <div className="h-[1.5px] bg-white w-6 sm:w-[30px]" />
            </div>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }
      `}</style>

      {/* ─── DEFAULT STATIC HEADER ───────────────────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 z-[100] flex items-center justify-between px-3 py-4 min-[400px]:px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 pointer-events-none">
        <div className="pointer-events-auto">
          <img
            src={logo}
            alt="Hub71 Logo"
            className="w-[72px] min-[400px]:w-[82px] sm:w-[95px] md:w-[112px] h-auto"
          />
        </div>

        <button
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
      </div>

      {/* ─── STICKY HEADER (Visible on Scroll) ───────────────────────────────── */}
      <div
        className={`
          fixed top-3 sm:top-4 md:top-5 left-1/2 -translate-x-1/2 z-[55555] w-full px-3 sm:px-4 transition-all duration-500
          ${isFixedVisible && !isMenuOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-10 invisible"}
        `}
      >
        <HeaderContent variant="fixed" />
      </div>

      {/* ─── FULLSCREEN MENU OVERLAY ─────────────────────────────────────────── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60000] bg-black/45 backdrop-blur-xl flex flex-col items-center overflow-hidden px-3 py-4 sm:px-5 sm:py-6 md:px-6 md:py-8"
          >
            {/* Overlay Header */}
            <div className="w-full flex justify-center flex-shrink-0">
              <HeaderContent variant="menu" onClose={closeMenu} />
            </div>

            {/* Menu Links Scrollable Area */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex-1 w-full max-w-[95vw] sm:max-w-[92vw] md:max-w-[640px] my-4 sm:my-5 md:my-6 overflow-y-auto overflow-x-hidden hide-scrollbar rounded-[28px] sm:rounded-[36px] md:rounded-[43px] bg-black/40 backdrop-blur-3xl border border-white/10 px-5 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12"
            >
              <ul className="flex flex-col items-center gap-5 sm:gap-6 md:gap-7">
                {menuLinks.map((link, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.03 }}
                    className="list-none text-center"
                  >
                    <a
                      href="#"
                      onClick={closeMenu}
                      className="text-white text-[13px] min-[400px]:text-[14px] sm:text-base md:text-lg lg:text-xl font-medium uppercase tracking-[0.18em] transition-colors duration-300 hover:text-[#00d68c] break-words"
                    >
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Footer */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
  {socialIcons.map((social) => (
    <a
      key={social.name}
      href="#"
      className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl border border-white/20 flex items-center justify-center transition-all duration-300 hover:bg-white/10"
    >
      <img
        src={social.icon}
        alt={social.name}
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

export default Navbar;