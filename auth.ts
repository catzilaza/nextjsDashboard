//https://www.youtube.com/watch?v=4m7u7zGbdTI&list=PLIJrr73KDmRwWKE5c7XZeNhghKl5vhUbP&index=2
import NextAuth from "next-auth";
import type { User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcrypt";
// import { jwtDecode } from "jwt-decode";
import { authConfig } from "./auth.config";
import { getUserByEmail } from "./app/(auth)/actions/auth/users";
import { getAccountByUserId } from "./app/(auth)/actions/auth/accounts";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          params: {
            prompt: "consent", // บังคับให้ผู้ใช้ยืนยันสิทธิ์ใหม่ทุกครั้ง
            access_type: "offline", // ขอ refresh token สำหรับใช้งานแบบ background
            response_type: "code", // ใช้ OAuth Authorization Code Flow
          },
        },
      },
    }),
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
      authorization: {
        params: {
          scope: "read:user user:email",
          // ระบุ scope เพื่อกำหนดสิทธิ์ที่ต้องการ เช่น อ่านข้อมูล user และอีเมล
          //- GitHub ไม่รองรับ refresh token แบบ Google, ดังนั้นไม่ต้องใส่ access_type: offline
        },
      },
      profile(profile: any) {
        //- profile() ใช้ map ข้อมูลจาก GitHub API → User object ของ NextAuth
        // console.log("profile", profile);
        return {
          // id: String(profile.id), // Convert number to string
          // name: profile.name,
          // email: profile.email,
          // image: profile.avatar_url as string, // GitHub profile image field
          // picture: profile.avatar_url as string, // GitHub profile image field
          // role: "user", // Set default role to "user"
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials", //ชื่อ provider ที่จะแสดงใน UI
      credentials: {
        //กำหนดฟิลด์ input ที่ผู้ใช้ต้องกรอกตอน login
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, request) {
        //ฟังก์ชันตรวจสอบข้อมูลที่ผู้ใช้กรอกกับฐานข้อมูลหรือระบบอื่น
        try {
          const parsedCredentials = z
            .object({ email: z.string().email(), password: z.string().min(6) })
            .safeParse(credentials);

          if (!parsedCredentials.success) {
            console.error(
              "Invalid credentials format:",
              parsedCredentials.error,
            );
            // throw error; → system error (API ล้มเหลว, bug, DB error)
            return null; //-  login fail ปกติ (ไม่ใช่ system error)
          }

          const { email, password } = parsedCredentials.data;

          const user = await getUserByEmail(email);

          if (!user) {
            console.error("User not found for email:", email);
            return null;
          }

          // if (!user.password) {
          //   const hasAccount = await getAccountByUserId(user.id);
          //   if (!hasAccount) {
          //     console.error(
          //       "No User Password and No Account Something Wrong!!!",
          //     );
          //     return null;
          //   }
          // } else {
          //   const passwordsMatch = await bcrypt.compare(
          //     password,
          //     user.password ?? "",
          //   );

          //   try {
          //     if (!passwordsMatch) {
          //       console.error("Password does not match for user:", email);
          //       // throw new Error("Password does not match");
          //       return null;
          //     }
          //   } catch (error) {
          //     console.error("Error in authorize function:");
          //     return null;
          //   }
          // }

          const passwordsMatch = await bcrypt.compare(
            password,
            user.password ?? "",
          );

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

          return user;

          // const safeUser = {
          //   id: user.id ?? undefined,
          //   name: user.name ?? undefined,
          //   email: user.email ?? undefined,
          //   image: user.image ?? undefined,
          //   role: user.role ?? undefined,
          // };
          // return safeUser as unknown as User;
        } catch (error) {
          console.error("Error in authorize function:");
          return null;
        }
      },
    }),
  ],
});

// 1. prompt: "consent"
// - บังคับให้ Google แสดงหน้าจอขอ ยืนยันการให้สิทธิ์ (consent screen) ทุกครั้ง
// - แม้ว่าผู้ใช้เคยให้สิทธิ์ไปแล้ว → ก็จะถูกถามใหม่
// - ใช้เมื่อคุณต้องการให้ผู้ใช้เห็นชัดเจนว่าแอปขอสิทธิ์อะไรบ้าง เช่น การเข้าถึงอีเมล, โปรไฟล์, หรือ refresh token
// 2. access_type: "offline"
// - ขอสิทธิ์แบบ offline access → เพื่อให้ได้ refresh token
// - refresh token ใช้สำหรับ ต่ออายุ access token โดยไม่ต้องให้ผู้ใช้ล็อกอินใหม่
// - จำเป็นสำหรับแอปที่ต้องเข้าถึงข้อมูล Google API แบบ background หรือหลังจากผู้ใช้ออกจากระบบ
// 3. response_type: "code"
// - ใช้ Authorization Code Flow ของ OAuth 2.0
// - หมายถึง Google จะส่ง authorization code กลับมา → แล้วแอปจะใช้ code นี้ไปแลกเป็น access token และ refresh token
// - เป็น flow ที่ปลอดภัยที่สุดสำหรับ server-side authenticatio
//===================================================================
//ตัวอย่างการใช้งาน
// import { signIn, signOut } from "next-auth/react";

// // เรียก sign-in
// <button onClick={() => signIn("google")}>Sign in with Google</button>

// // เรียก sign-out
// <button onClick={() => signOut()}>Sign out</button>

//============================================================
// if (credentials === null) return null;

// try {
//   const restest = await fetch(`http://localhost:3000/api/auth/login`, {
//     method: "POST",
//     body: JSON.stringify({
//       email: credentials.email,
//       password: credentials.password,
//     }),
//     headers: { "Content-Type": "application/json" },
//   });

//   if (!restest.ok) {
//     //Credentials are invalid
//     return null;
//   }

//   const parsedResponse = await restest.json();

//   const accessToken = parsedResponse.accessToken;
//   const refreshToken = parsedResponse.refreshToken;
//   const userInfo = parsedResponse?.userInfo;

//   return {
//     accessToken,
//     refreshToken,
//     role: userInfo?.role,
//     email: userInfo?.email,
//   };
// } catch (error) {
//   throw new Error("error");
// }

//===================================================================
