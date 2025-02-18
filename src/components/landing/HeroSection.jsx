"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Waves } from "@/components/ui/waves-background";

export function HeroSection() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const celebrationTexts = [
    "Celebrating the Legends of BIT Mesra 🌟",
    "Where Excellence Meets Legacy ✨",
    "Inspiring Generations of Leaders 🎓",
    "A Legacy of Innovation and Impact 💫",
    "Transforming Dreams into Reality 🚀"
  ];

  useEffect(() => {
    const message = celebrationTexts[currentTextIndex];
    const timeoutVal = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      setText(prev => {
        if (!isDeleting) {
          if (prev === message) {
            setTimeout(() => setIsDeleting(true), 2000);
            return prev;
          }
          return message.slice(0, prev.length + 1);
        }
        if (prev === "") {
          setIsDeleting(false);
          setCurrentTextIndex((currentTextIndex + 1) % celebrationTexts.length);
          return "";
        }
        return message.slice(0, prev.length - 1);
      });
    }, timeoutVal);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, currentTextIndex]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative w-full h-screen bg-background/80 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <Waves
          lineColor={"rgba(255, 255, 255, 0.2)"}
          backgroundColor="transparent"
          waveSpeedX={0.015}
          waveSpeedY={0.008}
          waveAmpX={50}
          waveAmpY={25}
          friction={0.95}
          tension={0.008}
          maxCursorMove={150}
          xGap={15}
          yGap={40}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <span className="px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary">
            Hastakshar 2024
          </span>
        </motion.div>

        <motion.img
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          src="/logo.png"
          alt="Bitotsav Logo"
          className="w-1/2 md:w-1/3 mb-8"
        />

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60"
        >
          Celebrating the Legends
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-8 min-h-[64px]"
        >
          {text}
          <span className="animate-pulse">|</span>
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
        >
          {[
            { count: "50+", label: "Years of Excellence" },
            { count: "100K+", label: "Alumni Worldwide" },
            { count: "Countless", label: "Success Stories" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.6 + index * 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary mb-2">{stat.count}</div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}