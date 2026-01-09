"use client";

import React, { useCallback, useState } from "react";
import { AppWindowIcon, CodeIcon, FileText, FileUp, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FileUploadForm from "./FileUploadForm";
import FileList from "./FileList";
import UserProfile from "./UserProfile";

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
      <div className="flex w-full flex-col gap-6 justify-center items-center">
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="activeTab">Files</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>
          <TabsContent value="activeTab">
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
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
            </div>
          </TabsContent>
          <TabsContent value="profile">
            <div className="flex flex-col w-full mt-8">
              <UserProfile />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
