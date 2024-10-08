import NextAuth from "next-auth"
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from "./routes"
import { NextResponse } from "next/server"
import authConfig from "./auth.config"
const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const { nextUrl } = req
    const isLoggedIn = !!req.auth

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isExactPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isPublicRoute = publicRoutes.some(route => route !== '/' && nextUrl.pathname.startsWith(route))
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)

    if (isApiAuthRoute) {
        return NextResponse.next()
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return NextResponse.next()
    }

    if (!isLoggedIn && !isExactPublicRoute && !isPublicRoute) {
        return NextResponse.redirect(new URL('/auth/login', nextUrl))
    }

    return NextResponse.next()
})

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}