"use client"
import React, { use, useRef } from "react"
import { useState, useEffect } from "react"
import { RainbowButton } from "@/components/ui/rainbow-button"
import { motion } from "framer-motion"
import { Sparkles, Calendar, Star, Gift, Music } from "lucide-react"
import { redirect } from "next/navigation"
import { useSession } from "next-auth/react"
import { QRCodeSVG } from "qrcode.react"
import { getUser } from "@/app/dashboard/actions/getUser"
import Image from "next/image"
import Night0 from "./Night_tickets/day0.jpg"
import Night1 from "./Night_tickets/day1.jpg"
import Night2 from "./Night_tickets/day2.jpg"
import Night3 from "./Night_tickets/day3.jpg"
import { toPng } from "html-to-image"
import { set } from "mongoose"

export default function TicketPage() {
  const { data: session } = useSession()
  const [userData, setUserData] = useState(null)
  const [ticketId, setTicketId] = useState(null)
  const [isBITMesraStudent, setIsBITMesraStudent] = useState(false)
  const ticketRef = useRef(null)

  const handleGetPass = async () => {
    redirect("/login")
  }

  useEffect(() => {
    if (session) {
      const fetchUserData = async () => {
        const data = await getUser(session.user.email)
        setUserData(data)
      }

      fetchUserData()
    }
  }, [session])

  useEffect(() => {
    if (userData && userData.uuid) {
      const encodedTicketId = btoa(userData.uuid)
      setTicketId(encodedTicketId)
      setIsBITMesraStudent(userData.isBITMesraStudent)
    }
  }, [userData])

  const handleDownloadTicket = async (index) => {
    if (ticketRef.current && ticketRef.current[index]) {
      const ticketElement = ticketRef.current[index]
      try {
        // Hide the download button
        const downloadButton = ticketElement.querySelector("button")
        if (downloadButton) {
          downloadButton.style.display = "none"
        }

        const dataUrl = await toPng(ticketElement, { cacheBust: true })
        const link = document.createElement("a")
        link.download = `ticket_${index + 1}.png`
        link.href = dataUrl
        link.click()

        // Show the download button again
        if (downloadButton) {
          downloadButton.style.display = "block"
        }
      } catch (error) {
        console.error("Failed to download ticket:", error)
      }
    }
  }

  return (
    <div className='min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0A0118] via-[#2D1E0F] to-[#1A0B2E] text-[#F6F1E2]'>
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none"></div>
      <div className='absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob'></div>
      <div className='absolute top-0 -right-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000'></div>
      <div className='absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-4000'></div>

      <div className='relative pt-24 px-4 pb-16 max-w-7xl mx-auto'>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='text-center space-y-6 mb-16'>
          <h1 className='text-6xl md:text-7xl font-bold tracking-tight'>
            <span className='bg-clip-text text-transparent bg-gradient-to-r from-[#EFCA4E] via-[#F6F1E2] to-[#EFCA4E]'>
              Bitotsav <span className='dw decoration-fuchsia-500'>2025</span>
            </span>
          </h1>
          <p className='text-2xl text-gray-400 max-w-2xl mx-auto'>Where Technology Meets Culture</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className='relative max-w-4xl mx-auto mb-24'>
          <div className='absolute inset-0 bg-gradient-to-r from-[#EFCA4E]/30 via-[#F6F1E2]/30 to-[#EFCA4E]/30 rounded-[2rem] blur-xl transform rotate-1'></div>
          <div className='relative backdrop-blur-xl bg-black/40 border border-white/10 rounded-[2rem] p-8 md:p-12 overflow-hidden'>
            <div className="absolute top-0 right-0 w-full h-full bg-[url('/ticket-pattern.svg')] opacity-[0.03]"></div>

            <div className='flex flex-col md:flex-row gap-12'>
              <div className='flex-1 space-y-8'>
                <div>
                  <h2 className='text-3xl font-bold mb-4'>All-Access Festival Pass</h2>
                  <div className='inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#EFCA4E]/10 to-[#F6F1E2]/10 border border-[#EFCA4E]/20'>
                    <Sparkles className='w-4 h-4 mr-2 text-[#EFCA4E]' />
                    <span className='text-[#F6F1E2] text-sm font-medium'>Premium Experience</span>
                  </div>
                </div>

                <div className='grid gap-4'>
                  {[
                    { icon: Star, text: "VIP Access to All Events" },
                    { icon: Music, text: "Exclusive Night Concerts" },
                    { icon: Calendar, text: "3 Days Full Access" },
                    { icon: Gift, text: "Limited Edition Merch Pack" },
                  ].map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className='flex items-center gap-3 text-gray-300'>
                      <item.icon className='w-5 h-5 text-violet-400' />
                      <span>{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className='flex-1'>
                <div className='space-y-6'>
                  <div className='p-6 rounded-2xl bg-gradient-to-br from-[#EFCA4E]/10 to-transparent border border-[#EFCA4E]/20'>
                    <div className='text-sm text-[#EFCA4E] mb-2'>Outside Students | DayScholar | BIT-Extention</div>
                    <div className='flex items-baseline gap-2'>
                      <span className='text-2xl font-bold text-[#F6F1E2]'>Not Allowed for Night Events</span>
                    </div>
                  </div>

                  <div className='p-6 rounded-2xl bg-gradient-to-br from-[#F6F1E2]/10 to-transparent border border-[#F6F1E2]/20'>
                    <div className='text-sm text-[#F6F1E2] mb-2'>BIT Mesra Students</div>
                    <div className='flex items-baseline gap-2'>
                      <span className='text-5xl font-bold text-[#F6F1E2]'>FREE</span>
                      <span className='text-[#F6F1E2]'>with ID</span>
                    </div>
                  </div>

                  <RainbowButton className='w-full py-4 text-lg font-medium' onClick={handleGetPass}>
                    Get Your Pass Now
                  </RainbowButton>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        {/* Night Event Tickets */}
        {session && isBITMesraStudent && (
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className='max-w-4xl mx-auto mb-24'>
            <h2 className='text-3xl font-bold mb-8 text-center'>Night Event Tickets</h2>
            <div className='grid grid-cols-1 gap-8'>
              {(() => {
                const today = new Date()
                const eventDates = [
                  { date: new Date("2025-03-20T00:00:00+05:30"), image: Night0, title: "Heritage Night" },
                  { date: new Date("2025-03-21T00:00:00+05:30"), image: Night1, title: "Band Night" },
                  { date: new Date("2025-03-22T00:00:00+05:30"), image: Night2, title: "Rock Night" },
                  { date: new Date("2025-03-23T00:00:00+05:30"), image: Night3, title: "Pro Night" },
                ]
                const currentEvent = eventDates.find((event) => today.toDateString() === event.date.toDateString())
                return currentEvent ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='relative flex flex-col items-center gap-4'
                    ref={(el) => (ticketRef.current = { ...ticketRef.current, [0]: el })}
                  >
                    <div className='relative w-full max-w-[600px] mx-auto'>
                      {/* Event Image */}
                      <Image src={currentEvent.image} alt={currentEvent.title} className='w-full h-auto rounded-2xl' />

                      {/* User Details & QR Code */}
                      <div className='h-[95%] absolute top-1/2 right-[0] sm:right-4 -translate-y-1/2 flex flex-col items-center text-black font-semibold text-center gap-2 sm:gap-4 md:gap-6 leading-tight max-w-[30%]'>
                        <span className='text-md md:text-lg'>{userData?.name}</span>

                        <QRCodeSVG value={ticketId} className='w-[80px] sm:w-[140px] bg-transparent rounded-lg [&>path:nth-of-type(1)]:fill-[#fff0]' />

                        <span className='text-xs sm:text-sm md:text-lg'>{userData?.rollNumber}</span>
                      </div>
                    </div>

                    <RainbowButton className='relative py-2 px-8 text-sm font-medium' onClick={() => handleDownloadTicket(0)}>
                      Download
                    </RainbowButton>
                  </motion.div>
                ) : (
                  <p className='text-center text-gray-400'>No event scheduled for today.</p>
                )
              })()}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
