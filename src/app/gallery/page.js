"use client";
import { useState } from "react";

import CircularGalleryDay0 from "@/components/galleryCards/day0";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export default function GalleryPage() {
  const dayDescriptions = [
    "Day 0: The grand inauguration of Bitotsav, filled with vibrant performances, cultural showcases, and the lighting of the ceremonial lamp, setting the tone for an unforgettable festival.",
    "Day 1: A day packed with thrilling competitions, workshops, and guest lectures, showcasing the talent and creativity of participants from across the country.",
    "Day 2: The final day of Bitotsav, featuring electrifying performances, award ceremonies, and a grand finale that left everyone in awe.",
  ];

  return (
    <div className="text-white p-4 md:p-10 lg:p-20 w-full overflow-hidden flex flex-col items-center">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-center">
      Bitotsav 2024: Reliving the Unforgettable Moments!
      </h1>

      {["day0", "day1", "day2"].map((day, index) => (
        <div
          key={index}
          className={`w-full max-w-screen-lg mt-10 flex flex-col items-center md:items-start gap-8 
          ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
        >
          {/* Description */}
          <div className="w-full md:w-1/3 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              {`Day ${index}`}
            </h2>
            <p className="text-sm md:text-base lg:text-lg">{dayDescriptions[index]}</p>
          </div>

          {/* Carousel */}
          <Carousel className="w-full md:w-2/3">
            <CarouselContent>
              {[1, 2, 3, 4, 5, 6, 7].map((num, i) => (
                <CarouselItem key={i} className="flex justify-center">
                  <div className="w-full md:w-[500px] h-[300px] md:h-[350px] flex items-center justify-center overflow-hidden rounded-lg">
                    <Image
                      src={`/${day}/p${num}.webp`}
                      width={500}
                      height={350}
                      alt={`Image ${num}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      ))}

      {/* Circular Gallery */}
      <div className="relative w-full max-w-screen-lg flex justify-center items-center mt-10">
        <CircularGalleryDay0 bend={3} textColor="#ffffff" borderRadius={0.05} />
      </div>
    </div>
  );
}
