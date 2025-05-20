"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, FileUp } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import UserProfile from "./UserProfile";
import FileUploadForm from "./FileUploadForm";
import FileList from "./FileList";
import { useSearchParams } from "next/navigation";

interface DashboardContentProps {
  userId: string;
  userName: string;
}

export default function DashboardContent({
  userId,
  userName = "Ariya",
}: DashboardContentProps) {
  // const userName = "Ariya";

  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState<string>("files");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);

  // Set the active tab based on URL parameter
  useEffect(() => {
    console.log("useEffect ++++ : ", tabParam);
    if (tabParam === "profile") {
      setActiveTab("profile");
    } else {
      setActiveTab("files");
    }
  }, [tabParam]);

  const handleFileUploadSuccess = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  const handleFolderChange = useCallback((folderId: string | null) => {
    setCurrentFolder(folderId);
  }, []);

  return (
    <>
      {" "}
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-default-900">
          Hi,{" "}
          <span className="text-primary">
            {userName?.length > 10
              ? `${userName?.substring(0, 10)}...`
              : userName?.split(" ")[0] || "there"}
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
                  userId={userId}
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
                  userId={userId}
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
