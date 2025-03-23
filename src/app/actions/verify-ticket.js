'use server';

import { prisma } from '@/lib/prisma';

export async function verifyTicket(uuid, passcode, day = 0) {
  const SECURITY_PASSCODE = '121212';
  const DAY_FIELD_MAP = {
    0: 'usedOnDay0',
    1: 'usedOnDay1',
    2: 'usedOnDay2',
    3: 'usedOnDay3'
  };

  if (passcode !== SECURITY_PASSCODE) {
    return { error: 'Invalid passcode', status: 401 };
  }

  const dayField = DAY_FIELD_MAP[day];
  if (!dayField) {
    return { error: 'Invalid day specified', status: 400 };
  }

  try {
    const selectFields = {
      name: true,
      email: true,
      usedOnDay0: true,
      usedOnDay1: true,
      usedOnDay2: true,
      usedOnDay3: true,
      rollNumber: true,
      updatedAt : true,
    };

    const user = await prisma.user.findUnique({
      where: { uuid },
      select: selectFields,
    });

    if (!user) {
      return { error: 'Invalid ticket', status: 404 };
    }

    if (user[dayField]) {
      return { error: 'Ticket already used for this day', user,  status: 400 };
    }

    const updateData = {};
    updateData[dayField] = true;

    const updatedUser = await prisma.user.update({
      where: { uuid },
      data: updateData,
      select: selectFields,
    });


    return { user: updatedUser, status: 200 };
  } catch (error) {
    console.error('Error verifying ticket:', error);
    return { error: 'Server error', status: 500 };
  }
}