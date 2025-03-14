"use client"
import React from "react"
import About from "@/components/landing/about"
import NightEvents from "@/components/landing/night-events"
import AfterMovie from "@/components/landing/aftermovie"


export default function AboutPage() {
  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-[#0A0118] via-[#2D1E0F] to-[#1A0B2E] text-[#F6F1E2]">
      {/* <Model here /> */}
      <About />
      <NightEvents />
      <AfterMovie />
      </div>
    </>
  )
}