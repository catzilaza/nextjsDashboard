"use client";

// Your Complete Guide To Next.js Authentication With Better Auth
// https://github.com/TheOrcDev/better-auth-starter

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ModeSwitcher from "./components/ModeSwitcher";

export default function BetterAuthPage() {
  const session: boolean = false;
  return (
    <>
      <header className="absolute top-0 right-0 flex items-center justify-end p-4">
        <ModeSwitcher />
      </header>
      <div className="flex h-screen flex-col items-center justify-center gap-5 px-5 text-center">
        <Image
          alt="Better Auth"
          // className="rounded-lg dark:invert object-contain"
          src="/better-auth-starter.png"
          loading="eager"
          sizes="100vw"
          style={{
            width: "auto",
            height: "20%",
          }}
          width={300}
          height={200}
        />

        <h1 className="font-bold text-4xl">Better Auth Starter</h1>

        <p className="text-lg">
          This is a starter project for Better Auth. It is a simple project that
          uses Better Auth to authenticate users.
        </p>

        <div className="flex gap-2">
          <Link href="/betterauth/signin">
            <Button>Login</Button>
          </Link>
          <Link href="/betterauth/signup">
            <Button>Signup</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
