import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Event from "@/models/Event";
import Team from "@/models/Team";

export async function POST(req) {
  await dbConnect();

  try {
    const { eventName } = await req.json(); // Extracting eventName from request body
    console.log("Received Event Name:", eventName);

    if (!eventName) {
      return NextResponse.json({ message: "Event name is required" }, { status: 400 });
    }

    // Find the event by eventName
    const event = await Event.findOne({eventName});

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({
      eventName: event.eventName,
      eventClub: event.eventClub,
      eventVenue: event.eventVenue,
      eventTime: event.eventTime,
      teamsRegistered: event.teamsRegistered, // Already contains team details
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching registered teams:", error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}
