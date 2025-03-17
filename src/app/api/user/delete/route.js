import { NextResponse } from "next/server";
import { auth } from "@/auth"
import { prisma } from "@/prisma";

export async function DELETE(request) {
  try {
    const session = await auth();
    
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userEmail = session.user.email;

    // Delete user and related data
    await prisma.user.delete({
      where: { email: userEmail },
    });

    return NextResponse.json({ message: "Account deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting account:", error);
    return NextResponse.json({ message: "Error deleting account" }, { status: 500 });
  }
}