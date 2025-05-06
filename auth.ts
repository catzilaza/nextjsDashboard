import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { authConfig } from "./auth.config";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import type { User } from "@/app/lib/definitions";
import { getUserByEmail } from "./lib/data/auth/users";

// import postgres from "postgres";
// import prisma from "./lib/prisma";
// import { adapter } from "next/dist/server/web/adapter";
// import { Adapter } from "next-auth/adapter";

// const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

// async function getUser(email: string) {
//   try {
//     const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
//     return user[0];
//   } catch (error) {
//     console.error("Failed to fetch user:", error);
//     throw new Error("Failed to fetch user.");
//   }
// }

// async function getUserByEmail(email: string) {
//   try {
//     const user = await prisma.users.findFirst({
//       where: {
//         email: email,
//       },
//     });
//     return user;
//   } catch (error) {
//     console.error("Failed to fetch user by email:", error);
//     throw new Error("Failed to fetch user by email.");
//     // return null
//   }
// }

// const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  // session: {
  //   strategy: "jwt",
  // },
  // adapter: PrismaAdapter(prisma),
  // theme:{
  //   logo:"logo.png"
  // },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
    Github,
    Credentials({
      async authorize(credentials, req) {
        try {
          const parsedCredentials = z
            .object({ email: z.string().email(), password: z.string().min(6) })
            .safeParse(credentials);

          if (!parsedCredentials.success) {
            console.error(
              "Invalid credentials format:",
              parsedCredentials.error
            );
            // throw error;
            return null;
          }

          const { email, password } = parsedCredentials.data;
          const user = await getUserByEmail(email);

          if (!user) {
            console.error("User not found for email:", email);
            // throw error;
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          try {
            if (!passwordsMatch) {
              console.error("Password does not match for user:", email);
              // throw new OAuthAccountAlreadyLinkedError();
              // throw new Error("Password does not match");
              return null;
            }
          } catch (error) {
            console.error("Error in authorize function:");
            return null;
          }

          return {
            ...user,
            role: user.role as "user" | "admin" | null | undefined,
          };
        } catch (error) {
          console.error("Error in authorize function:");
          return null;
        }
      },
    }),
  ],
});

//    Github({
//   clientId: process.env.AUTH_GITHUB_IDD as string,
//   clientSecret: process.env.AUTH_GITHUB_SECRET as string,
// })

// import NextAuth from "next-auth";
// import GitHubProvider from "next-auth/providers/github";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [
//     GitHubProvider({
//       clientId: process.env.AUTH_GITHUB_ID as string,
//       clientSecret: process.env.AUTH_GITHUB_SECRET as string,
//       profile(profile) {
//         console.log("profile", profile);
//         return {
//           id: String(profile.id), // Convert number to string
//           name: profile.name,
//           email: profile.email,
//           image: profile.avatar_url as string, // GitHub profile image field
//           role: "user" // Set default role to "user"
//         };
//       },
//     })
//   ],
//   callbacks: {
//     jwt({ token, user }) {
//       if (user) token.role = user.role;
//       return token;
//     },
//     session({ session, token }) {
//       session.user.role = token.role;
//       return session;
//     },
//   },
// });
