"use client";
import React from "react";

export default function Register() {
    const [activeTab, setActiveTab] = React.useState("create");

    return (
        <div className="flex flex-col items-center mt-16 p-4 space-y-4">
            <div className="flex space-x-2">
                <button
                    onClick={() => setActiveTab("create")}
                    className={`px-4 py-2 rounded-md ${
                        activeTab === "create" ? "bg-blue-500 text-white" : "bg-gray-600"
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
                    <form className="space-y-2">
                        <h4 className="text-lg font-semibold">Create Team</h4>
                        <input className="w-full p-2 border border-gray-300 rounded-md" placeholder="Team Name" />
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-md" type="submit">
                            Create
                        </button>
                    </form>
                </div>
            )}

            {activeTab === "join" && (
                <div className="space-y-4 max-w-sm">
                    <form className="space-y-2">
                        <h4 className="text-lg font-semibold">Enter Team ID</h4>
                        <input className="w-full p-2 border border-gray-300 rounded-md text-black" placeholder="Team ID" />
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-md" type="submit">
                            Join
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}