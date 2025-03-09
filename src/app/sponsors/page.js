"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "../../components/sponsors/lamp";
import ComingSoonPage from "../coming-soon/page";

const sponsors = [
  { text: "Jharkhand Tourism - Title Sponsor", image: "/sponsors/JharkhandTourism.png" },
  { text: "CMPDI", image: "/sponsors/Cmpdi.png" },
  { text: "SBI - Banking Partner", image: "/sponsors/SBI.png" },
  { text: "RedBull", image: "/sponsors/Red-Bull.png" },
  { text: "Nestle", image: "/sponsors/Nestle.png" },
  { text: "Frostive", image: "/sponsors/Frostive.png" },
];


const infiniteSponsors = [...sponsors, ...sponsors];

const Sponsors = () => {
  useEffect(() => {
    AOS.init({ once: false, duration: 500, easing: "ease-in-out" });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0118] via-[#2D1E0F] to-[#1A0B2E] text-white overflow-hidden">
      {/* Hero Section with Coming Soon */}
      <div className="relative">
        <ComingSoonPage />
      </div>

      {/* Past Sponsors Section */}
      <div className="relative py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-center mb-20"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#EFCA4E] via-[#F6F1E2] to-[#EFCA4E]">
            Past Sponsors
          </span>
        </motion.h2>

        {/* Sponsors Gallery with Lamp Effect */}
        <div className="relative w-full min-h-[80vh] overflow-hidden">
          <LampContainer>
            <motion.div
              initial={{ opacity: 0.5, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
              className="relative w-full h-full"
            >
              <div className="relative overflow-hidden w-full">
                {/* Sponsors */}
                <div className="flex space-x-8 overflow-hidden w-full h-[350px] items-center">
                  {/* infinite scrolling */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="flex space-x-8 animate-scroll"
                    >
                      {sponsors.map((sponsor, index) => (
                        <div key={index} className="flex-none w-72 h-72 relative group transition-all duration-300 hover:scale-105">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#EFCA4E]/20 via-[#F6F1E2]/20 to-[#EFCA4E]/20 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>
                        <div className="w-full h-full flex flex-col items-center justify-center bg-black/30 backdrop-blur-xl rounded-xl p-6 border border-[#EFCA4E]/10 group-hover:border-[#EFCA4E]/50 shadow-lg group-hover:shadow-[0_0_30px_#EFCA4E] transition-all duration-300">
                          <motion.img
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            src={sponsor.image}
                            alt={sponsor.text}
                            className="w-52 h-52 object-contain mb-4 drop-shadow-2xl"
                          />
                          <p className="text-center text-[#F6F1E2] font-semibold text-lg">{sponsor.text}</p>
                        </div>
                      </div>
                      ))}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </LampContainer>
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
