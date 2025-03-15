"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Users } from "lucide-react";
import { GlowingEffect } from "../ui/glowing-effect";

export default function EventCard({ event, index, className }) {
  return (
    <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: index * 0.1 }}
  className={`group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[#EFCA4E]/30 transition-all duration-500 shadow-lg hover:shadow-[#EFCA4E]/10 ${className} h-full flex flex-col`}
>  <GlowingEffect
        color="#EFCA4E"
        blur={0}
        borderWidth={30}
        spread={80}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
      />
  <Link href={`/events/${event.id}`} className=" h-full flex flex-col">
    <div className="relative aspect-[4/5] overflow-hidden">
      <Image
        src={event.imgURL}
        alt={event.name}
        width={400}
        height={500}
        className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500 object-top"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>

    <div className="p-6 space-y-4 bg-gradient-to-t from-black/80 to-transparent backdrop-blur-sm rounded-xl z-10 flex-grow flex flex-col">
      <div className="flex flex-wrap gap-2">
        <span className="px-3 py-1 text-sm rounded-full bg-[#EFCA4E]/10 border border-[#EFCA4E]/20 text-[#EFCA4E]">
          Day {event.day}
        </span>
        <span className="px-3 py-1 text-sm rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300">
          {event.category}
        </span>
      </div>

      <h3 className="text-xl font-semibold text-white group-hover:text-violet-300 transition-colors duration-300 flex-grow">
        {event.name}
      </h3>

      <div className="flex items-center gap-4 text-gray-400 mt-auto">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-blue-600" />
          <span>{event.club}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-lime-500" />
          <span>{event.venue}</span>
        </div>
      </div>
    </div>
  </Link>
</motion.div>
  );
}