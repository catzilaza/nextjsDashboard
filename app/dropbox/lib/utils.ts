"use server";

import { auth, signOut } from "@/auth";

export async function SignOut() {
  await signOut({ redirectTo: "/" });
}

export async function getLoginSession() {
  const session: any = await auth();
  // console.log("getLoginSession : ", session);
  return session ? session : null;
}
