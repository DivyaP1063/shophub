import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BentoGrid: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.from(".animate-text", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reset",
        },
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 text-white w-[90%] mx-auto text-center py-4"
      >
        {/* Section 1 */}
        <div className="relative md:col-span-2 xl:col-span-2 rounded-xl p-6 md:p-8 bg-primary hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="absolute inset-0 bg-landing-primary rounded-xl"></div>
          <div className="relative flex flex-col h-full justify-center">
            <h2 className="text-lg md:text-2xl xl:text-3xl mb-4 font-medium animate-text">
              Experience <span className="italic">Clean & Healthy Air</span> with Our Purifiers.
            </h2>
            <button className="rounded-full animate-text">
              Shop Now <span className=""></span>
            </button>
          </div>
        </div>
        {/* Section 2 */}
        <div className="xl:row-span-3 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative md:col-span-2 rounded-xl p-6 md:p-10 xl:p-12 bg-primary hover:scale-105 transition-transform duration-300 ease-in-out">
            <div className="absolute inset-0 bg-landing-primary rounded-xl"></div>
            <div className="relative flex flex-col h-full justify-center items-center">
              <h2 className="text-lg md:text-3xl xl:text-4xl text-white mb-4 animate-text">
                Breathe <span className="text-warning">Pure Air</span> & Improve Your Health.
              </h2>
              <p className="text-sm md:text-base xl:text-lg animate-text">
                Advanced filtration for a pollution-free environment.
              </p>
            </div>
          </div>
          {/* Section 3 */}
          <div className="relative rounded-xl p-4 md:p-6 bg-primary hover:scale-105 transition-transform duration-300 ease-in-out">
            <div className="absolute inset-0 bg-landing-primary rounded-xl"></div>
            <div className="relative flex flex-col justify-center h-full">
              <h3 className="text-base md:text-xl xl:text-2xl font-medium animate-text">
                Real-time AQI Monitoring for Your Home & Office.
              </h3>
            </div>
          </div>
          {/* Section 4 */}
          <div className="relative rounded-xl p-4 md:p-6 bg-primary hover:scale-105 transition-transform duration-300 ease-in-out">
            <div className="absolute inset-0 bg-landing-primary rounded-xl"></div>
            <div className="relative flex flex-col justify-center h-full">
              <h3 className="text-base md:text-xl xl:text-2xl font-medium animate-text">
                Remove 99.9% of Pollutants & Allergens.
              </h3>
            </div>
          </div>
        </div>
        {/* Section 5 */}
        <div className="relative md:row-span-2 xl:row-span-3 rounded-xl p-4 md:p-6 bg-primary hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="absolute inset-0 bg-landing-primary rounded-xl"></div>
          <div className="relative flex flex-col justify-center h-full">
            <h3 className="text-base md:text-xl xl:text-2xl font-medium animate-text">
              Smart Air Purifiers with HEPA & UV Technology.
            </h3>
            <p className="text-sm md:text-base animate-text">
              Automatic adjustments for optimal air quality day & night.
            </p>
          </div>
        </div>
        {/* Section 6 */}
        <div className="relative xl:row-span-2 rounded-xl p-4 md:p-6 bg-primary hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="absolute inset-0 bg-landing-primary rounded-xl"></div>
          <div className="relative flex flex-col justify-center h-full">
            <h3 className="text-base md:text-xl xl:text-2xl animate-text">
              AI-Driven Air Quality Insights.
            </h3>
          </div>
        </div>
        {/* Section 7 */}
        <div className="relative rounded-xl p-4 md:p-6 bg-primary hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="absolute inset-0 bg-landing-primary rounded-xl"></div>
          <div className="relative flex flex-col gap-2 justify-center">
            <h2 className="text-2xl md:text-4xl xl:text-5xl font-medium animate-text">
              99.9%
            </h2>
            <p className="text-sm md:text-lg animate-text">
              Air Purification Efficiency
            </p>
          </div>
        </div>
        {/* Section 8 */}
        <div className="relative md:col-span-2 xl:col-span-2 rounded-xl p-4 md:p-6 bg-primary hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="absolute inset-0 bg-landing-primary rounded-xl"></div>
          <div className="relative flex flex-col justify-center">
            <h3 className="text-base md:text-xl xl:text-2xl animate-text">
              Live Better with Cleaner, Fresher Air.
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BentoGrid;
