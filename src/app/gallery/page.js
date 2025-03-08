"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import CircularGalleryDay0 from "@/components/galleryCards/day0";

export default function GalleryPage() {
  const dayDescriptions = [
    "Day 0: The grand inauguration of Bitotsav, filled with vibrant performances, cultural showcases, and the lighting of the ceremonial lamp, setting the tone for an unforgettable festival.",
    "Day 1: A day packed with thrilling competitions, workshops, and guest lectures, showcasing the talent and creativity of participants from across the country.",
    "Day 2: The final day of Bitotsav, featuring electrifying performances, award ceremonies, and a grand finale that left everyone in awe.",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0118] via-[#2D1E0F] to-[#1A0B2E] text-[#F6F1E2]">
      <div className="relative min-h-screen py-24 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] pointer-events-none"></div>
        <div className="absolute top-0 -left-4 w-96 h-96 bg-[#EFCA4E] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-[#2D1E0F] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 mb-12"
        >
          <h1 className="text-6xl md:text-7xl text-center font-bold tracking-normal mb-4 sm:mb-12">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#EFCA4E] via-[#F6F1E2] to-[#EFCA4E]">
              Bitotsav <span className="underline decoration-wavy decoration-fuchsia-500">Gallery</span>
            </span>
          </h1>
          <p className="text-[#F6F1E2]/70 text-lg">Reliving the Unforgettable Moments</p>
        </motion.div>

        {/* Gallery Content */}
        <AnimatePresence>
          {["day0", "day1", "day2"].map((day, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`w-full mb-16 flex flex-col md:flex-row ${index % 2 === 0 ? '' : 'md:flex-row-reverse'} items-center gap-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8`}
            >
              {/* Description */}
              <div className="w-full md:w-1/3 space-y-4">
                <motion.h2 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#EFCA4E] to-[#F6F1E2]"
                >
                  {`Day ${index}`}
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[#F6F1E2]/70"
                >
                  {dayDescriptions[index]}
                </motion.p>
              </div>

              {/* Carousel */}
              <div className="w-full md:w-2/3">
                <Carousel className="w-full">
                  <CarouselContent>
                    {[1, 2, 3, 4, 5, 6, 7].map((num, i) => (
                      <CarouselItem key={i}>
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="relative aspect-[16/9] overflow-hidden rounded-xl border border-white/10 group"
                        >
                          <Image
                            src={`/${day}/p${num}.webp`}
                            alt={`Day ${index} Image ${num}`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="-left-12 bg-white/10 hover:bg-white/20 border-white/10" />
                  <CarouselNext className="-right-12 bg-white/10 hover:bg-white/20 border-white/10" />
                </Carousel>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Circular Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full flex justify-center items-center mt-16 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8"
        >
          <CircularGalleryDay0 bend={3} textColor="#F6F1E2" borderRadius={0.05} />
        </motion.div>
      </div>
    </div>
  );
}