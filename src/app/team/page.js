"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getUser } from "@/app/actions/auth";
import axios from "axios";
import { motion } from "framer-motion";
import { Ripple } from "@/components/magicui/ripple";
import toast from "react-hot-toast";

export default function Register() {
  const [activeTab, setActiveTab] = useState("create");
  const [userUUID, setUserUUID] = useState("");
  const [teamCode, setTeamCode] = useState("");
  const [user, setUser] = useState("");
  const { data: session } = useSession();
  const [teamData, setTeamData] = useState(null);

  // State for student type options - for both create and join forms
  const [isBITStudentNonBITMail, setIsBITStudentNonBITMail] = useState(false);
  const [isNonBITStudent, setIsNonBITStudent] = useState(false);
  const [rollNumber, setRollNumber] = useState("");
  const [collegeName, setCollegeName] = useState("");

  // Join form specific state
  const [joinIsBITStudentNonBITMail, setJoinIsBITStudentNonBITMail] =
    useState(false);
  const [joinIsNonBITStudent, setJoinIsNonBITStudent] = useState(false);
  const [joinRollNumber, setJoinRollNumber] = useState("");
  const [joinCollegeName, setJoinCollegeName] = useState("");

  useEffect(() => {
    const fetchUserUUID = async () => {
      if (session?.user?.email) {
        try {
          const user = await getUser();
          setUserUUID(user.uuid);
          setUser(user);
          // console.log(user);
        } catch (error) {
          console.error("Error fetching UUID:", error);
        }
      }
    };
    fetchUserUUID();
  }, [session]);

  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    if (userUUID) {
      axios
        .get(`/api/user/get?uuid=${userUUID}`)
        .then((res) => {
          setTeamCode(res.data.teamCode);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [userUUID]);

  setTimeout(() => {
    setLoading(false);
  }, 6000);

  useEffect(() => {
    if (teamCode) {
      axios
        .get(`/api/teams/get?teamCode=${teamCode}`)
        .then((res) => {
          // Handle the response data as needed
          const team = res.data.team;
          setTeamData(team);
          // console.log(team);
          // console.log(teamData);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [teamCode]);

  // Handle student type checkbox changes for Create Team
  const handleBITStudentChange = (e) => {
    setIsBITStudentNonBITMail(e.target.checked);
    if (e.target.checked) {
      setIsNonBITStudent(false);
      setCollegeName("");
    }
  };

  const handleNonBITStudentChange = (e) => {
    setIsNonBITStudent(e.target.checked);
    if (e.target.checked) {
      setIsBITStudentNonBITMail(false);
      setRollNumber("");
    }
  };

  // Handle student type checkbox changes for Join Team
  const handleJoinBITStudentChange = (e) => {
    setJoinIsBITStudentNonBITMail(e.target.checked);
    if (e.target.checked) {
      setJoinIsNonBITStudent(false);
      setJoinCollegeName("");
    }
  };

  const handleJoinNonBITStudentChange = (e) => {
    setJoinIsNonBITStudent(e.target.checked);
    if (e.target.checked) {
      setJoinIsBITStudentNonBITMail(false);
      setJoinRollNumber("");
    }
  };

  // Validate roll number format
  const validateRollNumber = (value) => {
    // Regex for patterns like btech10377.23 or imh10121.22
    const rollNumberRegex = /^[a-z]+\d+\.\d{2}$/i;
    return rollNumberRegex.test(value);
  };

  // Handle roll number input change with validation
  const handleRollNumberChange = (e) => {
    const value = e.target.value;
    setRollNumber(value);
  };

  // Handle roll number input change for Join form
  const handleJoinRollNumberChange = (e) => {
    const value = e.target.value;
    setJoinRollNumber(value);
  };

  // Handle college name input change with capitalization
  const handleCollegeNameChange = (e) => {
    const value = e.target.value.toUpperCase();
    setCollegeName(value);
  };

  // Handle college name input change for Join form
  const handleJoinCollegeNameChange = (e) => {
    const value = e.target.value.toUpperCase();
    setJoinCollegeName(value);
  };

  const handleCreateTeam = (e) => {
    e.preventDefault();

    const teamName = e.target.elements.teamName.value;
    const leaderMobileNumber = e.target.elements.leaderMobileNumber.value;

    // Get identification info based on user type
    let identificationValue = "";

    if (user.isBITMesraStudent) {
      identificationValue = user.rollNumber;
    } else if (isBITStudentNonBITMail) {
      if (!validateRollNumber(rollNumber)) {
        toast.error(
          "Please enter a valid roll number format (e.g., btech10377.23)"
        );
        return;
      }
      identificationValue = rollNumber;
    } else if (isNonBITStudent) {
      if (!collegeName.trim()) {
        toast.error("Please enter your college name");
        return;
      }
      identificationValue = collegeName;
    } else {
      toast.error("Please select your student type");
      return;
    }

    if (!teamName.trim() || !leaderMobileNumber || !identificationValue) {
      toast.error("Please fill all the fields.");
      return;
    }

    // extracting uuid form sesssion storage
    const leaderUUID = userUUID;
    if (!leaderUUID) {
      toast.error("User ID not found. Please log in again.");
      return;
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
          toast.success("Team created successfully");
          setTeamCode(res.data.teamCode);
        }
      })
      .catch((err) => {
        if (err.response) {
          toast.error(
            err.response.data.message || "An unexpected error occurred."
          );
        } else {
          toast.error("An error occurred. Please try again later.");
        }
      });
  };

  const handleJoinTeam = (e) => {
    e.preventDefault();
    const teamCode = e.target.elements.teamId.value.trim();
    const studentMobileNumber = e.target.elements.studentMobileNumber.value;

    if (!teamCode) {
      toast.error("Please enter a valid Team ID.");
      return;
    }

    // Get identification info based on user type for Join form
    let identificationValue = "";

    if (user.isBITMesraStudent) {
      identificationValue = user.rollNumber;
    } else if (joinIsBITStudentNonBITMail) {
      if (!validateRollNumber(joinRollNumber)) {
        toast.error(
          "Please enter a valid roll number format (e.g., btech10377.23)"
        );
        return;
      }
      identificationValue = joinRollNumber;
    } else if (joinIsNonBITStudent) {
      if (!joinCollegeName.trim()) {
        toast.error("Please enter your college name");
        return;
      }
      identificationValue = joinCollegeName;
    } else {
      toast.error("Please select your student type");
      return;
    }

    // extracting uuid form sesssion storage
    if (!userUUID) {
      toast.error("User ID not found. Please log in again.");
      return;
    }

    // console.log("Team Code:", teamCode);
    // console.log("User UUID:", userUUID);
    // console.log("User ",user)
    // console.log("Identification Value:", identificationValue);

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
          toast.success("Team joined successfully!");
          setTeamCode(res.data.teamCode);
        } else {
          toast.error(`Unexpected response: ${res.status}`);
        }
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.message);
        } else {
          toast.error("An error occurred. Please try again later.");
        }
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0118] via-[#2D1E0F] to-[#1A0B2E] text-[#F6F1E2] py-24 px-4 relative">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] pointer-events-none"></div>
      <div className="absolute top-0 -left-4 w-96 h-96 bg-[#EFCA4E] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-[#2D1E0F] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#EFCA4E] via-[#F6F1E2] to-[#EFCA4E]">
            Team Registration
          </h1>
          <p className="text-[#F6F1E2]/70 text-lg">
            {!Loading &&
              !teamCode &&
              "Create or join a team to participate in events"}
          </p>
        </div>
        {/* Team Code Display */}
        {Loading && (
          <div className="relative flex h-[480px] w-full flex-col items-center justify-center border border-[#EFCA4E]/20 rounded-3xl bg-white/5 backdrop-blur-xl shadow-xl hover:border-[#EFCA4E]/40 transition-all duration-300 group overflow-hidden">
            <motion.img
              src="/bitotsav-logo.svg"
              alt="Bitotsav Logo"
              className="w-56 mx-auto opacity-50 group-hover:opacity-100 transition-all duration-300 relative z-10 drop-shadow-2xl transform group-hover:scale-110"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.5, scale: 1 }}
              transition={{ duration: 0.8 }}
            />
            <Ripple />
            <div className="absolute inset-0 bg-gradient-to-r from-[#EFCA4E]/10 via-transparent to-[#EFCA4E]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        )}
        {!Loading && teamCode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-[#EFCA4E]/20 text-center space-y-4"
          >
            <h4 className="text-2xl font-semibold text-[#EFCA4E]">
              Your Team Code
            </h4>
            <p className="text-3xl font-mono text-white">{teamCode}</p>
            <h4 className="text-lg text-[#F6F1E2]/70">
              Share this code with your team members to join
            </h4>
            <div>
              <h3 className="text-2xl text-[#EFCA4E] pb-3">Team Members:</h3>
              <ul className="space-y-2 text-md">
                {teamData?.members.length > 0 ? (
                  teamData.members.map((member, index) => (
                    <li key={index} className="text-[#cbcbcb]">
                      {member.name}
                    </li>
                  ))
                ) : (
                  <li className="text-[#F6F1E2]/70">No team members found.</li>
                )}
              </ul>
            </div>
          </motion.div>
        )}
        {/* Team Creation/Join Forms */}
        {!Loading && !teamCode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-[#EFCA4E]/20"
          >
            {/* Tabs */}
            <div className="flex justify-center space-x-4 mb-8">
              <button
                onClick={() => setActiveTab("create")}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === "create"
                    ? "bg-gradient-to-r from-[#EFCA4E] to-[#2D1E0F] text-white shadow-lg shadow-[#EFCA4E]/20"
                    : "text-[#F6F1E2]/70 hover:text-[#F6F1E2] bg-white/5"
                }`}
              >
                Create Team
              </button>
              <button
                onClick={() => setActiveTab("join")}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === "join"
                    ? "bg-gradient-to-r from-[#EFCA4E] to-[#2D1E0F] text-white shadow-lg shadow-[#EFCA4E]/20"
                    : "text-[#F6F1E2]/70 hover:text-[#F6F1E2] bg-white/5"
                }`}
              >
                Join Team
              </button>
            </div>

            {/* Create Team Form */}
            {activeTab === "create" && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="max-w-md mx-auto"
              >
                <form className="space-y-4" onSubmit={handleCreateTeam}>
                  <h4 className="text-2xl font-semibold text-[#EFCA4E] mb-6">
                    Create Your Team
                  </h4>
                  <div className="space-y-4">
                    <input
                      className="w-full p-3 bg-white/5 border border-[#EFCA4E]/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#EFCA4E]/50 transition-all"
                      name="teamName"
                      placeholder="Team Name"
                    />
                    <input
                      type="tel"
                      pattern="[0-9]{10}"
                      className="w-full p-3 bg-white/5 border border-[#EFCA4E]/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#EFCA4E]/50 transition-all"
                      name="leaderMobileNumber"
                      placeholder="Leader Mobile Number"
                    />

                    {/* Show student type options only if user is NOT a BIT Mesra student */}
                    {!user.isBITMesraStudent && (
                      <div className="space-y-3 p-4 bg-white/5 border border-[#EFCA4E]/20 rounded-xl">
                        <h5 className="text-[#EFCA4E] font-medium">
                          Select your student type:
                        </h5>

                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="bitStudentNonBitMail"
                            className="w-5 h-5 accent-[#EFCA4E] cursor-pointer"
                            checked={isBITStudentNonBITMail}
                            onChange={handleBITStudentChange}
                          />
                          <label
                            htmlFor="bitStudentNonBitMail"
                            className="text-white cursor-pointer"
                          >
                            I am a BIT Mesra student (logged in with non-BIT
                            mail)
                          </label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="nonBitStudent"
                            className="w-5 h-5 accent-[#EFCA4E] cursor-pointer"
                            checked={isNonBITStudent}
                            onChange={handleNonBITStudentChange}
                          />
                          <label
                            htmlFor="nonBitStudent"
                            className="text-white cursor-pointer"
                          >
                            I am not a BIT Mesra student
                          </label>
                        </div>
                      </div>
                    )}

                    {/* Conditional Input Fields based on student type */}
                    {user.isBITMesraStudent && (
                      <input
                        className="w-full p-3 bg-white/5 border border-[#EFCA4E]/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#EFCA4E]/50 transition-all"
                        name="rollNumber"
                        value={user.rollNumber}
                        readOnly
                      />
                    )}

                    {isBITStudentNonBITMail && (
                      <div>
                        <input
                          className="w-full p-3 bg-white/5 border border-[#EFCA4E]/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#EFCA4E]/50 transition-all"
                          name="rollNumber"
                          placeholder="Roll Number (e.g., btech10377.23)"
                          value={rollNumber}
                          onChange={handleRollNumberChange}
                        />
                        {rollNumber && !validateRollNumber(rollNumber) && (
                          <p className="text-red-400 text-sm mt-1 ml-1">
                            Please enter a valid roll number format (e.g.,
                            btech10377.23)
                          </p>
                        )}
                      </div>
                    )}

                    {isNonBITStudent && (
                      <input
                        className="w-full p-3 bg-white/5 border border-[#EFCA4E]/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#EFCA4E]/50 transition-all"
                        name="rollNumber" // Using the same name "rollNumber" for college name input
                        placeholder="College Name"
                        value={collegeName}
                        onChange={handleCollegeNameChange}
                      />
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-4 bg-gradient-to-r from-[#EFCA4E] to-[#2D1E0F] text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#EFCA4E]/20"
                    type="submit"
                  >
                    Create Team
                  </motion.button>
                </form>
              </motion.div>
            )}

            {/* Join Team Form - Updated with student verification options */}
            {activeTab === "join" && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="max-w-md mx-auto"
              >
                <form className="space-y-4" onSubmit={handleJoinTeam}>
                  <h4 className="text-2xl font-semibold text-[#EFCA4E] mb-6">
                    Join a Team
                  </h4>
                  <input
                    className="w-full p-3 bg-white/5 border border-[#EFCA4E]/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#EFCA4E]/50 transition-all"
                    placeholder="Enter Team ID"
                    name="teamId"
                  />
                  <input
                    type="tel"
                    pattern="[0-9]{10}"
                    className="w-full p-3 bg-white/5 border border-[#EFCA4E]/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#EFCA4E]/50 transition-all"
                    name="studentMobileNumber"
                    placeholder="Mobile Number"
                  />

                  {/* Show read-only roll number if user is a BIT Mesra student */}
                  {user.isBITMesraStudent && (
                    <input
                      className="w-full p-3 bg-white/5 border border-[#EFCA4E]/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#EFCA4E]/50 transition-all"
                      name="joinRollNumber"
                      value={user.rollNumber}
                      readOnly
                    />
                  )}

                  {/* Show student type options only if user is NOT a BIT Mesra student */}
                  {!user.isBITMesraStudent && (
                    <div className="space-y-3 p-4 bg-white/5 border border-[#EFCA4E]/20 rounded-xl">
                      <h5 className="text-[#EFCA4E] font-medium">
                        Select your student type:
                      </h5>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="joinBitStudentNonBitMail"
                          className="w-5 h-5 accent-[#EFCA4E] cursor-pointer"
                          checked={joinIsBITStudentNonBITMail}
                          onChange={handleJoinBITStudentChange}
                        />
                        <label
                          htmlFor="joinBitStudentNonBitMail"
                          className="text-white cursor-pointer"
                        >
                          I am a BIT Mesra student (logged in with non-BIT mail)
                        </label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="joinNonBitStudent"
                          className="w-5 h-5 accent-[#EFCA4E] cursor-pointer"
                          checked={joinIsNonBITStudent}
                          onChange={handleJoinNonBITStudentChange}
                        />
                        <label
                          htmlFor="joinNonBitStudent"
                          className="text-white cursor-pointer"
                        >
                          I am not a BIT Mesra student
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Conditional Input Fields based on student type for Join form */}
                  {joinIsBITStudentNonBITMail && (
                    <div>
                      <input
                        className="w-full p-3 bg-white/5 border border-[#EFCA4E]/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#EFCA4E]/50 transition-all"
                        name="joinRollNumber"
                        placeholder="Roll Number (e.g., btech10377.23)"
                        value={joinRollNumber}
                        onChange={handleJoinRollNumberChange}
                      />
                      {joinRollNumber &&
                        !validateRollNumber(joinRollNumber) && (
                          <p className="text-red-400 text-sm mt-1 ml-1">
                            Please enter a valid roll number format (e.g.,
                            btech10377.23)
                          </p>
                        )}
                    </div>
                  )}

                  {joinIsNonBITStudent && (
                    <input
                      className="w-full p-3 bg-white/5 border border-[#EFCA4E]/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#EFCA4E]/50 transition-all"
                      name="joinCollegeName"
                      placeholder="College Name"
                      value={joinCollegeName}
                      onChange={handleJoinCollegeNameChange}
                    />
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-4 bg-gradient-to-r from-[#EFCA4E] to-[#2D1E0F] text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#EFCA4E]/20"
                    type="submit"
                  >
                    Join Team
                  </motion.button>
                </form>
              </motion.div>
            )}
          </motion.div>
        )}
      </motion.div>

      <br />

      {/* rules */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center min-h-screen"
      >
        <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-[#EFCA4E]/20 text-left space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#EFCA4E] text-center">
            Team Formation & Participation Rules
          </h2>

          {/* New rule */}
          <div className="bg-red-500/10 backdrop-blur-lg border border-red-500/40 text-white p-3 rounded-lg text-sm text-center">
            NOTE: It is <strong>compulsory</strong> to bring your current
            institution ID card. If any information provided by you does not
            match the details on your ID card, you will be{" "}
            <strong>disqualified</strong>.
          </div>

          <div className="text-[#F6F1E2]/80 space-y-3">
            <h3 className="text-2xl font-semibold">General Rules</h3>
            <ul className="list-disc pl-6">
              <li>
                <strong>Same Institution Requirement</strong>: All team members
                must be from the same institution. No cross-institution teams.
              </li>
              <li>
                <strong>BIT Mesra Students</strong>:
                <ul className="list-disc pl-6">
                  <li>BIT webmail login auto-verifies roll number.</li>
                  <li>Non-webmail users must provide their college name.</li>
                  <li>Strict regex-based roll number validation.</li>
                </ul>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold">Joining a Team</h3>
            <ul className="list-disc pl-6">
              <li>
                <strong>Verification Process</strong>:
                <ul className="list-disc pl-6">
                  <li>
                    BIT webmail users have automatic roll number verification.
                  </li>
                  <li>
                    Non-BIT webmail users must provide a valid college name.
                  </li>
                  <li>Mismatched college names lead to rejection.</li>
                </ul>
              </li>
              <li>
                <strong>Non-BIT Students</strong>:
                <ul className="list-disc pl-6">
                  <li>
                    Checkbox options: ✅ BIT student without webmail (Requires
                    roll number verification) ✅ Non-BIT student
                  </li>
                  <li>
                    <strong>Restriction</strong>: Non-BIT students can only join
                    day events, not night events.
                  </li>
                </ul>
              </li>
            </ul>

            <p className="text-[#F6F1E2]/60 text-center">
              These rules ensure fair, secure, and institutionally compliant
              participation.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
