"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eventsday } from "../data";

export default function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (id) {
      const foundEvent = Eventsday.find((event) => event.id === parseInt(id));
      setEvent(foundEvent || null);
    }
  }, [id]);

  if (!event) {
    return <div className="text-center text-white mt-10">Event Not Found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex justify-center">
      <div className="max-w-3xl w-full bg-gray-800 p-6 rounded-lg flex flex-col md:flex-row gap-6">
        {/* Left Side*/}
        <div className="md:w-1/2 flex flex-col items-center md:items-start">
          <Image
            src={event.imgURL}
            alt={event.name}
            width={800}
            height={450}
            className="w-[300px] h-[200px] object-cover rounded-md"
          />
          <h1 className="text-xl font-bold mt-3">{event.name}</h1>
          <p className="text-sm opacity-75">Club: {event.club}</p>
          <p className="text-sm opacity-75">Category: {event.category}</p>
          <p className="text-sm opacity-75">Venue: {event.venue}</p>
          <p className="text-sm opacity-75">Time: {event.time}</p>

          {/* Register Button*/}
          <Link href="LINK" target="_blank" rel="noopener noreferrer">
            <button className="mt-4 px-4 py-2 bg-white text-black font-semibold rounded-lg transition-all duration-300 hover:bg-opacity-90 hover:scale-105 hover:shadow-lg">
              Register
            </button>
          </Link>
        </div>

        {/* Right Side*/}
        <div className="md:w-1/2">
          <p className="text-lg opacity-75"> Description{event.description}</p>
        </div>
      </div>
    </div>
  );
}
