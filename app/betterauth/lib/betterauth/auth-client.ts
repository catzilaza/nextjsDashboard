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
  baseURL: "http://localhost:3000",
  basePath: "/api/better_auth/",
  plugins: [
    organizationClient(),
    lastLoginMethodClient(),
    inferAdditionalFields<typeof auth>(),
    nextCookies(),
  ],
});

// export const { signIn, signUp, useSession, signOut } = createAuthClient();
// createAuthClient({basePath:"",baseURL:""})
