"use client";

import FileTabs from "./FileTabs";
import FileActionButtons from "./FileActionButtons";
import FolderNavigation from "./FolderNavigation";
import FileEmptyState from "./FileEmptyState";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useMemo, useState } from "react";
import { File as FileType } from "@/schemas/dropbox/definitions";
import axios from "axios";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowRight, FolderMinusIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowBigDownDashIcon } from "lucide-react";

interface FileListProps {
  userId: string;
  refreshTrigger?: number;
  onFolderChange?: (folderId: string | null) => void;
}

interface TypeFilteredFiles {
  key: string;
  id: string;
  path: string;
  name: string;
  type: string;
  size: number;
  parentId: string | null;
  fileUrl: string;
  thumbnailUrl: string | null;
  isFolder: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  isStarred: boolean;
  isTrash: boolean;
}

export default function FileList({
  userId,
  refreshTrigger,
  onFolderChange,
}: FileListProps) {
  // const filteredFiles = useState<TypeFilteredFiles[]>([
  //   {
  //     key: "this is a book",
  //     id: "",
  //     path: "",
  //     name: "",
  //     type: "",
  //     size: 555,
  //     parentId: "",
  //     fileUrl: "",
  //     thumbnailUrl: "",
  //     isFolder: false,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //     userId: "",
  //     isStarred: false,
  //     isTrash: false,
  //   },
  // ]);

  // const filteredFiles = ["this is a book"]
  const starredCount = 0;
  const trashCount = 0;
  const [files, setFiles] = useState<FileType[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [folderPath, setFolderPath] = useState<
    Array<{ id: string; name: string }>
  >([
    { id: "001", name: "aaa" },
    { id: "002", name: "bbb" },
    { id: "003", name: "ccc" },
  ]);

  // Modal states
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [emptyTrashModalOpen, setEmptyTrashModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileType | null>(null);

  // Fetch files
  const fetchFiles = async () => {
    setLoading(true);
    try {
      let url = `/api/dropbox/files?userId=${userId}`;
      if (currentFolder) {
        url += `&parentId=${currentFolder}`;
      }
      const response = await axios.get(url);
      setFiles(response.data);
      toast.success("fetchFiles OKkkkkk");
    } catch (error) {
      console.error("Error fetching files:", error);
      toast(`Message Error`, {
        className: "bg-white text-black w-[50px] h-[80px]",
        description: `title: Error Loading Files,description:
           We couldn't load your files.
           Please try again later.,color: danger,`,        
        duration: 5000,
        icon: <ArrowBigDownDashIcon />,
        style: {
          background: "#d6dbdf",
          color: " #f04925 ",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch files when userId, refreshTrigger, or currentFolder changes
  useEffect(() => {
    fetchFiles();
  }, [userId, refreshTrigger, currentFolder]);

  console.log("+++++++ useEffect FetchFiles : ", files);
  console.log(
    "******* useMemo filteredFiles !isTrashr: ",
    files.filter((file) => !file.isTrashr)
  );
  console.log(
    "/////// useMemo filteredFiles isTrashr: ",
    files.filter((file) => !file.isTrashr)
  );
  console.log(
    "/////// useMemo filteredFiles isStarredr && !isTrashr: ",
    files.filter((file) => file.isStarredr && !file.isTrashr)
  );

  // Filter files based on active tab
  const filteredFiles = useMemo(() => {
    switch (activeTab) {
      case "starred":
        return files.filter((file) => file.isStarredr && !file.isTrashr);
      case "trash":
        return files.filter((file) => file.isTrashr);
      case "all":
      default:
        return files.filter((file) => !file.isTrashr);
    }
  }, [files, activeTab]);

  console.log("filteredFiles : ", filteredFiles);

  // Navigate back to parent folder
  const navigateUp = () => {
    if (folderPath.length > 0) {
      const newPath = [...folderPath];
      newPath.pop();
      setFolderPath(newPath);
      const newFolderId =
        newPath.length > 0 ? newPath[newPath.length - 1].id : null;
      setCurrentFolder(newFolderId);

      // Notify parent component about folder change
      if (onFolderChange) {
        onFolderChange(newFolderId);
      }
    }
  };

  // Navigate to specific folder in path
  const navigateToPathFolder = (index: number) => {
    if (index < 0) {
      setCurrentFolder(null);
      setFolderPath([]);

      // Notify parent component about folder change
      if (onFolderChange) {
        onFolderChange(null);
      }
    } else {
      const newPath = folderPath.slice(0, index + 1);
      setFolderPath(newPath);
      const newFolderId = newPath[newPath.length - 1].id;
      setCurrentFolder(newFolderId);

      // Notify parent component about folder change
      if (onFolderChange) {
        onFolderChange(newFolderId);
      }
    }
  };

  // Navigate to a folder
  const navigateToFolder = (folderId: string, folderName: string) => {
    setCurrentFolder(folderId);
    setFolderPath([...folderPath, { id: folderId, name: folderName }]);

    // Notify parent component about folder change
    if (onFolderChange) {
      onFolderChange(folderId);
    }
  };

  const handleDeleteFile = async (fileId: string) => {
    // try {
    // Store file info before deletion for the toast message
    // const fileToDelete = files.find((f) => f.id === fileId);
    // const fileName = fileToDelete?.name || "File";
    // Send delete request
    // const response = await axios.delete(`/api/files/${fileId}/delete`);
    // if (response.data.success) {
    // Remove file from local state
    // setFiles(files.filter((file) => file.id !== fileId));
    // Show success toast
    // toast(`
    //   title: File Permanently Deleted,
    //   description: ${fileName} has been permanently removed,
    //   color: success,`);
    // Close modal if it was open
    // setDeleteModalOpen(false);
    // } else {
    //   throw new Error(response.data.error || "Failed to delete file");
    // }
    // } catch (error) {
    //   console.error("Error deleting file:", error);
    //   toast(`
    //     title: Deletion Failed,
    //     description: We couldn't delete the file. Please try again later.,
    //     color: danger,`);
    // }
  };

  const handleEmptyTrash = async () => {
    // try {
    //   await axios.delete(`/api/files/empty-trash`);
    //   // Remove all trashed files from local state
    //   setFiles(files.filter((file) => !file.isTrashr));
    //   // Show toast
    //   toast(`
    //     title: Trash Emptied,
    //     description: All ${trashCount} items have been permanently deleted,
    //     color: success,`
    //   );
    //   // Close modal
    //   setEmptyTrashModalOpen(false);
    // } catch (error) {
    //   console.error("Error emptying trash:", error);
    //   toast(`
    //     title: Action Failed,
    //     description: We couldn't empty the trash. Please try again later.,
    //     color: danger,`
    //   );
    // }
  };

  return (
    <div className="space-y-6">
      {/* Tabs for filtering files */}
      <FileTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        files={files}
        starredCount={starredCount}
        trashCount={trashCount}
      />

      {/* Folder navigation */}
      {activeTab === "all" && (
        <FolderNavigation
          folderPath={folderPath}
          navigateUp={navigateUp}
          navigateToPathFolder={navigateToPathFolder}
        />
      )}

      {/* Action buttons */}
      <FileActionButtons
        activeTab={activeTab}
        trashCount={trashCount}
        folderPath={folderPath}
        onRefresh={fetchFiles}
        onEmptyTrash={() => setEmptyTrashModalOpen(true)}
      />

      <Separator className="my-4" />

      {/* Files table */}
      {filteredFiles.length === 0 ? (
        <>
          <FileEmptyState activeTab={activeTab} />
        </>
      ) : (
        <>
          <Card className="border bg-slate-50 overflow-hidden">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table
                  aria-label="Files table"
                  // isStriped
                  color="default"
                  // selectionMode="none"
                  className="min-w-full"
                >
                  <TableCaption>A list of your recent invoices.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Name</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Type
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Size
                      </TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Added
                      </TableHead>
                      <TableHead className="w-[240px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {files.map((file) => (
                      <TableRow key={file.id}>
                        <TableCell className="font-medium">
                          {file.name}
                        </TableCell>
                        <TableCell>{file.type}</TableCell>
                        <TableCell>{file.size}</TableCell>
                        <TableCell className="text-center">
                          {file.userId}
                        </TableCell>
                        <TableCell className="text-right">
                          {file.createdAt}
                        </TableCell>
                      </TableRow>
                    ))}
                    {/* <TableRow>
                      <TableCell className="font-medium">INV001</TableCell>
                      <TableCell>Paid</TableCell>
                      <TableCell>Credit Card</TableCell>
                      <TableCell className="text-center">$250.00</TableCell>
                      <TableCell className="text-right">$250.00</TableCell>
                    </TableRow> */}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </>
      )}

      <div className="flex flex-1">
        {/* Delete confirmation modal */}
        <Dialog>
          <DialogTrigger className="flex flex-1 gap-4 justify-center items-center border bg-black text-white text-xs px-2 py-2 rounded-md">
            <FolderMinusIcon className="h-5 w-5 text-white" />
            Delete
          </DialogTrigger>
          <DialogContent className="border bg-slate-50">
            <DialogHeader className="border-b flex gap-2 items-center">
              <DialogTitle className="flex flex-1 gap-4">
                {" "}
                <FolderMinusIcon className="h-5 w-5 text-primary" />
                <span>Confirm Permanent Deletion</span>
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to permanently delete this file?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="default"
                color="default"
                onClick={() => {
                  alert("Cancle");
                }}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                variant={"destructive"}
                onClick={() => {
                  if (selectedFile) {
                    handleDeleteFile(selectedFile.id);
                  }
                }}
              >
                Create
                <ArrowRight className="h-4 w-4" />
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Empty trash confirmation modal */}
        <Dialog>
          <DialogTrigger className="flex flex-1 gap-4 justify-center items-center border bg-black text-white text-xs px-2 py-2 rounded-md">
            <FolderMinusIcon className="h-5 w-5 text-white" />
            Trash
          </DialogTrigger>
          <DialogContent className="border bg-slate-50">
            <DialogHeader className="border-b flex gap-2 items-center">
              <DialogTitle className="flex flex-1 gap-4">
                {" "}
                <FolderMinusIcon className="h-5 w-5 text-primary" />
                <span>Empty Trash</span>
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to empty the trash?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="default"
                color="default"
                onClick={() => {
                  alert("Cancle");
                }}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                variant={"destructive"}
                onClick={handleEmptyTrash}
              >
                Trash
                <ArrowRight className="h-4 w-4" />
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
