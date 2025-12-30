"use client";

import React, { useEffect, useState } from "react";
import { getSession, SignOut } from "../lib/uitls";
import { lusitana } from "../font/fonts";
import {
  Bars3Icon,
  GlobeAltIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { typeUserProfile } from "../models/user";
import Search from "./search";

// const SearchBar: React.FC<{ onSearch: (term: string) => void }> = ({
//   onSearch,
// }) => {
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const term = event.target.value;
//     setSearchTerm(term);
//     onSearch(term);
//   };

//   return (
//     <div className="relative flex flex-row justify-center items-center mx-auto text-center">
//       {/* <h2 className="text-2xl font-bold mb-4 animate-slide-in-left">
//         Search Products
//       </h2> */}
//       <input
//         type="text"
//         placeholder="Enter product name"
//         className="relative border p-3 rounded w-full md:w-1/2 animate-slide-in-right"
//         value={searchTerm}
//         onChange={handleSearchChange}
//       />
//       <div>
//         <MagnifyingGlassIcon className="h-6 w-6 absolute right-13 top-8 bg-red-300" />
//       </div>
//     </div>
//   );
// };

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [isLogedin, setIsLogedin] = useState(false);
  const [userProfile, setUserProfile] = useState<typeUserProfile>({
    name: "",
    email: "",
    image: "",
    role: "",
    expiredAt: "",
  });
  const hasuser = async () => {
    let user = await getSession();
    if (user) {
      setIsLogedin(true);
      setUserProfile({
        name: user.user.name,
        email: user.user.email,
        image: user.user.image,
        role: user.user.role,
        expiredAt: user.expires,
      });
      return user;
    } else {
      return null;
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    hasuser();
  }, []);

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
        <nav className="hidden md:flex md:flex-row items-center">
          {/* Search Product Section */}
          <div className="hidden md:flex md:flex-row items-center">
            <Search placeholder="Search products..." />
          </div>
          <ul className="md:flex md:flex-row items-center">
            <li>
              <Link href="/" className="mx-2 hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="mx-2 hover:underline">
                Dashboard
              </Link>
            </li>
            {isLogedin ? (
              <>
                {" "}
                <li>
                  {userProfile.name && userProfile.name.trim() !== "" ? (
                    <>
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img
                              alt=""
                              src={`${
                                userProfile?.image
                                  ? (userProfile?.image as string)
                                  : "https://github.com/shadcn.png"
                              }`}
                              // "https://github.com/shadcn.png"
                              // src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              className="size-8 rounded-full"
                            />
                          </MenuButton>
                        </div>
                        <MenuItems
                          transition
                          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                        >
                          <MenuItem>
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                            >
                              Name :{" "}
                              {`${
                                userProfile?.name
                                  ? userProfile?.name
                                  : "user.name"
                              }`}
                            </a>
                          </MenuItem>
                          <MenuItem>
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                            >
                              Email :{" "}
                              {`${
                                userProfile?.email
                                  ? userProfile?.email
                                  : "user.name"
                              }`}
                            </a>
                          </MenuItem>
                          <MenuItem>
                            <Button
                              className="mx-auto block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                              onClick={() => {
                                SignOut();
                              }}
                            >
                              Sign out
                            </Button>
                          </MenuItem>
                        </MenuItems>
                      </Menu>
                    </>
                  ) : (
                    <>
                      <Menu as="div" className="relative ml-3 mr-3">
                        <div>
                          <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img
                              alt=""
                              src={`${
                                userProfile?.image
                                  ? (userProfile?.image as string)
                                  : "https://github.com/shadcn.png"
                              }`}
                              // "https://github.com/shadcn.png"
                              // src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              className="size-8 rounded-full"
                            />
                          </MenuButton>
                        </div>
                        <MenuItems
                          transition
                          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                        >
                          <MenuItem>
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                            >
                              Name :{" "}
                              {`${
                                userProfile?.name
                                  ? userProfile?.name
                                  : "user.name"
                              }`}
                            </a>
                          </MenuItem>
                          <MenuItem>
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                            >
                              Email :{" "}
                              {`${
                                userProfile?.email
                                  ? userProfile?.email
                                  : "user.name"
                              }`}
                            </a>
                          </MenuItem>
                          <MenuItem>
                            <Button
                              className="mx-auto block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                              onClick={() => {
                                SignOut();
                              }}
                            >
                              Sign out
                            </Button>
                          </MenuItem>
                        </MenuItems>
                      </Menu>
                    </>
                  )}
                </li>
              </>
            ) : (
              <>
                {" "}
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
              </>
            )}
          </ul>
        </nav>
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
              {isLogedin ? (
                <>
                  {" "}
                  <li>
                    <Button
                      className="mx-2 hover:underline bg-blue-200 mt-2"
                      onClick={() => {
                        SignOut();
                      }}
                    >
                      Log out
                    </Button>
                  </li>
                </>
              ) : (
                <>
                  {" "}
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
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
