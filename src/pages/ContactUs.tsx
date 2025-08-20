import React, { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import Darklogo from "../assets/darkPrimaryLogo.avif";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
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

const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [agree, setAgree] = useState(false);
  const { toast } = useToast();

  const validateForm = () => {
    let newErrors: any = {};
    if (!formData.firstName.match(/^[A-Za-z]{2,}$/)) {
      newErrors.firstName = "First name must contain only letters and be at least 2 characters long.";
    }
    if (!formData.lastName.match(/^[A-Za-z]{2,}$/)) {
      newErrors.lastName = "Last name must contain only letters and be at least 2 characters long.";
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Enter a valid email address.";
    }
    const phoneNumber = parsePhoneNumberFromString(formData.phone);
    if (!phoneNumber || !phoneNumber.isValid()) {
      newErrors.phone = "Enter a valid phone number.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (phone: string) => {
    setFormData((prev) => ({ ...prev, phone }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    if (!validateForm()) {
      toast({
        title: "Error",
        description: "Please fix the errors before submitting.",
        variant: "destructive",
      });
      setSending(false);
      return;
    }
    if (!agree) {
      toast({
        title: "Error",
        description: "You must agree to the privacy policy.",
        variant: "destructive",
      });
      setSending(false);
      return;
    }
    try {
      const text = `New Enquiry Submission:\n\nFirst Name: ${formData.firstName}\nLast Name: ${formData.lastName}\nEmail: ${formData.email}\nPhone: ${formData.phone}`;
      const encodedText = encodeURIComponent(text);
      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodedText}`;
      const response = await fetch(url, { method: "GET" });
      const result = await response.json();
      if (result.ok) {
        toast({
          title: "Success",
          description: "Message Sent Successfully!",
        });
        setFormData({ firstName: "", lastName: "", email: "", phone: "" });
        setAgree(false);
      } else {
        throw new Error("Telegram error: " + result.description);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact us</title>
        <meta
          name="description"
          content="Contact us for Smart air purifiers and air quality devices for a healthier home."
        />
        <meta name="keywords" content={genericKeywords.join(", ")} />
      </Helmet>

      <div className="flex flex-col md:flex-row min-h-screen max-md:items-center">
        <div className="md:w-[40%] max-md:mt-[80px] h-screen max-md:hidden">
          <img
            src={Darklogo}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>
        <div className="md:w-[60%] w-full bg-landing-primary p-6 md:pt-[100px] flex flex-col justify-center items-center max-md:mt-[100px]">
          <h1 className="text-3xl font-bold mb-3 text-white">
            Contact us
          </h1>
          <p className="mb-5 text-gray-400">
            Reach out and we'll get in touch within 24 hours.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4 max-md:w-full md:w-[50%]">
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                className="p-3 outline-0 rounded-md w-full bg-white"
                required
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm font-semibold">
                  {errors.firstName}
                </p>
              )}
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                className="p-3 outline-0 rounded-md w-full bg-white"
                required
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm font-semibold">
                  {errors.lastName}
                </p>
              )}
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="p-3 outline-0 border-gray-300 rounded-md w-full bg-white"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm font-semibold">
                {errors.email}
              </p>
            )}
            <PhoneInput
              defaultCountry="in"
              value={formData.phone}
              onChange={handlePhoneChange}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm font-semibold">
                {errors.phone}
              </p>
            )}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="agree"
                checked={agree}
                onChange={() => setAgree(!agree)}
                className="w-5 h-5"
              />
              <label className="text-gray-400">
                You agree to our friendly{' '}
                <a href="#" className="text-blue-600 underline">
                  privacy policy
                </a>
                .
              </label>
            </div>
            <button
              type="submit"
              className="bg-gray-700 text-white h-[50px] py-3 px-6 rounded-md w-full hover:bg-gray-800 transition text-center flex justify-center items-center"
              disabled={sending}
            >
              {sending ? <div className="loader"></div> : "Send"}
            </button>
          </form>
        </div>
        <div className="w-[60%] h-[7px] bg-primary my-[50px] md:hidden"></div>
      </div>
      <Toaster />
    </>
  );
};

export default ContactUs;
