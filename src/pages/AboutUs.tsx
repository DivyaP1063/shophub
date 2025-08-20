import LightLogo from '@/assets/darkPrimaryLogo.avif';
import ProductImg from '@/assets/productImg4.avif';
import Header from '@/components/Header';
import Footer from '@/components/Home/Footer';
import React from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';

const genericKeywords = [
  "Air purifier",
  "Smart air purifier",
  "Indoor air quality",
  "Home air monitor",
  "Air pollution detector",
  "PM2.5 monitor",
  "HEPA air purifier",
  "Air cleaner",
  "Air quality sensor",
  "Smart home devices",
  "Air purification system",
  "VOC detector",
  "Air quality test",
  "Auto-calibrating purifier",
  "Carbon monoxide detector",
  "Formaldehyde monitor",
  "Dust sensor",
  "Airborne particle counter",
  "Smart air monitor",
  "Air purification technology",
  "Air health device",
  "Air quality measurement",
  "Breathing health monitor",
  "Indoor pollution control",
  "Smart environment monitor",
  "Allergy relief purifier",
  "Baby air purifier",
  "Air quality safety device",
  "Clean air device",
  "Best air quality monitor for home use",
  "Smart air purifier with HEPA filter",
  "Air quality monitor for hospitals",
  "Medical-grade air purifier for clinics",
  "PM2.5 and VOC air pollution detector",
  "Air purifier with auto calibration and sensors",
  "Air purifier safe for newborn babies",
  "Best air quality sensor for respiratory health",
  "Compact air monitor for elderly homes",
  "Air quality monitoring for medical organizations",
  "Indoor air pollution monitoring device",
  "Wireless air quality monitor for homes",
  "Portable air purifier for traveling",
  "Smart air purifier for large rooms",
  "Affordable air quality monitors for families",
  "Best air purifier for allergy sufferers",
  "High-accuracy air quality detection device",
  "Air purifier that removes pet dander",
  "Real-time air quality monitoring system",
  "Air purification device for chronic lung patients",
  "Air monitor compatible with smart home",
  "Air quality device with app control",
  "Advanced air purifier with calibration system",
  "Energy-efficient air quality monitor",
  "Silent air purifier for bedrooms",
  "Air purifier for asthma patients",
  "Formaldehyde and VOC removal purifier",
  "Hospital-grade air filtration system",
  "Best air purifier for newborn baby room",
  "Air purifier for elderly care homes",
  "Air quality monitor for schools and hospitals",
  "Automatic air quality control device",
  "Multi-room air quality monitoring system",
  "Environment safety devices for homes",
  "Air purifiers with real-time pollutant tracking",
  "Compact air cleaner for cars and homes",
  "Air quality solutions for urban homes",
  "VOC monitoring device for indoor air",
  "Air purifier designed for sensitive lungs",
  "Automatic calibration air purifier for health clinics",
  "Air purifier that removes bacteria and viruses",
  "Best device to monitor air quality 24/7",
  "AI-powered air purification system",
  "Indoor air purification solutions for kids",
  "Smart home air safety devices",
  "Long-lasting air purifier filters",
  "Air cleaner with medical-grade HEPA filter",
  "Air purifier that syncs with mobile app",
  "Real-time dust and allergen removal",
  "Top-rated air purifiers for elderly wellness",
];

const AboutUs: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>About us</title>
        <meta
          name="description"
          content="About us, We offer Smart air purifiers and air quality devices for a healthier home."
        />
        <meta name="keywords" content={genericKeywords.join(", ")} />
      </Helmet>

      <div className="bg-white text-primary min-h-screen flex flex-col items-center">
        <div className="pt-[120px] bg-landing-primary w-full" />
        {/* Main Content */}
        <section className="py-10 px-6 md:px-16">
          <h1 className="text-2xl md:text-4xl font-bold text-primary text-center mb-8">
            ABOUT SAFEGUARD AIR
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="w-full h-[420px] aspect-square rounded-xl">
              <img
                src={ProductImg}
                className="w-full h-full object-cover rounded-xl"
                alt="Product"
                loading="lazy"
              />
            </div>
            <div className="bg-gray-50 p-5 md:p-8 rounded-xl">
              <p className="text-gray-500 uppercase mb-2">WELCOME TO SAFEGUARD AIR</p>
              <h3 className="text-xl md:text-3xl font-bold mb-6">ADVANCED AIR PURIFICATION & MONITORING SOLUTIONS</h3>
              <p className="text-gray-600 mb-8">
                At SafeGuard, we are committed to creating healthier indoor environments with cutting-edge air purification and monitoring technology. Our innovative solutions help you breathe cleaner air.
              </p>
              <Link to="/products">
                <div
                  className="inline-block bg-landing-primary text-white font-medium py-2 px-6 hover:bg-gray-800 transition-colors"
                >
                  LEARN MORE
                </div>
              </Link>
              <div className="grid grid-cols-2 gap-8 mt-8">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-1">3 +</h3>
                  <p className="text-gray-500 text-sm">Years of Innovation</p>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-1">1,000 +</h3>
                  <p className="text-gray-500 text-sm">Early Adaptors</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Why Choose Us */}
        <section className="py-10 bg-gray-50 w-full flex flex-col items-center text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">WHY CHOOSE SAFEGUARD AIR</h2>
          <p className="text-gray-600 mb-8 max-w-3xl px-4">
            SafeGuard Air is dedicated to providing high-performance air purification and monitoring products that improve indoor air quality.
          </p>
          <Link to="/products">
            <div
              className="inline-block bg-landing-primary text-white font-medium py-2 px-6 mb-8 hover:bg-gray-800 transition-colors"
            >
              EXPLORE PRODUCTS
            </div>
          </Link>
        </section>
        {/* Smart Air Purification */}
        <section className="py-16 w-full flex flex-col items-center">
          <div className="w-[90%] px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-gray-500 uppercase mb-2">INNOVATIVE TECHNOLOGY</p>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">SMART AIR PURIFICATION</h2>
                <p className="text-gray-600 mb-8">
                  SafeGuard Air is redefining air purification with smart, sensor-driven technology that adapts to your surroundings.
                </p>
                <div className="mb-8">
                  <p className="italic text-gray-500 mb-4">
                    "The future of clean air lies in intelligent solutions that not only purify but also educate users."
                  </p>
                  <div className="font-bold">Praveen, Founder & CTO</div>
                </div>
                <Link to="/products">
                  <div
                    className="inline-block bg-landing-primary text-white font-medium py-2 px-6 hover:bg-gray-800 transition-colors"
                  >
                    LEARN MORE
                  </div>
                </Link>
              </div>
              <div className="w-full flex justify-center">
                <img
                  src={LightLogo}
                  className="w-3/4 md:w-1/2"
                  alt="SafeGuard Logo"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>
        {/* Call to Action */}
        <section className="bg-landing-primary text-white py-16 w-full">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-xl md:text-2xl font-bold mb-4">Ready to Breathe Cleaner, Healthier Air?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Experience the power of SafeGuard’s advanced air purification technology.
            </p>
            <Link to="/products">
            <div
              className="inline-block bg-white text-black  hover:text-white font-medium py-2 px-6 hover:bg-gray-400 cursor-pointer transition-colors"
            >
              GET STARTED
              </div>
            </Link>
            </div>
        </section>
        <div className="w-[80%] h-[7px] bg-primary my-12"></div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
