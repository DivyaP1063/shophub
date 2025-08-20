import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaLinkedin,
} from "react-icons/fa6";
import HlightLogo from "@/assets/HlightLogo.avif";
import { Link, useLocation } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

type FooterTextRef = HTMLDivElement | HTMLImageElement | HTMLLIElement | null;

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<Array<FooterTextRef>>([]);
  const socialRef = useRef<Array<HTMLAnchorElement | null>>([]);
  const location = useLocation();

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 50,
        behavior: "auto",
      });
    }
  };

  // Navigation items based on current page
  const getNavItems = () => {
    if (location.pathname === '/aboutus') {
      return [
        { name: 'Home', route: '/' },
        { name: 'About us', route: '/aboutus' },
        { name: 'Products', route: '/products' },
        { name: 'Contact us', route: '/contactus' },
      ];
    } else {
      // Home page - includes scroll sections
      return [
        { name: 'Home', id: 'home' },
        { name: 'Products', route: '/products' },
        { name: 'About us', route: '/aboutus' },
        { name: 'Contact us', route: '/contactus' },
      ];
    }
  };

  useEffect(() => {
    if (footerRef.current) {
      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          end: "top 50%",
        },
        opacity: 0,
        y: 10,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
      gsap.from(socialRef.current, {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
          end: "top 60%",
        },
        opacity: 0,
        scale: 0.8,
        duration: 1,
        stagger: 0.2,
        ease: "elastic.out(1, 0.5)",
      });
    }
  }, []);

  return (
    <div ref={footerRef} className="w-full h-fit bg-landing-primary text-white pb-3">
      <div className="flex flex-col md:flex-row justify-between max-sm:items-center items-start mb-10 w-full py-12 px-8 md:px-16">
        {/* Brand Logo */}
        <div className="mb-8 md:mb-0">
          <Link to="/">
            <img
              src={HlightLogo}
              alt="Logo"
              ref={el => { if (el) textRef.current.push(el); }}
              loading="lazy"
              className="cursor-pointer"
            />
          </Link>
        </div>
        {/* Navigation */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          <nav>
            <ul className="flex flex-col items-center md:flex-row gap-4 md:gap-10">
              {getNavItems().map((item, index) => (
                <li key={index} ref={el => { if (el) textRef.current.push(el); }}>
                  {item.route ? (
                    <Link
                      to={item.route}
                      className="hover:text-gray-300 transition-colors"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleScroll(item.id!)}
                      className="hover:text-gray-300 transition-colors"
                    >
                      {item.name}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      {/* Social Media Icons */}
      <div className="flex justify-center gap-6 mb-8">
        <a
          href="https://www.instagram.com/safeguard_airo?utm_source=qr&igsh=dnF1MWd6N2t2M2Jt"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300 transition-colors"
          ref={el => { if (el) socialRef.current.push(el); }}
        >
          <FaInstagram size={24} />
        </a>
        <a
          href="https://www.linkedin.com/company/safeguard-airo"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300 transition-colors"
          ref={el => { if (el) socialRef.current.push(el); }}
        >
          <FaLinkedin size={24} />
        </a>
        <a
          href="https://www.facebook.com/profile.php?id=61574564712758"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300 transition-colors"
          ref={el => { if (el) socialRef.current.push(el); }}
        >
          <FaFacebook size={24} />
        </a>
        <a
          href="https://x.com/Safeguardair"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300 transition-colors"
          ref={el => { if (el) socialRef.current.push(el); }}
        >
          <FaXTwitter size={24} />
        </a>
      </div>
      {/* Copyright */}
      <div className="text-center text-sm" ref={el => { if (el) textRef.current.push(el); }}>
        <p>© 2025 By Mythri InnovoTech Solutions Pvt Ltd</p>
      </div>
    </div>
  );
};

export default Footer;
