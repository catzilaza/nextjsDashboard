// import { type NextRequest, NextResponse } from "next/server";
// import { auth as middleware } from "./auth";

import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

//https://github.com/vercel-labs/app-router-auth
//https://github.com/nextauthjs/next-auth

export default NextAuth(authConfig).auth;
// export default NextAuth(authConfig).auth(async () => {});

// const privateRoutes = ["/dashboard"];

// const { auth } = NextAuth(authConfig);

// export default auth(async (req) => {

//   console.log("This is Middleware --------");

//   console.log("Middleware triggered:", req.nextUrl.pathname);
//   console.log("Request auth:", req.auth);
//   console.log("Request method:", req.method);
//   console.log("Request URL:", req.url);
//   console.log("Request headers:", req.headers.get("cookie"));

//   const isLoggedIn = !!req.auth;
//   const { nextUrl } = req;

//   const url = "http://localhost:3000";

//   const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);
//   const isAuthRoute = nextUrl.pathname.includes("/login");
//   const isApiRoute = nextUrl.pathname.includes("/api/");

//   if (isApiRoute) {
//     console.log("This is : isApiRoute is TRUE and return;");
//     return;
//   }

//   if (isLoggedIn && isAuthRoute) {
//     console.log(
//       "*******This is :  isLoggedIn && isAuthRoute TRUE and return Response.redirect(${url}/dashboard);"
//     );
//     return Response.redirect(`${url}/dashboard`);
//     // return Response.redirect(new URL("/dashboard", nextUrl));
//   }

//   if (isAuthRoute && !isLoggedIn) {
//     console.log("This is : isAuthRoute && !isLoggedIn TRUE and return;");
//     return;
//   }

//   if (isPrivateRoute && !isLoggedIn) {
//     console.log(
//       "This is : isPrivateRoute && !isLoggedIn TRUE and return Response.redirect(`${url}/login`;"
//     );
//     return Response.redirect(`${url}/login`);
//   }

//   console.log("Exit From Middleware auth ---------");
// });

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
