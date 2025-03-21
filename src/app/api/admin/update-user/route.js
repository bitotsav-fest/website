import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';

export async function POST(request) {
  try {
    const { userId, updates } = await request.json();

    if (!userId || !updates) {
      return NextResponse.json(
        { message: 'User ID and updates are required' },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updates,
      select: {
        id: true,
        name: true,
        email: true,
        rollNumber: true,
        verified: true
      }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json(
      { message: 'Failed to update user' },
      { status: 500 }
    );
  }
}