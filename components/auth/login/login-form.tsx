"use client";

import { lusitana } from "@/app/ui/fonts";
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "../../../app/ui/button";
import { useActionState } from "react";
import { authenticate } from "@/lib/actions/auth/auth-action";
import { redirect, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2Icon, LoaderCircleIcon } from "lucide-react";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  // if (errorMessage) {
  //   console.log("From SignIN Form has error : ", errorMessage);
  // } else {
  //   console.log("From SignIN Form No error : ", errorMessage);
  // }

  return (
    <>
      <form action={formAction} className="space-y-3">
        <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-2 pt-2">
          <h1 className={`${lusitana.className} mb-3 text-2xl`}>
            Please log in to continue.
          </h1>
          <div className="w-full">
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                />
                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  required
                  minLength={6}
                />
                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>
          <input type="hidden" name="redirectTo" value={callbackUrl} />
          {!isPending ? (
            <>
              {" "}
              <Button className="mt-8 w-full">
                Log in{" "}
                <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
              </Button>
              <div
                className="flex h-6 items-center space-x-1"
                aria-live="polite"
                aria-atomic="true"
              >
                {errorMessage && (
                  <>
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                    <p className="text-sm text-red-500">{errorMessage}</p>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              {" "}
              <Button className="mt-4 w-full" aria-disabled={isPending}>
                Please wait...{" "}
                <LoaderCircleIcon className="ml-auto h-5 w-5 text-gray-50 animate-spin" />
              </Button>
              <div
                className="flex h-6 items-center space-x-1"
                aria-live="polite"
                aria-atomic="true"
              >
                {errorMessage && (
                  <>
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                    <p className="text-sm text-red-500">{errorMessage}</p>
                  </>
                )}
              </div>
            </>
          )}

          <div className="text-center mb-8 h-4">
            <Link href="/sign-up" style={{ textDecoration: "underline" }}>
              Don&apos;t have an account? Sign up
            </Link>
          </div>
          <Button
            disabled={isPending}
            onClick={() => {
              redirect("/");
            }}
            className="mt-4 w-full flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
          >
            Cancle
          </Button>
          {/* <Link
            href={"/"}
            className="flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
          >
            Cancle
          </Link> */}
        </div>
      </form>
    </>
  );
}

/* <form
className="space-y-4"
action={formAction}
// action={async (formData) => {
//   "use server";
//   await executeAction({
//     actionFn: async () => {
//       await signIn("credentials", formData);
//     },
//   });
// }}
>
<Input
  name="email"
  placeholder="Email"
  type="email"
  required
  autoComplete="email"
/>
<Input
  name="password"
  placeholder="Password"
  type="password"
  required
  autoComplete="current-password"
/>
<Button className="w-full" type="submit">
  Sign In
</Button>
</form>

<div className="text-center">
<Button asChild variant="link" aria-disabled={isPending}>
  <Link href="/sign-up">Don&apos;t have an account? Sign up</Link>
</Button>
</div> */
