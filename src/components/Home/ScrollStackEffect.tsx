import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import features from "@/data/features";

gsap.registerPlugin(ScrollTrigger);

const ScrollStackEffect: React.FC = () => {
  const mdTextRefs = useRef<Array<HTMLDivElement | null>>([]);
  const smTextRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const animateText = (refs: React.RefObject<Array<HTMLDivElement | null>>) => {
      refs.current.forEach((group, index) => {
        if (!group) return;
        const isLeft = index % 2 === 0;
        gsap.fromTo(
          group.children,
          {
            opacity: 0,
            x: isLeft ? -50 : 50,
          },
          {
            opacity: 1,
            x: 0,
            duration: 1.2,
            ease: "power3.out",
            stagger: 0.2,
            scrollTrigger: {
              trigger: group,
              start: "top 85%",
            },
          }
        );
      });
    };
    animateText(mdTextRefs);
    animateText(smTextRefs);
  }, []);

  return (
    <div id="ourfeature" className="w-full flex flex-col items-center justify-center">
      <h2 className="text-4xl max-sm:text-3xl font-semibold mb-[100px] max-sm:mb-[20px] text-center">
        Features
      </h2>
      <div className="relative sm:hidden w-full h-fit flex flex-col justify-center items-center gap-8">
        {features.map((feature, index) => {
          const bgColor = index % 2 === 0 ? "bg-landing-primary text-white" : "bg-white text-black";
          return (
            <div
              key={index}
              ref={el => { smTextRefs.current[index] = el; }}
              className={`sticky top-[50px] w-[90%] h-[50vh] flex items-center justify-center rounded-3xl ${bgColor} text-center p-6 border`}
            >
              <div>
                <h3 className="text-3xl font-bold">{feature.title}</h3>
                <p className="text-lg mt-2">{feature.description}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="relative max-sm:hidden w-full h-fit flex flex-col justify-center items-center gap-8">
        {Array.from({ length: Math.ceil(features.length / 2) }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="sticky top-[50px] w-[90%] h-[50vh] grid grid-cols-2 gap-4 rounded-3xl"
          >
            {features.slice(rowIndex * 2, rowIndex * 2 + 2).map((feature, colIndex) => {
              const isLeft = colIndex === 0;
              const isEvenRow = rowIndex % 2 === 0;
              const bgColor = isLeft === isEvenRow ? "bg-landing-primary text-white" : "bg-white text-black";
              return (
                <div
                  key={colIndex}
                  className={`flex flex-col items-center justify-center rounded-3xl ${bgColor} text-center p-6 border border-gray-300 h-full`}
                >
                  <div
                    ref={el => { mdTextRefs.current[rowIndex * 2 + colIndex] = el; }}
                  >
                    <h3 className="text-3xl max-sm:text-2xl font-bold">{feature.title}</h3>
                    <p className="text-lg max-sm:text-base mt-2">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollStackEffect;
