import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Team from "@/models/Team";

export async function GET() {
  await dbConnect();

  try {
    // const teams = await Team.find({}, "teamName leaderName points").lean();
    const teams = await Team.find({}, "teamName leaderName points")
      .sort({ points: -1 }) // Sort in descending order
      .lean();


    // teamCode nhi dikhana h nhi to join kr skta h koi
    // response format :teams": [
    //   {
    //       "_id": "67d7e9d2105414f16e57f629",
    //       "teamName": "TechTeam",
    //       "leaderName": "Mrityunjay Raj",
    //       "points": 0
    //   },
    //   {
    //       "_id": "67d811e507e67569192fafe2",
    //       "teamName": "Lapata_Boyz",
    //       "leaderName": "Parthib Saha",
    //       "points": 0
    //   },
    return NextResponse.json({ teams }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching teams", error: error.message }, { status: 500 });
  }
}
