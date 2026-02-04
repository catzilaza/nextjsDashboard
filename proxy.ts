import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getLoginSession } from "./app/lib/data";
import { auth } from "./auth";
import { getCurrentUser } from "./app/betterauth/actions/users"; //from better-auth

// const { auth } = NextAuth(authConfig);
// export default NextAuth(authConfig).auth;
// export default NextAuth(authConfig).auth(async () => {});
export default async function poxy(request: NextRequest) {
  //==============================================================
  // const { nextUrl } = request;
  // console.log("====== FROM POXY =====");
  // const session1 = await auth();
  // const session = await getCurrentUser(); //from better-auth
  // if (!session?.user) {
  //   console.log("USER : ----------", session?.user);
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }
  // console.log("USER : ----------", session?.user);
  // return NextResponse.next();
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  // matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"]
  // https://nextjs.org/docs/app/building-your-application/routing/middleware
  // "/((?!api|_next/static|_next/image|images|favicon.ico|assets|.*\\.jpg$|.*\\.png$).*)",
  //
  matcher: [
    "/((?!api|_next/static|_next/image|images|favicon.ico|assets|.*\\.jpg$|.*\\.png$).*)",
    // "/dropbox/:path*",
    // "/ecommerce/:path*",
    // "/aifileanalyzer/:path",
    // "/avatar/:path*",
    // "/dashboard/:path*",
    // "/blog/:path*",
  ],
};

/** alternative you can do authorize logic in the middleware.ts file */
// type NextAuthRequest = NextRequest & { auth: Session | null };

// const auth = NextAuth(authConfig).auth;

// export default auth((request: NextAuthRequest) => {
//   const { auth, nextUrl } = request;

//   const isLoggedIn = !!auth?.user;
//   const isOnProfile = nextUrl.pathname.startsWith("/profile");
//   const isOnAuth = nextUrl.pathname.startsWith("/auth");

//   if (isOnProfile) {
//     if (isLoggedIn) return;
//     return Response.redirect(new URL("/auth/signin", nextUrl));
//   }

//   if (isOnAuth) {
//     if (!isLoggedIn) return;
//     return Response.redirect(new URL("/profile", nextUrl));
//   }

//   return;
// });

// console.log("====== FROM POXY =====");
// const user = await auth();
// if (!user) {
//   return NextResponse.redirect(new URL("/", request.url));
// }
// console.log("USER : ----------", user);
// return NextResponse.next();
