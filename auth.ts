import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import type { User } from "@/app/lib/definitions";
import bcrypt from "bcrypt";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
    return user[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials, req): Promise<User | null> {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          // console.log("Step 0 get Email user : ", user);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          // console.log("Step 1 Compare password user : ", user);

          const filtered_user: User = {
            user_id: user?.user_id,
            username: user?.username,
            email: user?.email,
            password: "",
            status: user?.status,
            roll: user?.roll,
            date: user?.date,
            image_blob: user?.image_blob,
            image_url: user?.image_url,
          };

          if (passwordsMatch) return user;
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});

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
