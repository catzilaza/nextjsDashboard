"use client";

import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { getLoginSession } from "../lib/utils";
import Navbar from "../components/Navbar";
import DashboardContent from "../components/DashboardContent";
import { CloudUpload } from "lucide-react";
import { getCurrentUser } from "@/app/betterauth/actions/users";

interface SerializedUser {
  id?: string | null | undefined;
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

export default function DropboxPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userProfile, setUserProfile] = useState<typeUserProfile>({
    id: "",
    name: "",
    email: "",
    image: "",
    role: "",
    expiredAt: "",
  });

  const hasuser = async () => {
    // let user = await getLoginSession();
    let user = await getCurrentUser()
    if (user) {
      setIsLoggedIn(true);
      setUserProfile({
        id: user.user.id,
        name: user.user.name,
        email: user.user.email,
        image: user.user.image,
        role: user.currentUser.role,
        expiredAt: user.session.expiresAt.toDateString(),
      });
      return user;
    } else {
      return redirect("/login");
    }
  };

  useEffect(() => {
    hasuser();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-default-50">
      <Navbar />

      <main className="flex-1 container mx-auto py-8 px-6">
        <DashboardContent
          userId={userProfile?.id || ""}
          userName={userProfile?.name || ""}
          userEmail={userProfile?.email || ""}
        />
      </main>

      <footer className="bg-default-50 border-t border-default-200 py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <CloudUpload className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold">Droply</h2>
            </div>
            <p className="text-default-500 text-sm">
              &copy; {new Date().getFullYear()} Droply
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
