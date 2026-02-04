"use server";

import { signOutAction } from "../actions/betterAuthActions";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ButtonBetterAuth() {
  const session: boolean = false;
  // console.log("Session ButtonBetterAuth :", session);

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <h1 className="text-4xl font-bold">{String(session)}</h1>
        <div className="flex gap-4 mt-8">
          <Button asChild size="lg">
            <Link href="/betterauth/signup">Sign Up</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/betterauth/signin">Sign In</Link>
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-4xl font-bold">{String(session)}</h1>
      <div className="mt-8 text-center">
        <p className="text-lg mb-4">User ID: {session}</p>
        <form action={signOutAction}>
          <Button
            type="submit"
            size="lg"
            id="logout"
            name="logout"
            value="logout"
          >
            Logout
          </Button>
        </form>
      </div>
    </div>
  );
}
