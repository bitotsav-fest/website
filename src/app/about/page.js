"use client"
import React from "react"
import About from "@/components/landing/about"
import NightEvents from "@/components/landing/night-events"
import AfterMovie from "@/components/landing/aftermovie"


export default function AboutPage() {
  return (
    <>
      {/* <Hero /> */}
      <About />
      <NightEvents />
      <AfterMovie />
    </>
  )
}
