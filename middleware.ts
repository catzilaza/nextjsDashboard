// import { type NextRequest, NextResponse } from "next/server";
// import { auth as middleware } from "./auth";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "./app/auth/02-stateless-session";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

//https://github.com/vercel-labs/app-router-auth
//https://github.com/nextauthjs/next-auth

export default NextAuth(authConfig).auth;

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  // matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"]
  // https://nextjs.org/docs/app/building-your-application/routing/middleware

  matcher: [
    "/((?!api|_next/static|_next/image|images|favicon.ico|assets|.*\\.jpg$|.*\\.png$).*)",
  ],
};

// // 1. Specify protected and public routes
// const protectedRoutes = ["/dashboard", "/products"];
// const publicRoutes = ["/login", "/signup", "/"];

// export default async function middleware(req: NextRequest) {
//   // 2. Check if the current route is protected or public
//   const path = req.nextUrl.pathname;
//   const isProtectedRoute = protectedRoutes.includes(path);
//   const isPublicRoute = publicRoutes.includes(path);

//   // 3. Decrypt the session from the cookie
//   const cookie = (await cookies()).get("session")?.value;
//   const session = await decrypt(cookie);

//   // 4. Redirect
//   if (isProtectedRoute && !session?.userId) {
//     return NextResponse.redirect(new URL("/login", req.nextUrl));
//   }

//   if (
//     isPublicRoute &&
//     session?.userId &&
//     !req.nextUrl.pathname.startsWith("/dashboard")
//   ) {
//     return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image).*)"],
// };

// import { cookies } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";
// import { decrypt } from "./app/lib/session";

// const protectedRoutes = ["/dashboard"];
// const publicRoutes = ["/login"];
// const roleBasedRoutes: Record<string, string> = {
//   "/admin": "admin",
//   "/manager": "manager",
//   "/cto": "cto",
// };

// export default async function middleware(req: NextRequest) {
//   const path = req.nextUrl.pathname;
//   const isProtectedRoute = protectedRoutes.includes(path);
//   const isPublicRoute = publicRoutes.includes(path);

//   const cookie = (await cookies()).get("session")?.value;
//   const session = await decrypt(cookie);

//   if (isProtectedRoute && !session?.userId) {
//     return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
//   }

//   if (isPublicRoute && session?.userId) {
//     return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
//   }

//   // Check for role-based access
//   for (const route in roleBasedRoutes) {
//     if (path.startsWith(route)) {
//       const requiredRole = roleBasedRoutes[route];
//       if (session?.role !== requiredRole) {
//         return NextResponse.redirect(new URL("/unauthorized", req.nextUrl));
//       }
//     }
//   }

//   return NextResponse.next();
// }
