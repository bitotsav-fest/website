import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Event from "@/models/Event";

export async function POST(req) {
  await dbConnect();

  try {
    const { eventName } = await req.json(); // Extracting eventName from request body
    
    if (!eventName) {
      return NextResponse.json({ message: "Event name is required." }, { status: 400 });
    }

    // console.log(eventName);
    
    // Find the event by eventName
    const event = await Event.findOne({eventName});
    // console.log(event);

    if (!event) {
      return NextResponse.json({ message: "No participants found for this event." }, { status: 404 });
    }

    return NextResponse.json(event, { status: 200 });


  } catch (error) {
    console.error("Error fetching registered teams:", error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}