import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import { MoveRight } from 'lucide-react';
import { MoveLeft } from 'lucide-react';

import backgroundImg from "../assets/images/new-img-8.jpg";

// Swiper styles
import "swiper/css";

const hubSectors = [
  { percentage: "27%", name: "FinTech", delay: 0.1 },
  { percentage: "15%", name: "HealthTech & Life Sciences", delay: 0.2 },
  { percentage: "11%", name: "ClimateTech", delay: 0.3 },
  { percentage: "7%", name: "Mobility, Logistics & Travel", delay: 0.4 },
  { percentage: "7%", name: "EdTech", delay: 0.5 },
  { percentage: "5%", name: "FoodTech", delay: 0.6 },
  { percentage: "28%", name: "18 Other Sectors", delay: 0.7 },
];

const HubSection = () => {
  const swiperRef = useRef(null);

  return (
    <section
      className="relative overflow-hidden bg-[#0d1117] text-white font-sans"
      style={{
        isolation: "isolate",
        zIndex: 1,
      }}
    >
      {/* TOP BACKGROUND SECTION */}
      <div
        className="
          relative
          pt-[280px]
          sm:pt-[340px]
          md:pt-[420px]
          lg:pt-[540px]
          bg-cover
          bg-no-repeat
          bg-center
        "
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundPosition: "center top",
        }}
      >
        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117]/20 via-[#0d1117]/50 to-[#0d1117]/90" />

        {/* TOP CONTENT */}
        <div
          className="
            relative
            z-10
            flex
            flex-col
            lg:flex-row
            lg:items-start
            lg:justify-between
            gap-8
            px-4
            sm:px-6
            md:px-10
            lg:px-16
            pb-10
            md:pb-14
          "
        >
          {/* LEFT TITLE */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="
              text-[32px]
              leading-[1]
              sm:text-[42px]
              md:text-[54px]
              lg:text-[64px]
              xl:text-[72px]
              font-medium
              uppercase
              tracking-tight
              max-w-[727px]
            "
          >
            Positioning Abu
            <br />
            Dhabi as a Global
            <br />
            Innovation Hub
          </motion.h2>

          {/* RIGHT STATS BOX */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="
              relative
              flex
              items-center
              gap-3
              sm:gap-5
              md:gap-6
              px-5
              sm:px-7
              md:px-10
              py-4
              sm:py-5
              md:py-6
              w-full
              sm:w-fit
              min-w-0
              sm:min-w-[300px]
              md:min-w-[340px]
              bg-gradient-to-l
              from-[#538387]/50
              to-transparent
            "
          >
            {/* BORDER */}
            <div className="absolute inset-0 p-[1px] bg-gradient-to-l from-white/25 to-transparent [mask-image:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [mask-composite:xor] pointer-events-none" />

            <span
              className="
                text-[52px]
                leading-none
                sm:text-[70px]
                md:text-[90px]
                font-medium
                tracking-tighter
                text-[#00d68c]
                shrink-0
              "
            >
              24
            </span>

            <span
              className="
                text-sm
                sm:text-lg
                md:text-2xl
                font-medium
                text-[#00d68c]
                uppercase
                tracking-[0.2em]
                leading-tight
              "
            >
              Sectors
            </span>
          </motion.div>
        </div>

        {/* SLIDER SECTION */}
        <div
          className="
            relative
            z-20
            pl-4
            sm:pl-6
            md:pl-10
            lg:pl-16
            pb-10
            md:pb-14
          "
        >
          {/* NAVIGATION */}
          <div
            className="
              flex
              justify-end
              gap-2
              sm:gap-3
              pr-4
              sm:pr-6
              md:pr-10
              lg:pr-16
              mb-4
              md:mb-6
            "
          >
            {/* PREV */}
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="
                flex
                items-center
                justify-center
                w-10
                h-10
                sm:w-12
                sm:h-12
                transition-all
                duration-300
                hover:opacity-60
              "
            >
              
             <MoveLeft />

            </button>

            {/* NEXT */}
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="
                flex
                items-center
                justify-center
                w-10
                h-10
                sm:w-12
                sm:h-12
                transition-all
                duration-300
                hover:opacity-60
              "
            >
              <MoveRight />
            </button>
          </div>

          {/* SWIPER */}
          <div className="overflow-hidden pr-4 sm:pr-6 md:pr-10 lg:pr-[60px]">
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              modules={[Navigation]}
              spaceBetween={12}
              slidesPerView={1.08}
              breakpoints={{
                350: {
                  slidesPerView: 1.1,
                  spaceBetween: 12,
                },
                480: {
                  slidesPerView: 1.3,
                  spaceBetween: 14,
                },
                640: {
                  slidesPerView: 2.1,
                  spaceBetween: 15,
                },
                768: {
                  slidesPerView: 2.5,
                  spaceBetween: 16,
                },
                1024: {
                  slidesPerView: 3.5,
                  spaceBetween: 18,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
              }}
            >
              {hubSectors.map((sector, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.7,
                      delay: sector.delay,
                    }}
                    className="
                      group
                      relative
                      flex
                      flex-col
                      justify-between
                      min-h-[180px]
                      sm:min-h-[210px]
                      md:min-h-[240px]
                      p-5
                      sm:p-6
                      md:p-7
                      pt-6
                      md:pt-7
                      pb-3
                      bg-gradient-to-t
                      from-[#1a1f20]/0
                      to-[#1a1f20]
                      transition-all
                      duration-300
                      hover:bg-white/5
                      hover:-translate-y-2
                      md:hover:-translate-y-4
                    "
                  >
                    {/* BORDER OVERLAY */}
                    <div className="absolute inset-0 p-[1px] bg-gradient-to-b from-[#53858b] to-[#53858b]/10 [mask-image:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [mask-composite:xor] group-hover:opacity-0 transition-opacity duration-300" />

                    {/* PERCENTAGE */}
                    <div className="mb-10 sm:mb-14 md:mb-20">
                      <span
                        className="
                          text-[44px]
                          sm:text-[58px]
                          md:text-[72px]
                          font-medium
                          leading-none
                          tracking-tight
                        "
                      >
                        {sector.percentage}
                      </span>
                    </div>

                    {/* FOOTER */}
                    <div className="mt-auto">
                      <hr className="border-none h-[1px] bg-[#53838b]/20 mb-3 md:mb-4 w-full" />

                      <p
                        className="
                          text-[11px]
                          sm:text-[12px]
                          md:text-[13px]
                          font-semibold
                          text-white/70
                          uppercase
                          tracking-[0.18em]
                          leading-relaxed
                          py-2
                          md:py-4
                        "
                      >
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