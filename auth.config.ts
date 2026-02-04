// import type { NextAuthConfig } from "next-auth";
import "next-auth/jwt";
import { v4 as uuid } from "uuid";
import {
  encode as defaultEncode,
  decode as defaultDecode,
} from "next-auth/jwt";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import NeonAdapter from "@auth/neon-adapter";
import { Pool } from "@neondatabase/serverless";
import { AdapterOptions } from "next/dist/server/web/adapter";
import { unknown } from "zod";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";
import Credentials from "next-auth/providers/credentials";
// import schema from "@/app/(auth)/lib/db/schema"

//https://www.youtube.com/watch?v=95fuP8jpWlk&list=PLIJrr73KDmRwWKE5c7XZeNhghKl5vhUbP&index=5

// https://www.youtube.com/watch?v=Myo5kizoSk0
// const prisma = new PrismaClient();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = PrismaAdapter(prisma);

export const authConfig = {
  // adapter,
  pages: {
    signIn: "/login",
    // error: "/error",
  },
  session: {
    strategy: "jwt",
    // maxAge: 24 * 60 * 60, // 1 Day
  },
  // jwt: {
  //   encode: async function (params) {
  //     if (params.token?.credentials) {
  //       const sessionToken = uuid();

  //       if (!params.token.sub) {
  //         throw new Error("No user ID found in token");
  //       }

  //       const createdSession = await prisma.session.create({
  //         data: {
  //           sessionToken: sessionToken,
  //           userId: params.token.sub,
  //           expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  //           token: sessionToken, // Provide value for the missing 'token' field
  //         },
  //       });

  //       if (!createdSession) {
  //         throw new Error("Failed to create session");
  //       }

  //       return sessionToken;
  //     }
  //     return defaultEncode(params);
  //   },
  //   decode: async function (params) {
  //     const { token } = params;
  //     if (!token) return null;

  //     // ถ้า Token มีจุด (.) แสดงว่าเป็น JWE (JWT ปกติจาก OAuth) ให้ใช้ defaultDecode
  //     if (token.includes(".")) {
  //       return defaultDecode(params);
  //     }

  //     // ถ้าไม่มีจุด แสดงว่าเป็น Session Token (UUID) ที่เราสร้างเอง ให้ดึงข้อมูลจาก DB
  //     const session = await prisma.session.findFirst({
  //       where: { sessionToken: token },
  //       include: { users: true },
  //     });

  //     if (!session) return null;

  //     // ตรวจสอบวันหมดอายุ
  //     if (!session.expires || new Date() > session.expires) {
  //       return null;
  //     }

  //     // คืนค่าข้อมูล User เพื่อใช้เป็น Token Payload
  //     return {
  //       ...session.users,
  //       sub: session.userId,
  //       picture: session.users.image, // map image ให้ตรงกับที่ jwt callback คาดหวัง
  //     };
  //   },
  // },
  // adapter: NeonAdapter(pool),
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      return true;
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
      // const MyRoute = {
      //   LOGIN: "/login",
      //   ROOT: "/",
      //   PUBLIC_ROUTES: [
      //     "/login",
      //     "/register",
      //     "/signup",
      //     "/",
      //     "/api/auth/callback/google",
      //     "/api/auth/callback/github",
      //     "/api/auth/",
      //     "/api/better_auth/",
      //   ],
      // };

      // const PROTECTED_SUB_ROUTES = ["/dashboard/invoices"];

      // const isAuthenticated = !!!!auth?.user;
      // const isPublicRoute =
      //   MyRoute.PUBLIC_ROUTES.find(
      //     (route) =>
      //       nextUrl.pathname.startsWith(route) ||
      //       nextUrl.pathname === MyRoute.ROOT,
      //   ) &&
      //   !PROTECTED_SUB_ROUTES.find((route) => nextUrl.pathname.includes(route));

      // if (!isAuthenticated && !isPublicRoute) {
      //   return false;
      // }
      // return true;
    },
    async jwt({ token, trigger, session, account, user, profile }) {
      //พารามิเตอร์ token, trigger, session, account, user, profile เป็นตารางในฐานข้อมูล

      // if (account?.provider === "credentials") {
      //   token.credentials = true;
      // }
      if (user) {
        token.id = user?.id;
        token.role = user?.role;
      }
      return token;
      //=========================================================================
      //
      // // user is only available the first time a user signs in authorized
      // console.log(`In jwt callback - Token is ${JSON.stringify(token)}`);

      // if (token.accessToken) {
      //   const decodedToken = jwtDecode(token.accessToken);
      //   console.log(decodedToken);
      //   token.accessTokenExpires = decodedToken?.exp * 1000;
      // }

      // if (account && user) {
      //   console.log(`In jwt callback - User is ${JSON.stringify(user)}`);
      //   console.log(`In jwt callback - account is ${JSON.stringify(account)}`);

      //   return {
      //     ...token,
      //     accessToken: user.accessToken,
      //     refreshToken: user.refreshToken,
      //     user,
      //   };
      // }

      // // Return previous token if the access token has not expired yet
      // console.log(
      //   "**** Access token expires on *****",
      //   token.accessTokenExpires,
      //   new Date(token.accessTokenExpires),
      // );
      // if (Date.now() < token.accessTokenExpires) {
      //   console.log("**** returning previous token ******");
      //   return token;
      // }

      // // Access token has expired, try to update it
      // console.log("**** Update Refresh token ******");
      // //return token;
      // return refreshAccessToken(token);
    },
    // async jwt({ token, trigger, session, account, user, profile }) {
    // console.log("***** Enter Callbacks : JWT", profile?.name);
    // console.log("***** Enter Callbacks : JWT", profile?.picture as string);

    // if (trigger === "update") token.name = session.user.name;
    // if (account?.provider === "keycloak") {
    // console.log("Leave Callbacks : JWT");
    //   return { ...token, accessToken: account.access_token };
    // }
    // if (account?.provider === "credentials") {
    //   token.credentials = true;
    // }

    // if (account && user) {
    // console.log("acount && user");
    // console.log(`In jwt call back - User is ${JSON.stringify(token)}`);
    // console.log(`In jwt call back - Account is ${JSON.stringify(account)}`);

    //   return {
    //     ...token,
    //     // user,
    //     accessToken: user?.accessToken,
    //     refreshToken: user?.refreshToken,
    //     name: user?.username || profile?.name,
    //     sub: user?.id,
    //     email: user?.email,
    //     picture: user?.image_url || (profile?.picture as string),
    //     role: user?.role,
    //   };
    // }

    // console.log("Leave Callbacks : JWT", token);
    // return token;

    // if (account && user) {
    //   return {
    //     ...token,
    //     role: user?.role.
    //   }
    // }
    // },
    async session({ session, token }) {
      // console.log("///// Enter Callbacks : SESSION", session);

      if (token) {
        session.user.id = token?.id as string;
        session.user.role = token?.role as string;
        session.user.image = token?.picture as string;      
        // session.user.image_blob = token?.picture_blob as string;
      }
      return session;

      //========================================================
      //
      //console.log(`In session callback - Token is ${JSON.stringify(token)}`);
      // if (token) {
      //   session.accessToken = token.accessToken;
      //   session.refreshToken = token.refreshToken;
      // }
      // return session;
    },
  },
  experimental: { enableWebAuthn: true },
  providers: [],
} satisfies NextAuthConfig;

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id?: string | undefined;
      name?: string | undefined;
      email?: string | undefined;
      image?: string | undefined;
      image_url?: string | undefined;
      role?: string | undefined;
    } & DefaultSession["user"];
  }

  interface User {
    id?: string | undefined;
    name?: string | undefined | null;
    email?: string | undefined | null;
    image?: string | undefined | null;
    image_url?: string | undefined | null;
    role?: string | undefined | null;
  }
}

// Extend the User type to include the refreshToken property
// import type {
//   NextAuthConfig,
// Session as NextAuthSession,
// User as NextAuthUser,
// DefaultSession,
// } from "next-auth";
// import type { User } from "@/app/lib/definitions";
// import type { User as NextAuthUser } from "next-auth";
// import type { AdapterUser } from "next-auth/adapters";
// import NextAuth from "next-auth";

// import { getUserById } from "./lib/data/users";
// import { getAccountByUserId } from "./lib/data/accounts";
// import { users } from "./app/lib/placeholder-data";

// Extend the Session type to include the `roll` property
// interface UserSession extends NextAuthSession {
//   user: {
//     id: string;
//     name?: string | null;
//     email?: string | null;
//     image?: string | null;
//     role?: "admin" | "user";
//   };
// }

// Extend the User type to include the `username` property
// interface User extends NextAuthUser {
//   username?: string;
//   image_url?: string;
//   role?: "admin" | "user";
// }

//https://www.youtube.com/watch?v=bMYZSi_LZ2w
// import { auth } from "./auth";
// import { cache } from "react";
// export default cache(auth)

// export const authConfig = {
//   pages: {},
//   callbacks: {},
//   providers: [],
// } satisfies NextAuthConfig;

// const extendedAuth = auth as User;

// How to set roll base access control in callback authorized?Thanks.
// const userRole = extendedAuth?.roll;

// // Define role-based access rules
// const roleBasedAccess = {
//   admin: ["/", "/products", "/dashboard"],
//   user: ["/", "/products"],
//   guest: ["/", "/products", "/login", "/signup"],
// };

// const isAdmin = extendedAuth?.roll === "admin";

// const isOnDashboard = ["/products", "/dashboard"].some((route) =>
//   nextUrl.pathname.startsWith(route)
// );

// if (isOnDashboard) {
//   if (isLoggedIn) return true;
//   return false; // Redirect unauthenticated users to login page
// } else if (isLoggedIn) {
//   return Response.redirect(new URL("/dashboard", nextUrl));
// }
// return true;

// jwt({ token, user }) {
//   if (user) {
//     const extendedUser = user as User;
//     token.id = extendedUser.id;
//     token.name = extendedUser.username;
//     token.email = extendedUser.email;
//     token.picture = extendedUser.image_url;
//     token.role = extendedUser.role;
//     return token;
//   }
//   return token;
// }

// session({ session, token }) {
//   if (session) {
//     const extendedSession = session as UserSession;
//     extendedSession.user.id = token.id as string;
//     extendedSession.user.name = token.name;
//     extendedSession.user.email = token.email as string;
//     extendedSession.user.image = token.picture;
//     extendedSession.user.role = token.role as "admin" | "user";

//     return extendedSession;
//   }

//   return session;
// }
