import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import backgroundImg from "../assets/images/new-img-8.jpg";

// Import Swiper styles
import 'swiper/css';

const hubSectors = [
  { percentage: "27%", name: "FinTech", delay: 0.1 },
  { percentage: "15%", name: "HealthTech & Life Sciences", delay: 0.2 },
  { percentage: "11%", name: "ClimateTec", delay: 0.3 },
  { percentage: "7%", name: "Mobility, Logistics & Travel", delay: 0.4 },
  { percentage: "7%", name: "EdTech", delay: 0.5 },
  { percentage: "5%", name: "FoodTech", delay: 0.6 },
  { percentage: "28%", name: "18 Other Sectors", delay: 0.7 },
];

const HubSection = () => {
  const swiperRef = useRef(null);

  return (
    <section
      className="bg-[#0d1117] text-white font-sans"
      style={{ isolation: 'isolate', position: 'relative', zIndex: 1, overflow: 'hidden' }}
    >
      {/* Top Background Section */}
      <div
        className="relative pt-[540px] bg-cover bg-no-repeat"
        style={{
            backgroundImage: `url(${backgroundImg})`,
          backgroundPosition: 'center top',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117]/20 to-[#0d1117]/85" />

        {/* Top Content */}
        <div className="relative z-10 flex justify-between items-start px-8 md:px-16 pb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-medium uppercase leading-none tracking-wider max-w-[727px]"
          >
            Positioning Abu<br /> Dhabi as a Global<br />Innovation Hub
          </motion.h2>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex items-center gap-6 px-10 py-4 min-w-[340px] bg-gradient-to-l from-[#538387]/50 to-transparent"
          >
            {/* Custom Border Logic */}
            <div className="absolute inset-0 p-[1px] bg-gradient-to-l from-white/25 to-transparent [mask-image:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [mask-composite:xor] pointer-events-none" />
            <span className="text-[90px] font-medium leading-none text-[#00d68c] tracking-tighter">24</span>
            <span className="text-2xl font-medium text-[#00d68c] uppercase tracking-widest">Sectors</span>
          </motion.div>
        </div>

        {/* Bottom Slider Section */}
        <div className="relative z-20 pl-8 md:pl-16 pb-14">

          {/* Navigation Arrows */}
          <div className="flex justify-end gap-3 pr-16 mb-6">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="p-2 transition-opacity hover:opacity-50"
            >
              <img
                src="https://sandboxhub71.trianglemena.xyz/impact-report/2026/images/left-arrow.svg"
                alt="prev"
                className="w-10"
              />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="p-2 transition-opacity hover:opacity-50"
            >
              <img
                src="https://sandboxhub71.trianglemena.xyz/impact-report/2026/images/right-arrow.svg"
                alt="next"
                className="w-10"
              />
            </button>
          </div>

          <div style={{ overflow: 'hidden', paddingRight: '60px' }}>
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              modules={[Navigation]}
              spaceBetween={15}
              slidesPerView={1.2}
              breakpoints={{
                640: { slidesPerView: 2.5 },
                1024: { slidesPerView: 4 },
              }}
            >
              {hubSectors.map((sector, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: sector.delay }}
                    className="group relative flex flex-col justify-between min-h-[180px] p-7 pt-7 pb-2 bg-gradient-to-t from-[#1a1f20]/0 to-[#1a1f20] transition-all duration-300 hover:bg-white/5 hover:-translate-y-4"
                  >
                    {/* Card Border Overlay */}
                    <div className="absolute inset-0 p-[1px] bg-gradient-to-b from-[#53858b] to-[#53858b]/10 [mask-image:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [mask-composite:xor] group-hover:opacity-0 transition-opacity" />

                    <div className="mb-20">
                      <span className="text-5xl md:text-7xl font-medium">{sector.percentage}</span>
                    </div>

                    <div className="mt-auto">
                      <hr className="border-none h-[1px] bg-[#53838b]/20 mb-4 w-full" />
                      <p className="text-[13px] font-semibold text-white/70 uppercase tracking-widest leading-relaxed py-4">
                        {sector.name}
                      </p>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HubSection;