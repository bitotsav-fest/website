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
        setLoadingProgress((prev) => Math.min(prev + Math.random() * 10, 99))
      }, 200)
      return () => clearInterval(interval)
    }
  }, [isLoading])

  return (
    <div className='h-screen flex justify-center items-center bg-black relative overflow-hidden'>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className='absolute inset-0 z-50 flex flex-col items-center justify-center bg-black'
        >
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }} className='relative w-40 h-40 mb-8'>
            <motion.div
              className='absolute inset-0 border-4 border-[#FFD700]/30 rounded-full shadow-[0_0_15px_rgba(255,215,0,0.3)]'
              style={{ borderTopColor: "transparent" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className='absolute inset-4 border-4 border-[#FFD700]/50 rounded-full shadow-[0_0_10px_rgba(255,215,0,0.5)]'
              style={{ borderTopColor: "transparent", borderRightColor: "transparent" }}
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <div className='absolute inset-0 flex items-center justify-center'>
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: [0.5, 1.2, 1], opacity: 1 }}
                transition={{ duration: 0.5 }}
                className='text-[#FFD700] text-3xl font-bold drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]'
              >
                {Math.round(loadingProgress)}%
              </motion.div>
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className='text-4xl text-center font-bold mb-4 bg-gradient-to-r from-[#FFD700] via-[#FDB931] to-[#FFD700] bg-clip-text text-transparent'
          >
            Welcome to Bitotsav
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className='text-[#FFD700]/80 text-lg font-medium mb-6'>
            Initializing Virtual Experience
          </motion.p>
          <motion.div className='flex gap-3 text-[#FFD700]/60' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
            <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }} className='text-sm'>
              Loading Assets
            </motion.span>
            <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} className='text-sm'>
              •
            </motion.span>
            <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }} className='text-sm'>
              Preparing Scene
            </motion.span>
          </motion.div>
          {loadingProgress >= 99 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }} // Delay before showing the button
            >
              <button
                onClick={() => (window.location.href = "/login")}
                className='px-6 py-2 mt-4 rounded-xl font-medium transition-all duration-300 bg-gradient-to-r from-[#EFCA4E] to-[#2D1E0F] text-white shadow-lg shadow-[#EFCA4E]/20 hover:scale-110 hover:shadow-lg'
              >
                Login
              </button>
            </motion.div>
          )}
        </motion.div>
      )}
      <Model_2
        onLoad={() => {
          setLoadingProgress(100)
          setTimeout(() => setIsLoading(false), 500)
        }}
      />
    </div>
  )
}

export default Landing
