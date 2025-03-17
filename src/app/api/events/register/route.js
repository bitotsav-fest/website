import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Team from "@/models/Team";
import Event from "@/models/Event";
import User from "@/models/user";

export async function POST(req) {
  await dbConnect();
  const { teamCode, eventId, eventName, eventClub, eventVenue, eventTime, user} = await req.json();

  if (!teamCode || !eventId || !eventName || !eventClub || !eventVenue || !eventTime || !user) {
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
    // user se find our kro and set MOngoDb user as with that uuid from sql
    
    const mongoDbUser = await User.findOne({ uuid: user.uuid });

    if (!mongoDbUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Add event to team
    const eventRegistrarData = {
      name: user.name,
      rollNumber: mongoDbUser.rollNumber,
      uuid: user.uuid,
      mobileNumber: mongoDbUser.mobileNumber,
      eventName: eventName,
      eventId: eventId,
    };
    team.eventRegistrarList.push(eventRegistrarData);
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
        teamsRegistered: [teamData],
        eventRegistrarList: [eventRegistrarData]
      });
    } else {

      event.eventRegistrarList.push(eventRegistrarData);
      event.teamsRegistered.push(teamData);
    }

    await event.save();

    return NextResponse.json({ message: "Event registered successfully", team }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error registering event", error: error.message }, { status: 500 });
  }
}