import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// This middleware will handle /admin/* routes
export default withAuth(
  function middleware(req) {
    // Allow access to login page
    if (req.nextUrl.pathname === "/admin/login") {
      return NextResponse.next();
    }

    // Check for admin role on other admin pages
    if (req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token?.role !== "admin") {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // Allow access to login page without token
        if (req.nextUrl.pathname === "/admin/login") {
          return true;
        }
        // Require token for all other admin routes
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"]
}; 