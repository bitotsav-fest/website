import { NextResponse } from 'next/server';
import { auth } from '@/auth';

import Log from '@/models/Log';
import dbConnect from '@/lib/dbConnect';

export async function POST(request) {
  try {
    await dbConnect();
    
    const session = await auth();

    
    const data = await request.json();
    
    const logData = {
      ...data,
      ...(session?.user && {
        userId: session.user.id,
        userName: session.user.name,
        userEmail: session.user.email,
        userRole: session.user.role
      })
    };
    
    const log = await Log.create(logData);
    
    return NextResponse.json({
      success: true,
      logId: log._id
    }, { status: 200 });
    
  } catch (error) {
    console.error("Logging error:", error);
    
    return NextResponse.json({
      success: false,
      message: "Failed to create log",
      error: error.message
    }, { status: 500 });
  }
}