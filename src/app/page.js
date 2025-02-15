"use client"
import Landing from "../components/Landing"
import { BentoGridGallery } from "@/components/landing/Gallery"
import { NotableAlumni } from "@/components/landing/NotableAlumni"
import { SquaresDemo } from "@/components/landing/SquaresBG"
import { TestimonialsSectionDemo } from "@/components/landing/Testimonials"
import { Connect } from "@/components/landing/TICKET"
import { motion } from "framer-motion"

export default function Page() {
  return (
    <>
      <div>
        <Landing />
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
