"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image"; // Next.js Image

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("day");
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedClub, setSelectedClub] = useState("All Clubs");

  const dayEvents = useMemo(
    () => [
      {
        id: 1,
        name: "Music Fest",
        description: "Live DJ and bands.",
        photo: "/revealing-soon.jpg",
        day: 1,
        category: "Music",
        club: "Cultural",
      },
      {
        id: 2,
        name: "Tech Talk",
        description: "AI and Future Tech.",
        photo: "/revealing-soon.jpg",
        day: 1,
        category: "Technology",
        club: "Technical",
      },
      {
        id: 3,
        name: "Dance Battle",
        description: "Street vs Classical.",
        photo: "/revealing-soon.jpg",
        day: 2,
        category: "Dance",
        club: "Cultural",
      },
    ],
    []
  ); // empty dependency array

  const nightEvents = [
    {
      id: 4,
      name: "Fireworks Show",
      description: "Grand Fireworks Display.",
      photo: "/revealing-soon.jpg",
    },
    {
      id: 5,
      name: "DJ Party",
      description: "Midnight DJ Bash.",
      photo: "/revealing-soon.jpg",
    },
    {
      id: 6,
      name: "Movie Night",
      description: "Outdoor Movie Screening.",
      photo: "/revealing-soon.jpg",
    },
    {
      id: 7,
      name: "Bonfire",
      description: "Cozy Bonfire Gathering.",
      photo: "/revealing-soon.jpg",
    },
  ];

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
    <div className="text-white py-20 px-6">
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
              activeTab === "night" ? "bg-blue-500 text-white" : "text-gray-400"
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
              className="bg-transparent text-blue-600 w-full"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option>All Categories</option>
              <option>Music</option>
              <option>Technology</option>
              <option>Dance</option>
            </select>
          </div>

          {/* Club Selector */}
          <div className="bg-gray-800 px-4 py-2 rounded-full w-40 text-center">
            <select
              className="bg-transparent text-blue-600 w-full"
              value={selectedClub}
              onChange={(e) => setSelectedClub(e.target.value)}
            >
              <option>All Clubs</option>
              <option>Cultural</option>
              <option>Technical</option>
            </select>
          </div>
        </div>
      )}

      {/* Event Cards */}
      {activeTab === "day" && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          {filteredDayEvents.map((event) => (
            <motion.div
              key={event.id}
              className="bg-gray-800 p-4 rounded-lg min-h-[400px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Link href={`/events/${event.id}`}>
                {/* image loading */}
                <Image
                  src={event.photo}
                  alt={event.name}
                  width={300}
                  height={300}
                  className="w-full h-40 object-cover rounded-md"
                  priority
                />
                <h2 className="text-xl font-semibold mt-2">{event.name}</h2>
                <p className="text-sm opacity-75">{event.description}</p>
              </Link>
              <Link href="LINK" target="_blank" rel="noopener noreferrer">
                <button className="mt-3 px-4 py-2 bg-white text-black font-semibold rounded-lg transition-all duration-300 hover:bg-opacity-90 hover:scale-105 hover:shadow-lg">
                  Register
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      {/* Night Events */}
      {activeTab === "night" && (
        <div className="mt-6 grid md:grid-cols-2 grid-cols-1 gap-4">
          {nightEvents.map((event) => (
            <div
              key={event.id}
              className="bg-gray-800 p-6 rounded-lg transform shadow-lg"
            >
              {/*  image loading */}
              <Image
                src={event.photo}
                alt={event.name}
                width={300}
                height={200}
                className="w-full h-40 object-cover rounded-md"
                priority
              />
              <h2 className="text-xl font-semibold mt-2">{event.name}</h2>
              <p className="text-sm opacity-75">{event.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
