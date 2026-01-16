"use server";

import { auth, signOut } from "@/auth";

export async function SignOut() {
  await signOut({ redirectTo: "/" });
}

export async function getSession() {
  let session = await auth();
  return session ? session : null;
}
