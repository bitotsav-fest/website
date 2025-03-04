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
  const descriptions = [
    "The grand opening ceremony of Bitotsav, full of energy and excitement!",
    "A breathtaking performance that left the audience in awe.",
    "Workshops and panel discussions fostering knowledge and creativity.",
    "Students showcasing their talents in various competitions.",
    "The electrifying concert night that had everyone dancing.",
    "A glimpse of the cultural showcase highlighting diverse traditions.",
    "The closing ceremony, celebrating all the hard work and achievements."
  ];

  return (
    <div className="text-white p-4 md:p-10 lg:p-20 w-full overflow-hidden flex flex-col items-center">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-center">
        Last Year Glimpse of Bitotsav
      </h1>
    
      {["day0", "day1", "day2"].map((day, index) => (
        <div key={index} className="w-full max-w-screen-lg mt-10 flex flex-col md:flex-row items-center md:items-start gap-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-center w-full">{`Day ${index}`}</h2>
          <Carousel className="w-full md:w-3/4">
            <CarouselContent>
              {[1, 2, 3, 4, 5, 6, 7].map((num, i) => (
                <CarouselItem key={i} className="flex flex-col md:flex-row items-center gap-4">
                  <Image src={`/${day}/p${num}.webp`} width={500} height={500} alt={`Image ${num}`} className="rounded-lg" />
                  <p className="text-sm md:text-base text-gray-300 max-w-sm text-center md:text-left">{descriptions[i]}</p>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      ))}
      <div className="relative w-full max-w-screen-lg flex justify-center items-center">
        <CircularGalleryDay0 bend={3} textColor="#ffffff" borderRadius={0.05} />
      </div>
    </div>
  );
}