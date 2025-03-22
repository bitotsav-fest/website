"use client"
import React from "react"
import { motion } from "framer-motion"
import { Bug, Phone, Home, Calendar, Ticket, Music, Info, Images, Star, SquareUser, Shirt, UsersRound, UserPen } from "lucide-react"
import Link from "next/link"

export default function VirtualHelpdesk() {
  return (
    <div className="min-h-screen mt-20 bg-[#0A0118] relative overflow-hidden p-8">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none"></div>
      <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>

      <div className="text-center mb-16 relative z-10">
        <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#EFCA4E] via-[#F6F1E2] to-[#EFCA4E]">Virtual Helpdesk</h1>
        <p className="text-xl text-gray-400">Get support from our dedicated team of developers</p>
      </div>

      {/* Cards */}
      <div className="flex justify-center gap-8 max-w-7xl mx-auto relative z-10 flex-wrap">
        {/* WhatsApp Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 w-[400px] flex flex-col items-center justify-center text-center transform hover:-translate-y-1"
        >
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-[#EFCA4E] mb-3 tracking-tight">Need Help?</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Get instant support from our dedicated team through WhatsApp or contact form.
            </p>
          </div>

          <div className="space-y-4 w-full">
            <a
              href="https://chat.whatsapp.com/KOqn2PWDhQ1LGlGqSMU4SK"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-[#EFCA4E] to-[#2D1E0F] text-[#F6F1E2] font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#EFCA4E]/20 hover:scale-105 border border-[#EFCA4E]/20 w-full"
            >
              <svg className="w-6 h-6 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              </svg>
              Join WhatsApp Group
            </a>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-400 bg-[#0A0118]">or</span>
              </div>
            </div>

            <a
              href="https://forms.gle/C2n1qmPvq7imhFzU7"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 px-8 py-3 bg-transparent text-[#EFCA4E] font-semibold rounded-xl transition-all duration-300 hover:bg-[#EFCA4E]/10 border border-[#EFCA4E] w-full"
            >
              <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              Contact Form
            </a>
          </div>
        </motion.div>
      </div>

      {/* Quick Navigation */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto mt-16 relative z-10">
        <h2 className="text-3xl font-semibold mb-8 text-center text-[#EFCA4E]">Quick Navigation</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            { name: "Home", icon: Home, href: "/" },
            { name: "Events", icon: Calendar, href: "/events" },
            { name: "Tickets", icon: Ticket, href: "/tickets" },
            { name: "Concerts", icon: Music, href: "/concerts" },
            { name: "Dashboard", icon: UserPen, href: "/dashboard" },
            { name: "Team", icon: UsersRound, href: "/team" },
            { name: "Merch", icon: Shirt, href: "/merch" },
            { name: "About", icon: Info, href: "/about" },
            { name: "Gallery", icon: Images, href: "/gallery" },
            { name: "Sponsors", icon: Star, href: "/sponsors" },
            { name: "Developers", icon: SquareUser, href: "/developers" },
          ].map((item, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
              <Link
                href={item.href}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center gap-3 hover:bg-white/10 hover:border-[#EFCA4E]/30 transition-all duration-300 group h-full"
              >
                <item.icon className="w-6 h-6 text-[#EFCA4E] group-hover:scale-110 transition-transform duration-300" />
                <span className="text-gray-300 group-hover:text-[#EFCA4E] transition-colors duration-300">{item.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
