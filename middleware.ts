import NextAuth from "next-auth";
import { type NextRequest, NextResponse } from "next/server";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  // matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"]
  matcher: [
    "/((?!api|_next/static|_next/image|images|favicon.ico|assets|.*\\.jpg$|.*\\.png$).*)",
  ],
};

// export default async function MiddleWare(req: NextRequest) {
//   //1. Check if route is protected
//   const path = "";
//   const protectedRoutes = ["/dashboard"];
//   const currentPath = req.nextUrl.pathname;
//   const isProtectedRoute = protectedRoutes.includes(path);

//   if (isProtectedRoute) {
//     //2. Check for valid session
//     const cookie = cookies().get('session')?.value;
//     const session = await decrypt(cookie)

//     //3. Redirect unauthed users
//     if(!session?.userId) {
//       return NextResponse.redirect(new URL('login', req.nextUrl));
//     }
//   }

//   //4. Render route
//   return NextResponse.next()
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image).*)"],
// };
