import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Team from "@/models/Team";
import { v4 as uuidv4 } from "uuid";
import User from "@/models/user";

export async function POST(req) {
  await dbConnect();
  const { teamName, leaderUUID, leaderMobileNumber, rollNumber, user } =
    await req.json();

  if (!teamName || !leaderUUID || !leaderMobileNumber || !rollNumber || !user) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  // get user UUID
  //checking if user exists
  const userExisting = await User.findOne({ uuid: leaderUUID });
  if (userExisting) {
    return NextResponse.json(
      { message: "User is already register" },
      { status: 404 }
    );
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
  const membersData = {
    name:user.name,
    rollNumber:rollNumber,
    uuid: user.uuid,
    mobileNumber: leaderMobileNumber
  };
  try {
    const newTeam = new Team({
      teamName,
      teamCode,
      leaderName: user.name,
      leader: leaderUUID,
      leaderMobileNumber,
      rollNumber,
      members: [membersData],
      events: [],
    });

    await newTeam.save();



    const newUser = new User({
      uuid: leaderUUID,
      teamJoined: true,
      teamCode,
      teamName,
      email: user.email,
      name: user.name,
      rollNumber: rollNumber,
      mobileNumber: leaderMobileNumber
    });
    await newUser.save();


    return NextResponse.json(
      { message: "Team created", team: newTeam, teamCode },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating team", error: error.message },
      { status: 500 }
    );
  }
}
