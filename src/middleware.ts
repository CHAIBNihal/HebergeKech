import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req:NextRequest) {
  const token = await getToken({ req,  secret: process.env.NEXTAUTH_SECRET });
  console.log(token);
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/Admin")) {
    if (token?.role !== "admin") {
      return NextResponse.redirect(new URL("/authAdmin/LoginAdmin", req.url));
    }
  } else if (pathname.startsWith("/profile")||
   pathname.startsWith('/BookingHistory') ||
   pathname.startsWith('/Rooms') ||
   pathname.startsWith('/Activities')
  ) {
    if (token?.role !== "user") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/Admin/:path*", 
    "/profile/:path*", 
    "/Rooms/:path*", 
    "/BookingHistory",
    "/Activities/:path*"
  ],
};
