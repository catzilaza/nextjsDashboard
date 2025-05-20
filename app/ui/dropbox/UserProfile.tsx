"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LogOut, Mail, Shield, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignOut } from "@/lib/utils/dropbox/uitls";

export default function UserProfile() {
  const user = {
    imageUrl: "https://github.com/shadcn.png",
    initials: "https://github.com/shadcn.png",
    fullName: "Full Name",
    emailAddresses: "emailAddresses",
    userRole: "user",
  };

  const handleSignOut = async () => {
    alert("handleSignOut");
    await SignOut();
  };
  return (
    <>
      {/* max-w-md */}
      <Card className="max-w-full mx-auto border-2 bg-slate-50 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="flex gap-3">
            {" "}
            <User className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold">User Profile</h2>
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center text-center mb-6">
            {user.imageUrl ? (
              <Avatar>
                <AvatarImage src={user.imageUrl} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            ) : (
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            )}
            <h3 className="text-xl font-semibold">{user.fullName}</h3>
            {user.emailAddresses && user.emailAddresses.length > 0 && (
              <div className="flex items-center gap-2 mt-1 text-default-500">
                <Mail className="h-4 w-4" />
                <span>{user.emailAddresses}</span>
              </div>
            )}
            {user.userRole && (
              <Badge
                color="primary"
                variant="default"
                className="mt-3"
                aria-label={`User role: ${user.userRole}`}
              >
                {user.userRole}
              </Badge>
            )}
          </div>
        </CardContent>
        <CardContent>
          <div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary/70" />
                <span className="font-medium">Account Status</span>
              </div>
              <Badge
                color={user.emailAddresses ? "success" : "warning"}
                variant="default"
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
                color={user.emailAddresses ? "success" : "warning"}
                variant="default"
                aria-label={`Email verification status: ${
                  user.emailAddresses ? "Verified" : "Pending"
                }`}
              >
                {user.emailAddresses ? "Verified" : "Pending"}
              </Badge>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="default" color="danger" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
