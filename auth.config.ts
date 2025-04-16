import type { NextAuthConfig, Session as NextAuthSession } from "next-auth";
import type { User as NextAuthUser } from "next-auth";
import type { AdapterUser } from "next-auth/adapters";

// Extend the Session type to include the `roll` property

interface UserSession extends NextAuthSession {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    roll?: "admin" | "user";
  };
}

// Extend the User type to include the `username` property
interface User extends NextAuthUser {
  username?: string;
  image_url?: string;
  roll?: "admin" | "user";
}

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

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

      const extendedAuth = auth as UserSession;
      const isAdmin = extendedAuth?.user?.roll === "admin";
      const isOnRoot = nextUrl.pathname.startsWith("/");

      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

      // if (isOnDashboard) {
      //   if (isLoggedIn) {
      //     if (isAdmin) {
      //       return true; // Allow access to admin users
      //     } else {
      //       return Response.redirect(new URL("/", nextUrl));
      //     } // Allow access to admin users
      //   } else {
      //     return false; // Redirect unauthenticated users to login page
      //   }
      // }
      // return true;

      if (isOnDashboard) {
        if (isLoggedIn) {
          return true;
        }
        return false;
      } else {
        if (isLoggedIn) {
          return Response.redirect(new URL("/dashboard", nextUrl));
        }
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        const extendedUser = user as User;
        token.id = extendedUser.id;
        token.name = extendedUser.username;
        token.email = extendedUser.email;
        token.picture = extendedUser.image_url;
        token.roll = extendedUser.roll;
        return token;
      }
      return token;
    },
    session({ session, token }) {
      if (session) {
        const extendedSession = session as UserSession;
        extendedSession.user.id = token.id as string;
        extendedSession.user.name = token.name;
        extendedSession.user.email = token.email as string;
        extendedSession.user.image = token.picture;
        extendedSession.user.roll = token.roll as "admin" | "user";

        return extendedSession;
      }

      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;

// export const authConfig = {
//   pages: {},
//   callbacks: {},
//   providers: [],
// } satisfies NextAuthConfig;
