"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image"; // Next.js Image
import { Eventsday, clubs, Eventsnight } from "./data";

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
    <div
    // className={`min-h-screen w-full bg-cover bg-center bg-fixed bg-no-repeat ${
    //   activeTab === "day"
    //     ? "bg-[url('/dayeve.jpeg')]"
    //     : "bg-[url('/night-eve.jpeg')]"
    // }`}
    >
      <div className="relative min-h-screen text-white py-20 px-6 md:px-12 backdrop-blur-[2px] bg-black/20 bg-opacity-30">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Events</h1>
          <div className="flex bg-gray-800 p-1 rounded-full w-40 md:w-60 justify-between">
            <button
              onClick={() => setActiveTab("day")}
              className={`flex-1 px-3 py-2 rounded-full text-xs md:text-base transition-all duration-300 text-center ${
                activeTab === "day" ? "bg-blue-500 text-white" : "text-gray-400"
              }`}
            >
              Day Events
            </button>
            <button
              onClick={() => setActiveTab("night")}
              className={`flex-1 px-3 py-2 rounded-full text-xs md:text-base transition-all duration-300 text-center ${
                activeTab === "night"
                  ? "bg-blue-500 text-white"
                  : "text-gray-400"
              }`}
            >
              Night Events
            </button>
          </div>
        </div>

        {/* Filters for Day Events */}
        {activeTab === "day" && (
          <div className="mt-6 flex flex-wrap justify-center items-center gap-4 md:gap-6 w-full">
            {/* Day Selector  */}
            <div className="flex items-center bg-gray-800 px-4 py-2 rounded-full w-48 md:w-64 relative">
              <span className="text-sm mr-3">Day</span>
              <div className="flex flex-col items-center w-full">
                <input
                  type="range"
                  min="1"
                  max="3"
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(Number(e.target.value))}
                  className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between w-full text-xs mt-1 px-3">
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                </div>
              </div>
            </div>

            {/* Category Selector */}
            <div className="bg-gray-800 px-4 py-2 rounded-full w-40 text-center">
              <select
                className="bg-transparent text-blue-600 w-full outline-none focus:ring-0 focus:outline-none"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option>All Categories</option>
                <option>Flagship</option>
                <option>Formal</option>
                <option>Informal</option>
              </select>
            </div>

            {/* Club Selector */}
            <div className="bg-gray-800 px-4 py-2 rounded-full w-40 text-center">
              <select
                className="bg-transparent text-blue-600 w-full outline-none focus:ring-0 focus:outline-none"
                value={selectedClub}
                onChange={(e) => setSelectedClub(e.target.value)}
              >
                <option>All Clubs</option>
                {clubs.map((club) => (
                  <option key={club} value={club}>
                    {club}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Event Cards */}
        {activeTab === "day" && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6 place-items-center">
            {filteredDayEvents.map((event) => (
              <motion.div
                key={event.id}
                className="bg-gray-800 rounded-lg shadow-lg flex flex-col items-center w-full max-w-[250px] min-h-[485px] text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Link href={`/events/${event.id}`}>
                  {/* image loading */}
                  <Image
                    src={event.imgURL}
                    alt={event.name}
                    width={250}
                    height={150}
                    className="object-cover rounded-lg"
                    priority
                  />
                  <div className="p-3 flex flex-col flex-grow">
                    <h2 className="text-xl font-semibold mt-1 min-h-[80px]">
                      {event.name}
                    </h2>
                    <p className="text-l text-white-400 mt-1">
                      By {event.club}
                    </p>
                    <p className="text-md text-white-400">
                      {event.category} Event
                    </p>
                    <p className="text-md text-white-400">
                      Venue: {event.venue}
                    </p>
                  </div>
                </Link>
                <Link
                  href="LINK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=""
                >
                  <button className="my-1 px-4 py-2 bg-white text-black font-semibold rounded-lg transition-all duration-300 hover:bg-opacity-90 hover:scale-105 hover:shadow-lg">
                    Register
                  </button>
                </Link>
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
                className="bg-gray-800 shadow-lg p-8 rounded-lg w-[350px] sm:w-[500px] text-center"
              >
                {/*  image loading */}
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
