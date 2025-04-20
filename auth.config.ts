import type { NextAuthConfig, Session as NextAuthSession } from "next-auth";
import type { User as NextAuthUser } from "next-auth";
import "next-auth/jwt";

// import type { AdapterUser } from "next-auth/adapters";
// import NextAuth from "next-auth";

// import { getUserById } from "./lib/data/users";
// import { getAccountByUserId } from "./lib/data/accounts";
// import { users } from "./app/lib/placeholder-data";

// Extend the Session type to include the `roll` property
interface UserSession extends NextAuthSession {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: "admin" | "user";
  };
}

// Extend the User type to include the `username` property
interface User extends NextAuthUser {
  username?: string;
  image_url?: string;
  role?: "admin" | "user";
}

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      console.log("----- Enter Callbacks : Authorized");

      const isLoggedIn = !!auth?.user;

      // const extendedAuth = auth as UserSession;
      // const isAdmin = extendedAuth?.user?.role === "admin";
      // const isOnRoot = nextUrl.pathname.startsWith("/");

      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

      if (isOnDashboard) {
        if (isLoggedIn) {
          console.log("Leave Callbacks : Authorized");
          return true;
        }
        console.log("Leave Callbacks : Authorized");
        return false;
      } else {
        if (isLoggedIn) {
          console.log("Leave Callbacks : Authorized");
          return Response.redirect(new URL("/dashboard", nextUrl));
        }
      }

      console.log("Leave Callbacks : Authorized");
      return true;
    },
    async jwt({ token, trigger, session, account, user, profile }) {
      console.log("***** Enter Callbacks : JWT", token);

      if (trigger === "update") token.name = session.user.name;
      if (account?.provider === "keycloak") {
        console.log("Leave Callbacks : JWT");
        return { ...token, accessToken: account.access_token };
      }
      if (account?.provider === "credentials") {
        token.credentials = true;
      }

      if (user) {
        const extendedUser = user as User;
        token.name = extendedUser?.username;
        token.picture = extendedUser?.image_url;
        token.role = extendedUser?.role;

        return token;
      }

      console.log("Leave Callbacks : JWT");
      return token;
    },
    async session({ session, token, user }) {
      console.log("///// Enter Callbacks : SESSION");
      console.log("In Callbacks : SESSION :", session);

      if (token?.accessToken) session.accessToken = token.accessToken;

      if (session) {
        const extendedSession = session as UserSession;
        extendedSession.user.name = token?.name;
        extendedSession.user.image = token?.picture;
        extendedSession.user.role = token?.role as "admin" | "user";
        extendedSession.user.id = token?.sub as string;

        return extendedSession;
      }

      //   return {
      //     ...session,
      //     user: {
      //       ...session.user,
      //       id: token.sub,
      //       isOautn: token.isOauth,
      //     },
      //   };

      console.log("Leave Callbacks : SESSION");
      return session;
    },
  },
  experimental: { enableWebAuthn: true },
  providers: [],
} satisfies NextAuthConfig;

declare module "next-auth" {
  interface Session {
    accessToken?: string | null;
    name?: string | null;
    role?: "admin" | "user" | null;
    id?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string | null;
    name?: string | null;
    role?: "admin" | "user" | null;
    isOauth?: boolean;
    credentials?: boolean;
  }
}

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
