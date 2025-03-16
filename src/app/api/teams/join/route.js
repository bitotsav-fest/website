import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Team from "@/models/Team";
import User from "@/models/user";

export async function POST(req) {
  await dbConnect();
  const { userUUID, teamCode, user } = await req.json();

  if (!userUUID || !teamCode || !user) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  const userExisting = await User.findOne({ uuid: userUUID });
  if (userExisting) {
    return NextResponse.json(
      { message: "User is already register" },
      { status: 400 }
    );
  }

  try {
    //TODO: Add validation for userUUID and

    const team = await Team.findOne({ teamCode });

    if (!team) {
      return NextResponse.json({ message: "Team not found" }, { status: 404 });
    }
    // Check if user is already in the team from userUUID
    
    
    if (team.members.some(member => member.uuid === userUUID)) {
      return NextResponse.json(
        { message: "User already in the team" },
        { status: 400 }
      );
    }
    const membersData = {
      name:user.name,
      rollNumber:user.rollNumber,
      uuid: user.uuid
    };

    team.members.push(membersData);
    await team.save();

    const newUser = new User({
      uuid: userUUID,
      teamJoined: true,
      teamCode,
      teamName: team.teamName,
      email: user.email,
      name: user.name,
      rollNumber: user.rollNumber
    });

    await newUser.save();

    return NextResponse.json(
      { message: "Joined team successfully", team, teamCode },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error joining team", error: error.message },
      { status: 500 }
    );
  }
}
