import { createAuthClient } from "better-auth/react";
import {
  lastLoginMethodClient,
  organizationClient,
  inferAdditionalFields,
} from "better-auth/client/plugins";
import { auth } from "./auth";
import { nextCookies } from "better-auth/next-js";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  // แนะนำให้ใช้ Env variable หรือถ้าไม่ใส่ Better Auth มักจะ detect เองได้ถ้าอยู่โดเมนเดียวกัน
  // baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL,
  // baseURL: "http://localhost:3000",
  // basePath: "/api/better_auth/",
  plugins: [
    organizationClient(),
    lastLoginMethodClient(),
    inferAdditionalFields<typeof auth>(),
    nextCookies(),
  ],
});

// export const { signIn, signUp, useSession, signOut } = createAuthClient();
// createAuthClient({basePath:"",baseURL:""})
