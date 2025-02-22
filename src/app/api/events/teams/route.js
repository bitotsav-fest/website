import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Team from "@/models/Team";

export async function GET(req) {
  await dbConnect();
  const { eventId } = new URL(req.url);
  
  try {
    const event = await Event.findOne({ eventId });
  
  if (!event) {
    return NextResponse.json({ message: "Event not found" }, { status: 404 });
  }

  return NextResponse.json({ event }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching team", error: error.message }, { status: 500 });
  }
}
