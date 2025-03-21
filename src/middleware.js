import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isAuthenticated = !!req.auth;
  const { pathname } = req.nextUrl;

  // Allow all static files and API requests
  if (pathname.startsWith("/_next/") || pathname.startsWith("/api/") || pathname.startsWith("/static/")) {
    return NextResponse.next();
  }

  // Redirect root ("/") to "/login"
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Restrict routes
  if (!["/login", "/dashboard", "/scanner", "/logout", "/dashboard/non-bit"].includes(pathname)) {
    return new NextResponse("Only /login, /dashboard, /scanner, /logout, and /dashboard/non-bit will work", { status: 404 });
  }

  // Redirect users based on authentication
  if (!isAuthenticated && ["/dashboard", "/dashboard/non-bit"].includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isAuthenticated && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
});

// Updated matcher to exclude static assets and API routes
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"], // Ignore static files and API routes
};
