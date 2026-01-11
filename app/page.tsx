import AcmeLogo from "@/app/dashboard/ui/acme-logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { lusitana } from "@/app/dashboard/ui/fonts";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Home from "@/components/home/MainHome";

// import styles from "@/app/ui/home.module.css";
// import Navbar from "./ui/navbar";
// import Card from "./ui/card";
// import { Statususer } from "@/components/statususer";
// import HomeHeader from "@/components/home/home-header";
// import HomeNavbar from "@/components/home/home-navbar";
// import HomeBody from "@/components/home/home-body";

// https://www.youtube.com/watch?v=AH3xlNuui_A
export default function HomePage() {
  return (
    // <Home />
    <main className="flex flex-col min-h-screen p-6">
      <div className="flex shrink-0 md:h-32 h-20 items-end rounded-lg bg-blue-500 p-4 ">
        <AcmeLogo />
        {/* <Carousel /> */}
      </div>
      <div className="flex shrink-0 md:h-22 h-20 justify-center rounded-lg bg-slate-200 p-4 ">
        <Navbar />
      </div>
      <div className="flex flex-col md:flex-row grow gap-4 mt-4 ">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <div className="relative w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-black" />
          <p
            className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}
          >
            <strong>Welcome to Acme.</strong> This is the example for the{" "}
            <a href="https://nextjs.org/learn/" className="text-blue-500">
              Next.js Learn Course
            </a>
            , brought to you by Vercel.
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-6">
          <Image
            src="/hero-desktop.png"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
            priority
          />
          <Image
            src="/hero-mobile.png"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Screenshot of the dashboard project showing mobile version"
            priority
          />
        </div>
      </div>
    </main>
  );
}

// {
//   <main className="flex min-h-screen flex-col p-6">
//   <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-32">
//     <AcmeLogo />
//     {/* <Carousel /> */}
//   </div>
//   <div className="flex h-20 shrink-0 justify-center rounded-lg bg-slate-200 p-4 md:h-22">
//     <Navbar />
//   </div>
//   <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
//     <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
//       <div className="relative w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-black" />
//       <p
//         className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}
//       >
//         <strong>Welcome to Acme.</strong> This is the example for the{" "}
//         <a href="https://nextjs.org/learn/" className="text-blue-500">
//           Next.js Learn Course
//         </a>
//         , brought to you by Vercel.
//       </p>
//       <Link
//         href="/login"
//         className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
//       >
//         <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
//       </Link>
//     </div>
//     <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-6">
//       <Image
//         src="/hero-desktop.png"
//         width={1000}
//         height={760}
//         className="hidden md:block"
//         alt="Screenshots of the dashboard project showing desktop version"
//         priority
//       />
//       <Image
//         src="/hero-mobile.png"
//         width={560}
//         height={620}
//         className="block md:hidden"
//         alt="Screenshot of the dashboard project showing mobile version"
//       />
//     </div>
//   </div>
// </main>
// }

// {
//   /** <main className="flex min-h-screen flex-col p-6">
//       <HomeHeader />
//       <HomeNavbar />
//       <HomeBody />
//     </main> */
//   /* <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
// <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
//   <div className="relative w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-black" />
//   <p
//     className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}
//   >
//     <strong>Welcome to Acme.</strong> This is the example for the{" "}
//     <a href="https://nextjs.org/learn/" className="text-blue-500">
//       Next.js Learn Course
//     </a>
//     , brought to you by Vercel.
//   </p>
//   <Link
//     href="/login"
//     className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
//   >
//     <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
//   </Link>
// </div>
// <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-6">
//   <Image
//     src="/hero-desktop.png"
//     width={1000}
//     height={760}
//     className="hidden md:block"
//     alt="Screenshots of the dashboard project showing desktop version"
//     priority
//   />
//   <Image
//     src="/hero-mobile.png"
//     width={560}
//     height={620}
//     className="block md:hidden"
//     alt="Screenshot of the dashboard project showing mobile version"
//   />
// </div>
// </div> */
// }
