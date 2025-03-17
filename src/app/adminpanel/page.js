"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { clubEvents } from "./pocData";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react"; 
// import { clubEvents } from "./pocData";

export default function EventsPage() {
  const { data: session, status } = useSession(); 
  const router = useRouter();

  const [selectedClub, setSelectedClub] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const [pocNumber, setPocNumber] = useState("");
  const [isdatafetched, setisdatafetched] = useState(false);
  const [responseData, setResponseData] = useState([]);

  if (status === "loading") {
    return <div className="text-center text-white">Checking authentication...</div>;
  }

  if (!session) {
    router.push("/login");
    return <div className="text-center text-white">Redirecting to login...</div>;
  }

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    
    if (!selectedClub || !selectedEvent || !pocNumber) {
      alert("Please fill all fields correctly.");
      return;
    }

    const club = clubEvents.find((club) => club.clubName === selectedClub);

    if (!club) {
      alert("Club not found");
      return;
    }

    const eventDetails = club.events.find(
      (event) => event.name === selectedEvent
    );

    if (!eventDetails) {
      alert("Event not found");
     }
    //  else {
    //   console.log(eventDetails);
    // }
  
    const validPOCs = eventDetails.poc.flatMap(
      (contact) => contact.phone.match(/\d{10}/g) || [] // Extract valid phone numbers
    );

    if (!validPOCs.includes(pocNumber)) {
      alert("Invalid POC number");
      return;
    }
  //now i have vallid POC
  
    
    try {
    const response = await fetch("/api/adminpanel", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ eventName: selectedEvent })
    });
    
    if (!response.ok) {
    throw new Error("Failed to fetch data");
    }
    
    const data = await response.json();
    setResponseData(data);
    setisdatafetched(true);
    } catch (error) {
    alert(error.message);
    }
    };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedClub || !selectedEvent || !pocNumber) {
      alert("Please fill all fields correctly.");
      return;
    }

    const club = clubEvents.find((club) => club.clubName === selectedClub);
    if (!club) {
      alert("Club not found");
      return;
    }

    const eventDetails = club.events.find((event) => event.name === selectedEvent);
    if (!eventDetails) {
      alert("Event not found");
      return;
    }

    const validPOCs = eventDetails.poc.flatMap(
      (contact) => contact.phone.match(/\d{10}/g) || []
    );

    if (!validPOCs.includes(pocNumber)) {
      alert("Invalid POC number");
      return;
    }

    try {
      const response = await fetch("/api/adminpanel", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.token}`, // Using NextAuth session token
        },
        body: JSON.stringify({ eventName: selectedEvent }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setResponseData(data);
      setisdatafetched(true);
    } catch (error) {
      alert(error.message);
    }
  };


  return (
    <>
      <div className="min-h-screen bg-[#0A0118] fixed inset-0 -z-20"></div>
      <div className="min-h-screen bg-gradient-to-br from-[#0A0118] via-[#2D1E0F] to-[#1A0B2E] text-[#F6F1E2] relative z-10">
        <div className="relative min-h-screen py-24 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
          {isdatafetched ? (
            <div className="max-w-4xl mx-auto py-8">
              <h1 className="text-6xl md:text-7xl text-center font-bold tracking-normal mb-4 sm:mb-12">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#EFCA4E] via-[#F6F1E2] to-[#EFCA4E]">
                  Registered Teams for {responseData.eventName}
                </span>
              </h1>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-4 text-center max-w-md mx-auto mb-6">
                <h2 className="text-3xl font-bold text-black">
                  Total Registrations ={" "}
                  {responseData?.teamsRegistered?.length || 0}
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {responseData?.teamsRegistered?.map((team, index) => (
                  <div
                    key={team._id}
                    className="bg-white p-8 rounded-lg shadow-md border border-gray-300"
                  >
                    <h3 className="text-2xl font-bold text-black mb-6">
                      {index + 1}. {team.teamName}
                    </h3>
                    <div className="mb-4 flex gap-x-2">
                      <span className="text-lg font-semibold text-black">
                        👤 Leader:
                      </span>
                      <span className="text-lg font-semibold text-black">
                        {team.leaderName}
                      </span>
                    </div>
                    <div className="mb-4 flex gap-x-2">
                      <span className="text-lg font-semibold text-black">
                        📞 Contact:
                      </span>
                      <a
                        href={`tel:${team.leaderMobileNumber}`}
                        className="text-lg font-semibold text-blue-500 hover:underline"
                      >
                        {team.leaderMobileNumber}
                      </a>
                    </div>
                    <div className="flex gap-x-2">
                      <span className="text-lg font-semibold text-black">
                        🎓 Roll No:
                      </span>
                      <span className="text-lg font-semibold text-black">
                        {team.rollNumber}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4 mb-6"
              >
                <h1 className="text-6xl md:text-7xl font-bold tracking-normal mb-4 sm:mb-12">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#EFCA4E] via-[#F6F1E2] to-[#EFCA4E]">
                    Check Registered Bitotshav Participants for Your Events
                  </span>
                </h1>
                <p className="text-[#F6F1E2]/70 text-lg">
                  Tick Tock! Time to review your event's participants.
                </p>
              </motion.div>

              <form
                onSubmit={handleSubmit}
                className="p-4 max-w-lg mx-auto bg-[#2D1E0F] shadow-md border border-white rounded-lg"
              >
                <label className="block mb-2">Select Club:</label>
                <select
                  value={selectedClub}
                  onChange={(e) => setSelectedClub(e.target.value)}
                  className="w-full text-black p-2 border rounded mb-4"
                >
                  <option value="">Choose a club</option>
                  {/* {clubs.map((club) => (
                    <option key={club} value={club}>
                      {club}
                    </option>
                  ))} */}
                  {[...new Set(clubEvents.map((event) => event.clubName))].map(
                    (club, idx) => (
                      <option key={idx} value={club}>
                        {club}
                      </option>
                    )
                  )}
                </select>

                {selectedClub && (
                  <>
                    <label className="block mb-2">Select Event:</label>
                    <select
                      value={selectedEvent}
                      onChange={(e) => setSelectedEvent(e.target.value)}
                      className="w-full text-black p-2 border rounded mb-4"
                    >
                      <option value="">Choose an event</option>
                      {/* {Eventsday.filter(
                        (event) => event.club === selectedClub
                      ).map((event) => (
                        <option key={event.id} value={event.name}>
                          {event.name}
                        </option>
                      ))} */}
                      {clubEvents
                        .find((club) => club.clubName === selectedClub)
                        ?.events.map((event) => (
                          <option key={event.name} value={event.name}>
                            {event.name}
                          </option>
                        ))}
                    </select>
                  </>
                )}

                <label className="block mb-2">Mobile No. of POC:</label>
                <input
                  type="tel"
                  value={pocNumber}
                  onChange={(e) => setPocNumber(e.target.value)}
                  className="w-full text-black p-2 border rounded mb-4"
                />
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#EFCA4E] to-[#2D1E0F] text-[#F6F1E2] font-semibold rounded-xl"
                >
                  Submit
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
