import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  eventId: { type: String, unique: true, required: true },
  teamsRegistered: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
}, { timestamps: true });

export default mongoose.models.Event || mongoose.model("Event", eventSchema);
