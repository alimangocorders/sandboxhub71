import React from 'react';
import commuunitybg from '../assets/images/gradiant-bg.webp';

const kbData = [
  { number: "33", label: "Fireside Chats", opacity: "bg-white/100" },
  { number: "07", label: "Events Hosted", opacity: "bg-white/80" },
  { number: "129", label: "Delegations Held Locally and Internationally", opacity: "bg-white/70" },
  { number: "1000+", label: "Mentorship Hours", opacity: "bg-white/20" },
  { number: "186", label: "Local & Global Partners Engaged", opacity: "bg-white/60" },
  { number: "95", label: "Community Events Hosted", opacity: "bg-white/80" },
  { number: "24", label: "Training Sessions Conducted", opacity: "bg-white/100" },
];

const KnowledgeBuilding = () => {
  return (
    <div className="bg-white py-10 sm:py-12 px-4 sm:px-6 lg:px-10">

      {/* Title Section */}
      <h1
        className="
          font-medium 
          text-[clamp(22px,5vw,56px)] 
          leading-[1.1] 
          uppercase 
          text-black 
          mb-10 sm:mb-16 
          max-w-full sm:max-w-[60%] 
          ml-0 sm:ml-[50px] 
          font-stretch-expanded
        "
        style={{ fontStretch: 'expanded' }}
      >
        Harnessed by a knowledge building community
      </h1>

      {/* Background Wrapper */}
      <div
        className="bg-center bg-cover w-full"
        style={{
          backgroundImage: `url(${commuunitybg})`
        }}
      >
        {kbData.map((item, index) => (
          <div
            key={index}
            className={`
              flex 
              flex-col sm:flex-row
              sm:items-center 
              gap-3 sm:gap-10 
              py-4 sm:py-[1.2rem] 
              w-full 
              px-4 sm:pl-[50px]

              transition-all 
              duration-300 

              border-y 
              border-transparent 

              hover:bg-white/50 
              hover:border-[#00b0f5] 

              group 
              ${item.opacity}
            `}
          >

            {/* Number */}
            <div
              className="
                font-extrabold 
                text-[clamp(28px,7vw,64px)] 
                leading-none 
                text-[#111] 
                min-w-0 sm:min-w-[180px] 
                tracking-[-1px] 
                bg-transparent
              "
            >
              {item.number}
            </div>

            {/* Label */}
            <div
              className="
                font-['Barlow'] 
                font-medium 
                text-[11px] sm:text-[12px] 
                tracking-[1.2px] sm:tracking-[1.8px] 
                uppercase 
                text-[#555] 
                bg-transparent 
                leading-snug
              "
            >
              {item.label}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default KnowledgeBuilding;