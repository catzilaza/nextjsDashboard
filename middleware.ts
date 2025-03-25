import NextAuth from 'next-auth';
import { type NextRequest, NextResponse } from "next/server";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

// export default async function MiddleWare(req: NextRequest) {
//   //1. Check if route is protected
//   const path = "";
//   const protectedRoutes = ["/dashboard"];
//   const currentPath = req.nextUrl.pathname;
//   const isProtectedRoute = protectedRoutes.includes(path);

//   if (isProtectedRoute) {
//     //2. Check for valid session
//     //3. Redirect unauthed users
//   }

//   //4. Render route
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image).*)"],
// };
