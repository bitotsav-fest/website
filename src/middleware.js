import { auth } from "@/auth"
import { NextResponse } from 'next/server'

// List of routes that are NOT allowed during scan period
const blockedRoutes = [
  '/team',
  '/leaderboard'
];

// List of specifically permitted routes during scan period

export default auth((req) => {
  const isAuthenticated = !!req.auth
  const { pathname } = req.nextUrl
  
  // Authentication redirects
  if (!isAuthenticated && (pathname === "/dashboard" || pathname === "/dashboard/non-bit")) {
    return NextResponse.redirect(new URL("/login", req.url))
  }
  
  if (isAuthenticated && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }
  
  // Special handling for server actions
  if (req.method === 'POST') {
    return NextResponse.next()
  }
  
  // Check if current path is in blocked routes
  if (blockedRoutes.includes(pathname)) {
    // Return a properly formatted HTML response
    return new NextResponse(
      `<html>
        <head>
          <title>SCAN PERIOD ACTIVE</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            h1 { color: #d32f2f; }
            a { color: #1976d2; text-decoration: none; }
            a:hover { text-decoration: underline; }
          </style>
        </head>
        <body>
          <h1>SCAN PERIOD ACTIVE</h1>
          <p>Please visit <a href="https://www.bitotsav.com/login">www.bitotsav.com/login</a> to access the system.</p>
        </body>
      </html>`,
      {
        status: 503,
        headers: {
          'Content-Type': 'text/html',
        }
      }
    )
  }
  
  // Allow Next.js resources
  const isNextJsResource = 
    pathname.startsWith('/_next/') || 
    pathname.startsWith('/api/') || 
    pathname === '/favicon.ico' ||
    pathname.startsWith('/public/');
    
  if (isNextJsResource) {
    return NextResponse.next();
  }
  
  return NextResponse.next();
})

// Protect all routes except system routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}