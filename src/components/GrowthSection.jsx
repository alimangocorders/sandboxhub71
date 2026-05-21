import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import backgroundImg from "../assets/images/new-img-9.webp";

gsap.registerPlugin(ScrollTrigger);

const GrowthSection = () => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const titleRef = useRef(null);
  const bodyRef = useRef(null);
  const statsRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // TITLE ANIMATION
      gsap.from(titleRef.current, {
        x: -100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
        },
      });

      // BODY TEXT ANIMATION
      gsap.from(bodyRef.current.querySelectorAll("p"), {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: bodyRef.current,
          start: "top 80%",
        },
      });

      // STATS ANIMATION
      gsap.from(statsRef.current.querySelectorAll(".stat-item"), {
        scale: 0.8,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 90%",
        },
      });

      // IMAGE ANIMATION
      gsap.from(imgRef.current, {
        x: 100,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imgRef.current,
          start: "top 75%",
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        grid
        grid-cols-1
        md:grid-cols-2
        min-h-screen
        bg-white
        text-[#111]
        font-[Poppins]
        overflow-hidden
      "
    >

      {/* LEFT VERTICAL LINE */}
      <div className="absolute top-0 left-[68px] w-[1px] h-full bg-gradient-to-b from-[#bfd2d9]/70 via-[#bfd2d9] to-[#bfd2d9]/10 hidden md:block" />

      {/* LEFT CONTENT */}
      <div
        ref={leftRef}
        className="
          relative
          z-10
          py-20
          px-8
          md:pl-24
          md:pr-0
          flex
          flex-col
        "
      >

        {/* TITLE */}
        <h2
          ref={titleRef}
          className="
            font-medium
            text-[28px]
            md:text-[56px]
            leading-tight
            uppercase
            mb-14
          "
        >
          Unlocking Growth
          <br />
          and Capital at
          <br />
          Every Stage
        </h2>

        {/* BODY */}
        <div
          ref={bodyRef}
          className="
            relative
            flex-1
            flex
            flex-col
            justify-center
            gap-5
            mb-14
          "
        >

          {/* TOP LINE */}
          <div className="absolute -left-[30px] top-[-27px] w-[1000px] h-[1px] bg-gradient-to-r from-[#bfd2d9]/70 via-[#bfd2d9] to-[#bfd2d9]/10" />

          {/* BOTTOM LINE */}
          <div className="absolute -left-[30px] bottom-[-27px] w-[1000px] h-[1px] bg-gradient-to-r from-[#bfd2d9]/70 via-[#bfd2d9] to-[#bfd2d9]/10" />

          {/* DOTS */}
          <div className="absolute -left-[30px] -top-[30px] w-1.5 h-1.5 rounded-full bg-[#111]" />
          <div className="absolute -left-[30px] -bottom-[30px] w-1.5 h-1.5 rounded-full bg-[#111]" />

          <p className="text-[13px] font-light text-black/70 leading-[1.8] max-w-[480px]">
            In 2025, global capital markets placed greater emphasis on
            sustainable investments, clear business models and sector focus.
          </p>

          <p className="text-[13px] font-light text-black/70 leading-[1.8] max-w-[480px]">
            As these dynamics reshape funding flows, Hub71 plays an
            increasingly important role in bridging funding gaps,
            particularly at early and growth stages, ensuring startups
            can access capital from inception to scale.
          </p>

        </div>

        {/* STATS */}
        <div className="ugc-bottom">

          <p className="font-semibold text-[14px] mb-5">
            Breakdown of capital partners per category:
          </p>

          <div ref={statsRef} className="flex items-stretch">

            {/* STAT 1 */}
            <div className="stat-item pr-8">

              <span
                className="
                  block
                  font-medium
                  text-[52px]
                  md:text-[70px]
                  text-[#ffd200]
                  leading-none
                  mb-1.5
                "
              >
                58
              </span>

              <span className="font-light text-black/60 text-[14px]">
                Investors
              </span>

            </div>

            {/* STAT 2 */}
            <div className="stat-item px-8 border-l border-black/15">

              <span
                className="
                  block
                  font-medium
                  text-[52px]
                  md:text-[70px]
                  text-[#ffd200]
                  leading-none
                  mb-1.5
                "
              >
                52
              </span>

              <span className="font-light text-black/60 text-[14px]">
                Startups
              </span>

            </div>

          </div>

        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div
        ref={imgRef}
        className="
          relative
          overflow-hidden
          h-[400px]
          md:h-full
          min-h-[500px]
        "
      >

        <img
          src={backgroundImg}
          alt="Business growth"
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
            object-top
          "
        />

        {/* OPTIONAL OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/10" />

      </div>
    </section>
  );
};

export default GrowthSection;