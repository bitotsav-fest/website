// File: app/api/teams/get/paginated/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Team from "@/models/Team";

export async function GET(request) {
  try {
    await dbConnect();
    
    // Get pagination parameters from the URL
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    
    // Count total documents to calculate total pages
    const totalTeams = await Team.countDocuments();
    const totalPages = Math.ceil(totalTeams / limit);
    
    // Fetch teams with pagination, sorted by points in descending order
    const teams = await Team.find({}, "teamName leaderName points")
      .sort({ points: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    
    return NextResponse.json({
      teams,
      currentPage: page,
      totalPages,
      teamsPerPage: limit,
      totalTeams
    }, { status: 200 });
    
  } catch (error) {
    console.error("Error fetching paginated teams:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}