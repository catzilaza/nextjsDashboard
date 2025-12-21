"use client";

import {
  Bars3Icon,
  GlobeAltIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
// import { lusitana } from "@/fonts";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Lusitana } from "next/font/google";
import { useState } from "react";

export const lusitana = Lusitana({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-lusitana",
});
const NavbarLanding = () => {
  const [open, setOpen] = useState(false);
  return (
    <section className="border-b-2 border-white bg-gradient-to-r from-sky-600 to-indigo-600 text-white">
      <div className="flex flex-col md:flex-row items-center md:justify-between mx-auto px-6 py-4 max-w-6xl">
        <div
          className={`${lusitana.className} text-white hidden lg:flex items-center`}
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
        <nav className="hidden md:flex items-center gap-4">
          <Link href="/home" className="mx-2 hover:underline">
            Home
          </Link>
          <Link href="/login" className="mx-2 hover:underline">
            Log in
          </Link>
          <Link href="/register" className="mx-2 hover:underline">
            Register
          </Link>
          <Link href="/dashboard" className="mx-2 hover:underline">
            Dashboard
          </Link>
        </nav>

        {/* Mobile dropdown */}
        <div className={`${open ? "block" : "hidden"} md:hidden w-full mt-3`}>
          <nav className="flex flex-col gap-2 bg-white/5 rounded-md p-3">
            <Link
              href="/home"
              className="block px-2 py-2 rounded hover:bg-white/10"
            >
              Home
            </Link>
            <Link
              href="/login"
              className="block px-2 py-2 rounded hover:bg-white/10"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="block px-2 py-2 rounded hover:bg-white/10"
            >
              Register
            </Link>
            <Link
              href="/dashboard"
              className="block px-2 py-2 rounded hover:bg-white/10"
            >
              Dashboard
            </Link>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default NavbarLanding;
