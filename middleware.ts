import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // Ако няма автентикация, редирект към логин страницата
  },
});

export function middleware(req) {
  const url = req.nextUrl;
  const isDashboard = url.pathname.startsWith("/dashboard");

  // Ако потребителят не е логнат и се опитва да достъпи /dashboard
  if (isDashboard && !req.cookies.get("next-auth.session-token")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
