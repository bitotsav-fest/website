import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Get all users
    const users = await prisma.user.findMany();

    // Calculate statistics
    const totalUsers = users.length;
    const bitianCount = users.filter(user => user.isBITMesraStudent).length;
    const outsiderCount = users.filter(user => !user.isBITMesraStudent).length;
    const paidUsersCount = users.filter(user => user.isPaid).length;

    // Calculate day-wise usage
    const dayWiseUsage = {
      day1: users.filter(user => user.usedOnDay1).length,
      day2: users.filter(user => user.usedOnDay2).length,
      day3: users.filter(user => user.usedOnDay3).length,
    };

    return Response.json({
      totalUsers,
      bitianCount,
      outsiderCount,
      paidUsersCount,
      dayWiseUsage,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return Response.json({ error: 'Failed to fetch statistics' }, { status: 500 });
  }
}