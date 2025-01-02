import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
 
export async function middleware(req: NextRequest) {
  // 3. Decrypt the session from the cookie
  const encryptedToken = req.cookies.get("next-auth.session-token")?.value || ""
  // Your existing logic for auth check can be added here

  // If there's no token, redirect to login page
  if (!encryptedToken) {
    return NextResponse.redirect(new URL("/auth/login", req.url))
  }
}

export const config = {
  // Define the matcher for the paths you want to protect
  matcher: ["/a", "/a/upload", "/a/list"],
}