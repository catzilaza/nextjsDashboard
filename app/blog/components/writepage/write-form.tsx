"use client";

import { z } from "zod";
import { ChangeEvent, useActionState, useState, useRef } from "react";
import { postDataBlogAction } from "@/app/blog/actions/blogAction";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { lusitana } from "@/app/fonts";
import AtSymbolIcon from "@heroicons/react/20/solid/AtSymbolIcon";
import KeyIcon from "@heroicons/react/20/solid/KeyIcon";
// import { Button } from "@/components/ui/button";
import { ArrowRightIcon, Loader2 } from "lucide-react";
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import ImageWrapper from "./image-wrapper";
import { useDebouncedCallback } from "use-debounce";

//https://www.youtube.com/watch?v=t6tSwxIqXao
//File uploads in next.js using vercel blob

const PostDataBlogSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  desc: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  // img: z.string().min(2, {
  //   message: "Title must be at least 2 characters.",
  // }),
  imgFile: z
    .instanceof(File, {
      message: "Title must be at least 2 characters.",
    })
    .optional(),
});

type PostDataBlogState = {
  errors?: {
    name?: string[] | null;
    title?: string[] | null;
    // img?: string[] | null;
    desc?: string[] | null;
    errMsg?: string | null;
    imgFile?: string[] | null;
  } | null;
  message?: string | undefined | null;
};

export default function WriteForm() {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const htmlInputRef = useRef<HTMLInputElement>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [probImage, setProbImage] = useState<string>("");
  const initialState: PostDataBlogState = { message: "", errors: {} };
  const [state, formAction, isPending] = useActionState<
    PostDataBlogState,
    FormData
  >(postDataBlogAction, initialState);

  // const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
  //   e.preventDefault();
  //   setProbImage(e.target.value);
  // };

  const handleFileChange = async () => {
    if (htmlInputRef.current?.files?.[0]) {
      setSelectedFileName(htmlInputRef.current.files[0].name);
      setProbImage(htmlInputRef.current.files[0].name.trim());
      alert(htmlInputRef.current.files[0].name);
      setProgress(80);
      setUploading(true);
    } else {
      setSelectedFileName(null);
      alert("null");
    }
  };

  return (
    <>
      <div className="w-[600px]">
        <form action={formAction} className="space-y-3">
          <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
            <h1 className={`${lusitana.className} mb-3 text-2xl`}>
              Please Sign Up to Website.
            </h1>
            <div className="w-full">
              <div>
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                  htmlFor="title"
                >
                  Title
                </label>
                <div className="relative">
                  <input
                    className={
                      "peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    }
                    id="title"
                    type="text"
                    name="title"
                    // defaultValue={}
                    // value={}
                    placeholder="Enter your title"
                    required
                  />
                  <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                  {state.errors?.title && (
                    <p className="text-sm text-red-500">{state.errors.title}</p>
                  )}
                </div>
              </div>
              <div>
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                  htmlFor="image"
                >
                  {/* {selectedFileName || "Choose a file to upload"} */}
                  Image
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="imgFile"
                    // type="text"
                    name="imgFile"
                    // onChange={(e) => {
                    //   handleImage(e);
                    // }}
                    onChange={handleFileChange}
                    placeholder="Enter your image"
                    required
                    ref={htmlInputRef}
                    type="file"
                    accept="image/jpeg, image/png, image/gif"
                  />
                  <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                  {state.errors?.imgFile && (
                    <p className="text-sm text-red-500">
                      {state.errors.imgFile}
                    </p>
                  )}
                  {uploading && (
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                      <p className="text-sm text-gray-500 mt-2 text-center">
                        {Math.round(progress)}% uploaded
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                  htmlFor="password"
                >
                  Description
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="desc"
                    type="text"
                    name="desc"
                    placeholder="Enter deccription"
                    required
                    minLength={6}
                  />
                  {state.errors?.desc && (
                    <p className="text-sm text-red-500">{state.errors.desc}</p>
                  )}
                  <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              </div>
              <div className="mt-4">
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                  htmlFor="name"
                >
                  Name
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter deccription"
                    required
                    minLength={6}
                  />
                  {state.errors?.name && (
                    <p className="text-sm text-red-500">{state.errors.name}</p>
                  )}
                  <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              </div>
            </div>
            {/* <p aria-live="polite">{state?.message}</p> */}

            <button
              className="mt-4 w-full flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
              disabled={isPending}
              // disabled={uploading || !selectedFileName}
            >
              {isPending ? (
                <>
                  Please wait...{" "}
                  <Loader2 className="animate-spin ml-auto h-5 w-5 text-gray-50" />
                </>
              ) : (
                <>
                  Submit{" "}
                  <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
                </>
              )}
            </button>
            <div className="flex h-8 items-end space-x-1">
              {/* Add form errors here */}
              {state.errors?.errMsg && (
                <p className="text-red-500">{state.errors.errMsg}</p>
              )}
              {state.message && (
                <p className="text-green-500">{state.message}</p>
              )}
            </div>

            <button
              disabled={isPending}
              onClick={() => {
                redirect("/");
              }}
              className="mt-4 w-full flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
            >
              Cancle
            </button>
          </div>
        </form>
      </div>
      <div className="bg-gray-200 rounded-md justify-center items-center">
        <ImageWrapper probImage={probImage} />
      </div>
    </>
  );
}

// <>
//   <div className="w-[600px]">
//     <form action={formAction} className="space-y-3">
//       <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
//         <h1 className={`${lusitana.className} mb-3 text-2xl`}>
//           Please Sign Up to Website.
//         </h1>
//         <div className="w-full">
//           <div>
//             <label
//               className="mb-3 mt-5 block text-xs font-medium text-gray-900"
//               htmlFor="title"
//             >
//               Title
//             </label>
//             <div className="relative">
//               <input
//                 className={
//                   "peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
//                 }
//                 id="title"
//                 type="text"
//                 name="title"
//                 // defaultValue={}
//                 // value={}
//                 placeholder="Enter your title"
//                 required
//               />
//               <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
//               {state.errors?.title && (
//                 <p className="text-sm text-red-500">{state.errors.title}</p>
//               )}
//             </div>
//           </div>
//           <div>
//             <label
//               className="mb-3 mt-5 block text-xs font-medium text-gray-900"
//               htmlFor="image"
//             >
//               {/* {selectedFileName || "Choose a file to upload"} */}
//               Image
//             </label>
//             <div className="relative">
//               <input
//                 className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
//                 id="img"
//                 type="text"
//                 name="img"
//                 onChange={(e) => {
//                   handleImage(e);
//                 }}
//                 placeholder="Enter your image"
//                 required
//                 //                     name="file"
//                 // // ref={htmlInputRef}
//                 // type="file"
//                 // accept="image/jpeg, image/png, image/gif"
//                 // required
//               />
//               <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
//               {state.errors?.img && (
//                 <p className="text-sm text-red-500">{state.errors.img}</p>
//               )}
//               {/* {uploading && (
//           <div className="w-full bg-gray-200 rounded-full h-2.5">
//             <div
//               className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
//               style={{ width: `${progress}%` }}
//             ></div>
//             <p className="text-sm text-gray-500 mt-2 text-center">
//               {Math.round(progress)}% uploaded
//             </p>
//           </div>
//         )} */}
//             </div>
//           </div>
//           <div className="mt-4">
//             <label
//               className="mb-3 mt-5 block text-xs font-medium text-gray-900"
//               htmlFor="password"
//             >
//               Description
//             </label>
//             <div className="relative">
//               <input
//                 className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
//                 id="desc"
//                 type="text"
//                 name="desc"
//                 placeholder="Enter deccription"
//                 required
//                 minLength={6}
//               />
//               {state.errors?.desc && (
//                 <p className="text-sm text-red-500">{state.errors.desc}</p>
//               )}
//               <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
//             </div>
//           </div>
//           <div className="mt-4">
//             <label
//               className="mb-3 mt-5 block text-xs font-medium text-gray-900"
//               htmlFor="name"
//             >
//               Name
//             </label>
//             <div className="relative">
//               <input
//                 className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
//                 id="name"
//                 type="text"
//                 name="name"
//                 placeholder="Enter deccription"
//                 required
//                 minLength={6}
//               />
//               {state.errors?.name && (
//                 <p className="text-sm text-red-500">{state.errors.name}</p>
//               )}
//               <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
//             </div>
//           </div>
//         </div>
//         {/* <p aria-live="polite">{state?.message}</p> */}

//         <button
//           className="mt-4 w-full flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
//           disabled={isPending}
//           // disabled={uploading || !selectedFileName}
//         >
//           {isPending ? (
//             <>
//               Please wait...{" "}
//               <Loader2 className="animate-spin ml-auto h-5 w-5 text-gray-50" />
//             </>
//           ) : (
//             <>
//               Submit{" "}
//               <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
//             </>
//           )}
//         </button>
//         <div className="flex h-8 items-end space-x-1">
//           {/* Add form errors here */}
//           {state.errors?.errMsg && (
//             <p className="text-red-500">{state.errors.errMsg}</p>
//           )}
//           {state.message && (
//             <p className="text-green-500">{state.message}</p>
//           )}
//         </div>

//         <button
//           disabled={isPending}
//           onClick={() => {
//             redirect("/");
//           }}
//           className="mt-4 w-full flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
//         >
//           Cancle
//         </button>
//       </div>
//     </form>
//   </div>
//   <div className="bg-gray-200 rounded-md justify-center items-center">
//     <ImageWrapper probImage={probImage} />
//   </div>
// </>
