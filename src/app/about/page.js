"use client"
import React from "react"
import { motion } from "framer-motion"
import { Calendar, Users, Trophy, Sparkles } from "lucide-react"
import About from "@/components/landing/about"
import Hero from "@/components/landing/Hero"

export default function AboutPage() {
  return (
    <div>
      <Hero />
      <About />
    </div>
  )
}
