"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getUserUUID } from "@/app/actions/auth";
import axios from "axios";

export default function Register() {
  const [activeTab, setActiveTab] = useState("create");
  const [userUUID, setUserUUID] = useState("");
  const [teamCode, setTeamCode] = useState("");
  const { data: session } = useSession();

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

  const handleCreateTeam = (e) => {
    e.preventDefault();

    const teamName = e.target.elements.teamName.value; // Access input by name
    const leaderMobileNumber = e.target.elements.leaderMobileNumber.value;
    const rollNumber = e.target.elements.rollNumber.value;

    if (!teamName.trim() || !leaderMobileNumber || !rollNumber) {
      alert("Please fill all the fields.");
      return;
    }

    // extracting uuid form sesssion storage
    const leaderUUID = userUUID; // uuid;
    if (!leaderUUID) {
      alert("User ID not found. Please log in again.");
      return;
    }

    axios
      .post("/api/teams/create", {
        teamName,
        leaderUUID,
        leaderMobileNumber,
        rollNumber,
      })
      .then((res) => {
        if (res.status === 201) {
          alert("Team created successfully");
          setTeamCode(res.data.teamCode);
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

  const handleJoinTeam = (e) => {
    e.preventDefault();
    const teamCode = e.target.elements.teamId.value.trim();

    if (!teamCode) {
      alert("Please enter a valid Team ID.");
      return;
    }

    // extracting uuid form sesssion storage
    if (!userUUID) {
      alert("User ID not found. Please log in again.");
      return;
    }

    axios
      .post("/api/teams/join", { teamCode, userUUID })
      .then((res) => {
        if (res.status === 200) {
          alert("Team joined successfully!");
          setTeamCode(res.data.teamCode);
        } else {
          alert(`Unexpected response: ${res.status}`);
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

  return (
    <div className="flex flex-col items-center mt-16 p-4 space-y-4">
      {teamCode && (
        <div className="bg-white/10 p-4 rounded-md">
          <h4 className="text-lg font-semibold">Your Team Code</h4>
          <p className="text-white">{teamCode}</p>
        </div>
      )}

      {!teamCode && (
        <>
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab("create")}
              className={`px-4 py-2 rounded-md ${
                activeTab === "create"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-600"
              }`}
            >
              Create Team
            </button>
            <button
              onClick={() => setActiveTab("join")}
              className={`px-4 py-2 rounded-md ${
                activeTab === "join" ? "bg-blue-500 text-white" : "bg-gray-600"
              }`}
            >
              Join Team
            </button>
          </div>

          {activeTab === "create" && (
            <div className="space-y-4 max-w-sm">
              <form className="space-y-2" onSubmit={handleCreateTeam}>
                <h4 className="text-lg font-semibold">Create Team</h4>
                <input
                  className="w-full p-2 border border-gray-300 rounded-md text-black"
                  name="teamName"
                  placeholder="Team Name"
                />
                <input
                  className="w-full p-2 border border-gray-300 rounded-md text-black"
                  name="leaderMobileNumber"
                  placeholder="Leader Mobile Number"
                />
                <input
                  className="w-full p-2 border border-gray-300 rounded-md text-black"
                  name="rollNumber"
                  placeholder="Roll Number"
                />
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  type="submit"
                >
                  Create
                </button>
              </form>
            </div>
          )}

          {activeTab === "join" && (
            <div className="space-y-4 max-w-sm">
              <form className="space-y-2" onSubmit={handleJoinTeam}>
                <h4 className="text-lg font-semibold">Enter Team ID</h4>
                <input
                  className="w-full p-2 border border-gray-300 rounded-md text-black"
                  placeholder="Team ID"
                  name="teamId"
                />
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  type="submit"
                >
                  Join
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
}
