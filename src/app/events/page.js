"use client"
import { useState, useMemo, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image" // Next.js Image
import { Eventsday, clubs, Eventsnight } from "./data"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "lucide-react"
import EventCard from "@/components/events/EventCard"
import ChatbotPopup from "@/components/chatbot/chatbot-popup"
import { ScrollProgress } from "@/components/magicui/scroll-progress"
import NightEvents from "@/components/landing/night-events"

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("day")
  const [selectedDay, setSelectedDay] = useState(() => {
    if (typeof window !== "undefined") {
      return Number(localStorage.getItem("selectedDay")) || 1
    }
    return 1 // Fallback for SSR
  })

  useEffect(() => {
    localStorage.setItem("selectedDay", selectedDay.toString())
  }, [selectedDay])
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedClub, setSelectedClub] = useState("All Clubs")
  const [selectedEvent, setSelectedEvent] = useState(null)

  const [dayEvents, setdayEvents] = useState(Eventsday)
  const [nightEvents, setnightEvents] = useState(Eventsnight)

  // Set initial selected event for night events
  useEffect(() => {
    if (activeTab === "night" && nightEvents.length > 0 && !selectedEvent) {
      setSelectedEvent(nightEvents[0])
    }
  }, [activeTab, nightEvents, selectedEvent])

  //  Memoized Filtering
  const filteredDayEvents = useMemo(() => {
    return dayEvents.filter(
      (event) =>
        (selectedDay === "All" || event.day === Number(selectedDay)) &&
        (selectedCategory === "All Categories" || event.category === selectedCategory) &&
        (selectedClub === "All Clubs" || event.club === selectedClub)
    )
  }, [dayEvents, selectedDay, selectedCategory, selectedClub])

  return (
    <>
      <div className="min-h-screen bg-[#0A0118] fixed inset-0 -z-20"></div>
      <div className="min-h-screen bg-gradient-to-br from-[#0A0118] via-[#2D1E0F] to-[#1A0B2E] text-[#F6F1E2] relative z-10  overflow-x-hidden">
        <div className="relative min-h-screen py-24 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
          <ScrollProgress />
          {/* Background effects */}
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] pointer-events-none"></div>
          <div className="absolute top-0 -left-4 w-96 h-96 bg-[#EFCA4E] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-[#2D1E0F] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4 mb-6">
            <h1 className="text-6xl md:text-7xl text-center font-bold tracking-normal mb-4 sm:mb-12">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#EFCA4E] via-[#F6F1E2] to-[#EFCA4E]">
                Bitotsav <span className=" dw decoration-fuchsia-500">Events</span>
              </span>
            </h1>
            <p className="text-[#F6F1E2]/70 text-lg">Discover amazing events and performances</p>
          </motion.div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <motion.div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Button
                variant={activeTab === "day" ? "default" : "ghost"}
                onClick={() => setActiveTab("day")}
                className={`rounded-xl text-base font-medium px-8 py-3 ${
                  activeTab === "day" ? "bg-gradient-to-r from-[#EFCA4E] to-[#2D1E0F] text-[#F6F1E2]" : "text-[#F6F1E2]/70 hover:text-[#F6F1E2]"
                }`}
              >
                Day Events
              </Button>
              <Button
                variant={activeTab === "night" ? "default" : "ghost"}
                onClick={() => setActiveTab("night")}
                className={`rounded-xl text-base font-medium px-8 py-3 ${
                  activeTab === "night" ? "bg-gradient-to-r from-[#EFCA4E] to-[#2D1E0F] text-[#F6F1E2]" : "text-[#F6F1E2]/70 hover:text-[#F6F1E2]"
                }`}
              >
                Night Events
              </Button>
            </motion.div>
          </div>

          {/* Filters for Day Events */}
          <AnimatePresence mode="wait">
            {activeTab === "day" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-12">
                <div className="flex flex-wrap justify-center items-center gap-6">
                  {/* Day Selector */}
                  <div className="bg-white/5 backdrop-blur-xl p-2 rounded-2xl border border-white/10 flex flex-wrap items-center gap-4">
                    {/* Day Selection Tabs */}
                    <div className="flex bg-white/5 rounded-xl p-1 gap-1">
                      {[1, 2, 3].map((day) => (
                        <Button
                          key={day}
                          variant={selectedDay === day ? "default" : "ghost"}
                          onClick={() => setSelectedDay(day)}
                          className={`rounded-lg px-4 py-2 ${selectedDay === day ? "bg-gradient-to-r from-[#EFCA4E] to-[#2D1E0F] text-[#F6F1E2]" : "text-[#F6F1E2]/70 hover:text-[#F6F1E2]"}`}
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Day {day}
                        </Button>
                      ))}
                    </div>

                    {/* Category Selector */}
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-44 bg-white/5 backdrop-blur-xl border-white/10 hover:border-violet-500/30 transition-all duration-300 rounded-lg px-4 py-2 text-violet-300">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1A0B2E] border border-white/10">
                        <SelectItem value="All Categories">All Categories</SelectItem>
                        <SelectItem value="Flagship">Flagship</SelectItem>
                        <SelectItem value="Formal">Formal</SelectItem>
                        <SelectItem value="Informal">Informal</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Club Selector */}
                    <Select value={selectedClub} onValueChange={setSelectedClub}>
                      <SelectTrigger className="w-44 bg-white/5 backdrop-blur-xl border-white/10 hover:border-violet-500/30 transition-all duration-300 rounded-lg px-4 py-2 text-violet-300">
                        <SelectValue placeholder="Club" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1A0B2E] border border-white/10">
                        <SelectItem value="All Clubs">All Clubs</SelectItem>
                        {clubs.map((club) => (
                          <SelectItem key={club} value={club}>
                            {club}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Event Cards */}
          <AnimatePresence mode="wait">
            {activeTab === "day" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                {filteredDayEvents.map((event, index) => (
                  <EventCard key={event.id} event={event} index={index} />
                ))}
              </motion.div>
            )}

            {/* Night Events */}
            {activeTab === "night" && (
              <NightEvents />
            )}
          </AnimatePresence>
          <ChatbotPopup />
        </div>
      </div>
    </>
  )
}
