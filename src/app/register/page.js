"use client";
import React from "react";

export default function Register() {
    const [activeTab, setActiveTab] = React.useState("individual");

    return (
        <div className="flex flex-col items-center mt-16 p-4 space-y-4">
            <div className="flex space-x-2">
                <button
                    onClick={() => setActiveTab("individual")}
                    className={`px-4 py-2 rounded-md ${
                        activeTab === "individual" ? "bg-blue-500 text-white" : "bg-gray-600"
                    }`}
                >
                    Individual
                </button>
                <button
                    onClick={() => setActiveTab("team")}
                    className={`px-4 py-2 rounded-md ${
                        activeTab === "team" ? "bg-blue-500 text-white" : "bg-gray-600"
                    }`}
                >
                    Team
                </button>
                <button
                    onClick={() => setActiveTab("events")}
                    className={`px-4 py-2 rounded-md ${
                        activeTab === "events" ? "bg-blue-500 text-white" : "bg-gray-600"
                    }`}
                >
                    Events
                </button>
            </div>

            {activeTab === "individual" && (
                <form className="space-y-2 max-w-md">
                    <input className="w-full p-2 border border-gray-300 rounded-md" placeholder="Name" />
                    <input className="w-full p-2 border border-gray-300 rounded-md" placeholder="Email" />
                    <input className="w-full p-2 border border-gray-300 rounded-md" placeholder="Phone Number" />
                    <input className="w-full p-2 border border-gray-300 rounded-md" placeholder="Roll Number" />
                    <input
                        className="w-full p-2 border border-gray-300 rounded-md"
                        type="password"
                        placeholder="Password"
                    />
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md" type="submit">
                        Submit
                    </button>
                </form>
            )}

            {activeTab === "team" && (
                <div className="space-y-4 max-w-sm">
                    <form className="space-y-2">
                        <h4 className="text-lg font-semibold">Create Team</h4>
                        <input className="w-full p-2 border border-gray-300 rounded-md" placeholder="Team Name" />
                        <input className="w-full p-2 border border-gray-300 rounded-md" placeholder="Team Leader Name" />
                        <input className="w-full p-2 border border-gray-300 rounded-md" placeholder="Email" />
                        <input className="w-full p-2 border border-gray-300 rounded-md" placeholder="Phone Number" />
                        <input className="w-full p-2 border border-gray-300 rounded-md" placeholder="Roll Number" />
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-md" type="submit">
                            Create
                        </button>
                    </form>
                    <form className="space-y-2">
                        <h4 className="text-lg font-semibold">Join Team</h4>
                        <input className="w-full p-2 border border-gray-300 rounded-md" placeholder="Team ID" />
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-md" type="submit">
                            Join
                        </button>
                    </form>
                </div>
            )}

            {activeTab === "events" && (
                <div className="space-y-4 max-w-sm">
                    <form className="space-y-2">
                        <h4 className="text-lg font-semibold">Register for Event</h4>
                        <input className="w-full p-2 border border-gray-300 rounded-md" placeholder="Event Name" />
                        <input className="w-full p-2 border border-gray-300 rounded-md" placeholder="Event Leader Name" />
                        <input className="w-full p-2 border border-gray-300 rounded-md" placeholder="Email" />
                        <input className="w-full p-2 border border-gray-300 rounded-md" placeholder="Phone Number" />
                        <input className="w-full p-2 border border-gray-300 rounded-md" placeholder="Roll Number" />
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-md" type="submit">
                            Register
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}