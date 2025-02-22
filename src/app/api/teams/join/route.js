import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Team from "@/models/Team";

export async function POST(req) {
  await dbConnect();
  const { userUUID, teamCode } = await req.json();

  if (!userUUID || !teamCode) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  try {
  //TODO: Add validation for userUUID and 

    const team = await Team.findOne({ teamCode });

    if (!team) {
      return NextResponse.json({ message: "Team not found" }, { status: 404 });
    }
    // Check if user is already in the team from userUUID
    
    if (team.members.includes(userUUID)) {
      return NextResponse.json({ message: "User already in the team" }, { status: 400 });
    }

    team.members.push(userUUID);
    await team.save();

    return NextResponse.json({ message: "Joined team successfully", team }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error joining team", error: error.message }, { status: 500 });
  }
}
