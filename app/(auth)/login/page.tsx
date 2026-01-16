import GithubLoginForm from "@/app/(auth)/components/auth/login/github-form";
import { Suspense } from "react";
import AcmeLogo from "@/app/dashboard/components/acme-logo";
import LoginForm from "@/app/(auth)/components/auth/login/login-form";

export default function LoginPage() {
  return (
    <>
      <div className="flex items-center justify-center md:h-screen">
        <div className="relative mx-auto flex w-full max-w-[500px] flex-col space-y-2.5 p-4 md:mt-22">
          <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-26">
            <div className="flex flex-row items-baseline gap-8 w-32 text-white md:w-36">
              <div>
                <AcmeLogo />
              </div>
            </div>
          </div>
          <div className="w-full bg-slate-50 rounded-lg max-w-[500px] mx-auto space-y-6">
            {/* <h1 className="text-2xl font-bold text-center mb-6">Log In</h1> */}
            <Suspense
              fallback={<p className="text-sm text-gray-600">Loading...</p>}
            >
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
            <Suspense
              fallback={<p className="text-sm text-gray-600">Loading...</p>}
            >
              <LoginForm />
            </Suspense>
            <footer className="bg-gray-200 text-white py-4">
              <div className="container mx-auto px-6 text-center">
                <p className="text-sm text-black">
                  &copy; {new Date().getFullYear()} All rights reserved.
                </p>
              </div>
            </footer>
            {/* <Link
              href={"/"}
              className="flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
            >
              Cancle
            </Link> */}
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
