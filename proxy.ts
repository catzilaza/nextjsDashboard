import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default NextAuth(authConfig).auth;
// export default NextAuth(authConfig).auth(async () => {});
export function poxy(request: NextRequest) {
  return NextResponse.redirect(new URL("/", request.url));
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
