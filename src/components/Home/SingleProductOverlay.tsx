import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Product from "@/assets/productImg2.avif";

gsap.registerPlugin(ScrollTrigger);

const SingleProductOverlay: React.FC = () => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    // Clear any existing ScrollTrigger instances to prevent duplicates
    ScrollTrigger.getAll().forEach((st) => st.kill());

    gsap.to(imageRef.current, {
      scale: 3,
      ease: "power2.out",
      transformOrigin: "center center",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%", // Animation starts earlier for a smoother effect
        end: "bottom top", // Ends at the top of the viewport
        scrub: 1.5, // Smooth scrubbing effect
      },
    });

    // Clean up ScrollTrigger on component unmount
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center sm:gap-10 gap-10 lg:mt-[100px]">
      <h2 className="md:text-4xl max-sm:text-2xl  font-semibold">
        Designed for you
      </h2>
      <div
        ref={containerRef}
        className="h-[600px] max-sm:h-[350px] w-full flex flex-col items-center justify-center will-change-transform"
      >
        <div className="w-[300px] max-sm:w-[150px] aspect-square will-change-transform">
          <img
            ref={imageRef}
            src={Product}
            alt="Scrolling Effect"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default SingleProductOverlay;
