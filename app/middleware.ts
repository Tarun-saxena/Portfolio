import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, COOKIE_NAME } from "@/lib/admin-auth";

export function middleware(req: NextRequest) {
    const isLoginPage = req.nextUrl.pathname === "/admin/login";
    const isLoginApi = req.nextUrl.pathname === "/api/admin/login";
    if (isLoginPage || isLoginApi) return NextResponse.next();

    const isApiRoute = req.nextUrl.pathname.startsWith("/api/");
    const isSafeMethod = req.method === "GET" || req.method === "HEAD";

    // Public reads on API routes are always allowed
    if (isApiRoute && isSafeMethod) return NextResponse.next();

    const token = req.cookies.get(COOKIE_NAME)?.value;
    if (!verifySessionToken(token)) {
        if (isApiRoute) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/api/projects/:path*"],
};