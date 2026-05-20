import React from 'react';
import { motion } from 'framer-motion';

const DeliveringImpact = () => {
  const fadeUp = (delay) => ({
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, delay: delay, ease: "easeOut" }
    }
  });

  return (
    /*
      KEY FIX: position:relative + z-index:1 + isolation:isolate ensures this
      section forms its own stacking context and doesn't get swallowed or
      overlapped by the pinned ImpactSection above it or ProgressSection below.
    */
    <section
      className="bg-[#0d1117] text-white py-16 sm:py-24 lg:py-[118px] overflow-hidden"
      style={{ position: 'relative', zIndex: 1, isolation: 'isolate' }}
    >
      <div className="container mx-auto px-5 xs:px-6 md:px-16 w-full box-border">
        <div className="flex flex-col w-full">
          <motion.h3
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp(0.1)}
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-medium uppercase leading-[1.2] md:leading-[1.1] mb-6 md:mb-10 tracking-tight w-full md:max-w-[80%] [font-stretch:expanded]"
          >
            Delivering impact in critical and <br className="hidden md:block" /> emerging sectors
          </motion.h3>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp(0.3)}
            className="font-light text-sm xs:text-base md:text-lg leading-relaxed text-gray-300 w-full md:max-w-[50%] lg:max-w-[40%] font-poppins"
          >
            Hub71 plays a strategic role in advancing priority and emerging tech
            sectors by expanding specialist ecosystems and forging partnerships
            that enable founders to scale impactful solutions globally.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default DeliveringImpact;