import AcmeLogo from "@/app/ui/acme-logo";
import LoginForm from "@/components/auth/login/login-form";
import { Suspense } from "react";
import { signIn } from "@/auth";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "../../ui/button";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        {/* <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <AcmeLogo />
          </div>
        </div> */}
        <Suspense>
          <LoginForm />
        </Suspense>
        <Suspense>
          <form
            action={async () => {
              "use server";
              await signIn("github");
            }}
            className="space-y-3"
          >
            <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
              <Button className="mt-4 w-full" type="submit">
                Login with GitHub
                <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
              </Button>
            </div>
          </form>
        </Suspense>
        <div className="space-y-3">
          <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
            <Link
              href={"/"}
              className="flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
            >
              Cancle
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
