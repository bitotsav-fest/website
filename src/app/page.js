"use client"
// import Footer from "@/components/landing/FOOTER"
// import { BentoGridGallery } from "@/components/landing/Gallery"
// import { Nav } from "@/components/landing/NAV"
// import { NotableAlumni } from "@/components/landing/NotableAlumni"
// import { Sponsors } from "@/components/landing/Sponsors"
// import { SquaresDemo } from "@/components/landing/SquaresBG"
// import { TestimonialsSectionDemo } from "@/components/landing/Testimonials"
// import { Connect } from "@/components/landing/TICKET"
// import { motion } from "framer-motion"
// import Hero from "@/components/landing/Hero"
// import NightEvents from "@/components/landing/night-events"
import Landing from "@/components/landing/Landing"
import Landing_2 from "./landingv2/page"
import { isIOS } from "@/components/landing/cacheModel"

let LandingComponent
if (isIOS()) {
  LandingComponent = Landing_2
} else {
  LandingComponent = Landing
}

export default function Home() {
  return (
    <>
      <LandingComponent />
    </>
  )
}
