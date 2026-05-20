import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import stepsimg from "../assets/images/counter-img.png";

const STEPS = [
  {
    label: "Startup Growth",
    stats: [
      {
        number: "390",
        label: "Startups in Hub71's Ecosystem",
      },
      {
        number: "295",
        label: "Total number of Startups Onboarded in Hub71 Programmes",
      },
      {
        number: "$2.7+B",
        label: "Value of Funds Raised",
      },
      {
        number: "$1.5+B",
        label: "Revenue Startups Generated",
      },
      {
        number: "$244 M",
        label: "Revenue Startups Generated",
      },
      {
        number: "66",
        label: "Capital Partners",
      },
    ],
  },

  {
    label: "2024 Impact Highlight",
    stats: [
      {
        number: "51",
        label: "Family Offices",
      },
      {
        number: "38",
        label: "Market Partners",
      },
      {
        number: "27",
        label: "Government Partners",
      },
      {
        number: "20",
        label: "Cross-border Partners",
      },
      {
        number: "1200+",
        label: "Mentorship Hours Provided",
      },
      {
        number: "10",
        label: "Talent Partners",
      },
    ],
  },

  {
    label: "Abu Dhabi Tech Ecosystem",
    stats: [
      {
        number: "140+",
        label: "Nationalities Represented",
      },
      {
        number: "4,200+",
        label: "Jobs Created",
      },
      {
        number: "$8.4B",
        label: "Economic Contribution",
      },
      {
        number: "3x",
        label: "Startup Survival Rate vs Global Average",
      },
      {
        number: "78%",
        label: "Startups Still Active After 3 Years",
      },
      {
        number: "12",
        label: "Unicorns & Soonicorns",
      },
    ],
  },
];

export default function ImpactSection() {

  const sectionRef = useRef(null);
  const statsGridRef = useRef(null);
  const lineFillRef = useRef(null);
  const titleRef = useRef(null);
  const stRef = useRef(null);


  const [activeStep, setActiveStep] = useState(0);
  const activeStepRef = useRef(0);
  const isAnimatingRef = useRef(false);

  const animateStatsIn = (container) => {
    if (!container) return;
    const items = container.querySelectorAll(".impact-stat-item");
    gsap.killTweensOf(items);
    gsap.fromTo(
      items,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: "power3.out",
        clearProps: "transform",
        onComplete: () => {
          isAnimatingRef.current = false;
        },
      },
    );
  };


  const animateStatsOut = (container, onComplete) => {
    if (!container) return;
    const items = container.querySelectorAll(".impact-stat-item");
    gsap.killTweensOf(items);
    gsap.to(items, {
      opacity: 0,
      y: -18,
      duration: 0.3,
      stagger: 0.04,
      ease: "power2.in",
      onComplete,
    });
  };

  const goToStep = (index) => {
    if (index === activeStepRef.current) return;
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    animateStatsOut(statsGridRef.current, () => {
      activeStepRef.current = index;
      setActiveStep(index);
      requestAnimationFrame(() => {
        animateStatsIn(statsGridRef.current);
      });
    });
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    gsap.fromTo(
      titleRef.current,
      {
        opacity: 0,
        x: -60,
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
      },
    );

    animateStatsIn(statsGridRef.current);

    const totalSteps = STEPS.length;
    const scrollDistance = window.innerHeight * (totalSteps * 1.45);
    const holdExtra = window.innerHeight * 0.85;

    const createST = () => {
      if (stRef.current) {
        stRef.current.kill();
        stRef.current = null;
      }
      stRef.current = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${scrollDistance + holdExtra}`,
        pin: true,
        pinSpacing: true,
        refreshPriority: 10,
        preventOverlaps: true,
        anticipatePin: 1,
        scrub: 1.2,
        invalidateOnRefresh: true,
        fastScrollEnd: false,

        onUpdate: (self) => {
          const progress = self.progress;
          const rawStep = progress * totalSteps;
          let newStep = Math.floor(rawStep);
          newStep = Math.max(0, Math.min(totalSteps - 1, newStep));

          if (progress > 0.82) {
            newStep = totalSteps - 1;
          }

          if (newStep !== activeStepRef.current && !isAnimatingRef.current) {
            isAnimatingRef.current = true;
            animateStatsOut(statsGridRef.current, () => {
              activeStepRef.current = newStep;
              setActiveStep(newStep);
              requestAnimationFrame(() => {
                animateStatsIn(statsGridRef.current);
              });
            });
          }

          gsap.to(lineFillRef.current, {
            height: `${progress * 100}%`,
            duration: 0.15,
            ease: "none",
            overwrite: "auto",
          });
        },
      });

      ScrollTrigger.refresh();
    };

    createST();

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
        createST();
      }, 250);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
      if (stRef.current) {
        stRef.current.kill();
        stRef.current = null;
      }
    };
  }, []);


  const currentStats = STEPS[activeStep].stats;

  return (
    <section
      ref={sectionRef}
      className="
        impact-section
        relative
        isolate
        z-[1]
        flex
        min-h-screen
        w-full
        items-center
        overflow-hidden
        bg-[#07111e]
        text-white
      "
      style={{
        backgroundImage: `url(${stepsimg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* OVERLAY */}
      <div
        className="
          absolute
          inset-0
          z-0
          bg-gradient-to-r
          from-[rgba(7,17,30,0.95)]
          via-[rgba(7,17,30,0.72)]
          to-[rgba(7,17,30,0.18)]
        "
      />

      {/* CONTAINER */}
      <div
        className="
          relative
          z-[2]
          mx-auto
          flex
          w-[90%]
          max-w-[1320px]
          flex-col
          items-start
          justify-between
          gap-[60px]
          py-[100px]
          lg:flex-row
          lg:items-center
        "
      >
        {/* LEFT */}
        <div className="w-full flex-1 max-w-[780px]">
          {/* TITLE */}
          <h2
            ref={titleRef}
            className="
              mb-[48px]
              text-[40px]
              font-bold
              uppercase
              leading-[1.02]
              tracking-[1px]
              sm:text-[48px]
              md:text-[56px]
              xl:text-[64px]
            "
          >
            Our impact
            <br />
            in numbers
          </h2>

          {/* GRID */}
          <div
            ref={statsGridRef}
            className="
              impact-stats-grid
              grid
              grid-cols-1
              gap-y-[36px]
              sm:grid-cols-2
              md:gap-y-[42px]
              lg:grid-cols-3
              lg:gap-y-[54px]
            "
          >
            {currentStats.map((item, index) => (
              <div
                key={index}
                className="
                  impact-stat-item
                  relative
                  px-0
                  sm:px-[24px]
                "
              >
                {/* DIVIDER */}
                {index % 3 !== 2 && (
                  <div
                    className="
                      absolute
                      right-0
                      top-[10%]
                      hidden
                      h-[80%]
                      w-[1px]
                      bg-white/10
                      lg:block
                    "
                  />
                )}

                {/* NUMBER */}
                <p
                  className="
                    mb-[12px]
                    text-[34px]
                    font-light
                    leading-none
                    tracking-[-1px]
                    sm:text-[42px]
                    xl:text-[52px]
                  "
                >
                  {item.number}
                </p>

                {/* LABEL */}
                <p
                  className="
                    max-w-[170px]
                    text-[13px]
                    font-light
                    leading-[1.6]
                    text-white/60
                    sm:max-w-full
                    lg:max-w-[170px]
                  "
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT NAV */}
        <nav
          className="
            relative
            flex
            flex-shrink-0
            flex-col
            items-start
            gap-[34px]
            pl-[20px]
            lg:items-end
            lg:gap-[52px]
            lg:pl-0
            lg:pr-[16px]
          "
        >
          {/* TRACK */}
          <div
            className="
              absolute
              bottom-[6px]
              left-[3px]
              top-[6px]
              w-[1px]
              bg-white/10
              lg:left-auto
              lg:right-[19px]
            "
          >
            {/* FILL */}
            <div
              ref={lineFillRef}
              className="
                impact-line-fill
                h-0
                w-full
                bg-[#00b0f5]
              "
            />
          </div>

          {/* NAV ITEMS */}
          {STEPS.map((step, index) => (
            <div
              key={index}
              onClick={() => goToStep(index)}
              className={`
                impact-nav-item
                relative
                z-[2]
                flex
                cursor-pointer
                flex-row-reverse
                items-center
                gap-[14px]
                lg:flex-row
              `}
            >
              {/* LABEL */}
              <span
                className={`
                  whitespace-nowrap
                  text-[12px]
                  font-medium
                  uppercase
                  tracking-[0.1em]
                  transition-colors
                  duration-300
                  lg:text-[13px]

                  ${index === activeStep ? "text-white" : "text-white/25"}
                `}
              >
                {step.label}
              </span>

              {/* DOT */}
              <div
                className={`
                  h-[7px]
                  w-[7px]
                  flex-shrink-0
                  rounded-full
                  transition-all
                  duration-300

                  ${
                    index <= activeStep
                      ? "bg-[#00b0f5] shadow-[0_0_12px_rgba(0,176,245,0.55)]"
                      : "bg-white/20"
                  }
                `}
              />
            </div>
          ))}
        </nav>
      </div>
    </section>
  );
}
