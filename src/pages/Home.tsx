import Herosection from '../components/Home/Herosection';
import Productswipe from '../components/Home/Productswipe';
import SingleProductOverlay from '../components/Home/SingleProductOverlay';
import ScrollStackEffect from '../components/Home/ScrollStackEffect';
import BentoGrid from '../components/Home/BentoGrid';
import Smallshowcase from '../components/Home/Smallshowcase';
import Newsletter from '../components/Home/Newsletter';
import CertificationSection from '../components/Home/CertificationSection';
import Footer from '../components/Home/Footer';
import { Helmet } from "react-helmet";

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

const Home: React.FC = () => {
  return (
    <div className="w-full min-h-screen overflow-x-clip">
      <Helmet>
        <title>SafeGuard Air</title>
        <meta
          name="description"
          content="SafeGuard Air is your trusted partner in clean air solutions, offering a full range of air pollution protection products including HEPA-certified air purifiers, smart air quality monitors, pollution masks, and ventilation systems. Built with cutting-edge technology and eco-friendly materials, our products are designed to safeguard your health against airborne pollutants, allergens, and toxins. With a strong commitment to innovation, reliability, and sustainability, SafeGuard Air empowers homes, offices, and public spaces to breathe easier. Explore our range and experience the true value of clean, breathable air."
        />
        <meta name="keywords" content={genericKeywords.join(", ")} />
      </Helmet>

      <main className="w-full min-h-screen flex flex-col items-center gap-y-[20px] lg:gap-y-[100px]">
        <Herosection />
        <SingleProductOverlay />
        <ScrollStackEffect />
        <Smallshowcase />
        <BentoGrid />
        <CertificationSection />
        <Newsletter />
        <Productswipe />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
