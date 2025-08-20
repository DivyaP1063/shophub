import React from "react";
import LightLogo from "@/assets/LightPLogo.avif";

const Newsletter: React.FC = () => {
  return (
    <div className="bg-landing-primary text-white py-5 px-4 w-full flex flex-wrap justify-center sm:justify-between items-center min-h-[600px]">
      <div className="w-full sm:w-[50%] flex justify-center p-6">
        <img
          src={LightLogo}
          className="sm:h-full object-contain"
          alt="Logo"
          loading="lazy"
        />
      </div>
      <div className="w-full sm:w-[50%] flex flex-col gap-5 items-center px-6">
        <div className="w-full sm:w-[70%]">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-center sm:text-left">
              Subscribe to our newsletter
            </h3>
            <form className="flex flex-col space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-3 w-full rounded-md text-black bg-white focus:outline-none focus:ring focus:ring-green-500"
                required
              />
              <label className="flex items-center space-x-2 text-sm text-gray-400">
                <input type="checkbox" />
                <span>Yes, subscribe me to your newsletter.</span>
              </label>
              <button
                type="submit"
                className="bg-gray-600 text-white py-3 px-6 rounded-md font-medium hover:bg-gray-500 transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
