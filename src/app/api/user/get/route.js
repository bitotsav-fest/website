import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";

export async function GET(req) {
  await dbConnect();

  const { searchParams } = new URL(req.url); // Parse the URL query string
  const uuid = searchParams.get("uuid"); // Get the UUID from the query string

  if (!uuid) {
    return NextResponse.json(
      { message: "User UUID is required" },
      { status: 400 }
    );
  }

  try {
    const user = await User.findOne({ uuid });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ teamCode: user.teamCode }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching user", error: error.message },
      { status: 500 }
    );
  }
}
