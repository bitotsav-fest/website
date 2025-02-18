"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Music, Code, Trophy, Calendar, MapPin } from "lucide-react";
import { IconBulb } from "@tabler/icons-react";
import Image from "next/image";

// Dummy event data
const events = {
  cultural: [
    {
      id: 1,
      name: "Dance Fusion",
      description: "A spectacular dance competition featuring various styles",
      date: "2024-04-01",
      time: "6:00 PM",
      venue: "Main Auditorium",
      registrationOpen: true,
      category: "cultural",
      image: "/events/dance.jpg"
    },
    {
      id: 2,
      name: "Battle of Bands",
      description: "Rock the stage with your band",
      date: "2024-04-02",
      time: "5:00 PM",
      venue: "Open Air Theatre",
      registrationOpen: true,
      category: "cultural",
      image: "/events/music.jpg"
    }
  ],
  technical: [
    {
      id: 3,
      name: "Hackathon 2024",
      description: "24-hour coding challenge",
      date: "2024-04-01",
      time: "9:00 AM",
      venue: "Computer Center",
      registrationOpen: true,
      category: "technical",
      image: "/events/hack.jpg"
    },
    {
      id: 4,
      name: "Robotics Workshop",
      description: "Learn to build and program robots",
      date: "2024-04-02",
      time: "10:00 AM",
      venue: "Robotics Lab",
      registrationOpen: false,
      category: "technical",
      image: "/events/robotics.jpg"
    }
  ],
  sports: [
    {
      id: 5,
      name: "Cricket Tournament",
      description: "Inter-college cricket championship",
      date: "2024-04-01",
      time: "8:00 AM",
      venue: "Sports Ground",
      registrationOpen: true,
      category: "sports",
      image: "/events/cricket.jpg"
    },
    {
      id: 6,
      name: "Chess Championship",
      description: "Strategic battle of minds",
      date: "2024-04-02",
      time: "11:00 AM",
      venue: "Indoor Games Room",
      registrationOpen: true,
      category: "sports",
      image: "/events/chess.jpg"
    }
  ],
  workshops: [
    {
      id: 7,
      name: "AI Workshop",
      description: "Introduction to Artificial Intelligence",
      date: "2024-04-01",
      time: "2:00 PM",
      venue: "Seminar Hall",
      registrationOpen: true,
      category: "workshops",
      image: "/events/ai.jpg"
    },
    {
      id: 8,
      name: "Photography Workshop",
      description: "Learn professional photography",
      date: "2024-04-02",
      time: "3:00 PM",
      venue: "Photography Studio",
      registrationOpen: false,
      category: "workshops",
      image: "/events/photo.jpg"
    }
  ]
};

const EventCard = ({ event }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-lg p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-pink-600/10 opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
      
      <div className="relative">
        <div className="aspect-video w-full mb-6 overflow-hidden rounded-xl">
          <Image
            src={event.image}
            alt={event.name}
            width={400}
            height={225}
            className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {event.name}
          </h3>
          <span className={`rounded-full px-4 py-1.5 text-sm font-medium ${
            event.registrationOpen 
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
              : 'bg-red-500/20 text-red-300 border border-red-500/30'
          }`}>
            {event.registrationOpen ? 'Registration Open' : 'Closed'}
          </span>
        </div>

        <p className="mb-6 text-gray-300/80">{event.description}</p>

        <div className="space-y-3 mb-6">
          <div className="flex items-center text-sm text-gray-300/90">
            <Calendar className="mr-3 h-5 w-5 text-purple-400" />
            <span>{event.date} at {event.time}</span>
          </div>
          <div className="flex items-center text-sm text-gray-300/90">
            <MapPin className="mr-3 h-5 w-5 text-purple-400" />
            <span>{event.venue}</span>
          </div>
        </div>

        <button className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-white font-medium shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transform hover:scale-[1.02] transition-all duration-300">
          Register Now
        </button>
      </div>
    </motion.div>
  );
};

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState('cultural');

  const categories = [
    { id: 'cultural', name: 'Cultural Events', icon: Music },
    { id: 'technical', name: 'Technical Events', icon: Code },
    { id: 'sports', name: 'Sports Events', icon: Trophy },
    { id: 'workshops', name: 'Workshops', icon: IconBulb }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5"></div>
      
      <div className="relative px-4 py-20 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
            Bitotsav Events
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Experience the magic of Bitotsav through our carefully curated events
          </p>
        </motion.div>

        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center rounded-full px-8 py-3 transition-all duration-300 ${
                activeCategory === category.id 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30' 
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 backdrop-blur-sm'
              }`}
            >
              <category.icon className="mr-2 h-5 w-5" />
              {category.name}
            </button>
          ))}
        </div>

        <motion.div 
          layout
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {events[activeCategory].map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}