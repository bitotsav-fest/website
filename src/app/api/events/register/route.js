import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Team from "@/models/Team";
import Event from "@/models/Event";

export async function POST(req) {
  await dbConnect();
  const { teamCode, eventId, eventName, eventClub, eventVenue, eventTime } = await req.json();

  if (!teamCode || !eventId || !eventName || !eventClub || !eventVenue || !eventTime) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  try {
    const team = await Team.findOne({ teamCode });

    if (!team) {
      return NextResponse.json({ message: "Team not found, join/create a team to register" }, { status: 404 });
    }

    if (team.events.includes(eventId)) {
      return NextResponse.json({ message: "Already registered for this event" }, { status: 400 });
    }

    // Add event to team
    team.events.push(eventId);
    await team.save();

    // Extract team data to match teamSubSchema
    const teamData = {
      teamName: team.teamName,
      leader: team.leader,
      leaderName: team.leaderName,
      leaderMobileNumber: team.leaderMobileNumber,
      rollNumber: team.rollNumber // assuming one of these exists in your Team model
    };

    // Find or create event
    let event = await Event.findOne({ eventId });

    if (!event) {
      event = new Event({ 
        eventId, 
        eventName, 
        eventClub, 
        eventVenue, 
        eventTime,
        teamsRegistered: [teamData]
      });
    } else {
      event.teamsRegistered.push(teamData);
    }

    await event.save();

    return NextResponse.json({ message: "Event registered successfully", team }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error registering event", error: error.message }, { status: 500 });
  }
}