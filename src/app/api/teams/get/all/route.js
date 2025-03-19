import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Team from "@/models/Team";

export async function GET() {
  await dbConnect();
  
  try {
    const teams = await Team.find({}, "teamName leaderName points")
      .sort({ points: -1 }) // Sort in descending order
      .lean();
    
    // Add position (rank) to each team
    let currentRank = 1;
    let prevPoints = null;
    
    const rankedTeams = teams.map((team, index) => {
      // If this team has same points as previous team, assign same rank
      if (index > 0 && team.points === prevPoints) {
        // Keep the same rank as previous team
      } else {
        // Update the current rank to the position in the array (plus 1)
        currentRank = index + 1;
      }
      
      // Store points for next iteration
      prevPoints = team.points;
      
      // Return team with position
      return {
        ...team,
        position: currentRank
      };
    });
    
    return NextResponse.json({ teams: rankedTeams }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching teams", error: error.message },
      { status: 500 }
    );
  }
}