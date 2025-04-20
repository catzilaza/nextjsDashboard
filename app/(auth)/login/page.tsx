import { executeAction } from "@/app/lib/actions/auth/executeAction";
import { signIn } from "@/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GithubLoginForm from "@/components/auth/login/github-form";
import { Suspense } from "react";
import AcmeLogo from "@/app/ui/acme-logo";
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

export default function LoginPage() {
  return (
    <>
      <div className="flex items-center justify-center md:h-screen">
        <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
          <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
            <div className="w-32 text-white md:w-36">
              <AcmeLogo />
            </div>
          </div>
          <div className="w-full bg-slate-50 rounded-lg max-w-sm mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-center mb-6">Log In</h1>
            <Suspense>
              <GithubLoginForm />
            </Suspense>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with email
                </span>
              </div>
            </div>
            <Suspense>
              {/* Email/Password Sign In */}
              <form
                className="space-y-4"
                action={async (formData) => {
                  "use server";
                  await executeAction({
                    actionFn: async () => {
                      await signIn("credentials", formData);
                    },
                  });
                }}
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
                <Button className="w-full bg-blue-500" type="submit">
                  Log In
                </Button>
              </form>

              <div className="text-center">
                <Button asChild variant="link">
                  <Link href="/signup">
                    Don&apos;t have an account? Sign up
                  </Link>
                </Button>
              </div>
            </Suspense>
            <Link
              href={"/"}
              className="flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
            >
              Cancle
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

// import AcmeLogo from "@/app/ui/acme-logo";
// import LoginForm from "@/components/auth/login/login-form";
// import { Suspense } from "react";
// import { signIn } from "@/auth";
// import Link from "next/link";
// import { ArrowRightIcon } from "@heroicons/react/20/solid";
// import { Button } from "../../ui/button";
// import GithubLoginForm from "@/components/auth/login/github-form";

// export default function LoginPage() {
//   return (
//     <main className="flex items-center justify-center md:h-screen">
//       <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
//         <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
//           <div className="w-32 text-white md:w-36">
//             <AcmeLogo />
//           </div>
//         </div>
//         <Suspense>
//           <LoginForm />
//         </Suspense>
//         <Suspense>
//           <GithubLoginForm />
//           <form
//             action={async () => {
//               "use server";
//               await signIn("github");
//             }}
//             className="space-y-3"
//           >
//             <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
//               <Button className="mt-4 w-full" type="submit">
//                 Login with GitHub
//                 <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
//               </Button>
//             </div>
//           </form>
//         </Suspense>
//         <div className="space-y-3">
//           <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
//             <Link
//               href={"/"}
//               className="flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
//             >
//               Cancle
//             </Link>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }
