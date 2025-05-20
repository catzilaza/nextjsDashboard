"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown, CloudUpload, Menu, User, X } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname, useRouter } from "next/navigation";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { SignOut } from "@/lib/utils/dropbox/uitls";
import { getSession } from "@/lib/utils/dropbox/uitls";
// import SignOut from "@/components/auth/signout/signout-form";
// import { useSession } from "next-auth/react";

interface SerializedUser {
  id: string;
  name?: string | null;
  email?: string | null;
  role?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  imageUrl?: string | null;
  username?: string | null;
  emailAddress?: string | null;
}

interface NavbarProps {
  user?: SerializedUser | null;
}

type Checked = DropdownMenuCheckboxItemProps["checked"];

type typeUserProfile = {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  role?: string | null | undefined;
  expiredAt?: string | null | undefined;
};

export default function Navbar({ user }: NavbarProps) {
  //   const { signOut } = useClerk();
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

  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const [testSignIn, testsetSignIn] = useState(false);
  const [testSignOut, testsetSignOut] = useState(false);

  //   const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);
  //   const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false);
  //   const [showPanel, setShowPanel] = React.useState<Checked>(false);

  // Check if we're on the dashboard page
  const isOnDashboard =
    pathname === "/dashboard" ||
    pathname?.startsWith("/dashboard/") ||
    "/dropbox";

  // useEffect(() => {
  //   alert(`PathName : ${pathname.toString()}`);
  // }, [pathname]);

  // get session
  useEffect(() => {
    hasuser();
  }, []);

  // console.log("***** userProfile : ", userProfile);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Handle clicks outside the mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        // Check if the click is not on the menu button (which has its own handler)
        const target = event.target as HTMLElement;
        if (!target.closest('[data-menu-button="true"]')) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const handleSignOut = async () => {
    alert("handleSignOut");
    await SignOut();
  };

  // Process user data with defaults if not provided
  const userDetails = {
    name: userProfile ? `${userProfile.name || ""}`.trim() : "",
    emails: userProfile ? `${userProfile.email || ""}`.trim() : "",
    role: userProfile ? `${userProfile.role || ""}`.trim() : "",
    expiredAt: userProfile ? `${userProfile.expiredAt || ""}`.trim() : "",
    initial: userProfile
      ? `${userProfile.name || ""}`
          .trim()
          .split(" ")
          .map((name) => name?.[0] || "")
          .join("")
          .toUpperCase() || "U"
      : "U",
    displayNames: userProfile
      ? userProfile.name
        ? `${userProfile.name}`
        : userProfile.name || userProfile.email || "User"
      : "User",

    fullName: user
      ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
      : "",
    initials: user
      ? `${user.firstName || ""} ${user.lastName || ""}`
          .trim()
          .split(" ")
          .map((name) => name?.[0] || "")
          .join("")
          .toUpperCase() || "U"
      : "U",
    displayName: user
      ? user.firstName && user.lastName
        ? `${user.firstName} ${user.lastName}`
        : user.firstName || user.username || user.emailAddress || "User"
      : "User",
    email: user?.emailAddress || "",
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div
      className={`bg-slate-200 border-b sticky top-0 z-50 transition-shadow ${
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
          <div className="hidden md:flex gap-4 items-center">
            {/* Show these buttons when user is signed out */}
            {!isLogedin ? (
              <>
                <div>
                  {/* SignedOut */}
                  <Link href="/login" className="mr-4">
                    <Button variant="default" color="primary">
                      Log In
                    </Button>
                  </Link>
                  <Link href="/signup">
                    {" "}
                    <Button variant="default" color="primary">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <>
                {/* Show these when user is signed in */}
                <div>
                  {/* SignedIn */}
                  <div className="flex items-center gap-4">
                    {!isOnDashboard && (
                      <Link href="/dashboard">
                        <Button variant="default" color="primary">
                          Dashboard
                        </Button>
                      </Link>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="p-0 bg-transparent min-w-0"
                        >
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8 flex-shrink-0">
                              <AvatarImage
                                // src={
                                //   user?.imageUrl ||
                                //   "https://github.com/shadcn.png" ||
                                //   undefined
                                // }
                                src={`${
                                  userProfile.image
                                    ? userProfile.image
                                    : "https://github.com/shadcn.png"
                                }`}
                              />
                              <AvatarFallback>
                                {/* {userDetails.initials} */}
                                {userDetails.initial}
                                <User className="h-4 w-4" />
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-default-600 hidden sm:inline">
                              {userDetails.displayName}
                            </span>
                          </div>
                          <ChevronDown className="h-4 w-4 ml-2" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          key="profile"
                          onClick={() => router.push("/dashboard?tab=profile")}
                          //   checked={showStatusBar}
                          //   onCheckedChange={setShowStatusBar}
                          //   description={userDetails.email || "View your profile"}
                        >
                          Profile :{" "}
                          {userDetails?.emails
                            ? userDetails?.emails
                            : "View your profile"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          key="files"
                          onClick={() => router.push("/dashboard")}
                          //   checked={showActivityBar}
                          //   onCheckedChange={setShowActivityBar}
                          //   disabled
                          //   description="Manage your files"
                        >
                          My Files
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          key="logout"
                          className="text-danger"
                          color="danger"
                          onClick={handleSignOut}
                          //   checked={showPanel}
                          //   onCheckedChange={setShowPanel}
                          //   description="Sign out of your account"
                        >
                          Sign Out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </>
            )}

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              {isLogedin && (
                <>
                  {" "}
                  <div>
                    {/* SignedIn */}
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarImage
                        src={
                          user?.imageUrl ||
                          "https://github.com/shadcn.png" ||
                          undefined
                        }
                      />
                      <AvatarFallback>
                        {userDetails.initials}
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <button
                    className="z-50 p-2"
                    onClick={toggleMobileMenu}
                    aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                    data-menu-button="true"
                  >
                    {isMobileMenuOpen ? (
                      <X className="h-6 w-6 text-default-700" />
                    ) : (
                      <Menu className="h-6 w-6 text-default-700" />
                    )}
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
              <div
                className="fixed inset-0 bg-black/20 z-40 md:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-hidden="true"
              />
            )}

            {/* Mobile Menu */}
            <div
              ref={mobileMenuRef}
              className={`fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-default-50 z-40 flex flex-col pt-20 px-6 shadow-xl transition-transform duration-300 ease-in-out ${
                isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
              } md:hidden`}
            >
              {!isLogedin ? (
                <>
                  <div>
                    {/* SignedOut */}
                    <div className="flex flex-col gap-4 items-center">
                      <Link
                        href="/login"
                        className="w-full"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Button
                          variant="default"
                          color="primary"
                          className="w-full"
                        >
                          Log In
                        </Button>
                      </Link>
                      <Link
                        href="/signup"
                        className="w-full"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Button
                          variant="default"
                          color="primary"
                          className="w-full"
                        >
                          Sign Up
                        </Button>
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  <div>
                    {/* SignedIn */}
                    <div className="flex flex-col gap-6">
                      {/* User info */}
                      <div className="flex items-center gap-3 py-4 border-b border-default-200">
                        <Avatar>
                          <AvatarImage
                            // src={
                            //   user?.imageUrl ||
                            //   "https://github.com/shadcn.png" ||
                            //   undefined
                            // }
                            src={`${
                              userProfile.image
                                ? userProfile.image
                                : "https://github.com/shadcn.png"
                            }`}
                          />
                          <AvatarFallback>
                            {/* {userDetails.initials} */}
                            {userDetails.initial}
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>

                        <div>
                          <p className="font-medium">
                            {userDetails.displayNames}
                          </p>
                          <p className="text-sm text-default-500">
                            {userDetails.emails}
                            {/* <p className="font-medium">{userDetails.displayName}</p>
                      <p className="text-sm text-default-500">
                        {userDetails.email} */}
                          </p>
                        </div>
                      </div>

                      {/* Navigation links */}
                      <div className="flex flex-col gap-4">
                        {!isOnDashboard && (
                          <Link
                            href="/dashboard"
                            className="py-2 px-3 hover:bg-default-100 rounded-md transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Dashboard
                          </Link>
                        )}
                        <Link
                          href="/dashboard?tab=profile"
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
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// <DropdownMenu>
//   <DropdownMenuTrigger>
//     Open
//     {/* <div className="flex items-center gap-2">
//       <Avatar
//            name={userDetails.initials}
//            size="sm"
//            src={user?.imageUrl || undefined}
//         className="h-8 w-8 flex-shrink-0"
//            fallback={<User className="h-4 w-4" />}
//       />
//       <span className="text-default-600 hidden sm:inline">
//         {userDetails.displayName}
//       </span>
//     </div> */}
//     <ChevronDown className="h-4 w-4 ml-2" />
//   </DropdownMenuTrigger>
//   <DropdownMenuContent aria-label="User actions">
//     <DropdownMenuItem
//       key="profile"
//       //   description={userDetails.email || "View your profile"}
//       //   onClick={() => router.push("/dashboard?tab=profile")}
//     >
//       Profile
//     </DropdownMenuItem>
//     <DropdownMenuItem
//       key="files"
//       //   description="Manage your files"
//       //   onClick={() => router.push("/dashboard")}
//     >
//       My Files
//     </DropdownMenuItem>
//     <DropdownMenuItem
//       key="logout"
//       //   description="Sign out of your account"
//       className="text-danger"
//       color="danger"
//       //   onClick={handleSignOut}
//     >
//       Sign Out
//     </DropdownMenuItem>
//   </DropdownMenuContent>
// </DropdownMenu>
