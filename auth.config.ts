import type { NextAuthConfig } from "next-auth";
import type { User as NextAuthUser } from "next-auth";
import type { AdapterUser } from "next-auth/adapters";

// Extend the User type to include the `username` property
interface User extends NextAuthUser {
  username?: string;
  image_url?: string;
  roll?: string;
}

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const extendedAuth = auth as User;

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

      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

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
      }
      return token;
    },
    session({ session, token }) {
      if (session) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.image = token.picture;
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
