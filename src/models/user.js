import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  uuid: { type: String, required: true, unique: true }, // Prisma User UUID unique
  teamJoined: { type: Boolean, default: false },
  teamCode: { type: String },
  teamName: { type: String },
  email: { type: String },
  name: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
