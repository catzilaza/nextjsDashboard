"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, FileUp } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import UserProfile from "./UserProfile";
import FileUploadForm from "./FileUploadForm";
import FileList from "./FileList";
import { useRouter, useSearchParams } from "next/navigation";
import { auth } from "@/auth";
import { getSession } from "@/lib/utils/dropbox/uitls";

interface DashboardContentProps {
  userId: string;
  userName: string;
}

type typeUserProfile = {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  role?: string | null | undefined;
  expiredAt?: string | null | undefined;
};

export default function DashboardContent({
  userId,
  userName,
}: DashboardContentProps) {
  // const userName = "Ariya";

  // const searchParams = useSearchParams();
  // const tabParam = searchParams.get("tab");

  // const [isLogedin, setIsLogedin] = useState(false);
  // const [userId, setUserId] = useState<string | null>("user001");
  // const [userName, setUserName] = useState<string | null>("Ariya");

  // const [userProfile, setUserProfile] = useState<typeUserProfile>({
  //   name: "",
  //   email: "",
  //   image: "",
  //   role: "",
  //   expiredAt: "",
  // });
  // const hasuser = async () => {
  //   let user = await getSession();
  //   if (user) {
  //     setIsLogedin(true);
  //     setUserProfile({
  //       name: user.user.name,
  //       email: user.user.email,
  //       image: user.user.image,
  //       role: user.user.role,
  //       expiredAt: user.expires,
  //     });
  //     setUserId(user.user.id);
  //     setUserName(user.user.name ?? null);
  //     return user;
  //   } else {
  //     return null;
  //   }
  // };

  const [activeTab, setActiveTab] = useState<string>("files");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);

  // Set the active tab based on URL parameter
  // useEffect(() => {
  //   console.log("useEffect ++++ : ", tabParam);
  //   if (tabParam === "profile") {
  //     setActiveTab("profile");
  //   } else {
  //     setActiveTab("files");
  //   }
  // }, [tabParam]);

  const handleFileUploadSuccess = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  const handleFolderChange = useCallback((folderId: string | null) => {
    setCurrentFolder(folderId);
  }, []);

  // // get session
  // useEffect(() => {
  //   hasuser();
  // }, []);

  return (
    <>
      {" "}
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-default-900">
          Hi,{" "}
          <span className="text-primary">
            {(userName ?? "").length > 10
              ? `${(userName ?? "").substring(0, 10)}...`
              : (userName ?? "").split(" ")[0] || "there"}
          </span>
          !
        </h2>
        <p className="text-default-600 mt-2 text-lg">
          Your images are waiting for you.
        </p>
      </div>
      <Tabs defaultValue="myfiles" className="w-full">
        <TabsList>
          <TabsTrigger value="myfiles">My Files</TabsTrigger>
          <TabsTrigger value="yourfiles">Your Files</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>
        <TabsContent value="myfiles">
          <div className="lg:col-span-1">
            <Card className="border border-default-200 bg-default-50 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex gap-3">
                <FileUp className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Upload</h2>
              </CardHeader>
              <CardContent>
                <FileUploadForm
                  userId={userId as string}
                  onUploadSuccess={handleFileUploadSuccess}
                  currentFolder={currentFolder}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="yourfiles">
          {" "}
          <div className="lg:col-span-2">
            <Card className="border border-default-200 bg-default-50 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Your Files</h2>
              </CardHeader>
              <CardContent>
                <FileList
                  userId={userId as string}
                  refreshTrigger={refreshTrigger}
                  onFolderChange={handleFolderChange}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="profile">
          {" "}
          <div className="mt-8">
            <UserProfile />
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
