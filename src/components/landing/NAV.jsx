"use client"

import * as React from "react"
import { Calendar, Ticket, Info, Music, Images, Menu, Handshake, SquareUser, Shirt, UsersRound, LogIn, UserPen, ChartNoAxesColumn } from "lucide-react"
import { motion } from "framer-motion"
import { usePathname, useRouter } from "next/navigation"
import { useMediaQuery } from "react-responsive"
import { useSession } from "next-auth/react"
import { useEffect } from "react"

const items = [
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
  // {
  //   name: "Concerts",
  //   url: "/concerts",
  //   href: "/concerts",
  //   icon: Music,
  // },
  {
    name: "Dashboard",
    url: "/dashboard",
    href: "/dashboard",
    icon: UserPen,
  },
  {
    name: "Team",
    url: "/team",
    href: "/team",
    icon: UsersRound,
  },
  {
    name: "Leaderboard",
    url: "/leaderboard",
    href: "/leaderboard",
    icon: ChartNoAxesColumn,
  },
  // {
  //   name: "Developers",
  //   url: "/developers",
  //   href: "/developers",
  //   icon: SquareUser,
  // },
  {
    name: "About",
    url: "/about",
    href: "/about",
    icon: Info,
  },
  {
    name: "Merch",
    url: "/merch",
    href: "/merch",
    icon: Shirt,
  },
  {
    name: "Gallery",
    url: "/gallery",
    href: "/gallery",
    icon: Images,
  },
  {
    name: "Sponsors",
    url: "/sponsors",
    href: "/sponsors",
    icon: Handshake,
  },
]

export function Nav() {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = React.useState(false)
  const isMobile = useMediaQuery({ maxWidth: 768 })

  const authItem = {
    name: session ? "Logout" : "Login",
    url: session ? "/logout" : "/login",
    href: session ? "/logout" : "/login",
    icon: LogIn,
  }

  const allItems = [...items, authItem]

  const handleNavigation = (url) => {
    router.push(url)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => setIsOpen(false)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const desktopItems = allItems.slice(0, -4)
  const mobileItems = isMobile ? allItems : allItems.slice(-10)

  return (
    <nav className='fixed top-0 w-full z-50 bg-gradient-to-r from-[#2D1E0F]/90 via-[#1A0B2E]/90 to-[#2D1E0F]/90 backdrop-blur-lg border-b border-[#EFCA4E]/20'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div onClick={() => handleNavigation("/")} className='flex items-center space-x-2 group cursor-pointer'>
            <img src='/bitotsav-logo.svg' alt='bitotsav logo' className='w-8 h-8 transition-transform duration-300 group-hover:scale-110' />
            <span className='text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#EFCA4E] to-[#F6F1E2]'>Bitotsav</span>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-8'>
            {desktopItems.map((item) => {
              const isActive = pathname === item.url
              const Icon = item.icon

              return (
                <div
                  key={item.name}
                  onClick={() => handleNavigation(item.url)}
                  className={`relative flex items-center space-x-1 text-sm font-medium transition-all duration-300 hover:text-[#EFCA4E] cursor-pointer ${isOpen ? "hidden" : "flex"} ${
                    isActive ? "text-[#EFCA4E]" : "text-[#F6F1E2]/70"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#EFCA4E]" : "text-[#F6F1E2]/70"}`} />
                  <span>{item.name}</span>
                  {isActive && (
                    <motion.div
                      className='absolute -bottom-[21px] left-0 right-0 h-0.5 bg-gradient-to-r from-[#EFCA4E]/50 via-[#EFCA4E] to-[#EFCA4E]/50'
                      layoutId='navbar-active'
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </div>
              )
            })}
          </div>

          {/* Mobile Navigation Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='p-2 
            rounded-md text-[#F6F1E2] hover:bg-[#EFCA4E]/10 transition-colors duration-300'
          >
            <span className='sr-only'>Open menu</span>
            <Menu className='h-6 w-6' />
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`py-4 ${
              isMobile
                ? "flex flex-col space-y-4 z-50" // Mobile styles
                : "absolute top-16 right-0 w-[20vw] h-screen bg-gradient-to-r from-[#2D1E0F]/90 via-[#1A0B2E]/90 to-[#2D1E0F]/90 shadow-lg rounded-lg p-4 items-center flex flex-col" // Desktop styles
            }`}
          >
            <div className='flex flex-col space-y-4'>
              {mobileItems.map((item) => {
                const isActive = pathname === item.url
                const Icon = item.icon

                return (
                  <div
                    key={item.name}
                    onClick={() => handleNavigation(item.url)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-[#EFCA4E]/10 cursor-pointer ${
                      isActive ? "text-[#EFCA4E] bg-[#EFCA4E]/10" : "text-[#F6F1E2]/70"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-[#EFCA4E]" : "text-[#F6F1E2]/70"}`} />
                    <span>{item.name}</span>
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}
