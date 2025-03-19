import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const events = [
  {
    day: "Day 1",
    icon: "/day1.svg",
    title: "अभिनंदन: Ghazal Night",
    description:
      "Immerse yourself in the soulful melodies of Ghazals as the renowned artist Neeraj Gandhi takes the stage. Experience an evening filled with poetic charm, heartfelt lyrics, and mesmerizing tunes that will leave you spellbound.",
    image: "https://res.cloudinary.com/dntt0tha9/image/upload/v1742365490/hqdefault_yy4ius.jpg",
  },
  {
    day: "Day 2",
    icon: "/day2.png",
    title: "उदघोष: Heritage Night",
    description:
      "Join us for a magical evening with the legendary Anup Jalota as he takes you on a journey through timeless bhajans and soulful melodies. Celebrate the rich cultural heritage of India with his enchanting voice and captivating performance.",
    image: "https://res.cloudinary.com/dntt0tha9/image/upload/v1742365529/anup_jalota_mj5l7o.jpg",
  },
  {
    day: "Day 3",
    icon: "/day3.png",
    title: "अनहद: Band Night",
    description:
      "Get ready to rock the night away with the sensational band Sleeping Pills! Known for their electrifying performances and captivating stage presence, Sleeping Pills will take you on a musical journey filled with powerful vocals, dynamic instrumentals, and unforgettable energy. Don't miss this night of pure musical magic!",
    image: "https://instagram.fpat1-2.fna.fbcdn.net/v/t39.30808-6/461294909_18253035913248152_6545239324337500226_n.webp?efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDk1Ny5zZHIuZjMwODA4LmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fpat1-2.fna.fbcdn.net&_nc_cat=108&_nc_oc=Q6cZ2QEJ304UcYC3p99KA5kessS1oE4qNh1K6hLCWeeqv6Q-odQEaKZCJN7OR1QqfO89LQoOkBAR98qsZSRQ4kyeNNQq&_nc_ohc=h0HJZ9padq4Q7kNvgEAZj6H&_nc_gid=TzZS8x85d9ybFf6BzPf2yw&edm=APoiHPcAAAAA&ccb=7-5&ig_cache_key=MzQ2NDkxNzcxMzM5Mzc0Nzk2Mg%3D%3D.3-ccb7-5&oh=00_AYEzXdPHC6WcasVHEAv71tjY1Ohx8788KhOtvT7pQbZhAw&oe=67E04346&_nc_sid=22de04",
  },
  {
    day: "Day 4",
    icon: "/day4.png",
    title: "आवृति: Rock Night",
    description:
      "Experience the ultimate rock extravaganza with Bee Hive! Known for their high-octane performances and unmatched energy, Bee Hive will set the stage on fire with their electrifying music and captivating presence. Get ready to lose yourself in the rhythm and feel the adrenaline rush like never before!",
    image: "https://res.cloudinary.com/dntt0tha9/image/upload/v1742376735/WhatsApp_Image_2025-03-19_at_14.41.18_v8w0om.jpg",
  },
  {
    day: "Day 5",
    icon: "/day5.png",
    title: "हस्ताक्षर: Pro Night",
    description:
      "Get ready for an unforgettable Pro Night with the sensational Meet Bros! Known for their chart-topping hits and electrifying performances, Meet Bros will set the stage ablaze with their high-energy music and captivating charisma. Join us for a night filled with foot-tapping beats, soulful melodies, and an experience that will leave you wanting more!",
    image: "https://res.cloudinary.com/dntt0tha9/image/upload/v1742366776/hq720_nmqufh.jpg",
  },
];

const zoomInAnimation = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } },
};

const NightEvents = () => {
  const [selectedEvent, setSelectedEvent] = useState(events[0]);

  const eventButtons = useMemo(() => {
    return events.map((event, index) => (
      <button
        key={index}
        onClick={() => setSelectedEvent(event)}
        className={`bg-[#F6F1E2] text-[#2D1E0F] px-2 py-1 md:px-6 md:py-2 rounded-lg border border-[#EFCA4E] flex items-center space-x-1 shadow-md ${
          selectedEvent.day === event.day ? "ring-2 ring-[#EFCA4E]" : ""
        }`}
      >
        <img
          src={event.icon}
          alt={`${event.day} icon`}
          className="w-4 h-4 md:w-6 md:h-6 object-contain"
        />
        <span className="text-sm md:text-base">{event.day}</span>
      </button>
    ));
  }, [selectedEvent]);

  return (
      <div className="relative text-[#F6F1E2] pb-12 rounded-lg max-w-6xl mx-auto px-6 md:px-16">
       <h2 className="text-5xl font-extrabold uppercase mb-4">Night Events</h2>
       <div className="w-16 h-2 bg-[#EFCA4E] mb-6"></div>
        <div className="flex justify-center space-x-2 sm:space-x-4 mb-16">
          {eventButtons}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedEvent.day}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={zoomInAnimation}
            className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8"
          >
            <div className="w-full md:w-1/2">
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center text-start">
              <h2 className="text-4xl font-bold">{selectedEvent.title}</h2>
              <p className="text-lg mt-2">{selectedEvent.description}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
  );
};

export default NightEvents;
