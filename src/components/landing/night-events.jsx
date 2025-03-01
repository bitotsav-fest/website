import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const events = [
    {
        day: "Day 0",
        icon: "/day0.png",
        title: "Heritage Night",
        description:
            "Discover the beauty of traditional dances, melodious music, and captivating storytelling as talented performers showcase the unique customs and traditions of our community.",
        image: "/revealing-soon.jpg",
    },
    {
        day: "Day 1",
        icon: "/day1.png",
        title: "Band Night",
        description:
            "Step onto the dance floor and let the beats take control as our talented Singer spin the hottest tracks, setting the stage for an unforgettable evening of music, rhythm, and euphoria.",
        image: "/revealing-soon.jpg",
    },
    {
        day: "Day 2",
        icon: "/day2.png",
        title: "Dance Night",
        description:
            "Dive into a night of electrifying beats and unstoppable energy as the DJ turns up the heat for an unforgettable dance experience!",
        image: "/revealing-soon.jpg",
    },
    {
        day: "Day 3",
        icon: "/day3.png",
        title: "Pro Artist Night",
        description:
            "This extraordinary event brings together some of the most skilled and celebrated performers from across the artistic spectrum to showcase their mastery and creativity.",
        image: "/revealing-soon.jpg",
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
                className={`bg-[#F6F1E2] text-[#2D1E0F] px-4 py-2 rounded-md border border-[#EFCA4E] flex items-center space-x-2 shadow-md ${
                    selectedEvent.day === event.day ? "ring-2 ring-[#EFCA4E]" : ""
                }`}
            >
                <img
                    src={event.icon}
                    alt={`${event.day} icon`}
                    className="w-6 h-6 object-contain"
                />
                <span>{event.day}</span>
            </button>
        ));
    }, [selectedEvent]);

    return (
        <div className="text-[#F6F1E2] mb-12 rounded-lg max-w-6xl mx-auto px-10">
            <h1 className="text-6xl mb-16">Night Events</h1>
            <div className="flex justify-center space-x-4 mb-16">
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
                            className="w-full h-80 object-cover rounded-lg"
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
