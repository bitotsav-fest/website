"use client"
import React, { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { getUser } from "@/app/actions/auth"
import axios from "axios"
import { motion } from "framer-motion"
import { Ripple } from "@/components/magicui/ripple"
import toast from "react-hot-toast"
import { Eventsday } from "../events/data"

export default function Register() {
  const [activeTab, setActiveTab] = useState("create")
  const [userUUID, setUserUUID] = useState("")
  const [teamCode, setTeamCode] = useState("")
  const [user, setUser] = useState("")
  const { data: session } = useSession()
  const [teamData, setTeamData] = useState(null)

  // State for student type options - for both create and join forms
  const [isBITStudentNonBITMail, setIsBITStudentNonBITMail] = useState(false)
  const [isNonBITStudent, setIsNonBITStudent] = useState(false)
  const [rollNumber, setRollNumber] = useState("")
  const [collegeName, setCollegeName] = useState("")

  // Join form specific state
  const [joinIsBITStudentNonBITMail, setJoinIsBITStudentNonBITMail] = useState(false)
  const [joinIsNonBITStudent, setJoinIsNonBITStudent] = useState(false)
  const [joinRollNumber, setJoinRollNumber] = useState("")
  const [joinCollegeName, setJoinCollegeName] = useState("")

  useEffect(() => {
    const fetchUserUUID = async () => {
      if (session?.user?.email) {
        try {
          const user = await getUser()
          setUserUUID(user.uuid)
          setUser(user)
          // console.log(user);
        } catch (error) {
          console.error("Error fetching UUID:", error)
        }
      }
    }
    fetchUserUUID()
  }, [session])

  const [Loading, setLoading] = useState(true)

  // below 2 useEfefects needed to be merged
  useEffect(() => {
    if (userUUID) {
      axios
        .get(`/api/user/get?uuid=${userUUID}`)
        .then((res) => {
          setTeamCode(res.data.teamCode)
          setLoading(false)
        })
        .catch((err) => {
          console.error(err)
          setLoading(false)
        })
    }
  }, [userUUID])

  setTimeout(() => {
    setLoading(false)
  }, 6000)

  useEffect(() => {
    if (teamCode) {
      axios
        .get(`/api/teams/get?teamCode=${teamCode}`)
        .then((res) => {
          // Handle the response data as needed
          const team = res.data.team
          setTeamData(team)
          // console.log(team);
          // console.log(teamData);
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }, [teamCode])

  // Handle student type checkbox changes for Create Team
  const handleBITStudentChange = (e) => {
    setIsBITStudentNonBITMail(e.target.checked)
    if (e.target.checked) {
      setIsNonBITStudent(false)
      setCollegeName("")
    }
  }

  const handleNonBITStudentChange = (e) => {
    setIsNonBITStudent(e.target.checked)
    if (e.target.checked) {
      setIsBITStudentNonBITMail(false)
      setRollNumber("")
    }
  }

  // Handle student type checkbox changes for Join Team
  const handleJoinBITStudentChange = (e) => {
    setJoinIsBITStudentNonBITMail(e.target.checked)
    if (e.target.checked) {
      setJoinIsNonBITStudent(false)
      setJoinCollegeName("")
    }
  }

  const handleJoinNonBITStudentChange = (e) => {
    setJoinIsNonBITStudent(e.target.checked)
    if (e.target.checked) {
      setJoinIsBITStudentNonBITMail(false)
      setJoinRollNumber("")
    }
  }

  // Validate roll number format
  const validateRollNumber = (value) => {
    // Regex for patterns like btech10377.23 or imh10121.22
    const rollNumberRegex = /^[a-z]+\d+\.\d{2}$/i
    return rollNumberRegex.test(value)
  }

  // Handle roll number input change with validation
  const handleRollNumberChange = (e) => {
    const value = e.target.value
    setRollNumber(value)
  }

  // Handle roll number input change for Join form
  const handleJoinRollNumberChange = (e) => {
    const value = e.target.value
    setJoinRollNumber(value)
  }

  // Handle college name input change with capitalization
  const handleCollegeNameChange = (e) => {
    const value = e.target.value.toUpperCase()
    setCollegeName(value)
  }

  // Handle college name input change for Join form
  const handleJoinCollegeNameChange = (e) => {
    const value = e.target.value.toUpperCase()
    setJoinCollegeName(value)
  }

  const handleCreateTeam = (e) => {
    e.preventDefault()

    const teamName = e.target.elements.teamName.value
    const leaderMobileNumber = e.target.elements.leaderMobileNumber.value

    // Get identification info based on user type
    let identificationValue = ""

    if (user.isBITMesraStudent) {
      identificationValue = user.rollNumber
    } else if (isBITStudentNonBITMail) {
      if (!validateRollNumber(rollNumber)) {
        toast.error("Please enter a valid roll number format (e.g., btech10377.23)")
        return
      }
      identificationValue = rollNumber
    } else if (isNonBITStudent) {
      if (!collegeName.trim()) {
        toast.error("Please enter your college name")
        return
      }
      identificationValue = collegeName
    } else {
      toast.error("Please select your student type")
      return
    }

    if (!teamName.trim() || !leaderMobileNumber || !identificationValue) {
      toast.error("Please fill all the fields.")
      return
    }

    // extracting uuid form sesssion storage
    const leaderUUID = userUUID
    if (!leaderUUID) {
      toast.error("User ID not found. Please log in again.")
      return
    }

    axios
      .post("/api/teams/create", {
        teamName,
        leaderUUID,
        leaderMobileNumber,
        rollNumber: identificationValue, // Using a single field for both roll number and college name
        user,
      })
      .then((res) => {
        if (res.status === 201) {
          toast.success("Team created successfully")
          setTeamCode(res.data.teamCode)
        }
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.message || "An unexpected error occurred.")
        } else {
          toast.error("An error occurred. Please try again later.")
        }
      })
  }

  const handleJoinTeam = (e) => {
    e.preventDefault()
    const teamCode = e.target.elements.teamId.value.trim()
    const studentMobileNumber = e.target.elements.studentMobileNumber.value

    if (!teamCode) {
      toast.error("Please enter a valid Team ID.")
      return
    }

    // Get identification info based on user type for Join form
    let identificationValue = ""

    if (user.isBITMesraStudent) {
      identificationValue = user.rollNumber
    } else if (joinIsBITStudentNonBITMail) {
      if (!validateRollNumber(joinRollNumber)) {
        toast.error("Please enter a valid roll number format (e.g., btech10377.23)")
        return
      }
      identificationValue = joinRollNumber
    } else if (joinIsNonBITStudent) {
      if (!joinCollegeName.trim()) {
        toast.error("Please enter your college name")
        return
      }
      identificationValue = joinCollegeName
    } else {
      toast.error("Please select your student type")
      return
    }

    // extracting uuid form sesssion storage
    if (!userUUID) {
      toast.error("User ID not found. Please log in again.")
      return
    }

    axios
      .post("/api/teams/join", {
        teamCode,
        userUUID,
        user,
        studentMobileNumber,
        rollNumber: identificationValue, // Adding identification value to join request
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Team joined successfully!")
          setTeamCode(res.data.teamCode)
        } else {
          toast.error(`Unexpected response: ${res.status}`)
        }
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.message)
        } else {
          toast.error("An error occurred. Please try again later.")
        }
      })
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#0A0118] via-[#2D1E0F] to-[#1A0B2E] text-[#F6F1E2] py-24 px-4 relative overflow-x-hidden'>
      {/* Background effects */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] pointer-events-none"></div>
      <div className='absolute top-0 -left-4 w-96 h-96 bg-[#EFCA4E] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob'></div>
      <div className='absolute top-0 -right-4 w-96 h-96 bg-[#2D1E0F] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000'></div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='max-w-4xl mx-auto space-y-8'>
        {/* Header Section */}
        <div className='relative text-center space-y-6 py-8'>
          {/* Animated background elements */}
          <div className='absolute inset-0 bg-gradient-to-r from-[#EFCA4E]/5 via-transparent to-[#EFCA4E]/5 animate-pulse'></div>
          <div className='absolute -top-10 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-[#EFCA4E]/10 rounded-full blur-3xl'></div>

          {/* Main heading with enhanced styling */}
          <h1 className='relative'>
            <span className='text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#EFCA4E] via-[#F6F1E2] to-[#EFCA4E] animate-gradient-x'>Team Registration</span>
            <div className='absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#EFCA4E]/50 to-transparent'></div>
          </h1>

          {/* Subtitle with conditional rendering and animation */}
          {!Loading && !teamCode && (
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className='text-[#F6F1E2]/70 text-xl font-light tracking-wide'>
              Create or join a team to participate in events
            </motion.p>
          )}
        </div>

        {/* Loading State Display */}
        {Loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className='relative flex h-[480px] w-full flex-col items-center justify-center border border-[#EFCA4E]/20 rounded-3xl bg-white/5 backdrop-blur-xl shadow-xl hover:border-[#EFCA4E]/40 transition-all duration-500 group overflow-hidden'
          >
            {/* Animated background effects */}
            <div className='absolute inset-0'>
              <div className='absolute inset-0 bg-gradient-to-br from-[#EFCA4E]/5 via-transparent to-[#2D1E0F]/5 animate-gradient-shift'></div>
              <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-[0.03]"></div>
            </div>

            {/* Logo with enhanced animations */}
            <motion.img
              src='/bitotsav-logo.svg'
              alt='Bitotsav Logo'
              className='w-64 mx-auto opacity-50 group-hover:opacity-100 transition-all duration-500 relative z-10 drop-shadow-2xl transform group-hover:scale-110'
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.05, 1],
                rotate: [-5, 0, -5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Enhanced ripple effect */}
            <Ripple color='rgba(239, 202, 78, 0.1)' duration={2000} />

            {/* Gradient overlay */}
            <div className='absolute inset-0 bg-gradient-to-r from-[#EFCA4E]/10 via-transparent to-[#EFCA4E]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>

            {/* Floating particles */}
            <div className='absolute inset-0 overflow-hidden'>
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className='absolute w-1 h-1 bg-[#EFCA4E]/30 rounded-full'
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animation: `float ${3 + Math.random() * 4}s linear infinite`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
        {!Loading && teamCode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className='relative bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-[#EFCA4E]/20 text-center space-y-8 overflow-hidden'
          >
            {/* Animated background effects */}
            <div className='absolute inset-0 bg-gradient-to-br from-[#EFCA4E]/5 via-transparent to-[#2D1E0F]/5 animate-gradient-shift'></div>
            <div className='absolute -top-20 -left-20 w-72 h-72 bg-[#EFCA4E]/10 rounded-full blur-3xl animate-pulse'></div>
            <div className='absolute -bottom-20 -right-20 w-72 h-72 bg-[#2D1E0F]/10 rounded-full blur-3xl animate-pulse delay-1000'></div>

            {/* Team Info Card */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className='relative bg-gradient-to-br from-white/10 to-white/5 p-8 rounded-2xl border border-white/20 shadow-xl backdrop-blur-lg'
            >
              <div className='absolute inset-0 bg-gradient-to-r from-[#EFCA4E]/10 via-transparent to-[#EFCA4E]/10 animate-gradient-x rounded-2xl'></div>
              <div className='relative z-10'>
                <h4 className='text-4xl font-bold bg-gradient-to-r from-[#EFCA4E] to-white bg-clip-text text-transparent mb-4'>{teamData?.teamName}</h4>
                <div className='flex items-center justify-center gap-4 mb-6'>
                  <span className='px-4 py-2 bg-[#EFCA4E]/10 rounded-full text-[#EFCA4E] font-medium'>{teamData?.rollNumber}</span>
                </div>
                <div className='space-y-3'>
                  <h4 className='text-xl text-[#EFCA4E] font-semibold'>Team Code</h4>
                  <div className='flex items-center justify-center gap-2'>
                    <p className='text-4xl font-mono font-bold bg-gradient-to-r from-white to-[#F6F1E2] bg-clip-text text-transparent tracking-wider'>{teamCode}</p>
                  </div>
                  <p className='text-sm text-[#F6F1E2]/70 italic'>Share this code with your team members to join</p>
                </div>
              </div>
            </motion.div>

            {/* Team Members Section */}
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className='relative'>
              <h3 className='text-3xl font-bold text-[#EFCA4E] mb-6'>Team Members</h3>
              <div className='overflow-hidden rounded-xl border border-[#EFCA4E]/20'>
                <table className='w-full'>
                  <thead>
                    <tr className='bg-gradient-to-r from-[#EFCA4E]/20 to-[#2D1E0F]/20'>
                      <th className='py-4 px-6 text-left text-sm font-bold text-[#EFCA4E] uppercase tracking-wider'>Name</th>
                      <th className='py-4 px-6 text-left text-sm font-bold text-[#EFCA4E] uppercase tracking-wider'>Roll Number/College</th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-[#EFCA4E]/10'>
                    {teamData?.members.length > 0 ? (
                      teamData.members.map((member, index) => (
                        <motion.tr
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className='hover:bg-[#EFCA4E]/5 transition-colors duration-300'
                        >
                          <td className='py-4 px-6 text-white/90 font-medium'>{member.name}</td>
                          <td className='py-4 px-6 text-white/80'>{member.rollNumber}</td>
                        </motion.tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan='2' className='py-8 text-center text-[#F6F1E2]/50 italic'>
                          No team members found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Registered Events Section */}
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }} className='relative'>
              {teamData?.events?.length > 0 ? (
                <>
                  <h3 className='text-3xl font-bold text-[#EFCA4E] mb-6'>Registered Events</h3>
                  <div className='grid gap-4'>
                    {teamData.events.map((event, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className='group relative bg-gradient-to-br from-white/5 to-transparent backdrop-blur-md border border-[#EFCA4E]/20 rounded-xl p-6 hover:border-[#EFCA4E]/40 transition-all duration-300'
                      >
                        <div className='absolute inset-0 bg-gradient-to-r from-[#EFCA4E]/0 via-[#EFCA4E]/5 to-[#EFCA4E]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl'></div>
                        <div className='relative flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                          <div className='flex items-center gap-4'>
                            <div className='h-12 w-12 rounded-xl bg-[#EFCA4E]/10 flex items-center justify-center group-hover:bg-[#EFCA4E]/20 transition-colors duration-300'>
                              <span className='text-[#EFCA4E] font-bold text-xl'>{index + 1}</span>
                            </div>
                            <h4 className='text-2xl font-bold text-white group-hover:text-[#EFCA4E] transition-colors duration-300'>{Eventsday[event - 1].name}</h4>
                          </div>
                          <div className='flex flex-wrap gap-6'>
                            {[
                              { label: "Day", value: Eventsday[event - 1].day },
                              { label: "Venue", value: Eventsday[event - 1].venue },
                              { label: "Time", value: Eventsday[event - 1].time },
                            ].map((item, i) => (
                              <div key={i} className='flex items-center gap-2'>
                                <span className='text-[#EFCA4E] font-medium'>{item.label}:</span>
                                <span className='text-white/90'>{item.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </>
              ) : (
                <div className='text-center py-12 bg-white/5 backdrop-blur-sm border border-[#EFCA4E]/20 rounded-xl'>
                  <p className='text-[#F6F1E2]/70 text-lg font-medium'>No Registrations Found</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
        {/* Team Creation/Join Forms */}
        {!Loading && !teamCode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className='bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-[#EFCA4E]/20 relative overflow-hidden'
          >
            {/* Enhanced animated background effects */}
            <div className='absolute inset-0'>
              <div className='absolute inset-0 bg-gradient-to-br from-[#EFCA4E]/5 via-transparent to-[#2D1E0F]/5 animate-gradient-shift'></div>
              <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-[0.03]"></div>
            </div>

            {/* Enhanced floating orbs with glow effects */}
            <div className='absolute -top-20 -left-20 w-40 h-40 bg-[#EFCA4E]/20 rounded-full blur-3xl animate-float'>
              <div className='absolute inset-0 bg-[#EFCA4E]/30 rounded-full animate-pulse'></div>
            </div>
            <div className='absolute -bottom-20 -right-20 w-40 h-40 bg-[#2D1E0F]/20 rounded-full blur-3xl animate-float-delayed'>
              <div className='absolute inset-0 bg-[#2D1E0F]/30 rounded-full animate-pulse delay-1000'></div>
            </div>

            {/* Sparkle effects */}
            <div className='absolute inset-0 overflow-hidden'>
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className='absolute w-1 h-1 bg-[#EFCA4E] rounded-full'
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animation: `sparkle ${2 + Math.random() * 2}s linear infinite`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>

            {/* Content wrapper with enhanced depth effect */}
            <div className='relative z-10 bg-black/10 rounded-xl p-6 backdrop-blur-sm'>
              {/* Enhanced tabs with glow effect */}
              <div className='flex justify-center space-x-4 mb-8'>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(239, 202, 78, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab("create")}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === "create"
                      ? "bg-gradient-to-r from-[#EFCA4E] to-[#2D1E0F] text-white shadow-lg shadow-[#EFCA4E]/20"
                      : "text-[#F6F1E2]/70 hover:text-[#F6F1E2] bg-white/5 hover:bg-white/10"
                  }`}
                >
                  Create Team
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(239, 202, 78, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab("join")}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === "join"
                      ? "bg-gradient-to-r from-[#EFCA4E] to-[#2D1E0F] text-white shadow-lg shadow-[#EFCA4E]/20"
                      : "text-[#F6F1E2]/70 hover:text-[#F6F1E2] bg-white/5 hover:bg-white/10"
                  }`}
                >
                  Join Team
                </motion.button>
              </div>

              {/* Rest of the form content remains the same */}
              {activeTab === "create" && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className='max-w-md mx-auto'>
                  <form className='space-y-4' onSubmit={handleCreateTeam}>
                    <h4 className='text-2xl font-semibold text-[#EFCA4E] mb-6'>Create Your Team</h4>
                    <div className='space-y-4'>
                      <input
                        className='w-full p-3 bg-white/5 border border-[#EFCA4E]/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#EFCA4E]/50 transition-all'
                        name='teamName'
                        placeholder='Team Name'
                      />
                      <input
                        type='tel'
                        pattern='[0-9]{10}'
                        className='w-full p-3 bg-white/5 border border-[#EFCA4E]/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#EFCA4E]/50 transition-all'
                        name='leaderMobileNumber'
                        placeholder='Leader Mobile Number'
                      />

                      {/* Show student type options only if user is NOT a BIT Mesra student */}
                      {!user.isBITMesraStudent && (
                        <div className='space-y-3 p-4 bg-white/5 border border-[#EFCA4E]/20 rounded-xl'>
                          <h5 className='text-[#EFCA4E] font-medium'>Select your student type:</h5>

                          <div className='flex items-center space-x-2'>
                            <input type='checkbox' id='bitStudentNonBitMail' className='w-5 h-5 accent-[#EFCA4E] cursor-pointer' checked={isBITStudentNonBITMail} onChange={handleBITStudentChange} />
                            <label htmlFor='bitStudentNonBitMail' className='text-white cursor-pointer'>
                              I am a BIT Mesra student (logged in with non-BIT mail)
                            </label>
                          </div>

                          <div className='flex items-center space-x-2'>
                            <input type='checkbox' id='nonBitStudent' className='w-5 h-5 accent-[#EFCA4E] cursor-pointer' checked={isNonBITStudent} onChange={handleNonBITStudentChange} />
                            <label htmlFor='nonBitStudent' className='text-white cursor-pointer'>
                              I am not a BIT Mesra student
                            </label>
                          </div>
                        </div>
                      )}

                      {/* Conditional Input Fields based on student type */}
                      {user.isBITMesraStudent && (
                        <input
                          className='w-full p-3 bg-white/5 border border-[#EFCA4E]/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#EFCA4E]/50 transition-all'
                          name='rollNumber'
                          value={user.rollNumber}
                          readOnly
                        />
                      )}

                      {isBITStudentNonBITMail && (
                        <div>
                          <input
                            className='w-full p-3 bg-white/5 border border-[#EFCA4E]/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#EFCA4E]/50 transition-all'
                            name='rollNumber'
                            placeholder='Roll Number (e.g., btech10377.23)'
                            value={rollNumber}
                            onChange={handleRollNumberChange}
                          />
                          {rollNumber && !validateRollNumber(rollNumber) && <p className='text-red-400 text-sm mt-1 ml-1'>Please enter a valid roll number format (e.g., btech10377.23)</p>}
                        </div>
                      )}

                      {isNonBITStudent && (
                        <input
                          className='w-full p-3 bg-white/5 border border-[#EFCA4E]/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#EFCA4E]/50 transition-all'
                          name='rollNumber' // Using the same name "rollNumber" for college name input
                          placeholder='College Name'
                          value={collegeName}
                          onChange={handleCollegeNameChange}
                        />
                      )}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className='w-full px-6 py-4 bg-gradient-to-r from-[#EFCA4E] to-[#2D1E0F] text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#EFCA4E]/20'
                      type='submit'
                    >
                      Create Team
                    </motion.button>
                  </form>
                </motion.div>
              )}

              {activeTab === "join" && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className='max-w-md mx-auto'>
                  {/* Join form content */}
                  <form className='space-y-4' onSubmit={handleJoinTeam}>
                    <h4 className='text-2xl font-semibold text-[#EFCA4E] mb-6'>Join a Team</h4>
                    <input
                      className='w-full p-3 bg-white/5 border border-[#EFCA4E]/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#EFCA4E]/50 transition-all'
                      placeholder='Enter Team ID'
                      name='teamId'
                    />
                    <input
                      type='tel'
                      pattern='[0-9]{10}'
                      className='w-full p-3 bg-white/5 border border-[#EFCA4E]/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#EFCA4E]/50 transition-all'
                      name='studentMobileNumber'
                      placeholder='Mobile Number'
                    />

                    {/* Show read-only roll number if user is a BIT Mesra student */}
                    {user.isBITMesraStudent && (
                      <input
                        className='w-full p-3 bg-white/5 border border-[#EFCA4E]/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#EFCA4E]/50 transition-all'
                        name='joinRollNumber'
                        value={user.rollNumber}
                        readOnly
                      />
                    )}

                    {/* Show student type options only if user is NOT a BIT Mesra student */}
                    {!user.isBITMesraStudent && (
                      <div className='space-y-3 p-4 bg-white/5 border border-[#EFCA4E]/20 rounded-xl'>
                        <h5 className='text-[#EFCA4E] font-medium'>Select your student type:</h5>

                        <div className='flex items-center space-x-2'>
                          <input
                            type='checkbox'
                            id='joinBitStudentNonBitMail'
                            className='w-5 h-5 accent-[#EFCA4E] cursor-pointer'
                            checked={joinIsBITStudentNonBITMail}
                            onChange={handleJoinBITStudentChange}
                          />
                          <label htmlFor='joinBitStudentNonBitMail' className='text-white cursor-pointer'>
                            I am a BIT Mesra student (logged in with non-BIT mail)
                          </label>
                        </div>

                        <div className='flex items-center space-x-2'>
                          <input type='checkbox' id='joinNonBitStudent' className='w-5 h-5 accent-[#EFCA4E] cursor-pointer' checked={joinIsNonBITStudent} onChange={handleJoinNonBITStudentChange} />
                          <label htmlFor='joinNonBitStudent' className='text-white cursor-pointer'>
                            I am not a BIT Mesra student
                          </label>
                        </div>
                      </div>
                    )}

                    {/* Conditional Input Fields based on student type for Join form */}
                    {joinIsBITStudentNonBITMail && (
                      <div>
                        <input
                          className='w-full p-3 bg-white/5 border border-[#EFCA4E]/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#EFCA4E]/50 transition-all'
                          name='joinRollNumber'
                          placeholder='Roll Number (e.g., btech10377.23)'
                          value={joinRollNumber}
                          onChange={handleJoinRollNumberChange}
                        />
                        {joinRollNumber && !validateRollNumber(joinRollNumber) && (
                          <p className='text-red-400 text-sm mt-1 ml-1'>Please enter a valid roll number format (e.g., btech10377.23 or imh10121.21)</p>
                        )}
                      </div>
                    )}

                    {joinIsNonBITStudent && (
                      <input
                        className='w-full p-3 bg-white/5 border border-[#EFCA4E]/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#EFCA4E]/50 transition-all'
                        name='joinCollegeName'
                        placeholder='College Name'
                        value={joinCollegeName}
                        onChange={handleJoinCollegeNameChange}
                      />
                    )}

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className='w-full px-6 py-4 bg-gradient-to-r from-[#EFCA4E] to-[#2D1E0F] text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#EFCA4E]/20'
                      type='submit'
                    >
                      Join Team
                    </motion.button>
                  </form>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>

      <br />

      {/* rules */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='flex items-center justify-center min-h-screen'>
        <div className='relative bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-[#EFCA4E]/20 text-left space-y-6 max-w-4xl mx-auto overflow-hidden'>
          {/* Animated background effects */}
          <div className='absolute inset-0 bg-gradient-to-br from-[#EFCA4E]/5 via-transparent to-[#2D1E0F]/5 animate-gradient-shift'></div>
          <div className='absolute -top-20 -left-20 w-72 h-72 bg-[#EFCA4E]/10 rounded-full blur-3xl animate-pulse'></div>
          <div className='absolute -bottom-20 -right-20 w-72 h-72 bg-[#2D1E0F]/10 rounded-full blur-3xl animate-pulse delay-1000'></div>

          <motion.h2 initial={{ y: -20 }} animate={{ y: 0 }} className='relative text-4xl font-bold text-center'>
            <span className='bg-gradient-to-r from-[#EFCA4E] via-[#F6F1E2] to-[#EFCA4E] text-transparent bg-clip-text animate-gradient-x'>Team Formation & Participation Rules</span>
          </motion.h2>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className='bg-gradient-to-r from-red-500/20 to-red-500/10 backdrop-blur-md border border-red-500/40 p-4 rounded-xl text-center space-y-1 shadow-lg hover:shadow-red-500/20 transition-all duration-300'
          >
            <p className='text-white text-lg'>
              It is <span className='font-bold text-red-400'>compulsory</span> to bring your current institution ID card.
            </p>
            <p className='text-white/80 text-sm'>
              Information mismatch with ID card will result in <span className='font-bold text-red-400'>disqualification</span>.
            </p>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className='bg-gradient-to-r from-red-500/20 to-red-500/10 backdrop-blur-md border border-red-500/40 p-4 rounded-xl text-center shadow-lg hover:shadow-red-500/20 transition-all duration-300'
          >
            <p className='text-white text-lg font-bold'>Teams are limited to a maximum of 8 participants</p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className='bg-gradient-to-r from-yellow-500/20 to-yellow-500/10 backdrop-blur-md border border-yellow-500/40 p-6 rounded-xl text-center space-y-2 shadow-lg hover:shadow-yellow-500/20 transition-all duration-300'
          >
            <p className='text-white text-lg'>For any team-related modifications, please contact:</p>
            <p className='text-yellow-400 text-xl font-bold'>Mrityunjay Raj</p>
            <a href='tel:9471828932' className='inline-block text-yellow-400 hover:text-yellow-300 text-lg font-medium transition-colors duration-300'>
              WhatsApp: 9471828932
            </a>
            <p className='text-yellow-400/80 text-sm italic mt-2'>(Note: Team modifications will only be considered in extreme cases, so please create your team carefully)</p>
          </motion.div>

          <div className='relative bg-white/5 backdrop-blur-md p-6 rounded-xl border border-[#EFCA4E]/30 space-y-6 shadow-xl hover:shadow-[#EFCA4E]/20 transition-all duration-300'>
            <motion.h3 initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className='text-3xl font-bold text-[#EFCA4E] mb-4'>
              General Rules
            </motion.h3>

            <motion.ul initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className='space-y-4 text-[#F6F1E2]/90'>
              <li className='flex items-start space-x-3'>
                <span className='text-[#EFCA4E] text-xl'>•</span>
                <div>
                  <span className='font-semibold text-[#EFCA4E]'>Same Institution Requirement:</span>
                  <p>All team members must be from the same institution. No cross-institution teams.</p>
                </div>
              </li>
              <li className='flex items-start space-x-3'>
                <span className='text-[#EFCA4E] text-xl'>•</span>
                <div>
                  <span className='font-semibold text-[#EFCA4E]'>BIT Mesra Students:</span>
                  <ul className='mt-2 space-y-2 pl-4'>
                    <li>• BIT webmail login auto-verifies roll number</li>
                    <li>• Non-webmail users must provide their college name</li>
                    <li>• Strict regex-based roll number validation</li>
                  </ul>
                </div>
              </li>
            </motion.ul>

            <motion.h3 initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className='text-3xl font-bold text-[#EFCA4E] mt-8 mb-4'>
              Joining a Team
            </motion.h3>

            <motion.ul initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className='space-y-4 text-[#F6F1E2]/90'>
              <li className='flex items-start space-x-3'>
                <span className='text-[#EFCA4E] text-xl'>•</span>
                <div>
                  <span className='font-semibold text-[#EFCA4E]'>Verification Process:</span>
                  <ul className='mt-2 space-y-2 pl-4'>
                    <li>• BIT webmail users have automatic roll number verification</li>
                    <li>• Non-BIT webmail users must provide a valid college name</li>
                    <li>• Mismatched college names lead to rejection</li>
                  </ul>
                </div>
              </li>
              <li className='flex items-start space-x-3'>
                <span className='text-[#EFCA4E] text-xl'>•</span>
                <div>
                  <span className='font-semibold text-[#EFCA4E]'>Non-BIT Students:</span>
                  <ul className='mt-2 space-y-2 pl-4'>
                    <li>• Checkbox options: ✅ BIT student without webmail (Requires roll number verification) ✅ Non-BIT student</li>
                    <li>
                      • <span className='font-semibold text-red-400'>Restriction:</span> Non-BIT students can only join day events, not night events
                    </li>
                  </ul>
                </div>
              </li>
            </motion.ul>
          </div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className='text-[#F6F1E2]/60 text-center text-lg italic mt-6'>
            These rules ensure fair, secure, and institutionally compliant participation.
          </motion.p>
        </div>
      </motion.div>
    </div>
  )
}
