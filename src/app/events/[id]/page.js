"use client"
import { useParams } from "next/navigation"
import { useState, useEffect, use } from "react"
import Image from "next/image"
import { Eventsday } from "../data"
import axios from "axios"
import { useSession } from "next-auth/react"
import { getUserUUID } from "@/app/actions/auth"
import { getUser } from "@/app/actions/auth"
import { useRouter } from "next/navigation"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaXmark } from "react-icons/fa6"
import { motion } from "framer-motion"
import {
  MapPin,
  Clock,
  Sparkles,
  Calendar,
  Star,
  // Gift,
  // Music,
} from "lucide-react"
import toast from "react-hot-toast"
export default function EventDetailPage() {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [userUUID, setUserUUID] = useState("")
  const [teamCode, setTeamCode] = useState("")
  const { data: session } = useSession()
  const [user, setUser] = useState("")
  // const [confirm, setConfirm] = useState(false);
  const router = useRouter()

  useEffect(() => {
    if (id) {
      const foundEvent = Eventsday.find((event) => event.id === parseInt(id))
      setEvent(foundEvent || null)
    }
  }, [id])
  useEffect(() => {
    if (userUUID) {
      axios
        .get(`/api/user/get?uuid=${userUUID}`)
        .then((res) => {
          setTeamCode(res.data.teamCode)
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }, [userUUID])

  useEffect(() => {
    const fetchUserUUID = async () => {
      if (session?.user?.email) {
        try {
          const user = await getUser()
          setUser(user)
        } catch (error) {
          console.error("Error fetching UUID:", error)
        }
      }
    }
    fetchUserUUID()
  }, [session])

  useEffect(() => {
    const fetchUserUUID = async () => {
      if (session?.user?.email) {
        try {
          const uuid = await getUserUUID()
          setUserUUID(uuid)
        } catch (error) {
          console.error("Error fetching UUID:", error)
        }
      }
    }
    fetchUserUUID()
  }, [session])

  const proceedWithRegistration = () => {
    if (!event) {
      return
    }

    const eventId = event.id
    const eventName = event.name
    const eventClub = event.club
    const eventVenue = event.venue
    const eventTime = event.time
    axios
      .post("/api/events/register", {
        eventId,
        teamCode,
        eventName,
        eventClub,
        eventVenue,
        eventTime,
        user,
      })
      .then((response) => {
        if (response.status === 201) {
          toast.success("Registered Successfully", { duration: 3000 }) // Dismiss toast after 3 seconds
        }
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.message, { duration: 3000 })
        } else {
          toast.error("An error occurred. Please try again later.", { duration: 3000 })
        }
      })
  }
  const handleRegister = () => {
    const eventName = event.name

    if (!user) {
      toast.error("No user found, Please login.", { duration: 3000 })
      return
    }
    if (!teamCode) {
      toast.error("Please join or create a team first.", { duration: 3000 })
      return
    }

    toast((t) => (
      <div className="flex flex-col items-center justify-center">
        <p className="text-center">Are you sure you want to register for the event "{eventName}"?</p>
        <div className="flex justify-center gap-2 mt-2">
          <button
            className="px-4 py-2 bg-[#ff000033] text-white rounded"
            onClick={() => {
              toast.dismiss(t.id)
              return
            }}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-[#00ff0033] text-white rounded"
            onClick={() => {
              toast.dismiss(t.id)
              proceedWithRegistration()
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    ))
  }

  if (!event) {
    return <div className="text-center text-white mt-10">Event Not Found</div>
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0118] via-[#2D1E0F] to-[#1A0B2E] text-[#F6F1E2] p-6 flex justify-center py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full bg-[#2D1E0F]/20 backdrop-blur-xl p-8 rounded-2xl border border-[#EFCA4E]/10 flex flex-col gap-8"
      >
        {/* Close Button */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="self-end p-2 cursor-pointer text-[#EFCA4E] hover:text-[#EFCA4E]/80 transition-colors"
          onClick={() => router.push("/events")}
        >
          <FaXmark className="w-6 h-6" />
        </motion.div>
        {/* Upper Side */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Left: Image */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="relative w-80 h-96 rounded-xl overflow-hidden border border-[#EFCA4E]/20 group">
            <Image src={event.imgURL} alt={event.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0118] via-transparent opacity-60" />
          </motion.div>

          {/* Right: Content */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex-1 space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#EFCA4E] to-[#F6F1E2]">{event.name}</h1>
            <div className="grid gap-4 text-[#F6F1E2]/70">
              <div className="flex items-center gap-2 bg-white/5 p-3 rounded-lg backdrop-blur-sm">
                <Calendar className="w-5 h-5 text-[#EFCA4E]" />
                <span>Club: {event.club}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 p-3 rounded-lg backdrop-blur-sm">
                <Star className="w-5 h-5 text-[#EFCA4E]" />
                <span>Category: {event.category}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 p-3 rounded-lg backdrop-blur-sm">
                <MapPin className="w-5 h-5 text-[#EFCA4E]" />
                <span>Venue: {event.venue}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 p-3 rounded-lg backdrop-blur-sm">
                <Clock className="w-5 h-5 text-[#EFCA4E]" />
                <span>Time: {event.time}</span>
              </div>
            </div>

            {/* Register Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-4 bg-gradient-to-r from-[#EFCA4E] to-[#2D1E0F] text-[#F6F1E2] font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#EFCA4E]/20 border border-[#EFCA4E]/20"
              onClick={handleRegister}
            >
              Register Now
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom Side */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
          {/* Prize */}
          {event.prize && (
            <div className="p-6 rounded-xl bg-gradient-to-br from-[#EFCA4E]/10 to-transparent border border-[#EFCA4E]/20">
              <h3 className="text-2xl font-semibold text-[#EFCA4E] mb-2">Prize Pool</h3>
              <p className="text-xl text-[#F6F1E2]/70">{event.prize}</p>
            </div>
          )}

          {/* Description */}
          <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <h3 className="text-2xl font-semibold text-[#EFCA4E] mb-4">About the Event</h3>
            <p className="text-lg text-[#F6F1E2]/70 whitespace-pre-line leading-relaxed">{event.description}</p>
          </div>

          {/* Rules */}
          {event.rules && event.rules.length > 0 && (
            <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <h3 className="text-2xl font-semibold text-[#EFCA4E] mb-4">📌 Rules and Regulations</h3>
              <ul className="list-none space-y-4">
                {event.rules.map((rule, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 text-lg text-[#F6F1E2]/70"
                  >
                    <span className="text-[#EFCA4E] font-semibold">{index + 1}.</span>
                    <span>{rule}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {/* Judgement Criteria */}
          {event.judgement_criteria && event.judgement_criteria.length > 0 && (
            <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <h3 className="text-2xl font-semibold text-[#EFCA4E] mb-4">🏆 Judgement Criteria</h3>
              <ul className="list-none space-y-4">
                {event.judgement_criteria.map((criteria, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 text-lg text-[#F6F1E2]/70"
                  >
                    <span className="text-[#EFCA4E] font-semibold">{index + 1}.</span>
                    <span>{criteria}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact Information */}
          {event.contact && event.contact.length > 0 && (
            <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <h3 className="text-2xl font-semibold text-[#EFCA4E] mb-4">Contact Information</h3>
              <ul className="space-y-3">
                {event.contact.map((contact, index) => (
                  <motion.li key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="text-lg text-[#F6F1E2]/70">
                    {contact}
                  </motion.li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
