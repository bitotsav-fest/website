"use client";
import TeamLeaderboard from './components/TeamLeaderboard';

export default function LeaderboardPage() {
  return (
    <div className="container mx-auto px-2 py-2">
      <h1 className="text-3xl font-bold text-center mb-8">Team Competition Leaderboard</h1>
      <TeamLeaderboard />
    </div>
  );
}