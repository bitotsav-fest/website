"use client";
import { useParams } from "next/navigation";
import { useState, useEffect, use } from "react";
import Image from "next/image";
import { Eventsday } from "../data";
import axios from "axios";
import { useSession } from "next-auth/react";
import { getUserUUID } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaXmark } from "react-icons/fa6";

export default function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [userUUID, setUserUUID] = useState("");
  const [teamCode, setTeamCode] = useState("");
  const { data: session } = useSession();
  const [confirm, setConfirm] = useState(false);
  const router = useRouter();

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
    <div className="min-h-screen bg-gray-900 text-white p-6 flex justify-center py-20">
      <div className="max-w-3xl w-full bg-gray-800 p-6 rounded-lg flex flex-col gap-6">
        {/*Close Button */}
        <div
          className="w-[10px] h-[10px] relative top-[10] right-[10] flex z-10 self-end items-center cursor-pointer scale-125 hover:scale-150"
          onClick={() => router.push("/events")}
        >
          <FaXmark />
        </div>
        {/* Upper Side*/}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Left: Image */}
          <Image
            src={event.imgURL}
            alt={event.name}
            width={800}
            height={450}
            className="w-[300px] h-[200px] object-cover rounded-md"
          />

          {/* Right: Content */}
          <div className="flex flex-col">
            <h1 className="text-xl font-bold">{event.name}</h1>
            <p className="text-sm opacity-75">Club: {event.club}</p>
            <p className="text-sm opacity-75">Category: {event.category}</p>
            <p className="text-sm opacity-75">Venue: {event.venue}</p>
            <p className="text-sm opacity-75">Time: {event.time}</p>

            {/* Register Button */}
            <button
              className="mt-4 px-4 py-2 bg-white text-black font-semibold rounded-lg transition-all duration-300 hover:bg-opacity-90 hover:scale-105 hover:shadow-lg"
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
        </div>

        {/* Bottom Side*/}
        <div className="space-y-10">
          {/* Prize (if exists) */}
          {event.prize && (
            <h3 className="text-xl font-semibold">
              PRIZE:{" "}
              <span className="font-normal text-lg opacity-75">
                {event.prize}
              </span>
            </h3>
          )}

          {/* Description*/}
          <div>
            <h3 className="font-semibold text-xl mb-2">DESCRIPTION:</h3>
            <p className="text-lg opacity-75 whitespace-pre-line">
              {event.description}
            </p>
          </div>

          {/* Rules (if exists) */}
          {event.rules && event.rules.length > 0 && (
            <div>
              <h3 className="font-semibold text-xl mb-2">
                📌 RULES AND REGULATIONS:
              </h3>
              <ul className="list-disc list-outside ml-6 space-y-2 text-lg opacity-75">
                {event.rules.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Judgement Criteria (if exists) */}
          {event.judgement_criteria && event.judgement_criteria.length > 0 && (
            <div>
              <h3 className="font-semibold text-xl mb-2">
                🏆 JUDGEMENT CRITERIA:
              </h3>
              <ul className="list-disc list-outside ml-6 space-y-2 text-lg opacity-75">
                {event.judgement_criteria.map((criteria, index) => (
                  <li key={index}>{criteria}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact Information (if exists) */}
          {event.contact && event.contact.length > 0 && (
            <div>
              <h3 className="font-semibold text-xl mb-2">CONTACT:</h3>
              <ul className="text-lg opacity-75 space-y-1">
                {event.contact.map((contact, index) => (
                  <li key={index}>{contact}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
