import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Product1 from "@/assets/productImg2.avif";
import Product2 from "@/assets/productImg3.avif";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    itemId: "product1",
    id: 1,
    name: "Archit Srivastav",
    tagline: "A Game-Changer for Indoor Air Quality!",
    description:
      "I've never realized how poor my indoor air quality was until I started using this device. It gives real-time insights and helps me take proactive measures. Highly recommended!",
    features: [
      "Accurate air quality tracking",
      "User-friendly interface",
      "Timely alerts for better health",
      "Smart recommendations",
    ],
    image: Product1,
  },
  {
    itemId: "product2",
    id: 2,
    name: "Anurag Pandey",
    tagline: "Breathing Cleaner, Living Better!",
    description:
      "Auto Mode in the device works really well without our efforts it seamlessly adjust based on the air quality and we are able to see the changes in our app.",
    features: [
      "Real-time pollutant detection",
      "AI-driven air quality analysis",
      "Improved sleep and well-being",
    ],
    image: Product2,
  },
];

const Productswipe: React.FC = () => {
  const productRefs = useRef<Array<HTMLDivElement | null>>([]);



  useEffect(() => {
    productRefs.current.forEach((item, index) => {
      if (item) {
        const image = item.querySelector(".product-img") as HTMLDivElement | null;
        const text = item.querySelector(".product-text") as HTMLDivElement | null;

        gsap.from(image, {
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "bottom 60%",
          },
          x: index % 2 === 0 ? -100 : 100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });

        gsap.from(text, {
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "bottom 60%",
          },
          x: index % 2 === 0 ? 100 : -100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      }
    });
  }, []);

  return (
    <section
      id="testimonials"
      className="w-full min-h-screen flex justify-center items-center my-[50px] max-sm:my-[15px] px-4"
    >
      <div className="w-full max-w-7xl">
        <div className="w-full h-full">
          <div className="w-full h-fit bg-white px-4 sm:px-8 lg:px-16">
            <h2 className="text-2xl sm:text-3xl mb-8 sm:mb-12 font-bold text-center text-gray-700">
              Testimonials
            </h2>
            <div className="flex flex-col w-full h-fit">
              {products.map((product, index) => (
                <div
                  id={product.itemId}
                  key={product.id}
                  ref={el => { productRefs.current[index] = el; }}
                  className={`product-item flex flex-col md:flex-row justify-between items-center ${index % 2 === 0 ? "" : "md:flex-row-reverse"} w-full`}
                >
                  {/* Image Section */}
                  <div
                    className="product-img w-full md:w-[45%] flex justify-center items-center"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="w-[80%] md:w-full h-fit md:h-[350px] object-contain cursor-pointer hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  {/* Text Section */}
                  <div className="product-text w-full md:w-[50%] flex flex-col justify-center gap-4 text-center md:text-left p-4">
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-700">
                      {product.name}
                    </h3>
                    <h4 className="text-lg sm:text-xl text-gray-700 font-semibold">
                      {product.tagline}
                    </h4>
                    <p className="text-sm sm:text-base text-gray-600">
                      {product.description}
                    </p>
                    <div>
                      <Link to="/products">
                        <span className="mt-4 px-4 py-2 font-bold cursor-pointer rounded text-white hover:text-gray-200 hover:scale-105 transition-all duration-200 ease-in-out bg-primary mx-auto md:mx-0 w-fit">
                          Read More
                        </span>
                      </Link>

                      <div className="h-[1px] w-[60%] bg-green mt-4 mx-auto md:mx-0"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Productswipe;
