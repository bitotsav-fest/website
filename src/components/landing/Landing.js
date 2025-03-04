"use client"

import React, { useEffect, useState } from "react"
import Model_2 from "./Model_2"
import { motion } from "framer-motion"

const Landing = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingProgress(prev => Math.min(prev + Math.random() * 10, 99))
      }, 200)
      return () => clearInterval(interval)
    }
  }, [isLoading])

  return (
    <div className="h-screen flex justify-center items-center bg-black relative overflow-hidden">
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black"
        >
          <div className="relative w-32 h-32">
            <motion.div
              className="absolute inset-0 border-4 border-primary/30 rounded-full"
              style={{ borderTopColor: 'transparent' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-2 border-4 border-primary/50 rounded-full"
              style={{ borderTopColor: 'transparent', borderRightColor: 'transparent' }}
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: [0.5, 1.2, 1], opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-primary text-2xl font-bold"
              >
                {Math.round(loadingProgress)}%
              </motion.div>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-primary text-lg font-medium"
          >
            Initializing Virtual Experience
          </motion.p>
          <motion.div
            className="mt-4 flex gap-2 text-primary/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Loading Assets
            </motion.span>
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            >
              •
            </motion.span>
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
            >
              Preparing Scene
            </motion.span>
          </motion.div>
        </motion.div>
      )}
      <Model_2 onLoad={() => {
        setLoadingProgress(100)
        setTimeout(() => setIsLoading(false), 500)
      }} />
    </div>
  )
}

export default Landing
