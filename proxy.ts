import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";
import { getLoginSession } from "./app/lib/data";

// export default NextAuth(authConfig).auth;
// export default NextAuth(authConfig).auth(async () => {});
export default async function poxy(request: NextRequest) {
  // console.log("Poxy............", request.credentials);
  // console.log("Poxy............", request.url);
  // console.log("Poxy............", request.nextUrl);

  // let user = await auth();
  // if (!user) {
  //   if (request.nextUrl.pathname === "/")
  //     return NextResponse.redirect(new URL("/", request.url));
  // }
  // console.log("USER : ----------", user);

  // if (request.nextUrl.pathname === "/") {
  //   return NextResponse.next();
  // }

  // return NextResponse.redirect(new URL("/", request.url));
  // return NextResponse.next();
  //=======================================

  // console.log("----- Enter Callbacks : Authorized");

  // const isLoggedIn = !!auth?.user;

  // const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

  // if (isOnDashboard) {
  //   if (isLoggedIn) {
  //     // console.log("Leave Callbacks : Authorized");
  //     return true;
  //   }
  //   // console.log("Leave Callbacks : Authorized");
  //   return false;
  // } else {
  //   if (isLoggedIn) {
  //     // console.log("Leave Callbacks : Authorized");
  //     // return Response.redirect(new URL("/dashboard", nextUrl));
  //     return true;
  //   }
  // }
  // // console.log("Leave Callbacks : Authorized");
  // return true;
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  // matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"]
  // https://nextjs.org/docs/app/building-your-application/routing/middleware

  matcher: [
    "/((?!api|_next/static|_next/image|images|favicon.ico|assets|.*\\.jpg$|.*\\.png$).*)",
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
