import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Product from "@/assets/productImg.avif";

gsap.registerPlugin(ScrollTrigger);

const Smallshowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    const element = document.getElementById("home");
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 50,
        behavior: "auto",
      });
    }
  };

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 60%",
      },
    });

    tl.from(textRef.current, {
      x: -100,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: "power3.out",
    }).from(
      imageRef.current,
      {
        x: 200,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
      },
      "-=0.8"
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-[90%] mx-auto flex flex-col md:flex-row items-center justify-between bg-white gap-10  min-h-[400px]"
    >
      {/* Text Section */}
      <div
        ref={textRef}
        className="text-center flex flex-col items-center md:items-start justify-center w-full md:w-[40%]"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-black">
          Next-Gen AirQuality Monitor
        </h1>
        <p className="text-gray-600 text-lg md:text-xl mt-3">
          Experience fresh and clean air with our latest smart air quality identifier. Designed to show Air Quality Index.
        </p>
        <div className="w-full text-center">
        <button
          onClick={handleScroll}
          className="px-6 py-3  bg-black text-white rounded-full shadow-lg hover:bg-gray-800 transition duration-300 mt-5 w-[60%] md:w-[50%]"
        >
          Explore
        </button>

        </div>
      </div>

      {/* Image Section */}
      <div
        ref={imageRef}
        className="w-full md:w-[40%] h-[300px] md:h-[400px] rounded-xl"
        onClick={handleScroll}
      >
        <img
          src={Product}
          alt="Air Quality Monitor"
          className="w-full h-full object-cover rounded-xl"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default Smallshowcase;
