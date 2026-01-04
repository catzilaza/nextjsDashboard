"use client";

// Learn Next.js by Coding Your Own Dropbox Clone – Full Tutorial//
//  https://www.youtube.com/watch?v=IcOiX-jynfI//
//

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, CloudUpload, Menu, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { getLoginSession, SignOut } from "../lib/utils";
import { set } from "better-auth";

interface SerializedUser {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  role?: string | null | undefined;
  expiredAt?: string | null | undefined;
}

interface NavbarProps {
  user?: SerializedUser | null;
}

type typeUserProfile = SerializedUser;
// export type typeUserProfile = {
//   name?: string | null | undefined;
//   email?: string | null | undefined;
//   image?: string | null | undefined;
//   role?: string | null | undefined;
//   expiredAt?: string | null | undefined;
// };

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual auth logic

  const [userProfile, setUserProfile] = useState<typeUserProfile>({
    name: "",
    email: "",
    image: "",
    role: "",
    expiredAt: "",
  });
  const hasuser = async () => {
    let user = await getLoginSession();
    if (user) {
      setIsLoggedIn(true);
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

  useEffect(() => {
    hasuser();
  }, []);

  const isOnDashboard =
    pathname === "/dropbox/dashboard" ||
    pathname?.startsWith("/dropbox/dashboard/");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignOut = () => {
    SignOut();
  };

  return (
    <header
      className={`bg-default-50 border-b border-default-200 sticky top-0 z-50 transition-shadow ${
        isScrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="container mx-auto py-3 md:py-4 px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 z-10">
            <CloudUpload className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Droply</h1>
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-4 items-center">
            {/* Show these when user is signed in */}
            {isLoggedIn ? (
              <>
                {" "}
                <div className="flex flex-row justify-center items-center gap-2">
                  {!isOnDashboard && (
                    <Link
                      href="/dropbox/dashboard"
                      className="p-2 hover:bg-slate-100 rounded-lg"
                    >
                      Dashboard
                    </Link>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="p-0 bg-transparent min-w-0"
                        // content={<ChevronDown className="h-4 w-4 ml-2" />}
                      >
                        <ChevronDown className="h-4 w-4 ml-2" />
                        <div className="flex items-center gap-2">
                          <Avatar className="rounded-sm w-8 h-8">
                            <AvatarImage
                              src={`${
                                userProfile?.image
                                  ? (userProfile?.image as string)
                                  : "https://github.com/shadcn.png"
                              }`}
                              alt="@shadcn"
                            />
                            <AvatarFallback>
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-default-600 hidden sm:inline">
                            {`${
                              userProfile?.name
                                ? userProfile?.name
                                : "user.name"
                            }`}
                          </span>
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="start">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => alert("Profile")}>
                          Profile :{" "}
                          {`${
                            userProfile?.name ? userProfile?.name : "user.name"
                          }`}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => alert("My Files")}>
                          My Files
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => SignOut()}>
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="p-2 hover:bg-slate-200 rounded-md transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="p-2 hover:bg-slate-200 rounded-md transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <nav className="md:hidden flex items-center gap-2">
            {/* Show these when user is signed in */}
            {isLoggedIn ? (
              <>
                {" "}
                <div className="flex flex-row justify-center items-center gap-2">
                  {!isOnDashboard && <Link href="/dashboard">Dashboard</Link>}

                  <button
                    className="z-50 p-2"
                    onClick={() => toggleMobileMenu()}
                    aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                    data-menu-button="true"
                  >
                    {isMobileMenuOpen ? (
                      <X className="h-6 w-6 text-default-700" />
                    ) : (
                      <Menu className="h-6 w-6 text-default-700" />
                    )}
                  </button>
                  {/* Mobile Menu Overlay bg-black/20*/}
                  {isMobileMenuOpen && (
                    <div
                      className="fixed inset-0 bg-black/20 z-40 md:hidden"
                      onClick={() => setIsMobileMenuOpen(false)}
                      aria-hidden="true"
                    />
                  )}
                  <div
                    ref={mobileMenuRef}
                    className={`fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-default-50 z-40 flex flex-col pt-20 px-6 shadow-xl transition-transform duration-300 ease-in-out ${
                      isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                    } md:hidden`}
                  >
                    {isLoggedIn ? (
                      <>
                        {" "}
                        <div className="flex flex-col gap-6 bg-slate-400/70 p-4 rounded-md">
                          {/* User info */}
                          <div className="flex items-center justify-center gap-3 py-4 border-b border-default-200">
                            <Avatar className="rounded-lg w-10 h-10">
                              <AvatarImage
                                src={`${
                                  userProfile?.image
                                    ? (userProfile?.image as string)
                                    : "https://github.com/shadcn.png"
                                }`}
                                alt="@shadcn"
                              />
                              <AvatarFallback>
                                <User className="h-4 w-4" />
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">
                                {`${
                                  userProfile?.name
                                    ? userProfile?.name
                                    : "user.name"
                                }`}
                              </p>
                              <p className="text-sm text-default-500">
                                {`${
                                  userProfile?.email
                                    ? userProfile?.email
                                    : "user.email"
                                }`}
                              </p>
                            </div>
                          </div>

                          {/* Navigation links */}
                          <div className="flex flex-col gap-4">
                            {!isOnDashboard && (
                              <Link
                                href="/dropbox/dashboard"
                                className="py-2 px-3 hover:bg-default-100 rounded-md transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                Dashboard
                              </Link>
                            )}
                            <Link
                              href="/dropbox/dashboard?tab=profile"
                              className="py-2 px-3 hover:bg-default-100 rounded-md transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              Profile
                            </Link>
                            <button
                              className="py-2 px-3 text-left text-danger hover:bg-danger-50 rounded-md transition-colors mt-4"
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                handleSignOut();
                              }}
                            >
                              Sign Out
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {" "}
                        <div className="flex flex-col gap-4 items-center">
                          <Link
                            href="/sign-in"
                            className="w-full p-2 hover:bg-slate-200 rounded-md transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Sign In
                          </Link>
                          <Link
                            href="/sign-up"
                            className="w-full p-2 hover:bg-slate-200 rounded-md transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Sign Up
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-row">
                  <button
                    className="z-50 p-2"
                    onClick={() => toggleMobileMenu()}
                    aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                    data-menu-button="true"
                  >
                    {isMobileMenuOpen ? (
                      <X className="h-6 w-6 text-default-700" />
                    ) : (
                      <Menu className="h-6 w-6 text-default-700" />
                    )}
                  </button>
                  {/* Mobile Menu Overlay bg-black/20*/}
                  {isMobileMenuOpen && (
                    <div
                      className="fixed inset-0 bg-black/20 z-40 md:hidden"
                      onClick={() => setIsMobileMenuOpen(false)}
                      aria-hidden="true"
                    />
                  )}
                  <div
                    ref={mobileMenuRef}
                    className={`fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-default-50 z-40 flex flex-col pt-20 px-6 shadow-xl transition-transform duration-300 ease-in-out ${
                      isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                    } md:hidden`}
                  >
                    {isLoggedIn ? (
                      <>
                        {" "}
                        <div className="flex flex-col gap-6">
                          {/* User info */}
                          <div className="flex items-center gap-3 py-4 border-b border-default-200">
                            <Avatar className="rounded-sm w-8 h-8">
                              <AvatarImage
                                src={`${
                                  userProfile?.image
                                    ? (userProfile?.image as string)
                                    : "https://github.com/shadcn.png"
                                }`}
                                alt="@shadcn"
                              />
                              <AvatarFallback>
                                <User className="h-4 w-4" />
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">
                                {`${
                                  userProfile?.name
                                    ? userProfile?.name
                                    : "user.name"
                                }`}
                              </p>
                              <p className="text-sm text-default-500">
                                {`${
                                  userProfile?.email
                                    ? userProfile?.email
                                    : "user.email"
                                }`}
                              </p>
                            </div>
                          </div>

                          {/* Navigation links */}
                          <div className="flex flex-col gap-4">
                            {!isOnDashboard && (
                              <Link
                                href="/dropbox/dashboard"
                                className="py-2 px-3 hover:bg-default-100 rounded-md transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                Dashboard
                              </Link>
                            )}
                            <Link
                              href="/dropbox/dashboard?tab=profile"
                              className="py-2 px-3 hover:bg-default-100 rounded-md transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              Profile
                            </Link>
                            <button
                              className="py-2 px-3 text-left text-danger hover:bg-danger-50 rounded-md transition-colors mt-4"
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                handleSignOut();
                              }}
                            >
                              Sign Out
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {" "}
                        <div className="flex flex-col gap-4 items-center text-center bg-slate-600/10 p-4 rounded-md">
                          <Link
                            href="/login"
                            className="w-full p-2 hover:bg-slate-200 rounded-md transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Sign In
                          </Link>
                          <Link
                            href="/signup"
                            className="w-full p-2 hover:bg-slate-200 rounded-md transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Sign Up
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

// <header
//   className={`bg-default-50 border-b border-default-200 sticky top-0 z-50 transition-shadow ${
//     isScrolled ? "shadow-sm" : ""
//   }`}
// >
//   <div className="container mx-auto py-3 md:py-4 px-4 md:px-6">
//     <div className="flex justify-between items-center">
//       {/* Logo */}
//       <Link href="/" className="flex items-center gap-2 z-10">
//         <CloudUpload className="h-6 w-6 text-primary" />
//         <h1 className="text-xl font-bold">Droply</h1>
//       </Link>
//       {/* Desktop Navigation */}
//       <nav className="hidden md:flex gap-4 items-center">
//         {/* Show these when user is signed in */}
//         {isLoggedIn ? (
//           <>
//             {" "}
//             <div>
//               {!isOnDashboard && (
//                 <Link href="/dashboard">
//                   <Button variant="link" color="primary">
//                     Dashboard
//                   </Button>
//                 </Link>
//               )}
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button
//                     variant="outline"
//                     className="p-0 bg-transparent min-w-0"
//                     // content={<ChevronDown className="h-4 w-4 ml-2" />}
//                   >
//                     <ChevronDown className="h-4 w-4 ml-2" />
//                     <div className="flex items-center gap-2">
//                       <Avatar className="rounded-sm w-8 h-8">
//                         <AvatarImage
//                           src={`${
//                             userProfile?.image
//                               ? (userProfile?.image as string)
//                               : "https://github.com/shadcn.png"
//                           }`}
//                           alt="@shadcn"
//                         />
//                         <AvatarFallback>
//                           <User className="h-4 w-4" />
//                         </AvatarFallback>
//                       </Avatar>
//                       <span className="text-default-600 hidden sm:inline">
//                         {`${
//                           userProfile?.name
//                             ? userProfile?.name
//                             : "user.name"
//                         }`}
//                       </span>
//                     </div>
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent className="w-56" align="start">
//                   <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                   <DropdownMenuGroup>
//                     <DropdownMenuItem onClick={() => alert("Profile")}>
//                       Profile :{" "}
//                       {`${
//                         userProfile?.name ? userProfile?.name : "user.name"
//                       }`}
//                     </DropdownMenuItem>
//                     <DropdownMenuItem onClick={() => alert("My Files")}>
//                       My Files
//                     </DropdownMenuItem>
//                   </DropdownMenuGroup>
//                   <DropdownMenuSeparator />
//                   <DropdownMenuItem onClick={() => alert("Log out")}>
//                     Log out
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </div>
//           </>
//         ) : (
//           <>
//             <Link href="/login">
//               <Button variant="link" color="primary">
//                 Sign In
//               </Button>
//             </Link>
//             <Link href="/signup">
//               <Button variant="link" color="primary">
//                 Sign Up
//               </Button>
//             </Link>
//           </>
//         )}
//       </nav>

//       {/* Mobile Menu Button */}
//       <nav className="md:hidden flex items-center gap-2">
//         {/* Show these when user is signed in */}
//         {isLoggedIn ? (
//           <>
//             {" "}
//             <div className="flex flex-row">
//               {!isOnDashboard && (
//                 <Link href="/dashboard">
//                   <Button variant="link" color="primary">
//                     Dashboard
//                   </Button>
//                 </Link>
//               )}
//               <Avatar className="rounded-sm w-8 h-8">
//                 <AvatarImage
//                   src={`${
//                     userProfile?.image
//                       ? (userProfile?.image as string)
//                       : "https://github.com/shadcn.png"
//                   }`}
//                   alt="@shadcn"
//                 />
//                 <AvatarFallback>
//                   <User className="h-4 w-4" />
//                 </AvatarFallback>
//               </Avatar>

//               <button
//                 className="z-50 p-2"
//                 onClick={() => toggleMobileMenu()}
//                 aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
//                 data-menu-button="true"
//               >
//                 {isMobileMenuOpen ? (
//                   <X className="h-6 w-6 text-default-700" />
//                 ) : (
//                   <Menu className="h-6 w-6 text-default-700" />
//                 )}
//               </button>
//               {/* Mobile Menu Overlay bg-black/20*/}
//               {isMobileMenuOpen && (
//                 <div
//                   className="fixed inset-0 bg-black/20 z-40 md:hidden"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                   aria-hidden="true"
//                 />
//               )}
//               <div
//                 ref={mobileMenuRef}
//                 className={`fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-default-50 z-40 flex flex-col pt-20 px-6 shadow-xl transition-transform duration-300 ease-in-out ${
//                   isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
//                 } md:hidden`}
//               >
//                 {isLoggedIn ? (
//                   <>
//                     {" "}
//                     <div className="flex flex-col gap-6">
//                       {/* User info */}
//                       <div className="flex items-center gap-3 py-4 border-b border-default-200">
//                         <Avatar className="rounded-sm w-8 h-8">
//                           <AvatarImage
//                             src={`${
//                               userProfile?.image
//                                 ? (userProfile?.image as string)
//                                 : "https://github.com/shadcn.png"
//                             }`}
//                             alt="@shadcn"
//                           />
//                           <AvatarFallback>
//                             <User className="h-4 w-4" />
//                           </AvatarFallback>
//                         </Avatar>
//                         <div>
//                           <p className="font-medium">
//                             {`${
//                               userProfile?.name
//                                 ? userProfile?.name
//                                 : "user.name"
//                             }`}
//                           </p>
//                           <p className="text-sm text-default-500">
//                             {`${
//                               userProfile?.email
//                                 ? userProfile?.email
//                                 : "user.email"
//                             }`}
//                           </p>
//                         </div>
//                       </div>

//                       {/* Navigation links */}
//                       <div className="flex flex-col gap-4">
//                         {!isOnDashboard && (
//                           <Link
//                             href="/dashboard"
//                             className="py-2 px-3 hover:bg-default-100 rounded-md transition-colors"
//                             onClick={() => setIsMobileMenuOpen(false)}
//                           >
//                             Dashboard
//                           </Link>
//                         )}
//                         <Link
//                           href="/dashboard?tab=profile"
//                           className="py-2 px-3 hover:bg-default-100 rounded-md transition-colors"
//                           onClick={() => setIsMobileMenuOpen(false)}
//                         >
//                           Profile
//                         </Link>
//                         <button
//                           className="py-2 px-3 text-left text-danger hover:bg-danger-50 rounded-md transition-colors mt-4"
//                           onClick={() => {
//                             setIsMobileMenuOpen(false);
//                             handleSignOut();
//                           }}
//                         >
//                           Sign Out
//                         </button>
//                       </div>
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     {" "}
//                     <div className="flex flex-col gap-4 items-center">
//                       <Link
//                         href="/sign-in"
//                         className="w-full"
//                         onClick={() => setIsMobileMenuOpen(false)}
//                       >
//                         <Button
//                           variant="link"
//                           color="primary"
//                           className="w-full"
//                         >
//                           Sign In
//                         </Button>
//                       </Link>
//                       <Link
//                         href="/sign-up"
//                         className="w-full"
//                         onClick={() => setIsMobileMenuOpen(false)}
//                       >
//                         <Button
//                           variant="outline"
//                           color="primary"
//                           className="w-full"
//                         >
//                           Sign Up
//                         </Button>
//                       </Link>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>
//           </>
//         ) : (
//           <>
//             <div className="flex flex-row">
//               {/* {!isOnDashboard && (
//                 <Link href="/dashboard">
//                   <Button variant="link" color="primary">
//                     Dashboard
//                   </Button>
//                 </Link>
//               )} */}
//               {/* <Avatar className="rounded-sm w-8 h-8">
//                 <AvatarImage
//                   src={`${
//                     userProfile?.image
//                       ? (userProfile?.image as string)
//                       : "https://github.com/shadcn.png"
//                   }`}
//                   alt="@shadcn"
//                 />
//                 <AvatarFallback>
//                   <User className="h-4 w-4" />
//                 </AvatarFallback>
//               </Avatar> */}

//               <button
//                 className="z-50 p-2"
//                 onClick={() => toggleMobileMenu()}
//                 aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
//                 data-menu-button="true"
//               >
//                 {isMobileMenuOpen ? (
//                   <X className="h-6 w-6 text-default-700" />
//                 ) : (
//                   <Menu className="h-6 w-6 text-default-700" />
//                 )}
//               </button>
//               {/* Mobile Menu Overlay bg-black/20*/}
//               {isMobileMenuOpen && (
//                 <div
//                   className="fixed inset-0 bg-black/20 z-40 md:hidden"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                   aria-hidden="true"
//                 />
//               )}
//               <div
//                 ref={mobileMenuRef}
//                 className={`fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-default-50 z-40 flex flex-col pt-20 px-6 shadow-xl transition-transform duration-300 ease-in-out ${
//                   isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
//                 } md:hidden`}
//               >
//                 {isLoggedIn ? (
//                   <>
//                     {" "}
//                     <div className="flex flex-col gap-6">
//                       {/* User info */}
//                       <div className="flex items-center gap-3 py-4 border-b border-default-200">
//                         <Avatar className="rounded-sm w-8 h-8">
//                           <AvatarImage
//                             src={`${
//                               userProfile?.image
//                                 ? (userProfile?.image as string)
//                                 : "https://github.com/shadcn.png"
//                             }`}
//                             alt="@shadcn"
//                           />
//                           <AvatarFallback>
//                             <User className="h-4 w-4" />
//                           </AvatarFallback>
//                         </Avatar>
//                         <div>
//                           <p className="font-medium">
//                             {`${
//                               userProfile?.name
//                                 ? userProfile?.name
//                                 : "user.name"
//                             }`}
//                           </p>
//                           <p className="text-sm text-default-500">
//                             {`${
//                               userProfile?.email
//                                 ? userProfile?.email
//                                 : "user.email"
//                             }`}
//                           </p>
//                         </div>
//                       </div>

//                       {/* Navigation links */}
//                       <div className="flex flex-col gap-4">
//                         {!isOnDashboard && (
//                           <Link
//                             href="/dashboard"
//                             className="py-2 px-3 hover:bg-default-100 rounded-md transition-colors"
//                             onClick={() => setIsMobileMenuOpen(false)}
//                           >
//                             Dashboard
//                           </Link>
//                         )}
//                         <Link
//                           href="/dashboard?tab=profile"
//                           className="py-2 px-3 hover:bg-default-100 rounded-md transition-colors"
//                           onClick={() => setIsMobileMenuOpen(false)}
//                         >
//                           Profile
//                         </Link>
//                         <button
//                           className="py-2 px-3 text-left text-danger hover:bg-danger-50 rounded-md transition-colors mt-4"
//                           onClick={() => {
//                             setIsMobileMenuOpen(false);
//                             handleSignOut();
//                           }}
//                         >
//                           Sign Out
//                         </button>
//                       </div>
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     {" "}
//                     <div className="flex flex-col gap-4 items-center">
//                       <Link
//                         href="/login"
//                         className="w-full"
//                         onClick={() => setIsMobileMenuOpen(false)}
//                       >
//                         <Button
//                           variant="link"
//                           color="primary"
//                           className="w-full"
//                         >
//                           Sign In
//                         </Button>
//                       </Link>
//                       <Link
//                         href="/signup"
//                         className="w-full"
//                         onClick={() => setIsMobileMenuOpen(false)}
//                       >
//                         <Button
//                           variant="outline"
//                           color="primary"
//                           className="w-full"
//                         >
//                           Sign Up
//                         </Button>
//                       </Link>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>
//           </>
//         )}
//       </nav>
//     </div>
//   </div>
// </header>
