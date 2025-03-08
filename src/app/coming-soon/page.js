"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MorphingText } from '@/components/magicui/morphing-text';
import { Ripple } from '@/components/magicui/ripple';
import TypeWriter from '@/components/ui/typewriter'

export default function ComingSoonPage() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const texts = [
    "Stay Tuned!",

  ];
  useEffect(() => {
    const calculateTimeLeft = () => {
      const eventDate = new Date('2025-03-15'); // Set your event date here
      const difference = eventDate - new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const typewriterTexts = [
    "🤫 We Know. You Want to Know. Stay Tuned!",
    "⏳ The Countdown Begins…",
    "🔥 All Will Be Revealed – Soon!",
    "🕶️ Keep Guessing. Keep Watching.",
    "🤩 One Word: EPIC."
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0A0118] flex items-center justify-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none"></div>
      <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 text-center space-y-12 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>
            <MorphingText  
              className="font-bold mb-4 text-white text-4xl md:text-6xl"
              texts={texts} 
            />
          </h1>
          <p className="text-2xl text-gray-400 h-20 flex items-center justify-center">
            <TypeWriter messages={typewriterTexts} delay={50} pauseTime={3000} />
          </p>
        </motion.div>
 

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center gap-6"
        >
          {Object.entries(timeLeft).map(([unit, value], index) => (
            <motion.div
              key={unit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.4 }}
              className="w-24 h-24 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center"
            >
              <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                {value}
              </div>
              <div className="text-sm text-gray-400 capitalize">{unit}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="relative flex justify-center items-center">
 
        <div className="relative flex h-[250px] w-[250px] flex-col items-center justify-center     border  rounded-xl  ">
             <motion.img
            src="/bitotsav-logo.svg"
            alt="Bitotsav Logo"
            className="w-48 mx-auto opacity-50 hover:opacity-100 transition-opacity duration-300 relative z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.5, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
            <Ripple />
        </div>
         
        </motion.div>
      </div>
    </div>
  );
}
