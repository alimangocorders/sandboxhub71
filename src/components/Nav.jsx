import React from "react";

const Nav = () => {
  return (
    <nav className="default-header pointer-events-none fixed w-full top-0 left-0">
      <div className="logo w-24 pointer-events-auto">
        <img
          src="https://sandboxhub71.trianglemena.xyz/impact-report/2026/images/logo.svg"
          alt="Hub71"
          className="w-full h-auto"
        />
      </div>

      <div className="menu pointer-events-auto">
        <button 
          id="open_menu" 
          className="flex items-center gap-4 bg-[#1a2b2b]/40 backdrop-blur-xl border-2 border-green-800 rounded-full py-4 px-6 hover:bg-white/10 transition-all group"
        >
          <span className="text-white uppercase tracking-[0.2em] text-[14px] font-roc font-medium">
            Menu
          </span>
          <div className="flex flex-col gap-[5px] items-end border-2 border-green-800 rounded-full py-4 px-4 bg-black">
            <div className="w-6 h-[1.5px] bg-white group-hover:w-4 transition-all"></div>
            <div className="w-4 h-[1.5px] bg-white group-hover:w-6 transition-all"></div>
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Nav;