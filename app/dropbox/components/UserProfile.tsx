"use client";

import { useEffect, useState } from "react";
// import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Spinner } from "@/components/ui/spinner";
import { getLoginSession, SignOut } from "../lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, LogOut, Mail, Shield, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SerializedUser {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  image_url?: string | null | undefined;
  role?: string | null | undefined;
  expiredAt?: string | null | undefined;
}

type typeUserProfile = SerializedUser;

export default function UserProfile() {
  //   const { isLoaded, isSignedIn, user } = useUser();
  //   const { signOut } = useClerk();
  //   const router = useRouter();

  //   if (!isLoaded) {
  //     return (
  //       <div className="flex flex-col justify-center items-center p-12">
  //         <Spinner size="lg" color="primary" />
  //         <p className="mt-4 text-default-600">Loading your profile...</p>
  //       </div>
  //     );
  //   }

  //   if (!isSignedIn) {
  //     return (
  //       <Card className="max-w-md mx-auto border border-default-200 bg-default-50 shadow-sm hover:shadow-md transition-shadow">
  //         <CardHeader className="flex gap-3">
  //           <User className="h-6 w-6 text-primary" />
  //           <h2 className="text-xl font-semibold">User Profile</h2>
  //         </CardHeader>
  //         <Divider />
  //         <CardBody className="text-center py-10">
  //           <div className="mb-6">
  //             <Avatar name="Guest" size="lg" className="mx-auto mb-4" />
  //             <p className="text-lg font-medium">Not Signed In</p>
  //             <p className="text-default-500 mt-2">
  //               Please sign in to access your profile
  //             </p>
  //           </div>
  //           <Button
  //             variant="solid"
  //             color="primary"
  //             size="lg"
  //             onClick={() => router.push("/sign-in")}
  //             className="px-8"
  //             endContent={<ArrowRight className="h-4 w-4" />}
  //           >
  //             Sign In
  //           </Button>
  //         </CardBody>
  //       </Card>
  //     );
  //   }
  //   const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();
  //   const email = user.primaryEmailAddress?.emailAddress || "";
  //   const initials = fullName
  //     .split(" ")
  //     .map((name) => name[0])
  //     .join("")
  //     .toUpperCase();

  //   const userRole = user.publicMetadata.role as string | undefined;

  //   const handleSignOut = () => {
  //     signOut(() => {
  //       router.push("/");
  //     });
  //   };

  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual auth logic
  const [isSignedIn, setIsSignedIn] = useState(false);
  const router = useRouter();

  const [userProfile, setUserProfile] = useState<typeUserProfile>({
    name: "",
    email: "",
    image: "",
    image_url: "",
    role: "",
    expiredAt: "",
  });
  const hasuser = async () => {
    let user = await getLoginSession();
    if (user) {
      setIsLoaded(true);
      setIsLoggedIn(true);
      setIsSignedIn(true);
      setUserProfile({
        name: user.user.name,
        email: user.user.email,
        image: user.user.image,
        image_url: user.user.image_url,
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

  if (!isLoaded) {
    return (
      <div className="flex flex-col justify-center items-center p-12">
        <Spinner color="primary" />
        <p className="mt-4 text-default-600">Loading your profile...</p>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            {" "}
            <User className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold">User Profile</h2>
          </CardTitle>
          <CardDescription>Card Description</CardDescription>
          Card Action
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="text-lg font-medium">Not Signed In</p>
            <p className="text-default-500 mt-2">
              Please sign in to access your profile
            </p>
          </div>
          <Button
            variant="default"
            color="primary"
            size="lg"
            onClick={() => router.push("/sign-in")}
            className="px-8"
          >
            Sign In
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    );
  }

  const fullName = `${userProfile.name || ""}`.trim();
  const email = userProfile.email || "";
  const initials = fullName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  const userRole = userProfile.role as string | undefined;

  const handleSignOut = () => {
    SignOut();
  };

  return (
    <>
      <Card className="w-[800px] mx-auto border border-default-200 bg-default-50 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex gap-3">
          <CardTitle>
            {" "}
            <User className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold">User Profile</h2>
          </CardTitle>
          <CardDescription>Card Description</CardDescription>
          Card Action
        </CardHeader>
        <CardContent className="py-6">
          <div className="flex flex-col items-center text-center mb-6">
            {userProfile.image_url ? (
              <Avatar>
                <AvatarImage
                  src={userProfile.image_url}
                  alt="@shadcn"
                  className="mb-4"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            ) : (
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                  className="mb-4 h-24 w-24 text-lg"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            )}
            <h3 className="text-xl font-semibold">{fullName}</h3>
            {userProfile.email && userProfile.email.length > 0 && (
              <div className="flex items-center gap-2 mt-1 text-default-500">
                <Mail className="h-4 w-4" />
                <span>{email}</span>
              </div>
            )}
            {userRole && (
              <Badge
                color="primary"
                variant="destructive"
                className="mt-3"
                aria-label={`User role: ${userRole}`}
              >
                {userRole}
              </Badge>
            )}
          </div>

          <Separator className="my-4" />

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary/70" />
                <span className="font-medium">Account Status</span>
              </div>
              <Badge
                color="success"
                variant="destructive"
                aria-label="Account status: Active"
              >
                Active
              </Badge>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary/70" />
                <span className="font-medium">Email Verification</span>
              </div>
              <Badge
                color={userProfile.email ? "success" : "warning"}
                variant="destructive"
                aria-label={`Email verification status: ${
                  userProfile.email ? "Verified" : "Pending"
                }`}
              >
                {userProfile.email ? "Verified" : "Pending"}
              </Badge>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="destructive" color="danger" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
