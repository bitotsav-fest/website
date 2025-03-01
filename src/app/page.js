"use client"
import Footer from "@/components/landing/FOOTER"
import { BentoGridGallery } from "@/components/landing/Gallery"
import { Nav } from "@/components/landing/NAV"
import { NotableAlumni } from "@/components/landing/NotableAlumni"
import { Sponsors } from "@/components/landing/Sponsors"
import { SquaresDemo } from "@/components/landing/SquaresBG"
import { TestimonialsSectionDemo } from "@/components/landing/Testimonials"
import { Connect } from "@/components/landing/TICKET"
import { motion } from "framer-motion"
import Hero from "@/components/landing/Hero"
import NightEvents from "@/components/landing/night-events"
import About from "@/components/landing/about"

export default function Home() {
  return (
    <>
      <div>
        <Hero />
        <About />
        <NightEvents />
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="w-full flex justify-center items-center">
          <BentoGridGallery />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <Connect />
        </motion.div>
        <NotableAlumni />

        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <TestimonialsSectionDemo />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-8">
          <h2 className="text-center text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight">Our Esteemed Sponsors</h2>
          <SquaresDemo />
        </motion.div>
      </div>
    </>
  )
}
