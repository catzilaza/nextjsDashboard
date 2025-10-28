import React from "react";
import { File as FileType } from "@/schemas/dropbox/definitions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileIcon, Star, Trash } from "lucide-react";
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
    <Tabs defaultValue="all" className="w-full overflow-x-auto ">
      <TabsList className="gap-2 sm:gap-4 md:gap-6 flex-nowrap min-w-full">
        <TabsTrigger className="hover:bg-green-300" value="all">
          All Files
        </TabsTrigger>
        <TabsTrigger className="hover:bg-green-300" value="starred">
          Starred
        </TabsTrigger>
        <TabsTrigger className="hover:bg-green-300" value="trash">
          Trash
        </TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <div className="flex items-center gap-2 sm:gap-3">
          <FileIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="font-medium">All Files</span>
          <Badge
            variant="default"
            color="default"
            aria-label={`${
              files.filter((file) => !file.isTrashr).length
            } files`}
          >
            {files.filter((file) => !file.isTrashr).length}
          </Badge>
        </div>
      </TabsContent>
      <TabsContent value="starred">
        {" "}
        <div className="flex items-center gap-2 sm:gap-3">
          <Star className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="font-medium">Starred</span>
          <Badge
            variant="default"
            style={{ background: "blue" }}
            aria-label={`${starredCount} starred files`}
          >
            {starredCount}
          </Badge>
        </div>
      </TabsContent>
      <TabsContent value="trash">
        {" "}
        <div className="flex items-center gap-2 sm:gap-3">
          <Trash className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="font-medium">Trash</span>
          <Badge
            variant="destructive"
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
