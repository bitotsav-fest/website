"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MorphingText } from '@/components/magicui/morphing-text';
import { Ripple } from '@/components/magicui/ripple';
import TypeWriter from '@/components/ui/typewriter';

export default function ComingSoonPage() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const texts = [
    "Stay Tuned!",
    "Bitotsav 2025",
    "Coming Soon",
    "Get Ready!"
  ];

  useEffect(() => {
    const calculateTimeLeft = () => {
      const eventDate = new Date('2025-03-15');
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
    <div className="min-h-screen bg-gradient-to-br mt-20 from-[#0A0118] via-[#2D1E0F] to-[#1A0B2E] text-[#F6F1E2] relative overflow-hidden flex items-center justify-center">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none"></div>
      <div className="absolute top-0 -left-4 w-96 h-96 bg-[#EFCA4E] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-[#2D1E0F] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-[#EFCA4E] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 text-center space-y-12 p-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1>
            <MorphingText  
              className="font-bold mb-4 text-white text-5xl md:text-7xl "
              texts={texts} 
            />
          </h1>
          <p className="text-2xl text-[#F6F1E2]/70 h-20 flex items-center justify-center backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 px-6">
            <TypeWriter messages={typewriterTexts} delay={50} pauseTime={3000} />
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-6"
        >
          {Object.entries(timeLeft).map(([unit, value], index) => (
            <motion.div
              key={unit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.4 }}
              className="w-32 h-32 rounded-2xl backdrop-blur-xl bg-white/5 border border-[#EFCA4E]/20 flex flex-col items-center justify-center hover:border-[#EFCA4E]/40 transition-all duration-300 group"
            >
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#EFCA4E] to-[#F6F1E2] group-hover:scale-110 transition-transform duration-300">
                {value}
              </div>
              <div className="text-sm text-[#F6F1E2]/70 uppercase tracking-wider mt-2">{unit}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="relative flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="relative flex h-[300px] w-[300px] flex-col items-center justify-center border border-[#EFCA4E]/20 rounded-2xl bg-white/5 backdrop-blur-xl shadow-xl hover:border-[#EFCA4E]/40 transition-all duration-300 group overflow-hidden">
            <motion.img
              src="/bitotsav-logo.svg"
              alt="Bitotsav Logo"
              className="w-56 mx-auto opacity-50 group-hover:opacity-100 transition-all duration-300 relative z-10 drop-shadow-2xl transform group-hover:scale-110"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.5, scale: 1 }}
              transition={{ duration: 0.8 }}
            />
            <Ripple />
            <div className="absolute inset-0 bg-gradient-to-r from-[#EFCA4E]/10 via-transparent to-[#EFCA4E]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
