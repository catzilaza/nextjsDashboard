"use client";

import { useActionState, useEffect, useState } from "react";
import { lusitana } from "@/app/ui/fonts";
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "../../../app/ui/button";
import Link from "next/link";
import { SignUp, SignUpActionState } from "@/lib/actions/auth/signup-action";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { redirect } from "next/navigation";

// https://www.youtube.com/watch?v=p_wnN5VR9Ok

export default function SignUpForm() {
  const initialState: SignUpActionState = {
    message: "",
    errors: {
      username: [],
      password: [],
      email: [],
      messageError: "",
    },
  };
  // const [state, action, isPending] = useActionState(SignUp, initialState);
  const [state, formAction, isPending] = useActionState(SignUp, initialState);

  // console.log("State : ", state);

  // async function handleAction(formData: FormData) {
  //   formAction(formData);

  //   let counts: any = state?.message?.toString().length as number;
  //   console.log("Counts : ", counts);
  //   if (counts > 0) {
  //     toast("SuccessFully");
  //   } else {
  //     toast("Error");
  //   }
  // }

  useEffect(() => {
    if (state?.message === "successfully") {
      toast.success("successfully");
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 3000));
      };
      redirect("/");
    }
    if (state?.errors?.messageError === "error") {
      toast.error("error");
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 6000));
      };
      redirect("/");
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please Sign Up to Website.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="username"
            >
              Username
            </label>
            <div className="relative">
              <input
                className={
                  "peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                }
                id="username"
                type="text"
                name="username"
                // defaultValue={}
                // value={}
                placeholder="Enter your username"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              {state.errors?.username && (
                <p className="text-sm text-red-500">{state.errors.username}</p>
              )}
            </div>
          </div>
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
              {state.errors?.email && (
                <p className="text-sm text-red-500">{state.errors.email}</p>
              )}
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
              {state.errors?.password && (
                <p className="text-sm text-red-500">{state.errors.password}</p>
              )}
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <p aria-live="polite">{state?.message}</p>

        <Button className="mt-4 w-full" disabled={isPending}>
          {isPending ? (
            <>
              Please wait...{" "}
              <Loader2 className="animate-spin ml-auto h-5 w-5 text-gray-50" />
            </>
          ) : (
            <>
              Sign Up{" "}
              <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
            </>
          )}
        </Button>
        <div className="flex h-8 items-end space-x-1">
          {/* Add form errors here */}
          {state.errors?.messageError && (
            <p className="text-red-500">{state.errors.messageError}</p>
          )}
          {state.message && <p className="text-green-500">{state.message}</p>}
        </div>

        <Button
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
  );
}

{
  /* <Button className="mt-4 w-full">
Sign Up <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
</Button> */
}

// export default function SignUpForm() {
// https://www.youtube.com/watch?v=p_wnN5VR9Ok
//   const initialState: SignUpActionState = { message: null, errors: {} };
//   // const [state, action, isPending] = useActionState(SignUp, initialState);
//   const [state, action, isPending] = useActionState(
//     async (previous: SignUpActionState, payload: FormData) => {
//       let result = await SignUp(previous, payload);
//       console.log("result :", result);
//       return result;
//     },
//     initialState
//   );

//   console.log("State : ", state);

//   async function handleAction(formData: FormData) {
//     action(formData);
//     console.log("++++ State : ", state);

//     if (
//       state?.message === "ok" &&
//       (!state?.errors || Object.keys(state.errors).length === 0)
//     ) {
//       toast("Sign up successfully");
//     } else {
//       toast("Error !!!!");
//     }
//   }

//   return (
//     <form action={handleAction} className="space-y-3">
//       <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
//         <h1 className={`${lusitana.className} mb-3 text-2xl`}>
//           Please Sign Up to Website.
//         </h1>
//         <div className="w-full">
//           <div>
//             <label
//               className="mb-3 mt-5 block text-xs font-medium text-gray-900"
//               htmlFor="username"
//             >
//               Username
//             </label>
//             <div className="relative">
//               <input
//                 className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
//                 id="username"
//                 type="text"
//                 name="username"
//                 placeholder="Enter your username"
//                 required
//               />
//               <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
//               {state.errors?.username && (
//                 <p className="text-sm text-red-500">{state.errors.username}</p>
//               )}
//             </div>
//           </div>
//           <div>
//             <label
//               className="mb-3 mt-5 block text-xs font-medium text-gray-900"
//               htmlFor="email"
//             >
//               Email
//             </label>
//             <div className="relative">
//               <input
//                 className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
//                 id="email"
//                 type="email"
//                 name="email"
//                 defaultValue={state.username}
//                 placeholder="Enter your email address"
//                 required
//               />
//               <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
//               {state.errors?.email && (
//                 <p className="text-sm text-red-500">{state.errors.email}</p>
//               )}
//             </div>
//           </div>
//           <div className="mt-4">
//             <label
//               className="mb-3 mt-5 block text-xs font-medium text-gray-900"
//               htmlFor="password"
//             >
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
//                 id="password"
//                 type="password"
//                 name="password"
//                 defaultValue={state.password}
//                 placeholder="Enter password"
//                 required
//                 minLength={6}
//               />
//               {state.errors?.password && (
//                 <p className="text-sm text-red-500">{state.errors.password}</p>
//               )}
//               <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
//             </div>
//           </div>
//         </div>
//         <p aria-live="polite">{state?.message}</p>

//         <Button className="mt-4 w-full" disabled={isPending}>
//           {isPending ? (
//             <>
//               Please wait...{" "}
//               <Loader2 className="animate-spin ml-auto h-5 w-5 text-gray-50" />
//             </>
//           ) : (
//             <>
//               Sign Up{" "}
//               <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
//             </>
//           )}
//         </Button>

//         <div className="flex h-8 items-end space-x-1">
//           {/* Add form errors here */}
//           {state.errors && (
//             <p className="text-red-500">{state.errors.username}</p>
//           )}
//         </div>
//         <Link
//           href={"/"}
//           className="flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
//         >
//           Cancle
//         </Link>
//       </div>
//     </form>
//   );
// }
