import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Team from "@/models/Team";

export async function GET(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const memberUUID = searchParams.get("memberUUID");

  if (!memberUUID) {
    return NextResponse.json({ message: "memberUUID is required" }, { status: 400 });
  }

  try {
    const team = await Team.findOne({ "members.uuid": memberUUID });

    if (!team) {
      return NextResponse.json({ message: "Team not found" }, { status: 404 });
    }

    return NextResponse.json({ team }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching team", error: error.message }, { status: 500 });
  }
}
