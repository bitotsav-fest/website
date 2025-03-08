"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Eventsday } from "../data";
import axios from "axios";
import { useSession } from "next-auth/react";
import { getUserUUID } from "@/app/actions/auth";

export default function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [userUUID, setUserUUID] = useState("");
  const [teamCode, setTeamCode] = useState("");
  const { data: session } = useSession();
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    if (id) {
      const foundEvent = Eventsday.find((event) => event.id === parseInt(id));
      setEvent(foundEvent || null);
    }
  }, [id]);

  useEffect(() => {
    const fetchUserUUID = async () => {
      if (session?.user?.email) {
        try {
          const uuid = await getUserUUID();
          setUserUUID(uuid);
        } catch (error) {
          console.error("Error fetching UUID:", error);
        }
      }
    };
    fetchUserUUID();
  }, [session]);

  useEffect(() => {
    if (userUUID) {
      axios
        .get(`/api/user/get?uuid=${userUUID}`)
        .then((res) => {
          console.log(res.data);
          setTeamCode(res.data.teamCode);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [userUUID]);

  const handleRegister = () => {
    // Implement registration logic here
    const eventId = event.id;
    const eventName = event.name;

    if (!confirm) {
      alert("Please confirm your registration.");
      setConfirm(true);
      return;
    }

    if (!teamCode) {
      alert("Please create a team first.");
      return;
    }

    console.log(eventId, teamCode, eventName);

    axios
      .post("/api/events/register", { eventId, teamCode, eventName })
      .then((response) => {
        if (response.status === 201) {
          alert("Registered Successfully");
        }
      })
      .catch((err) => {
        if (err.response) {
          alert(err.response.data.message);
        } else {
          alert("An error occurred. Please try again later.");
        }
      });
  };

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
          <button
            className="mt-4 px-4 py-2 bg-white text-black font-semibold rounded-lg transition-all duration-300 hover:bg-opacity-90 hover:scale-105 hover:shadow-lg"
            onClick={handleRegister}
          >
            Register
          </button>
        </div>

        {/* Right Side*/}
        <div className="md:w-1/2">
          <p className="text-lg opacity-75"> Description{event.description}</p>
        </div>
      </div>
    </div>
  );
}
