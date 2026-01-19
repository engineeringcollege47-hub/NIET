import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;
  const url = req.nextUrl.clone();

  // 🔐 Protect admin routes
  if (pathname.startsWith("/admin")) {
    if (!token) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    if (String(token.usertype) !== "2") {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
