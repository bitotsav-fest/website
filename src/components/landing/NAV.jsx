"use client"

import * as React from "react"
import { Home, Calendar, Ticket, Info, Music, Images, Menu } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"

const items = [
  {
    name: "Home",
    url: "/",
    href: "/",
    icon: Home,
  },
  {
    name: "Events",
    url: "/events",
    href: "/events",
    icon: Calendar,
  },
  {
    name: "Tickets",
    url: "/tickets",
    href: "/tickets",
    icon: Ticket,
  },
  {
    name: "Concerts",
    url: "/concerts",
    href: "/concerts",
    icon: Music,
  },
  {
    name: "About",
    url: "/about",
    href: "/about",
    icon: Info,
  },
  {
    name: "Gallery",
    url: "/gallery",
    href: "/gallery",
    icon: Images,
  }
]

export function Nav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-r from-[#2D1E0F]/90 via-[#1A0B2E]/90 to-[#2D1E0F]/90 backdrop-blur-lg border-b border-[#EFCA4E]/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 group">
            <img src="/bitotsav-logo.svg" alt="bitotsav logo" className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#EFCA4E] to-[#F6F1E2]">Bitotsav</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {items.map((item) => {
              const isActive = pathname === item.url;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.name}
                  href={item.url}
                  className={`relative flex items-center space-x-1 text-sm font-medium transition-all duration-300 hover:text-[#EFCA4E] ${isActive ? 'text-[#EFCA4E]' : 'text-[#F6F1E2]/70'}`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#EFCA4E]' : 'text-[#F6F1E2]/70'}`} />
                  <span>{item.name}</span>
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-gradient-to-r from-[#EFCA4E]/50 via-[#EFCA4E] to-[#EFCA4E]/50"
                      layoutId="navbar-active"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Navigation Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-[#F6F1E2] hover:bg-[#EFCA4E]/10 transition-colors duration-300"
          >
            <span className="sr-only">Open menu</span>
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden py-4"
          >
            <div className="flex flex-col space-y-4">
              {items.map((item) => {
                const isActive = pathname === item.url;
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.name}
                    href={item.url}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-[#EFCA4E]/10 ${isActive ? 'text-[#EFCA4E] bg-[#EFCA4E]/10' : 'text-[#F6F1E2]/70'}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#EFCA4E]' : 'text-[#F6F1E2]/70'}`} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
