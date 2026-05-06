import React, { useMemo, useState } from "react";

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

  const filtered = useMemo(
    () => sectorsData.filter((item) => item.tab === activeTab),
    [activeTab]
  );

  const cardWidth = 28; // same as your CSS (28%)

  const maxIndex = Math.max(filtered.length - 3, 0);

  const next = () => {
    setIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prev = () => {
    setIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section className="bg-[#0d1117] text-white overflow-hidden">
      {/* TOP */}
      <div
        className="relative pt-[364px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://sandboxhub71.trianglemena.xyz/impact-report/2026/images/sectors.png)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117]/30 to-[#0d1117]/95"></div>

        <div className="relative z-10 flex flex-col justify-end h-full px-6 md:px-16 pb-10">
          <h2
            className="uppercase text-[clamp(36px,5vw,56px)] font-medium mb-9"
            data-aos="fade-up"
            data-aos-duration="900"
            data-aos-delay="100"
          >
            Hub71 Sectors
          </h2>

          <div
            className="flex items-center justify-between mb-12"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="250"
          >
            {/* Tabs */}
            <div className="flex bg-white/10 backdrop-blur-2xl p-2">
              {["priority", "emerging"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setIndex(0);
                  }}
                  className={`px-7 py-3 uppercase transition ${
                    activeTab === tab
                      ? "bg-yellow-400 text-black font-medium"
                      : "text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-8">
              <button
                onClick={prev}
                className="w-[80px] h-[80px] md:w-[101px] md:h-[101px] rounded-full border border-white/30 flex items-center justify-center hover:border-white transition"
              >
                <img
                  src="https://sandboxhub71.trianglemena.xyz/impact-report/2026/images/left-arrow.svg"
                  alt="prev"
                />
              </button>

              <button
                onClick={next}
                className="w-[80px] h-[80px] md:w-[101px] md:h-[101px] rounded-full border border-white/30 flex items-center justify-center hover:border-white transition"
              >
                <img
                  src="https://sandboxhub71.trianglemena.xyz/impact-report/2026/images/right-arrow.svg"
                  alt="next"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="px-6 md:px-16 pb-14">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{
              transform: `translateX(-${index * cardWidth}%)`,
            }}
          >
            {filtered.map((item, i) => (
              <div
                key={i}
                className="shrink-0 w-[28%] px-7 border-r border-white/10 first:border-l"
                data-aos="fade-up"
                data-aos-duration="700"
                data-aos-delay={100 * (i + 1)}
              >
                <p className="text-[22px] font-bold mb-3 tracking-wide">
                  {item.name}
                </p>
                <p className="text-[18px] font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}