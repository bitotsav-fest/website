"use client"

import React, { useState } from "react"
import Model_2 from "./Model_2"
import { motion } from "framer-motion"

const Landing = () => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="h-screen flex justify-center items-center bg-black relative overflow-hidden">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black"
        >
          <div className="w-24 h-24 border-t-4 border-primary rounded-full animate-spin" />
          <p className="mt-4 text-primary text-lg font-medium">Loading Experience...</p>
        </motion.div>
      )}
      <Model_2 onLoad={() => setIsLoading(false)} />
    </div>
  )
}

export default Landing
