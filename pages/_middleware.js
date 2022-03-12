import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
    const token = await getToken({req, secret: process.env.JWT_SECRET});
    const {pathname} = req.nextUrl
    const url = req.nextUrl.clone()
  url.pathname = '/login'
    //allow if true
    if (pathname.includes("/api/auth") || token) {
        return NextResponse.next(); 
    }
    //protection redirect
    if(!token && pathname !== "/login") {
        return NextResponse.redirect(url);
    }
}