import React, { useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FiMenu, FiX } from "react-icons/fi";
import HlightLogo from "@/assets/HlightLogo.avif";
import { Link, useLocation } from "react-router-dom";

interface HeaderProps {
  navType?: string;
}

const LandingHeader: React.FC<HeaderProps> = ({ navType }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Determine navType from current route if not provided
  const currentNavType = navType || 
    (location.pathname === '/contactus' ? 'contactus' :
     location.pathname === '/aboutus' ? 'aboutus' : 'default');

  // Navigation items based on current page
  let navItems;
  if (currentNavType === 'contactus') {
    // Contact Us page: only Home and Products
    navItems = [
      { id: 'home', name: 'Home', route: '/' },
      { id: 'products', name: 'Products', route: '/products' },
    ];
  } else if (currentNavType === 'aboutus') {
    // About Us page: Home, About Us, Products, Contact Us (no Features/Testimonials)
    navItems = [
      { id: 'home', name: 'Home', route: '/' },
      { id: 'aboutus', name: 'About Us', route: '/aboutus' },
      { id: 'products', name: 'Products', route: '/products' },
      { id: 'contactus', name: 'Contact Us', route: '/contactus' },
    ];
  } else {
    // Default/Home page: all navigation items
    navItems = [
      { id: 'home', name: 'Home', route: '/' },
      { id: 'aboutus', name: 'About Us', route: '/aboutus' },
      { id: 'ourfeature', name: 'Features' },
      { id: 'products', name: 'Products', route: '/products' },
      { id: 'testimonials', name: 'Testimonials' },
      { id: 'contactus', name: 'Contact Us', route: '/contactus' },
    ];
  }

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 50,
        behavior: 'smooth',
      });
    }
    setMenuOpen(false);
  };

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from('.logo', { opacity: 0, y: -30, duration: 0.5, delay: 0.5 });
    tl.from('.navlink', { opacity: 0, y: -30, duration: 0.5, stagger: 0.1 });
  }, []);

  return (
    <header
      id="home"
      className="absolute z-10 top-0 w-full transition-all duration-300 flex max-lg:px-1 justify-center mt-[25px]"
    >
      <div className="flex justify-between items-center max-lg:w-full w-[90%] px-6 py-2 backdrop-blur-md bg-white/10 rounded-3xl">
        {/* Logo */}
        <div className="text-xl md:text-3xl font-extrabold logo">
          <div className="h-[50px] w-[200px] max-lg:w-[150px] max-lg:h-[40px] max-sm:w-[120px] max-sm:h-[30px]">
            <Link to="/">
              <img
                className="text-black h-full w-full object-cover cursor-pointer"
                src={HlightLogo}
                alt="Logo"
                loading="lazy"
              />
            </Link>
          </div>
        </div>
        {/* Mobile Menu Button */}
        <button
          className="md:hidden max-sm:text-xl text-2xl text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
        {/* Navigation Links */}
        <nav
          className={`md:flex max-sm:gap-4 gap-7 max-lg:gap-3 items-center text-lg max-lg:text-base font-semibold ${
            menuOpen
              ? 'flex flex-col absolute bg-gray-500 top-16 left-0 w-full py-5 max-md:shadow-lg rounded-md'
              : 'hidden'
          } md:flex-row md:static md:bg-transparent`}
        >
          {navItems.map((item) => (
            <div key={item.id} className="relative navlink">
              {item.route ? (
                <Link
                  to={item.route}
                  className={`flex items-center gap-2 cursor-pointer rounded-3xl transition-all duration-300${
                    item.id === 'contactus'
                      ? ' px-5 py-2 bg-gray-300 text-black hover:bg-gray-700 hover:text-white'
                      : ' p-2 text-white hover:text-blue-300'
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ) : (
                <div
                  className="flex p-2 hover:text-blue-300 items-center gap-2 cursor-pointer text-white transition-all hover:border-1 hover:rounded-2xl duration-300"
                  onClick={() => handleScroll(item.id)}
                >
                  {item.name}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default LandingHeader;
