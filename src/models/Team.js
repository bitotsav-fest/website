import mongoose from "mongoose";
const { v4: uuidv4 } = require("uuid"); // For generating unique team codes

const MemberSubSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNumber: { type: String, required: true },
  uuid: { type: String, required: true },
  mobileNumber: { type: String, required: true },
});
const teamSchema = new mongoose.Schema({
  teamCode: {
    type: String,
    unique: true,
    default: () => uuidv4().slice(0, 6).toUpperCase(),
  },
  teamName: { type: String, required: true },
  leaderName: { type: String, required: true }, // Prisma User UUID
  leader: { type: String, required: true }, // Prisma User UUID
  members: {
    type: [MemberSubSchema], // List of Prisma User UUIDs
    validate: {
      validator: function (members) {
        return members.length <= 8; // Maximum of 8 members
      },
      message: "A team can have a maximum of 8 members.",
    },
  },
  events: [{ type: String }], // Array to store event names
  leaderMobileNumber: { type: String, required: true },
  rollNumber: { type: String, required: true }, // apply validation for roll number
});

const Team = mongoose.models.Team || mongoose.model("Team", teamSchema);

export default Team;
