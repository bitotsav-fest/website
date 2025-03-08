"use client";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image"; // Next.js Image
import { Eventsday, clubs, Eventsnight } from "./data";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Users } from "lucide-react";

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("day");
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedClub, setSelectedClub] = useState("All Clubs");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [dayEvents, setdayEvents] = useState(Eventsday);
  const [nightEvents, setnightEvents] = useState(Eventsnight);

  // Set initial selected event for night events
  useEffect(() => {
    if (activeTab === "night" && nightEvents.length > 0 && !selectedEvent) {
      setSelectedEvent(nightEvents[0]);
    }
  }, [activeTab, nightEvents, selectedEvent]);

  //  Memoized Filtering
  const filteredDayEvents = useMemo(() => {
    console.log("Filtering events..."); // Debugging
    return dayEvents.filter(
      (event) =>
        (selectedDay === "All" || event.day === Number(selectedDay)) &&
        (selectedCategory === "All Categories" ||
          event.category === selectedCategory) &&
        (selectedClub === "All Clubs" || event.club === selectedClub)
    );
  }, [dayEvents, selectedDay, selectedCategory, selectedClub]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0118] via-[#2D1E0F] to-[#1A0B2E] text-[#F6F1E2]">
      <div className="relative min-h-screen py-24 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] pointer-events-none"></div>
        <div className="absolute top-0 -left-4 w-96 h-96 bg-[#EFCA4E] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-[#2D1E0F] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 mb-16"
        >
          <h1 className="text-6xl md:text-7xl text-center font-bold tracking-normal mb-10 sm:mb-12">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#EFCA4E] via-[#F6F1E2] to-[#EFCA4E]">
              Bitotsav Events
            </span>
          </h1>
          <p className="text-[#F6F1E2]/70 text-lg">Discover amazing events and performances</p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <motion.div 
            className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button
              variant={activeTab === "day" ? "default" : "ghost"}
              onClick={() => setActiveTab("day")}
              className={`rounded-xl text-base font-medium px-8 py-3 ${activeTab === "day" ? 'bg-gradient-to-r from-[#EFCA4E] to-[#2D1E0F] text-[#F6F1E2]' : 'text-[#F6F1E2]/70 hover:text-[#F6F1E2]'}`}
            >
              Day Events
            </Button>
            <Button
              variant={activeTab === "night" ? "default" : "ghost"}
              onClick={() => setActiveTab("night")}
              className={`rounded-xl text-base font-medium px-8 py-3 ${activeTab === "night" ? 'bg-gradient-to-r from-[#EFCA4E] to-[#2D1E0F] text-[#F6F1E2]' : 'text-[#F6F1E2]/70 hover:text-[#F6F1E2]'}`}
            >
              Night Events
            </Button>
          </motion.div>
        </div>
        

        {/* Filters for Day Events */}
        <AnimatePresence mode="wait">
          {activeTab === "day" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-12"
            >
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
                        className={`rounded-lg px-4 py-2 ${selectedDay === day ? 'bg-gradient-to-r from-[#EFCA4E] to-[#2D1E0F] text-[#F6F1E2]' : 'text-[#F6F1E2]/70 hover:text-[#F6F1E2]'}`}
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
                        <SelectItem key={club} value={club}>{club}</SelectItem>
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4"
            >
              {filteredDayEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-violet-500/30 transition-all duration-500 shadow-lg hover:shadow-violet-500/10"
                >
                  <Link href={`/events/${event.id}`} className="block">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={event.imgURL}
                        alt={event.name}
                        width={400}
                        height={300}
                        className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 text-sm rounded-full bg-[#EFCA4E]/10 border border-[#EFCA4E]/20 text-[#EFCA4E]">
                          Day {event.day}
                        </span>
                        <span className="px-3 py-1 text-sm rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300">
                          {event.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-violet-300 transition-colors duration-300">
                        {event.name}
                      </h3>
                      <div className="flex items-center gap-4 text-gray-400">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{event.club}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{event.venue}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Night Events */}
          {activeTab === "night" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 gap-8"
            >
              {nightEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative overflow-hidden rounded-2xl bg-[#2D1E0F]/20 backdrop-blur-xl border border-[#EFCA4E]/10 hover:border-[#EFCA4E]/30 transition-all duration-500 shadow-lg hover:shadow-[#EFCA4E]/10"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="relative w-full md:w-2/5 aspect-[16/9] md:aspect-auto overflow-hidden">
                      <Image
                        src={event.image}
                        alt={event.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#EFCA4E]/20 to-[#2D1E0F]/20 mix-blend-overlay" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0118] via-transparent opacity-80" />
                    </div>
                    <div className="p-8 md:w-3/5 relative">
                      <div className="flex flex-wrap gap-3 mb-4">
                        <span className="px-4 py-1.5 rounded-full bg-[#EFCA4E]/10 border border-[#EFCA4E]/20 text-[#EFCA4E] text-sm font-medium backdrop-blur-md">
                          Day {event.day}
                        </span>
                        <span className="px-4 py-1.5 rounded-full bg-[#F6F1E2]/10 border border-[#F6F1E2]/20 text-[#F6F1E2] text-sm font-medium backdrop-blur-md">
                          {event.genre}
                        </span>
                      </div>
                      <h2 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#EFCA4E] to-[#F6F1E2]">
                        {event.artist}
                      </h2>
                      <h3 className="text-xl text-[#EFCA4E] mb-4">{event.name}</h3>
                      <p className="text-[#F6F1E2]/70 mb-6 leading-relaxed">{event.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}