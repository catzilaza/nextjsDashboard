import type { NextAuthConfig } from "next-auth";
import "next-auth/jwt";

export const authConfig = {
  pages: {
    signIn: "/login",
    error: "/error",
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      // console.log("----- Enter Callbacks : Authorized");

      const isLoggedIn = !!auth?.user;

      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

      if (isOnDashboard) {
        if (isLoggedIn) {
          // console.log("Leave Callbacks : Authorized");
          return true;
        }
        // console.log("Leave Callbacks : Authorized");
        return false;
      } else {
        if (isLoggedIn) {
          // console.log("Leave Callbacks : Authorized");
          return Response.redirect(new URL("/dashboard", nextUrl));
        }
      }
      // console.log("Leave Callbacks : Authorized");
      return true;
    },
    async jwt({ token, trigger, session, account, user, profile }) {
      // console.log("***** Enter Callbacks : JWT", token);

      if (trigger === "update") token.name = session.user.name;
      if (account?.provider === "keycloak") {
        // console.log("Leave Callbacks : JWT");
        return { ...token, accessToken: account.access_token };
      }
      if (account?.provider === "credentials") {
        token.credentials = true;
      }

      if (account && user) {
        // console.log("acount && user");
        // console.log(`In jwt call back - User is ${JSON.stringify(token)}`);
        // console.log(`In jwt call back - Account is ${JSON.stringify(account)}`);

        return {
          ...token,
          // user,
          accessToken: user?.accessToken,
          refreshToken: user?.refreshToken,
          name: user?.username,
          sub: user?.id,
          email: user?.email,
          picture: user?.image_url,
          role: user?.role,
        };
      }

      // console.log("Leave Callbacks : JWT", token);
      return token;
    },
    async session({ session, token, user }) {
      // console.log("///// Enter Callbacks : SESSION");

      if (session) {
        session.user.id = token.sub ?? "";
        session.user.name = token.name;
        session.user.email = token.email ?? "";
        session.user.image = token.picture;
        session.user.role = token.role;

        //   return {
        //     ...session,
        //     user: {
        //       ...session.user,
        //       id: token.sub,
        //       isOautn: token.isOauth,
        //     },
        //   };

        return session;
      }

      // console.log("Leave Callbacks : SESSION", session);
      return session;
    },
  },
  experimental: { enableWebAuthn: true },
  providers: [],
} satisfies NextAuthConfig;

declare module "next-auth" {
  interface Session {
    accessToken?: string | null;
    role?: "admin" | "user" | null;
    // user: UserUser & DefaultSession["user"]
    user: {
      id: string | null | undefined;
      name: string | null | undefined;
      email: string | null | undefined;
      image: string | null | undefined;
      role: string | null | undefined;
    };
  }

  interface UserUser {
    role: String | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string | null;
    role?: "admin" | "user" | null;
  }
}

declare module "next-auth" {
  interface User {
    refreshToken?: string | null;
    accessToken?: string | null;
    username?: string | null;
    image_url?: string | null;
    role?: "admin" | "user" | null;
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
