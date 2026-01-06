"use client";

import React from "react";
import type { File as FileType } from "../lib/db/dataschema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { File, Star, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FileTabsProps {
  activeTab: string;
  onTabChange: (key: string) => void;
  files: FileType[];
  starredCount: number;
  trashCount: number;
}

export default function FileTabs({
  activeTab,
  onTabChange,
  files,
  starredCount,
  trashCount,
}: FileTabsProps) {
  return (
    <Tabs defaultValue="allfiles" className="mb-4 w-full overflow-x-auto">
      <TabsList className="gap-2 sm:gap-4 md:gap-6 flex-nowrap min-w-full">
        <TabsTrigger value="allfiles">All Files</TabsTrigger>
        <TabsTrigger value="starred">Starred</TabsTrigger>
        <TabsTrigger value="trash">Trash</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="py-3 whitespace-nowrap">
        <div className="flex items-center gap-2 sm:gap-3">
          <File className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="font-medium">All Files</span>
          <Badge
            variant="default"
            color="default"
            aria-label={`${files.filter((file) => !file.isTrash).length} files`}
          >
            {files.filter((file) => !file.isTrash).length}
          </Badge>
        </div>
      </TabsContent>
      <TabsContent value="starred" className="py-3 whitespace-nowrap">
        <div className="flex items-center gap-2 sm:gap-3">
          <Star className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="font-medium">Starred</span>
          <Badge
            variant="default"
            color="warning"
            aria-label={`${starredCount} starred files`}
          >
            {starredCount}
          </Badge>
        </div>
      </TabsContent>
      <TabsContent value="trash" className="py-3 whitespace-nowrap">
        <div className="flex items-center gap-2 sm:gap-3">
          <Trash className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="font-medium">Trash</span>
          <Badge
            variant="outline"
            color="danger"
            aria-label={`${trashCount} files in trash`}
          >
            {trashCount}
          </Badge>
        </div>
      </TabsContent>
    </Tabs>
  );
}
