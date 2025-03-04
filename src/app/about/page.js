"use client"
import React from "react"
import { motion } from "framer-motion"
import { Calendar, Users, Trophy, Sparkles } from "lucide-react"
import About from "@/components/landing/about"
import Hero from "@/components/landing/Hero"
import NightEvents from "@/components/landing/night-events"

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-[#150E06] to-[#2B1A09] fixed top-0 left-0 w-full h-full overflow-auto">
      <Hero />
      <About />
      <NightEvents />
    </div>
  )
}
