"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image"; // Next.js Image
import { Eventsday, clubs, Eventsnight } from "./data";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Calendar, MapPin, Users, Star } from "lucide-react";

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("day");
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedClub, setSelectedClub] = useState("All Clubs");

  const [dayEvents, setdayEvents] = useState(Eventsday);
  const [nightEvents, setnightEvents] = useState(Eventsnight);

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
    <div className="min-h-screen bg-gradient-to-br from-[#0A0118] via-[#1A0B2E] to-[#1F1033] text-white">
      <div className="relative min-h-screen py-24 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none"></div>
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 mb-16"
        >
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-pink-500 to-orange-500">
            Bitotsav Events
          </h1>
          <p className="text-gray-400 text-lg">Discover amazing events and performances</p>
        </motion.div>

        

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
                <div className="bg-white/5 backdrop-blur-xl p-2 rounded-2xl border border-white/10 flex flex-wrap items-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {/* Day Selection Tabs */}
                    <div className="flex bg-white/5 rounded-xl p-1 gap-1">
                      {[1, 2, 3].map((day) => (
                        <Button
                          key={day}
                          variant={selectedDay === day ? "default" : "ghost"}
                          onClick={() => setSelectedDay(day)}
                          className={`rounded-lg px-4 py-2 ${selectedDay === day ? 'bg-gradient-to-r from-violet-600 to-pink-600 text-white' : 'text-gray-400 hover:text-white'}`}
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Day {day}
                        </Button>
                      ))}
                    </div>

                    {/* Category Selector */}
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-44 bg-white/5 backdrop-blur-xl border-white/10 hover:border-violet-500/30 transition-all duration-300 rounded-xl px-4 py-2 text-violet-300">
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
                      <SelectTrigger className="w-44 bg-white/5 backdrop-blur-xl border-white/10 hover:border-violet-500/30 transition-all duration-300 rounded-xl px-4 py-2 text-violet-300">
                        <SelectValue placeholder="Club" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1A0B2E] border border-white/10">
                        <SelectItem value="All Clubs">All Clubs</SelectItem>
                        {clubs.map((club) => (
                          <SelectItem key={club} value={club}>{club}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* Tab Navigation */}
        <div className="flex justify-center">
          <motion.div 
            className="bg-white/5 backdrop-blur-xl  rounded-2xl border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button
              variant={activeTab === "day" ? "default" : "ghost"}
              onClick={() => setActiveTab("day")}
              className={`rounded-xl text-base font-medium px-8 py-3 ${activeTab === "day" ? 'bg-gradient-to-r from-violet-600 to-pink-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Day Events
            </Button>
            <Button
              variant={activeTab === "night" ? "default" : "ghost"}
              onClick={() => setActiveTab("night")}
              className={`rounded-xl text-base font-medium px-8 py-3 ${activeTab === "night" ? 'bg-gradient-to-r from-violet-600 to-pink-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Night Events
            </Button>
          </motion.div>
        </div>
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
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1A0B2E] via-transparent opacity-90"></div>
                    </div>
                    <div className="p-8 space-y-6">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20 text-sm">
                          {event.category}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20 text-sm">
                          Day {event.day}
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold text-white group-hover:text-violet-400 transition-colors duration-300">
                        {event.name}
                      </h2>
                      <div className="space-y-3 text-gray-400">
                        <p className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-violet-400" />
                          {event.club}
                        </p>
                        <p className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-pink-400" />
                          {event.venue}
                        </p>
                      </div>
                    </div>
                  </Link>
                  <div className="p-8 pt-0">
                    <Button
                      asChild
                      variant="default"
                      className="w-full bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white rounded-xl py-6 font-medium text-lg shadow-lg shadow-violet-900/20 transform hover:scale-[1.02] transition-all duration-300"
                    >
                      <Link href="/tickets" target="_blank" rel="noopener noreferrer">
                        Register Now
                      </Link>
                    </Button>
                  </div>
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
              className="space-y-8"
            >
              {nightEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 hover:border-violet-500/30 transition-all duration-300 shadow-lg hover:shadow-violet-500/10 max-w-3xl mx-auto"
                >
                  <div className="relative aspect-[21/9] overflow-hidden rounded-xl mb-8">
                    <Image
                      src={event.photo}
                      alt={event.name}
                      width={800}
                      height={400}
                      className="object-cover w-full h-full"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A0B2E] via-transparent opacity-90"></div>
                  </div>
                  <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-pink-400">
                      {event.name}
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">{event.description}</p>
                    <Button
                      asChild
                      variant="default"
                      className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white rounded-xl px-12 py-6 font-medium text-lg shadow-lg shadow-violet-900/20 transform hover:scale-[1.02] transition-all duration-300"
                    >
                      <Link href="/tickets">
                        Get Tickets
                      </Link>
                    </Button>
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
