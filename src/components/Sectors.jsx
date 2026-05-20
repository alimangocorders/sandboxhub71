import React, { useMemo, useState, useEffect } from "react";
import backgroundImg from "../assets/images/new-img-3.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react";

const sectorsData = [
  {
    name: "FinTech",
    tab: "priority",
    desc: "As a priority sector for Abu Dhabi, FinTech continues to drive financial innovation, from digital payments and blockchain to embedded finance and open banking.",
  },
  {
    name: "EdTech",
    tab: "priority",
    desc: "EdTech is gearing up to transform education by leveraging AI and immersive technologies to deliver personalized, scalable learning for the digital age.",
  },
  {
    name: "HealthTech",
    tab: "priority",
    desc: "With advanced technologies, HealthTech is set to revolutionize global healthcare, with startups driving progress in diagnostics, telemedicine, and personalized treatment.",
  },
  {
    name: "Mobility & Logistics",
    tab: "priority",
    desc: "Abu Dhabi's Mobility & Logistics sector is paving the way for smart transport through AI-powered autonomous technologies, efficiency and trade.",
  },
  {
    name: "CleanTech",
    tab: "priority",
    desc: "CleanTech startups are accelerating the transition to sustainable energy, water, and waste solutions across the MENA region and beyond.",
  },
  {
    name: "AI & Deep Tech",
    tab: "priority",
    desc: "From machine learning to robotics, AI and Deep Tech startups are redefining industries and building the next layer of the global digital economy.",
  },
  {
    name: "PropTech",
    tab: "emerging",
    desc: "PropTech is digitizing the real estate lifecycle — from smart buildings and digital transactions to data-driven property management platforms.",
  },
  {
    name: "AgriTech",
    tab: "emerging",
    desc: "AgriTech startups are addressing food security challenges through precision farming, vertical agriculture, and smart supply chain solutions.",
  },
  {
    name: "SpaceTech",
    tab: "emerging",
    desc: "Emerging SpaceTech ventures are positioning Abu Dhabi as a launchpad for satellite communications, earth observation, and space exploration.",
  },
  {
    name: "Web3 & Blockchain",
    tab: "emerging",
    desc: "Web3 startups are building decentralized infrastructure, tokenized assets, and next-generation digital ownership models for global markets.",
  },
];

export default function SectorsSection() {
  const [activeTab, setActiveTab] = useState("priority");
  const [index, setIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);

  // RESPONSIVE CARD COUNT
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsToShow(1);
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(3);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filtered = useMemo(
    () => sectorsData.filter((item) => item.tab === activeTab),
    [activeTab]
  );

  const maxIndex = Math.max(filtered.length - cardsToShow, 0);

  const next = () => {
    setIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prev = () => {
    setIndex((prev) => Math.max(prev - 1, 0));
  };

  // RESET SLIDER WHEN TAB CHANGES
  useEffect(() => {
    setIndex(0);
  }, [activeTab]);

  return (
    <section className="bg-[#0d1117] text-white overflow-hidden">
      {/* TOP */}
      <div
        className="
          relative
          pt-[220px]
          sm:pt-[280px]
          md:pt-[320px]
          lg:pt-[364px]
          bg-cover
          bg-center
        "
        style={{
          backgroundImage: `url(${backgroundImg})`,
        }}
      >
        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117]/30 to-[#0d1117]/95"></div>

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col justify-end h-full px-4 sm:px-6 md:px-10 lg:px-16 pb-8 sm:pb-10">
          {/* TITLE */}
          <h2
            className="
              uppercase
              text-[32px]
              min-[400px]:text-[38px]
              sm:text-[44px]
              md:text-[50px]
              lg:text-[56px]
              leading-[1]
              font-medium
              mb-7
              sm:mb-9
            "
            data-aos="fade-up"
            data-aos-duration="900"
            data-aos-delay="100"
          >
            Hub71 Sectors
          </h2>

          {/* TOP BAR */}
          <div
            className="
              flex
              flex-col
              sm:flex-row
              sm:items-center
              sm:justify-between
              gap-5
              sm:gap-4
              mb-10
              sm:mb-12
            "
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="250"
          >
            {/* TABS */}
            <div className="flex bg-white/10 backdrop-blur-2xl p-1.5 sm:p-2 w-fit rounded-md">
              {["priority", "emerging"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setIndex(0);
                  }}
                  className={`
                    px-4
                    sm:px-6
                    md:px-7
                    py-2.5
                    sm:py-3
                    uppercase
                    text-[11px]
                    sm:text-[12px]
                    tracking-wide
                    transition-all
                    duration-300

                    ${
                      activeTab === tab
                        ? "bg-yellow-400 text-black font-medium"
                        : "text-white"
                    }
                  `}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* ARROWS */}
            <div className="flex gap-3 sm:gap-5">
              <button
                onClick={prev}
                disabled={index === 0}
                className="
                  w-[56px]
                  h-[56px]
                  sm:w-[70px]
                  sm:h-[70px]
                  md:w-[85px]
                  md:h-[85px]
                  lg:w-[101px]
                  lg:h-[101px]
                  rounded-full
                  border
                  border-white/30
                  flex
                  items-center
                  justify-center
                  hover:border-white
                  transition
                  disabled:opacity-30
                  disabled:cursor-not-allowed
                "
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <button
                onClick={next}
                disabled={index === maxIndex}
                className="
                  w-[56px]
                  h-[56px]
                  sm:w-[70px]
                  sm:h-[70px]
                  md:w-[85px]
                  md:h-[85px]
                  lg:w-[101px]
                  lg:h-[101px]
                  rounded-full
                  border
                  border-white/30
                  flex
                  items-center
                  justify-center
                  hover:border-white
                  transition
                  disabled:opacity-30
                  disabled:cursor-not-allowed
                "
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-16 pb-10 sm:pb-14">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{
              transform: `translateX(-${
                index * (100 / cardsToShow)
              }%)`,
            }}
          >
            {filtered.map((item, i) => (
              <div
                key={i}
                className="
                  shrink-0
                  w-full
                  sm:w-1/2
                  lg:w-[33.333%]
                  px-4
                  sm:px-5
                  lg:px-7
                  border-r
                  border-white/10
                  first:border-l
                "
                data-aos="fade-up"
                data-aos-duration="700"
                data-aos-delay={100 * (i + 1)}
              >
                <div className="py-5 sm:py-7">
                  {/* TITLE */}
                  <p
                    className="
                      text-[20px]
                      sm:text-[21px]
                      md:text-[22px]
                      font-bold
                      mb-3
                      tracking-wide
                    "
                  >
                    {item.name}
                  </p>

                  {/* DESCRIPTION */}
                  <p
                    className="
                      text-[15px]
                      sm:text-[16px]
                      md:text-[18px]
                      font-light
                      leading-[1.8]
                      text-white/80
                    "
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}