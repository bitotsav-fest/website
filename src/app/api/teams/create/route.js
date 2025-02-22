import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Team from "@/models/Team";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  await dbConnect();
  const { teamName, leaderUUID } = await req.json();

  if (!teamName || !leaderUUID) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  //TODO: checkif leaderUUID is valid user

  let teamCode;
  let isCodeUnique = false;

  // Generate a unique team code
  while (!isCodeUnique) {
    teamCode = uuidv4().slice(0, 6).toUpperCase(); // Generate unique code
    const existingTeam = await Team.findOne({ teamCode }); // Check if the code already exists
    if (!existingTeam) {
      isCodeUnique = true; // Code is unique, exit loop
    }
  }
  try {
    const newTeam = new Team({
      teamName,
      teamCode,
      leader: leaderUUID,
      members: [leaderUUID],
      events: [],
    });
    await newTeam.save();

    return NextResponse.json({ message: "Team created", team: newTeam }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating team", error: error.message }, { status: 500 });
  }
}
