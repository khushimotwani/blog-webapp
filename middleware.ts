import { withAuth } from "next-auth/middleware";

// Simple middleware that protects all /admin routes except login
export default withAuth({
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    authorized: ({ req, token }) => {
      // Allow access to login page
      if (req.nextUrl.pathname === "/admin/login") {
        return true;
      }
      // Require admin role for all other admin routes
      return token?.role === "admin";
    },
  },
});

export const config = {
  matcher: ["/admin/:path*"]
}; 