import mongoose from "mongoose";
const { v4: uuidv4 } = require("uuid"); // For generating unique team codes

const teamSchema = new mongoose.Schema({
  teamCode: {
    type: String,
    unique: true,
    default: () => uuidv4().slice(0, 6).toUpperCase(),
  },
  teamName: { type: String, required: true },
  leader: { type: String, required: true }, // Prisma User UUID
  members: [{ type: String }], // List of Prisma User UUIDs
  events: [{ type: String }], // Array to store event names
  leaderMobileNumber: { type: String, required: true },
  rollNumber: { type: String, required: true }, // apply validation for roll number
});

const Team = mongoose.models.Team || mongoose.model("Team", teamSchema);

export default Team;
