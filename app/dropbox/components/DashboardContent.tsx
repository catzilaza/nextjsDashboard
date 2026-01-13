"use client";

import React, { useCallback, useState } from "react";
import { FileText, FileUp } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FileUploadForm from "./FileUploadForm";
import FileList from "./FileList";
import UserProfile from "./UserProfile";
import { Suspense } from "react";
import { delayTime } from "../lib/utils";

interface DashboardContentProps {
  userId: string;
  userName: string;
  userEmail: string;
}

export default function DashboardContent({
  userId,
  userName,
  userEmail,
}: DashboardContentProps) {
  const [activeTab, setActiveTab] = useState<string>("files");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);

  const handleFileUploadSuccess = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  const handleFolderChange = useCallback((folderId: string | null) => {
    setCurrentFolder(folderId);
  }, []);

  return (
    <>
      {" "}
      <Suspense fallback={<SpinnerImage />}>
        <div className="flex w-full flex-col gap-6 justify-center items-center">
          <Tabs defaultValue="files">
            <TabsList className="flex flex-row items-center justify-center">
              <TabsTrigger value="files">Files</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>
            <TabsContent value="files">
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1">
                  <Card className="border border-default-200 bg-default-50 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center gap-3">
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

                <div className="lg:col-span-3">
                  <Card className="border border-default-200 bg-default-50 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <h2 className="text-xl font-semibold">Your Files</h2>
                      <h2 className="text-2xl font-bold text-default-900">
                        Hi,{" "}
                        <span className="text-primary">
                          {userName?.length > 10
                            ? `${userName?.substring(0, 10)}...`
                            : userName?.split(" ")[0] || "there"}
                        </span>
                        !
                      </h2>
                      <h2 className="text-default-600 mt-2 text-lg">
                        Your images are waiting for you.
                      </h2>
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
              </div>
            </TabsContent>
            <TabsContent value="profile">
              <div className="flex flex-col w-full mt-8">
                <UserProfile />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Suspense>
      {/* <div className="flex w-full flex-col gap-6 justify-center items-center">
        <Tabs defaultValue="selectTab">
          <TabsList className="flex flex-row items-center justify-center">
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>
          <TabsContent value="files">
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <Card className="border border-default-200 bg-default-50 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center gap-3">
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

              <div className="lg:col-span-3">
                <Card className="border border-default-200 bg-default-50 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Your Files</h2>
                    <h2 className="text-2xl font-bold text-default-900">
                      Hi,{" "}
                      <span className="text-primary">
                        {userName?.length > 10
                          ? `${userName?.substring(0, 10)}...`
                          : userName?.split(" ")[0] || "there"}
                      </span>
                      !
                    </h2>
                    <h2 className="text-default-600 mt-2 text-lg">
                      Your images are waiting for you.
                    </h2>
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
            </div>
          </TabsContent>
          <TabsContent value="profile">
            <div className="flex flex-col w-full mt-8">
              <UserProfile />
            </div>
          </TabsContent>
        </Tabs>
      </div> */}
    </>
  );
}

export function SpinnerImage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      {/* <div className="flex flex-col items-center gap-4">
        <img
          src={props.SpinnerIcon}
          alt=""
          className="h-16 w-16 animate-spin"
          aria-hidden="true"
        />
        <p className="text-sm text-gray-600">Loading...</p>
        <span className="sr-only">Loading...</span>
      </div> */}
      Loading...
    </div>
  );
}
