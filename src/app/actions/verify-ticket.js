'use server';

import { prisma } from '@/lib/prisma';

export async function verifyTicket(uuid, passcode) {
  const SECURITY_PASSCODE = '192020';

  if (passcode !== SECURITY_PASSCODE) {
    return { error: 'Invalid passcode', status: 401 };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { uuid },
      select: {
        name: true,
        email: true,
        usedOnDay2: true,
      },
    });

    if (!user) {
      return { error: 'Invalid ticket', status: 404 };
    }

    if (user.usedOnDay2) {
      return { error: 'Ticket already used', status: 400 };
    }

    const updatedUser = await prisma.user.update({
      where: { uuid },
      data: { usedOnDay2: true },
      select: {
        name: true,
        email: true,
        usedOnDay2: true,
      },
    });

    return { user: updatedUser, status: 200 };
  } catch (error) {
    console.error('Error verifying ticket:', error);
    return { error: 'Server error', status: 500 };
  }
}