import mongoose from "mongoose";

const teamSubSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  leaderName: { type: String, required: true },
  leaderMobileNumber: { type: String, required: true },
  rollNumber: { type: String, required: true },
});
const eventRegistrar = new mongoose.Schema({
  name: { type: String, required: true },
  rollNumber: { type: String, required: true },
  uuid: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  eventName: { type: String, required: true },
  eventId: { type: String, required: true },
}, { timestamps: true });
const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  eventClub: { type: String, required: true },
  eventVenue: { type: String, required: true },
  eventTime: { type: String, required: true },
  eventId: { type: String, unique: true, required: true },
  teamsRegistered: [teamSubSchema],
  eventRegistrarList: [eventRegistrar],
  points: { type: Number, default: 0 }, // Auto-set to 0 if not provided
  pointWonEvents: { type: [String], default: [] } // Array of strings, default empty
}, { timestamps: true });

export default mongoose.models.Event || mongoose.model("Event", eventSchema);
