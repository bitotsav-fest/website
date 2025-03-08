"use client";
import { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import CircularGalleryDay0 from "@/components/sponsors/circular";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "../../components/sponsors/lamp";
//import InfiniteCarousel from "@/components/sponsors/infirow";
const sponsors = [
  {
    text: "Jharkhand Tourism - Title Sponsor",
    image: "/sponsors/JharkhandTourism.png",
  },
  {
    text: "CMPDI",
    image: "/sponsors/Cmpdi.png",
  },
  {
    text: "SBI - Banking Partner",
    image: "/sponsors/SBI.png",
  },
  {
    text: "RedBull",
    image: "/sponsors/Red-Bull.png",
  },
  {
    text: "Nestle",
    image: "/sponsors/Nestle.png",
  },
  {
    text: "Frostive",
    image: "/sponsors/Frostive.png",
  },
];

const Sponsors = () => {
  const spotlightWrapperRef = useRef(null);

  useEffect(() => {
    AOS.init({
      once: false,
      duration: 500,
      easing: "ease-in-out",
    });

    // Find the center image and add the 'highlight' class
    const images = spotlightWrapperRef.current.querySelectorAll("img");
    if (images.length > 0) {
      const centerImage = images[Math.floor(images.length / 2)]; // Highlight the middle image
      centerImage.classList.add("brightness-100", "opacity-100"); // Brighten the center image
      centerImage.classList.remove("brightness-50", "opacity-50"); // Remove dim effect
    }
  }, []);

  return (
    <div className="bg-[#0A0118] text-white overflow-hidden pt-8">
      {/* "Our Sponsors" Heading */}
      <h1 className="text-6xl font-bold text-center pt-10">Our Sponsors</h1>

      {/* "Coming Soon" Text centered vertically */}
      <div className="flex items-center justify-center min-h-screen text-4xl font-bold text-gray-400">
        Coming Soon
      </div>

      {/* "Past Sponsors" Heading */}
      <h1 className="text-6xl font-bold text-center mb-40 z-40 relative">
        Past Sponsors
      </h1>

      {/* Full-Screen Lamp Container */}
      <div className="relative w-full h-screen flex items-center justify-center">
        <LampContainer>
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="mt-4 bg-gradient-to-br from-slate-300 to-slate-500 py-2 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
          >
            {/* Sponsors in Circular Path */}
            <div
              className="relative w-full h-full flex justify-center items-center"
              ref={spotlightWrapperRef}
            >
              {/* Circular Gallery */}
              <CircularGalleryDay0
                items={sponsors}
                bend={3}
                textColor="#ffffff"
                borderRadius={0.05}
              />
            </div>
          </motion.h1>
        </LampContainer>
      </div>
    </div>
  );
};

export default Sponsors;
