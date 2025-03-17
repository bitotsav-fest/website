import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Event from "@/models/Event";
import { getToken } from "next-auth/jwt"; // For authentication

export async function POST(req) {
  await dbConnect();

  try {
    // Authenticate request using JWT
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ message: "Unauthorized access" }, { status: 401 });
    }

    const { eventName } = await req.json();

    // Input validation
    if (!eventName || typeof eventName !== "string") {
      return NextResponse.json({ message: "Invalid event name." }, { status: 400 });
    }

    console.log(`Fetching event: ${eventName}`);

    // Secure database query (Prevent NoSQL Injection)
    const event = await Event.findOne({ eventName: eventName.trim() });

    if (!event) {
      return NextResponse.json({ message: "No participants found for this event." }, { status: 404 });
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
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
