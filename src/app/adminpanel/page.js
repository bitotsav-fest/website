"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { clubEvents } from "./pocData";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react"; 
import ExportData from "./components/exportData";

export default function EventsPage() {
  const { data: session, status } = useSession(); 
  const router = useRouter();

  const [selectedClub, setSelectedClub] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const [pocNumber, setPocNumber] = useState("");
  const [isdatafetched, setisdatafetched] = useState(false);
  const [responseData, setResponseData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  if (status === "loading") {
    return <div className="text-center text-white">Checking authentication...</div>;
  }

  if (!session) {
    router.push("/login");
    return <div className="text-center text-white">Redirecting to login...</div>;
  }

  const createLog = async (logData) => {
    try {
      const response = await fetch("/api/logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logData),
      });
      
      if (!response.ok) {
        console.error("Logging failed:", await response.text());
        return null;
      }
      
      const result = await response.json();
      return result.logId;
    } catch (error) {
      console.error("Failed to log:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const maskedPocNumber = pocNumber ? "****" + pocNumber.slice(-4) : "";
    setIsLoading(true);

    try {
      await createLog({
      action: "form_submit",
      status: "started",
      requestData: {
        selectedClub,
        selectedEvent,
        pocNumber: maskedPocNumber
      }
      });
    } catch (error) {
      console.error("Failed to log form submission start:", error);
      setIsLoading(false);
      alert("An error occurred while logging the form submission.");
      return;
    }

    if (!selectedClub || !selectedEvent || !pocNumber) {
      await createLog({
        action: "form_submit",
        status: "validation_failed",
        details: {
          missingFields: {
            club: !selectedClub,
            event: !selectedEvent,
            poc: !pocNumber
          }
        }
      });
      setIsLoading(false);
      alert("Please fill all fields correctly.");
      return;
    }

    const club = clubEvents.find((club) => club.clubName === selectedClub);
    if (!club) {
      await createLog({
        action: "form_submit",
        status: "validation_failed",
        details: { reason: "Club not found", selectedClub }
      });
      setIsLoading(false);
      alert("Club not found");
      return;
    }

    const eventDetails = club.events.find((event) => event.name === selectedEvent);
    if (!eventDetails) {
      await createLog({
        action: "form_submit",
        status: "validation_failed",
        details: { reason: "Event not found", selectedEvent }
      });
      setIsLoading(false);
      alert("Event not found");
      return;
    }


    const validPOCs = eventDetails.poc.flatMap(
      (contact) => contact.phone.match(/\d{10}/g) || []
    );

    if (!validPOCs.includes(pocNumber)) {
      await createLog({
        action: "form_submit",
        status: "validation_failed",
        details: { 
          reason: "Invalid POC number", 
          providedPOC: maskedPocNumber
        }
      });
      setIsLoading(false);
      alert("Invalid POC number");
      return;
    }

    try {
      // Log API request
      await createLog({
        action: "api_request",
        status: "started",
        requestData: { eventName: selectedEvent }
      });

      const response = await fetch("/api/adminpanel", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.token}`, 
        },
        body: JSON.stringify({ eventName: selectedEvent }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        
        await createLog({
          action: "api_request",
          status: "failed",
          error: `HTTP ${response.status}: ${errorText}`,
          details: { status: response.status }
        });
        setIsLoading(false);
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      // Log success ho gya
      await createLog({
        action: "api_request",
        status: "success",
        responseData: { 
          eventName: data.eventName,
          teamsCount: data.teamsRegistered?.length || 0,
          registrarsCount: data.eventRegistrarList?.length || 0
        }
      });
      setResponseData(data);
      setisdatafetched(true);
      setIsLoading(false);
    } catch (error) {
      await createLog({
        action: "api_request",
        status: "error",
        error: error.message
      });
      setIsLoading(false);
      alert(error.message);
    }
  };

  const EventDashboard = ({ responseData }) => {
    return (
      <div className="max-w-6xl mx-auto py-10 px-4 bg-gray-900 text-white">
        {/* Event Title */}
        <h1 className="text-6xl md:text-7xl text-center font-bold tracking-wide mb-10">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-white to-yellow-400">
            {responseData.eventName}
          </span>
        </h1>

        {/* Event Details */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-600 mb-8 text-center">
          <h2 className="text-3xl font-bold text-yellow-400 mb-3">
            📍 Event Details
          </h2>
          <table className="w-full border-collapse border border-gray-600 text-gray-200">
            <tbody>
              <tr className="border border-gray-600">
                <td className="px-4 py-2 font-semibold text-yellow-300">
                  Club:
                </td>
                <td className="px-4 py-2">{responseData.eventClub}</td>
              </tr>
              <tr className="border border-gray-600">
                <td className="px-4 py-2 font-semibold text-yellow-300">
                  Venue:
                </td>
                <td className="px-4 py-2">{responseData.eventVenue}</td>
              </tr>
              <tr className="border border-gray-600">
                <td className="px-4 py-2 font-semibold text-yellow-300">
                  Time:
                </td>
                <td className="px-4 py-2">{responseData.eventTime}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Teams Registered */}
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-6 text-center mb-8">
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">
            🏆 Total Registered Teams:{" "}
            {responseData?.teamsRegistered?.length || 0}
          </h2>
          <table className="w-full border-collapse border border-gray-600 text-left text-gray-200">
            <thead>
              <tr className="bg-gray-700 border border-gray-600 text-yellow-300">
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Team Name</th>
                <th className="px-4 py-2">Leader</th>
                <th className="px-4 py-2">Contact</th>
                <th className="px-4 py-2">Roll No</th>
              </tr>
            </thead>
            <tbody>
              {responseData?.teamsRegistered?.map((team, index) => (
                <tr
                  key={team._id}
                  className="border border-gray-600 bg-gray-900 hover:bg-gray-700"
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2 font-semibold text-yellow-300">
                    {team.teamName}
                  </td>
                  <td className="px-4 py-2">{team.leaderName}</td>
                  <td className="px-4 py-2">
                    <a
                      href={`tel:${team.leaderMobileNumber}`}
                      className="text-blue-400 hover:underline"
                    >
                      {team.leaderMobileNumber}
                    </a>
                  </td>
                  <td className="px-4 py-2">{team.rollNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Event Registrars */}
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-6 text-center">
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">
            📋 Event Registering Participants:{" "}
            {responseData?.eventRegistrarList?.length || 0}
          </h2>
          <table className="w-full border-collapse border border-gray-600 text-left text-gray-200">
            <thead>
              <tr className="bg-gray-700 border border-gray-600 text-yellow-300">
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Roll No</th>
                <th className="px-4 py-2">Contact</th>
              </tr>
            </thead>
            <tbody>
              {responseData?.eventRegistrarList?.map((registrar, index) => (
                <tr
                  key={registrar._id}
                  className="border border-gray-600 bg-gray-900 hover:bg-gray-700"
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2 font-semibold text-yellow-300">
                    {registrar.name}
                  </td>
                  <td className="px-4 py-2">{registrar.rollNumber}</td>
                  <td className="px-4 py-2">
                    <a
                      href={`tel:${registrar.mobileNumber}`}
                      className="text-blue-400 hover:underline"
                    >
                      {registrar.mobileNumber}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const EventDetails = ({ responseData }) => {
    return (
      <div className="max-w-5xl mx-auto py-10 px-4">
        {/* Event Title */}
        <h1 className="text-6xl md:text-7xl text-center font-bold tracking-wide mb-6 sm:mb-10">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#EFCA4E] via-[#F6F1E2] to-[#EFCA4E]">
            {responseData.eventName}
          </span>
        </h1>

        {/* Event Details */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md border border-gray-300 mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            📍 Event Details
          </h2>
          <p className="text-lg font-medium text-gray-700">
            <span className="font-semibold">Club:</span>{" "}
            {responseData.eventClub}
          </p>
          <p className="text-lg font-medium text-gray-700">
            <span className="font-semibold">Venue:</span>{" "}
            {responseData.eventVenue}
          </p>
          <p className="text-lg font-medium text-gray-700">
            <span className="font-semibold">Time:</span>{" "}
            {responseData.eventTime}
          </p>
        </div>

        {/* Teams Registered */}
        <div className="bg-white border-2 border-gray-300 rounded-lg p-6 text-center mb-8">
          <h2 className="text-3xl font-bold text-black mb-4">
            🏆 Total Registered Teams:{" "}
            {responseData?.teamsRegistered?.length || 0}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {responseData?.teamsRegistered?.map((team, index) => (
              <div
                key={team._id}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-300"
              >
                <h3 className="text-2xl font-bold text-black mb-4">
                  {index + 1}. {team.teamName}
                </h3>
                <p className="text-lg font-medium text-gray-700">
                  👤 <span className="font-semibold">Leader:</span>{" "}
                  {team.leaderName}
                </p>
                <p className="text-lg font-medium text-gray-700">
                  📞 <span className="font-semibold">Contact:</span>
                  <a
                    href={`tel:${team.leaderMobileNumber}`}
                    className="text-blue-500 hover:underline"
                  >
                    {team.leaderMobileNumber}
                  </a>
                </p>
                <p className="text-lg font-medium text-gray-700">
                  🎓 <span className="font-semibold">Roll No:</span>{" "}
                  {team.rollNumber}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Event Registrars */}
        <div className="bg-white border-2 border-gray-300 rounded-lg p-6 text-center">
          <h2 className="text-3xl font-bold text-black mb-4">
            📋 Event Registering Participants:{" "}
            {responseData?.eventRegistrarList?.length || 0}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {responseData?.eventRegistrarList?.map((registrar, index) => (
              <div
                key={registrar._id}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-300"
              >
                <h3 className="text-2xl font-bold text-black mb-4">
                  {index + 1}. {registrar.name}
                </h3>
                <p className="text-lg font-medium text-gray-700">
                  🎓 <span className="font-semibold">Roll No:</span>{" "}
                  {registrar.rollNumber}
                </p>
                <p className="text-lg font-medium text-gray-700">
                  📞 <span className="font-semibold">Contact:</span>
                  <a
                    href={`tel:${registrar.mobileNumber}`}
                    className="text-blue-500 hover:underline"
                  >
                    {registrar.mobileNumber}
                  </a>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };



  return (
    <>
      <div className="min-h-screen bg-[#0A0118] fixed inset-0 -z-20"></div>
      <div className="min-h-screen bg-gradient-to-br from-[#0A0118] via-[#2D1E0F] to-[#1A0B2E] text-[#F6F1E2] relative z-10">
        <div className="relative min-h-screen pt-24 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
          {isdatafetched && responseData ? (
            <>
              {window.innerWidth < 768 ? (
                <EventDetails responseData={responseData} />
              ) : (
                <EventDashboard responseData={responseData} />
              )}
            <ExportData responseData={responseData} isDataFetched={isdatafetched}/>

            </>
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

              {isLoading && (
              <div className="text-center mt-4 mb-4">
                <p className="text-[#F6F1E2] text-xl">Loading...</p>
              </div>
            )}

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
                  disabled={isLoading}
                >
                  {isLoading ? 'Loading...' : 'Submit'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
