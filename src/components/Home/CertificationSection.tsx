import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Certi1 from "@/assets/Reset Standard-Photoroom.avif";
import Certi2 from "@/assets/well standard-Photoroom.avif";
import Certi3 from "@/assets/Reach and Rosh-Photoroom.avif";

gsap.registerPlugin(ScrollTrigger);

const CertificationSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const certRefs = useRef<Array<HTMLDivElement | null>>([]);

  const certifications = [
    {
      id: 1,
      logo: Certi1,
      title: "Approved by RESET® Air Organization",
      alt: "RESET Air Organization Logo",
    },
    {
      id: 2,
      logo: Certi2,
      title: "Approved by WELL Building Standard®",
      alt: "WELL Building Standard Logo",
    },
    {
      id: 3,
      logo: Certi3,
      title: "Approved by RoHS, REACH Organization",
      alt: "RoHS, REACH Organization Logo",
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const items = certRefs.current;
    if (section && items.length > 0) {
      gsap.from(items, {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out",
      });
    }
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-[90%] bg-landing-primary text-white py-16 rounded-3xl px-4"
    >
      <div className="w-full">
        <h2 className="text-2xl md:text-3xl font-medium text-center mb-12">
          Sensor Tested & Trusted by
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
          {certifications.map((cert, index) => (
            <div
              key={cert.id}
              ref={el => { certRefs.current[index] = el; }}
              className="flex flex-col items-center text-center"
            >
              <div
                className={`w-20 h-20 mb-6 flex items-center justify-center ${cert.id === 1 ? "bg-white" : ""} rounded-full`}
              >
                <img
                  src={cert.logo}
                  alt={cert.alt}
                  className="w-[80%] h-[80%] object-contain"
                  loading="lazy"
                />
              </div>
              <p className="text-base md:text-lg">{cert.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CertificationSection;
