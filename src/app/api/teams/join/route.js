import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Team from "@/models/Team";
import User from "@/models/user";

export async function POST(req) {
  await dbConnect();
  const { userUUID, teamCode, user, rollNumber, studentMobileNumber } = await req.json();
  
  const rollNumberRegex = /^[a-z]+\d+\.\d{2}$/i;
  if (!userUUID || !teamCode || !user || !rollNumber || !studentMobileNumber) {
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
    const team = await Team.findOne({ teamCode });

    if (!team) {
      return NextResponse.json({ message: "Team not found" }, { status: 404 });
    }

    if (team.members.some(member => member.uuid === userUUID)) {
      return NextResponse.json(
        { message: "User already in the team" },
        { status: 400 }
      );
    }

    // as of now non-BITIAN can't enter bitian's team

    // test can BITIAn wnter non BITIAn team -- ho rha h isko bachana h 
    if(rollNumberRegex.test(rollNumber)){
      //console.log("YE BIT WALA H")
      // check agar team.rollNumber BIT wala nhi h to sendd reaponse
      if(!rollNumberRegex.test(team.rollNumber)){
          //console.log("BITian trying to enter non BITIAn team")
            return NextResponse.json(
            { message: "We can't have teams with participants from different colleges." },
            { status: 400 }
            );
      }
    }


    // agar roll regex wala h to

    if (!rollNumberRegex.test(rollNumber)) {
      // console.log("College name validation.");

      if (rollNumber.trim() !== team.rollNumber.trim()) {
        // console.log("College name mismatch.");
        // console.log(rollNumber);
        // console.log(team.rollNumber);
        return NextResponse.json(
          { message: "Enter exact College Name entered by the Leader." },
          { status: 400 }
        );
      }
    }


    const membersData = {
      name: user.name,
      rollNumber: rollNumber.trim(),
      uuid: user.uuid,
      mobileNumber: studentMobileNumber
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
      rollNumber: rollNumber.trim(),
      mobileNumber: studentMobileNumber
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
