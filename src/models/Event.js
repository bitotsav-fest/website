import mongoose from "mongoose";

const teamSubSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  leaderName: { type: String, required: true },
  leaderMobileNumber: { type: String, required: true },
  rollNumber: { type: String, required: true },
});
const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  eventClub: { type: String, required: true },
  eventVenue: { type: String, required: true },
  eventTime: { type: String, required: true },
  eventId: { type: String, unique: true, required: true },
  teamsRegistered: [teamSubSchema],
}, { timestamps: true });

export default mongoose.models.Event || mongoose.model("Event", eventSchema);
