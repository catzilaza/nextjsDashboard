import NextAuth from "next-auth";
import type { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { authConfig } from "./auth.config";
import bcrypt from "bcrypt";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { getUserByEmail } from "./lib/actions/auth/users";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
    Github({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
      profile(profile: any) {
        // console.log("profile", profile);
        return {
          id: String(profile.id), // Convert number to string
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url as string, // GitHub profile image field
          picture: profile.avatar_url as string, // GitHub profile image field
          role: "user", // Set default role to "user"
        };
      },
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, request) {
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
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          try {
            if (!passwordsMatch) {
              console.error("Password does not match for user:", email);
              // throw new Error("Password does not match");
              return null;
            }
          } catch (error) {
            console.error("Error in authorize function:");
            return null;
          }

          const safeUser = {
            id: user.id ?? undefined,
            name: user.name ?? undefined,
            email: user.email ?? undefined,
            image: user.image ?? undefined,
            image_url: user.image_url ?? undefined,
            role: user.role ?? undefined,
          };
          return safeUser as unknown as User;
        } catch (error) {
          console.error("Error in authorize function:");
          return null;
        }
      },
    }),
  ],
});

// import { betterAuth } from "better-auth";
// import { nextCookies } from "better-auth/next-js";
// import { prismaAdapter } from "better-auth/adapters/prisma";
// import { PrismaClient } from "@/generated/prisma";

// const prisma = new PrismaClient();

// const auth = betterAuth({
//   database: prismaAdapter(prisma, { provider: "postgresql" }),
//   emailAndPassword: {
//     enabled: true,
//   },
//   plugins: [nextCookies()],
// });

// export default auth;
