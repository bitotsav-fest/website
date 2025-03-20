import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, email, phone, rollNumber, password, message, problem } = data;

    // // Basic validation
    // if (!name || !phone || !password || !problem) {
    //   return NextResponse.json(
    //     { error: 'Required fields are missing' },
    //     { status: 400 }
    //   );
    // }

    // Create verification request
    const verificationRequest = await prisma.UserData.create({
      data: {
        name,
        email: email || null,
        phone,
        rollNumber: rollNumber || null,
        password,
        message: message || null,
        problem,
        status: 'PENDING'
      }
    });

    return NextResponse.json(
      { message: 'Verification request submitted successfully', id: verificationRequest.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Verification request error:', error);
    return NextResponse.json(
      { error: 'Failed to submit verification request' },
      { status: 500 }
    );
  }
}