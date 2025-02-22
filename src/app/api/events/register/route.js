import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Team from "@/models/Team";
import Event from "@/models/Event";

export async function POST(req) {
  await dbConnect();
  const { teamCode, eventId, eventName } = await req.json();

  if (!teamCode || !eventId || !eventName) {
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

    team.events.push(eventId);
    await team.save();

    let event = await Event.findOne({ eventId });

    if (!event) {
      event = new Event({ eventId, eventName, teamsRegistered: [team._id] });
    } else {
      event.teamsRegistered.push(team._id);
    }

    await event.save();

    return NextResponse.json({ message: "Event registered successfully", team, event }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error registering event", error: error.message }, { status: 500 });
  }
}
