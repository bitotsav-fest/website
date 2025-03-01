"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const events = [
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
];

export default function EventDetailPage() {
  const { id } = useParams();
  const event = events.find((event) => event.id === parseInt(id));

  if (!event) {
    return <div className="text-center text-white mt-10">Event Not Found</div>;
  }

  return (
    <div className="bg-gray-900 text-white py-24 flex justify-center">
      <div className="max-w-3xl w-full bg-gray-800 p-6 rounded-lg">
        {/*  Next.js Image */}
        <Image
          src={event.photo}
          alt={event.name}
          width={800} // fixed width
          height={450} // Maintain aspect ratio
          className="w-full h-60 object-cover rounded-md"
          priority // Load faster f
        />
        <h1 className="text-3xl font-bold mt-4">{event.name}</h1>
        <p className="text-lg opacity-75 mt-2">{event.description}</p>
        <Link href="LINK">
          <button className="mt-3 px-4 py-2 bg-white text-black font-semibold rounded-lg transition-all duration-300 hover:bg-opacity-90 hover:scale-105 hover:shadow-lg">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}
