import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json({ message: 'Search query is required' }, { status: 400 });
    }

    const users = await prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: query } },
          { email: { contains: query } }
        ]
      },
      select: {
        id: true,
        name: true,
        email: true,
        rollNumber: true,
        verified: true
      }
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { message: 'Failed to search users' },
      { status: 500 }
    );
  }
}