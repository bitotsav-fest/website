"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image"; // Next.js Image
import { Eventsday, clubs, Eventsnight } from "./data";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

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
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-black dark:to-gray-900">
      <div className="relative min-h-screen text-gray-900 dark:text-white py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <h1 className="text-3xl font-medium">Events</h1>
          <div className="flex bg-white dark:bg-gray-800 shadow-sm p-1 rounded-full w-full md:w-auto justify-between border border-gray-200 dark:border-gray-700">
            <Button
              variant={activeTab === "day" ? "default" : "ghost"}
              onClick={() => setActiveTab("day")}
              className="flex-1 md:flex-none rounded-full text-sm font-medium px-6"
            >
              Day Events
            </Button>
            <Button
              variant={activeTab === "night" ? "default" : "ghost"}
              onClick={() => setActiveTab("night")}
              className="flex-1 md:flex-none rounded-full text-sm font-medium px-6"
            >
              Night Events
            </Button>
          </div>
        </div>

        {/* Filters for Day Events */}
        {activeTab === "day" && (
          <div className="mt-8 mb-12 space-y-6">
            <div className="flex flex-wrap justify-center items-center gap-6 w-full">
              {/* Day Selector */}
              <div className="flex items-center bg-white/5 dark:bg-gray-800/50 px-6 py-3 rounded-full w-64 backdrop-blur-sm border border-gray-200/10 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-shadow duration-200">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300 mr-4">Day</span>
                <div className="flex flex-col items-center w-full">
                  <Slider
                    defaultValue={[1]}
                    max={3}
                    min={1}
                    step={1}
                    value={[selectedDay]}
                    onValueChange={(value) => setSelectedDay(value[0])}
                    className="w-full"
                  />
                  <div className="flex justify-between w-full text-xs mt-2 text-gray-500 dark:text-gray-400">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                  </div>
                </div>
              </div>

              {/* Category Selector */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 bg-white/5 dark:bg-gray-800/50 border-gray-200/10 dark:border-gray-700/50 hover:bg-white/10 dark:hover:bg-gray-700/50 transition-colors duration-200 backdrop-blur-sm shadow-sm hover:shadow-md">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Categories">All Categories</SelectItem>
                  <SelectItem value="Flagship">Flagship</SelectItem>
                  <SelectItem value="Formal">Formal</SelectItem>
                  <SelectItem value="Informal">Informal</SelectItem>
                </SelectContent>
              </Select>

              {/* Club Selector */}
              <Select value={selectedClub} onValueChange={setSelectedClub}>
                <SelectTrigger className="w-48 bg-white/5 dark:bg-gray-800/50 border-gray-200/10 dark:border-gray-700/50 hover:bg-white/10 dark:hover:bg-gray-700/50 transition-colors duration-200 backdrop-blur-sm shadow-sm hover:shadow-md">
                  <SelectValue placeholder="Select club" />
                </SelectTrigger>
                <SelectContent>
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
        )}

        {/* Event Cards */}
        {activeTab === "day" && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
            {filteredDayEvents.map((event) => (
              <motion.div
                key={event.id}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all duration-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-violet-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent opacity-80"></div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {event.category}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
                        Day {event.day}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                      {event.name}
                    </h2>
                    <div className="space-y-2 text-sm text-gray-400">
                      <p className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-violet-500/10 flex items-center justify-center">
                          <svg className="w-3 h-3 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                          </svg>
                        </span>
                        {event.club}
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-blue-500/10 flex items-center justify-center">
                          <svg className="w-3 h-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </span>
                        {event.venue}
                      </p>
                    </div>
                  </div>
                </Link>
                <div className="p-6 pt-0">
                  <Button
                    asChild
                    variant="default"
                    className="w-full bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 transform hover:scale-[1.02] transition-all duration-300"
                  >
                    <Link href="LINK" target="_blank" rel="noopener noreferrer">
                      Register Now
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Night Events */}
        {activeTab === "night" && (
          <div className="mt-6 space-y-6 flex flex-col items-center w-full">
            {nightEvents.map((event) => (
              <div
                key={event.id}
                className="bg-gray-800/40 backdrop-blur-sm shadow-lg p-8 rounded-lg w-[350px] sm:w-[500px] text-center border border-gray-700/30 hover:border-purple-500/50 transition-all duration-300 hover:shadow-purple-500/20 hover:shadow-xl"
              >
                <Image
                  src={event.photo}
                  alt={event.name}
                  width={500}
                  height={300}
                  className="w-full h-56 object-cover rounded-md"
                  priority
                />
                <h2 className="text-2xl font-semibold mt-2">{event.name}</h2>
                <p className="text-md opacity-75">{event.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
