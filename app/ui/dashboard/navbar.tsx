"use server";

import React from "react";
import { auth } from "@/auth";

export default async function StatusNavBar() {
  const session: any = await auth();
  return <div>Hello User : {session.user.email} expirse: {session.expires}</div>;
}
