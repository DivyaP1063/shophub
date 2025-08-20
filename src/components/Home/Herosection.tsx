import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import bannerLarge from "@/assets/bannerLarge.avif";
import bannerMedium from "@/assets/bannerMedium.avif";
import bannerSmall from "@/assets/bannerSmall.avif";

const Herosection: React.FC = () => {
  useGSAP(() => {
    gsap.from(".hero-section", {
      opacity: 0,
      duration: 1.5,
      ease: "power2.out",
      stagger: 0.5,
    });
  }, []);

  return (
    <section className="w-full max-sm:h-fit lg:h-screen flex flex-col items-center overflow-hidden">
      <div className="py-[40px] bg-landing-primary w-full sm:hidden" />
      <div className="w-full h-fit hero-section relative">
        <img
          src={bannerLarge}
          className="w-full h-full object-cover max-md:hidden"
          alt="Hero Banner"
        />
        <img
          src={bannerMedium}
          className="w-full h-full object-cover max-sm:hidden md:hidden"
          alt="Hero Banner"
        />
        <img
          src={bannerSmall}
          className="w-full h-full object-scale-down sm:hidden"
          alt="Hero Banner"
        />
      </div>
    </section>
  );
};

export default Herosection;
