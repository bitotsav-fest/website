"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { clubEvents, Heads } from "./pocData"
import { Ripple } from "@/components/magicui/ripple"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import toast from "react-hot-toast"
import ExportData from "./components/exportData"

export default function EventsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [selectedClub, setSelectedClub] = useState("")
  const [selectedEvent, setSelectedEvent] = useState("")
  const [pocNumber, setPocNumber] = useState("")
  const [isdatafetched, setisdatafetched] = useState(false)
  const [responseData, setResponseData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  if (status === "loading") {
    return <div className='text-center text-white'>Checking authentication...</div>
  }

  if (!session) {
    router.push("/login")
    return <div className='text-center text-white'>Redirecting to login...</div>
  }

  const createLog = async (logData) => {
    try {
      const response = await fetch("/api/logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logData),
      })

      if (!response.ok) {
        console.error("Logging failed:", await response.text())
        return null
      }

      const result = await response.json()
      return result.logId
    } catch (error) {
      console.error("Failed to log:", error)
      return null
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const maskedPocNumber = pocNumber ? "****" + pocNumber.slice(-4) : ""
    setIsLoading(true)

    try {
      await createLog({
        action: "form_submit",
        status: "started",
        requestData: {
          selectedClub,
          selectedEvent,
          pocNumber: maskedPocNumber,
        },
      })
    } catch (error) {
      console.error("Failed to log form submission start:", error)
      setIsLoading(false)
      toast.error("An error occurred while logging the form submission.")
      return
    }

    if (!selectedClub || !selectedEvent || !pocNumber) {
      await createLog({
        action: "form_submit",
        status: "validation_failed",
        details: {
          missingFields: {
            club: !selectedClub,
            event: !selectedEvent,
            poc: !pocNumber,
          },
        },
      })
      setIsLoading(false)
      toast.error("Please fill all fields correctly.")
      return
    }

    const club = clubEvents.find((club) => club.clubName === selectedClub)
    if (!club) {
      await createLog({
        action: "form_submit",
        status: "validation_failed",
        details: { reason: "Club not found", selectedClub },
      })
      setIsLoading(false)
      toast.error("Club not found")
      return
    }

    const eventDetails = club.events.find((event) => event.name === selectedEvent)
    if (!eventDetails) {
      await createLog({
        action: "form_submit",
        status: "validation_failed",
        details: { reason: "Event not found", selectedEvent },
      })
      setIsLoading(false)
      toast.error("Event not found")
      return
    }

    //const validPOCs = eventDetails.poc.flatMap((contact) => contact.phone.match(/\d{10}/g) || [])
    // First, get valid POCs from the event details
    const validPOCsFromEvent = eventDetails.poc.flatMap((contact) => contact.phone.match(/\d{10}/g) || [])

    // Then, check Heads data for additional valid POCs
    const validPOCsFromHeads = Heads.flatMap((club) => club.events.flatMap((event) => event.poc.flatMap((contact) => contact.phone.match(/\d{10}/g) || [])))

    // Combine both sources for checking
    const validPOCs = [...validPOCsFromEvent, ...validPOCsFromHeads]

    // Then use this combined list for validation
    if (!validPOCs.includes(pocNumber)) {
      await createLog({
        action: "form_submit",
        status: "validation_failed",
        details: {
          reason: "Invalid POC number",
          providedPOC: maskedPocNumber,
        },
      })
      setIsLoading(false)
      toast.error("Invalid POC number")
      return
    }

    try {
      // Log API request
      await createLog({
        action: "api_request",
        status: "started",
        requestData: { eventName: selectedEvent },
      })

      const response = await fetch("/api/adminpanel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session?.user?.token}`,
        },
        body: JSON.stringify({ eventName: selectedEvent }),
      })

      if (!response.ok) {
        const errorText = await response.text()

        await createLog({
          action: "api_request",
          status: "failed",
          error: `HTTP ${response.status}: ${errorText}`,
          details: { status: response.status },
        })
        setIsLoading(false)
        throw new Error("Failed to fetch data")
      }

      const data = await response.json()

      // Log success ho gya
      await createLog({
        action: "api_request",
        status: "success",
        responseData: {
          eventName: data.eventName,
          teamsCount: data.teamsRegistered?.length || 0,
          registrarsCount: data.eventRegistrarList?.length || 0,
        },
      })
      setResponseData(data)
      setisdatafetched(true)
      setIsLoading(false)
    } catch (error) {
      await createLog({
        action: "api_request",
        status: "error",
        error: error.message,
      })
      setIsLoading(false)
      toast.error(error.message)
    }
  }

  const displayTeamMembers = (team) => {
    const teamMembers = team.members || []
    const memberDetails = teamMembers.map((member, index) => `Member ${index + 1}:\nName: ${member.name}\nContact: ${member.contact}\nRoll No: ${member.rollNumber}`).join("\n\n")

    toast(`Team Members:\n\n${memberDetails || "No members available."}`, { duration: 10000 })
  }

  const EventDashboard = ({ responseData }) => {
    return (
      <div className='bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-[#EFCA4E]/20'>
        {/* Event Title */}
        <h1 className='text-5xl md:text-7xl text-center font-bold tracking-wide mb-10'>
          <span className='bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-white to-yellow-400'>{responseData.eventName}</span>
        </h1>

        {/* Event Details */}
        <div className='backdrop-blur-sm p-8 rounded-2xl border border-[#EFCA4E]/20 mb-8 text-center bg-black/30'>
          <h2 className='text-3xl font-bold text-yellow-400 mb-3'>📍 Event Details</h2>
          <table className='w-full border-collapse border border-[#EFCA4E]/20 text-gray-200'>
            <tbody>
              <tr className='border border-[#EFCA4E]/20'>
                <td className='px-4 py-2 font-semibold text-yellow-300'>Club:</td>
                <td className='px-4 py-2'>{responseData.eventClub}</td>
              </tr>
              <tr className='border border-[#EFCA4E]/20'>
                <td className='px-4 py-2 font-semibold text-yellow-300'>Venue:</td>
                <td className='px-4 py-2'>{responseData.eventVenue}</td>
              </tr>
              <tr className='border border-[#EFCA4E]/20'>
                <td className='px-4 py-2 font-semibold text-yellow-300'>Time:</td>
                <td className='px-4 py-2'>{responseData.eventTime}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Teams Registered */}
        <div className='backdrop-blur-sm p-8 rounded-2xl border border-[#EFCA4E]/20 mb-8 text-center bg-black/30'>
          <h2 className='text-3xl font-bold text-yellow-400 mb-4'>🏆 Total Registered Teams: {responseData?.teamsRegistered?.length || 0}</h2>
          <table className='w-full border-collapse border border-[#EFCA4E]/20 text-gray-200'>
            <thead>
              <tr className='p-6 bg-gradient-to-br from-[#EFCA4E]/10 to-transparent border border-[#EFCA4E]/20 text-yellow-400'>
                <th className='px-4 py-2'>#</th>
                <th className='px-4 py-2'>Team Name</th>
                <th className='px-4 py-2'>Leader</th>
                <th className='px-4 py-2'>Contact</th>
                <th className='px-4 py-2'>Roll No</th>
              </tr>
            </thead>
            <tbody>
              {responseData?.teamsRegistered?.map((team, index) => (
                <tr
                  key={team._id}
                  className='backdrop-blur-sm p-8 border border-[#EFCA4E]/20 mb-8 text-center hover:bg-white/10 transition-colors duration-500 cursor-pointer'
                  onClick={() => displayTeamMembers(team)}
                >
                  <td className='px-4 py-2 text-white/70'>{index + 1}</td>
                  <td className='px-4 py-2 font-normal text-yellow-300'>{team.teamName}</td>
                  <td className='px-4 py-2 text-white/70'>{team.leaderName}</td>
                  <td className='px-4 py-2 text-white/70'>
                    <a href={`tel:${team.leaderMobileNumber}`} className=''>
                      {team.leaderMobileNumber}
                    </a>
                  </td>
                  <td className='px-4 py-2'>{team.rollNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Event Registrars */}
        <div className='backdrop-blur-sm p-8 rounded-2xl border border-[#EFCA4E]/20 mb-8 text-center bg-black/30'>
          <h2 className='text-2xl font-semibold text-yellow-400 mb-4'>📋 Event Registering Participants: {responseData?.eventRegistrarList?.length || 0}</h2>
          <table className='w-full border-collapse border border-gray-600 text-left text-gray-200'>
            <thead>
              <tr className='p-6 bg-gradient-to-br from-[#EFCA4E]/10 to-transparent border border-[#EFCA4E]/20 text-yellow-400 text-center'>
                <th className='px-4 py-2'>#</th>
                <th className='px-4 py-2'>Name</th>
                <th className='px-4 py-2'>Roll No</th>
                <th className='px-4 py-2'>Contact</th>
              </tr>
            </thead>
            <tbody>
              {responseData?.eventRegistrarList?.map((registrar, index) => (
                <tr key={registrar._id} className='backdrop-blur-sm p-6 border border-[#EFCA4E]/20 mb-8 text-center hover:bg-white/10 transition-colors duration-500 cursor-pointer'>
                  <td className='px-4 py-2 text-white/70'>{index + 1}</td>
                  <td className='px-4 py-2 font-semibold text-yellow-300'>{registrar.name}</td>
                  <td className='px-4 py-2 text-white/70'>{registrar.rollNumber}</td>
                  <td className='px-4 py-2 text-white/70'>
                    <a href={`tel:${registrar.mobileNumber}`} className=''>
                      {registrar.mobileNumber}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  const EventDetails = ({ responseData }) => {
    return (
      <div className='max-w-5xl mx-auto py-10 px-4'>
        {/* Event Title */}
        <h1 className='text-5xl md:text-7xl text-center font-bold tracking-wide mb-6 sm:mb-10'>
          <span className='bg-clip-text text-transparent bg-gradient-to-r from-[#EFCA4E] via-[#F6F1E2] to-[#EFCA4E]'>{responseData.eventName}</span>
        </h1>

        {/* Event Details */}
        <div className='rounded-2xl bg-white/10 backdrop-blur-xl border border-[#EFCA4E]/20 mb-8 py-6 space-y- text-center'>
          <h2 className='text-3xl font-semibold text-[#EFCA4E]'>📍 Event Details</h2>
          <p className='text-lg font-medium text-white/70'>
            <span className='font-semibold'>Club:</span> {responseData.eventClub}
          </p>
          <p className='text-lg font-medium text-white/70'>
            <span className='font-semibold'>Venue:</span> {responseData.eventVenue}
          </p>
          <p className='text-lg font-medium text-white/70'>
            <span className='font-semibold'>Time:</span> {responseData.eventTime}
          </p>
        </div>

        {/* Teams Registered */}
        <div className='bg-white/10 border border-[#EFCA4E]/20 rounded-lg p-6 text-center mb-8'>
          <h2 className='text-2xl font-bold text-yellow-400 mb-4'>🏆 Total Registered Teams: {responseData?.teamsRegistered?.length || 0}</h2>
          <div className='grid gap-6 md:grid-cols-2'>
            {responseData?.teamsRegistered?.map((team, index) => (
              <div key={team._id} className='bg-white/10 p-6 rounded-lg shadow-md border border-white/20' onClick={() => displayTeamMembers(team)}>
                <h3 className='text-2xl font-bold text-yellow-400 mb-4'>
                  {index + 1}. {team.teamName}
                </h3>
                <p className='text-lg font-medium text-white/70'>
                  👤 <span className='font-semibold'>Leader:</span> {team.leaderName}
                </p>
                <p className='text-lg font-medium text-white/70'>
                  📞 <span className='font-semibold'>Contact: </span>
                  <a href={`tel:${team.leaderMobileNumber}`} className='text-white/60'>
                    {team.leaderMobileNumber}
                  </a>
                </p>
                <p className='text-lg font-medium text-white/70'>
                  🎓 <span className='font-semibold'>Roll No:</span> {team.rollNumber}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Event Registrars */}
        <div className='bg-white/10 border border-[#EFCA4E]/20 rounded-lg p-6 text-center mb-8'>
          <h2 className='text-2xl font-bold text-yellow-400 mb-4'>📋 Event Registering Participants: {responseData?.eventRegistrarList?.length || 0}</h2>
          <div className='grid gap-6 md:grid-cols-2'>
            {responseData?.eventRegistrarList?.map((registrar, index) => (
              <div key={registrar._id} className='bg-white/10 p-6 rounded-lg shadow-md border border-white/20'>
                <h3 className='text-2xl font-bold text-yellow-400 mb-4'>
                  {index + 1}. {registrar.name}
                </h3>
                <p className='text-lg font-medium text-white/70'>
                  📞 <span className='font-semibold'>Contact: </span>
                  <a href={`tel:${registrar.mobileNumber}`} className='text-lg font-medium text-white/70'>
                    {registrar.mobileNumber}
                  </a>
                </p>
                <p className='text-lg font-medium text-white/70'>
                  🎓 <span className='font-semibold'>Roll No: </span> {registrar.rollNumber}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className='min-h-screen bg-[#0A0118] fixed inset-0 -z-20'></div>
      <div className='min-h-screen bg-gradient-to-br from-[#0A0118] via-[#2D1E0F] to-[#1A0B2E] text-[#F6F1E2] relative z-10'>
        <div className='relative min-h-screen pt-24 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto'>
          {isdatafetched && responseData ? (
            <>
              {window.innerWidth < 768 ? <EventDetails responseData={responseData} /> : <EventDashboard responseData={responseData} />}
              <ExportData responseData={responseData} isDataFetched={isdatafetched} />
            </>
          ) : (
            <>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='text-center space-y-4 mb-6'>
                <h1 className='text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#EFCA4E] via-[#F6F1E2] to-[#EFCA4E]'>
                  BITOTSAV'25 <br />
                  Event Participants
                </h1>
                <p className='text-[#F6F1E2]/70 text-lg'>Tick Tock! Time to review your event's participants.</p>
              </motion.div>

              {isLoading && (
                <>
                  <div className='relative flex h-[480px] w-full flex-col items-center justify-center border border-[#EFCA4E]/20 rounded-3xl bg-white/5 backdrop-blur-xl shadow-xl hover:border-[#EFCA4E]/40 transition-all duration-300 group overflow-hidden max-w-[480px] mx-auto'>
                    <p>Fetching Registrations</p>
                    <motion.img
                      src='/bitotsav-logo.svg'
                      alt='Bitotsav Logo'
                      className='w-56 mx-auto opacity-50 group-hover:opacity-100 transition-all duration-300 relative z-10 drop-shadow-2xl transform group-hover:scale-110'
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 0.5, scale: 1 }}
                      transition={{ duration: 0.8 }}
                    />
                    <Ripple />
                    <div className='absolute inset-0 bg-gradient-to-r from-[#EFCA4E]/10 via-transparent to-[#EFCA4E]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                  </div>
                  <br /> <br />
                </>
              )}
              {!isLoading && !isdatafetched && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className='bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-[#EFCA4E]/20 text-left space-y-4 flex justify-center items-center max-w-[480px] mx-auto'
                >
                  <form onSubmit={handleSubmit} className='space-y-4'>
                    <label className='text-2xl font-semibold text-[#EFCA4E] mb-6'>Select Club:</label>
                    <select
                      value={selectedClub}
                      onChange={(e) => setSelectedClub(e.target.value)}
                      className='w-full p-3 bg-white/5 border border-[#EFCA4E]/20 rounded-xl text-white focus:outline-none focus:border-[#EFCA4E]/50 transition-all'
                    >
                      <option value='' className='text-black'>
                        Choose a club
                      </option>
                      {/* {clubs.map((club) => (
                    <option key={club} value={club}>
                    {club}
                    </option>
                    ))} */}
                      {[...new Set(clubEvents.map((event) => event.clubName))].map((club, idx) => (
                        <option key={idx} value={club} className='text-black'>
                          {club}
                        </option>
                      ))}
                    </select>

                    {selectedClub && (
                      <>
                        <br />
                        <br />
                        <label className='text-2xl font-semibold text-[#EFCA4E] mb-6'>Select Event:</label>
                        <select
                          value={selectedEvent}
                          onChange={(e) => setSelectedEvent(e.target.value)}
                          className='w-full p-3 bg-white/5 border border-[#EFCA4E]/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#EFCA4E]/50 transition-all'
                        >
                          <option value='' className='text-black'>
                            Choose an event
                          </option>
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
                              <option key={event.name} value={event.name} className='text-black'>
                                {event.name}
                              </option>
                            ))}
                        </select>
                      </>
                    )}
                    <br />
                    <br />
                    <label className='text-2xl font-semibold text-[#EFCA4E] mb-6'>Mobile No. of POC:</label>
                    <input
                      type='tel'
                      pattern='[0-9]{10}'
                      value={pocNumber}
                      onChange={(e) => setPocNumber(e.target.value)}
                      className='w-full p-3 bg-white/5 border border-[#EFCA4E]/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#EFCA4E]/50 transition-all'
                    />
                    <button type='submit' className='w-full px-6 py-3 bg-gradient-to-r from-[#EFCA4E] to-[#2D1E0F] text-[#F6F1E2] font-semibold rounded-xl' disabled={isLoading}>
                      {isLoading ? "Loading..." : "Submit"}
                    </button>
                  </form>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}
