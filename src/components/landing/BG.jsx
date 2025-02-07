"use client";
import { Waves } from "@/components/ui/waves-background";
import { Button } from "@/components/ui/button";
import { RainbowButton } from "../ui/rainbow-button";
import { ConfettiButton } from "../ui/confetti";
import { SparklesText } from "../ui/sparkles-text";
import { HeroPillFirst } from "./HeroPill";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";


function BitotsavHero() {
  const messages = [
    "Where Innovation Meets Culture! 🚀",
    "Dance. Sing. Create. Conquer. 💫",
    "72 Hours of Pure Magic! ✨",
    "Your Journey to Stardom Begins Here! 🌟",
    "Experience the Ultimate College Fest! 🎯"
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const message = messages[currentMessageIndex];
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
          setCurrentMessageIndex((currentMessageIndex + 1) % messages.length);
          return "";
        }
        return message.slice(0, prev.length - 1);
      });
    }, timeoutVal);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, currentMessageIndex]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative w-full h-screen bg-background/80 overflow-hidden"
    >
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
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4"
      >
        <HeroPillFirst />

        <motion.img
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          src="/logo.png"
          alt="Bitotsav Logo"
          className="w-1/2 md:w-1/3 my-4"
        />
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-3xl font-medium text-gray-300 max-w-3xl mb-10 min-h-[64px]"
        >
          {text}
          <span className="animate-pulse">|</span>
        </motion.p>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <ConfettiButton asChild className="space-x-6">
            <RainbowButton size="xl" className="animate-bounce bg-transparent">
              Signature
            </RainbowButton>
          </ConfettiButton>
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="mt-12 flex space-x-8"
        >
          {[
            { count: "100+", label: "Colleges" },
            { count: "72hrs", label: "Non-Stop" },
            { count: "20+", label: "Sponsors" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.6 + index * 0.2, duration: 0.5 }}
              className="text-center"
            >
              <p className="text-4xl font-bold text-white">{item.count}</p>
              <p className="text-sm text-gray-400">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export { BitotsavHero };
