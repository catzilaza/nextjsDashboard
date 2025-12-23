"use client";

import {
  Bars3Icon,
  GlobeAltIcon,
  XMarkIcon,
  ArrowRightIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";
import { lusitana } from "@/app/fonts";
import Link from "next/link";
import { useState } from "react";
import NavLinksLanding from "./NavLinkLanding";

// export const lusitana = Lusitana({
//   subsets: ["latin"],
//   weight: ["400", "700"],
//   display: "swap",
//   variable: "--font-lusitana",
// });

//
const NavbarLanding = () => {
  const [open, setOpen] = useState(false);
  return (
    <section className="border-b-2 border-white bg-gradient-to-r from-sky-600 to-indigo-600 text-white">
      <div className="flex flex-col md:flex-row items-center md:justify-between mx-auto px-6 py-4 w-full">
        <div
          className={`${lusitana.className} text-white hidden lg:flex items-start`}
        >
          <GlobeAltIcon className="h-10 w-10 rotate-[15deg]" />
          <p className="ml-3 text-[28px] sm:text-3xl md:text-[44px] font-extrabold">
            Acme
          </p>
        </div>
        {/* Hamburger button for small screens */}
        <div className="md:hidden ml-auto">
          <button
            onClick={() => setOpen((s) => !s)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="p-2 rounded-md bg-white/10 hover:bg-white/20"
          >
            {open ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Desktop nav */}
        {/* <nav className="hidden md:flex md:flex-row items-center bg-yellow">
          <ul className="md:flex md:flex-row items-center">
            <li>
              <Link href="/" className="mx-2 hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/login" className="mx-2 hover:underline">
                Log in
              </Link>
            </li>
            <li>
              <Link href="/register" className="mx-2 hover:underline">
                Register
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="mx-2 hover:underline">
                Dashboard
              </Link>
            </li>
          </ul>
        </nav> */}

        <div className="hidden md:flex items-center">
          <NavLinksLanding />
          <Link
            href="/signup"
            className="flex w-auto grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium md:justify-start md:p-2 md:px-3"
          >
            <IdentificationIcon className="w-5 md:w-6" />
            <span className="hidden md:block">Sign up</span>{" "}
          </Link>
          <Link
            href="/login"
            className="flex w-auto grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium md:justify-start md:p-2 md:px-3"
          >
            <ArrowRightIcon className="w-5 md:w-6" />
            <span className="hidden md:block">Log in</span>{" "}
          </Link>
        </div>

        {/* Mobile dropdown */}
        <div className={`${open ? "block" : "hidden"} md:hidden w-full mt-3`}>
          <nav className="flex flex-col gap-2 bg-white/5 rounded-md p-3">
            <ul>
              <li>
                <Link
                  href="/home"
                  className="block px-2 py-2 rounded hover:bg-white/10"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="block px-2 py-2 rounded hover:bg-white/10"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="block px-2 py-2 rounded hover:bg-white/10"
                >
                  Log in
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="block px-2 py-2 rounded hover:bg-white/10"
                >
                  Register
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default NavbarLanding;

// <div className="hidden md:flex items-center gap-4 bg-yellow">
//   <div className="flex flex-row items-center md:px-2 h-20 px-3 py-1 ">
//     <div className="flex space-x-2">
//       <NavLinksLanding />
//       <Link
//         href="/signup"
//         className="flex h-[48px] w-auto grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3"
//       >
//         <span className="hidden md:block">Sign up</span>{" "}
//         <IdentificationIcon className="w-5 md:w-6" />
//       </Link>
//       <Link
//         href="/login"
//         className="flex h-[48px] w-auto grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3"
//       >
//         <span className="hidden md:block">Log in</span>{" "}
//         <ArrowRightIcon className="w-5 md:w-6" />
//       </Link>
//     </div>
//   </div>
// </div>
