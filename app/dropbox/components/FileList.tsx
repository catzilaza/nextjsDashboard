"use client";

import React, { useEffect, useMemo, useState } from "react";
import { formatDistanceToNow, format } from "date-fns";
import axios from "axios";
import { toast } from "sonner";
import { set } from "better-auth";
import { exit } from "process";
import { ExternalLink, Folder, Star, Trash, X } from "lucide-react";
import FileTabs from "./FileTabs";
import FileLoadingState from "./FileLoadingState";
import FileActions from "./FileActions";
import FileIcon from "./FileIcon";
import FileEmptyState from "./FileEmptyState";
import FileActionButtons from "./FileActionButtons";
import FolderNavigation from "./FolderNavigation";
// import { FileType } from "../lib/db/dataschema";
import type { File as FileType } from "../lib/db/dataschema";
import { mockfiles } from "../lib/db/dataschema";
import { Button } from "@/components/ui/button";
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
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

interface FileListProps {
  userId: string;
  refreshTrigger?: number;
  onFolderChange?: (folderId: string | null) => void;
}

export default function FileList({
  userId,
  refreshTrigger = 0,
  onFolderChange,
}: FileListProps) {
  const [files, setFiles] = useState<FileType[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [folderPath, setFolderPath] = useState<
    Array<{ id: string; name: string }>
  >([]);

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
    } catch (error) {
      console.error("Error fetching files:", error);
      toast("Error Loading Files", {
        description: "We couldn't load your files. Please try again later.",
        action: {
          label: "Error Loading Files",
          onClick: () => console.log("Ok"),
        },
        style: {
          background: "#fff",
          color: "red",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch files when userId, refreshTrigger, or currentFolder changes
  useEffect(() => {
    if (!userId) return; // ถ้า userId ยังว่าง ไม่ต้อง fetch
    fetchFiles();
  }, [userId, refreshTrigger, currentFolder]);

  // Filter files based on active tab
  const filteredFiles = useMemo(() => {
    switch (activeTab) {
      case "starred":
        // return files.filter((file) => file.isStarred);
        return files.filter((file) => file.isStarred && !file.isTrash);
      case "trash":
        return files.filter((file) => file.isTrash);
      case "all":
      // return files;
      default:
        // return files;
        return files.filter((file) => !file.isTrash);
      // return files.filter((file) => file.isTrash && !file.isStarred);
    }
  }, [files, activeTab]);

  // Count files in trash
  const trashCount = useMemo(() => {
    return files.filter((file) => file.isTrash).length;
  }, [files]);

  // Count starred files
  const starredCount = useMemo(() => {
    return files.filter((file) => file.isStarred && !file.isTrash).length;
  }, [files]);

  const handleStarFile = async (fileId: string) => {
    // Implement star file logic here
    // console.log("Star file with id:", fileId);
    try {
      await axios.patch(`/api/dropbox/files/${fileId}/star`);

      // Update local state
      setFiles(
        files.map((file) =>
          file.id === fileId ? { ...file, isStarred: !file.isStarred } : file,
        ),
      );

      // Show toast
      const file = files.find((f) => f.id === fileId);

      toast(
        `${file?.isStarred} ? "Removed from Starred" : "Added to Starred"`,
        {
          description: `"${file?.name}" has been ${
            file?.isStarred ? "removed from" : "added to"
          } your starred files`,
          action: {
            label: "Action success",
            onClick: () => console.log("Ok"),
          },
          style: {
            background: "#fff",
            color: "green",
          },
        },
      );
    } catch (error) {
      console.error("Error starring file:", error);
      toast("Action Failed", {
        description: "We couldn't update the star status. Please try again.",
        action: {
          label: "Action Failed",
          onClick: () => console.log("Ok"),
        },
        style: {
          background: "#fff",
          color: "red",
        },
      });
    }
  };

  const handleTrashFile = async (fileId: string) => {
    // Implement trash file logic here
    // console.log("Trash file with id:", fileId);
    try {
      const response = await axios.patch(`/api/dropbox/files/${fileId}/trash`);
      const responseData = response.data;

      // Update local state
      setFiles(
        files.map((file) =>
          file.id === fileId ? { ...file, isTrash: !file.isTrash } : file,
        ),
      );

      // Show toast
      const file = files.find((f) => f.id === fileId);
      toast(
        `${responseData.isTrash} ? "Moved to Trash" : "Restored from Trash"`,
        {
          description: `"${file?.name}" has been ${
            responseData.isTrash ? "moved to trash" : "restored"
          }`,
          action: {
            label: "Action Success",
            onClick: () => console.log("Ok"),
          },
          style: {
            background: "#fff",
            color: "green",
          },
        },
      );
    } catch (error) {
      console.error("Error trashing file:", error);
      toast("Action Failed", {
        description: "We couldn't update the star status. Please try again.",
        action: {
          label: "Action Failed",
          onClick: () => console.log("Ok"),
        },
        style: {
          background: "#fff",
          color: "red",
        },
      });
    }
  };

  const handleDeleteFile = async (fileId: string) => {
    // Implement delete file logic here
    // console.log("Delete file with id:", fileId);
    try {
      // Store file info before deletion for the toast message
      const fileToDelete = files.find((f) => f.id === fileId);
      const fileName = fileToDelete?.name || "File";

      // Send delete request
      const response = await axios.delete(
        `/api/dropbox/files/${fileId}/delete`,
      );
      if (response.data.success) {
        // Remove file from local state
        setFiles(files.filter((file) => file.id !== fileId));

        // Show success toast
        toast("File Permanently Deleted", {
          description: `"${fileName}" has been permanently removed`,
          action: {
            label: "Action Success",
            onClick: () => console.log("Ok"),
          },
          style: {
            background: "#fff",
            color: "green",
          },
        });

        // Close modal if it was open
        setDeleteModalOpen(false);
      } else {
        throw new Error(response.data.error || "Failed to delete file");
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      toast("Deletion Failed", {
        description: "We couldn't delete the file. Please try again later.",
        action: {
          label: "Action Failed",
          onClick: () => console.log("Ok"),
        },
        style: {
          background: "#fff",
          color: "red",
        },
      });
    }
  };

  const handleEmptyTrash = async () => {
    try {
      await axios.delete(`/api/dropbox/files/empty-trash`);

      // Remove all trashed files from local state
      setFiles(files.filter((file) => !file.isTrash));

      // Show toast
      toast("Trash Emptied", {
        description: `All ${trashCount} items have been permanently deleted`,
        action: {
          label: "Action Success",
          onClick: () => console.log("Ok"),
        },
        style: {
          background: "#fff",
          color: "green",
        },
      });

      // Close modal
      setEmptyTrashModalOpen(false);
    } catch (error) {
      console.error("Error emptying trash:", error);
      toast("Action Failed", {
        description: "We couldn't empty the trash. Please try again later.",
        action: {
          label: "Action Failed",
          onClick: () => console.log("Ok"),
        },
        style: {
          background: "#fff",
          color: "red",
        },
      });
    }
  };

  const handleDownloadFile = async (file: FileType) => {
    // Implement download file logic here
    // console.log("Download file:", file);
    try {
      if (file) {
        let downloadUrl = `/api/dropbox/files/${file.id}/download`;

        const response = await axios.get(downloadUrl);
        if (!response.data) {
          throw new Error(`Failed to download image: ${response.statusText}`);
        }

        // Get the blob data
        const blob = await response.data;

        console.log("blob : ", blob);
        // <a key={blob.pathname} href={blob.downloadUrl>{blob.pathname}</a>

        // Create a download link
        // const blobUrl = URL.createObjectURL(blob);
        // const link = document.createElement("a");
        // link.href = blobUrl;
        // link.download = file.name;
        // document.body.appendChild(link);

        const link = document.createElement("a");
        link.href = blob;
        link.download = file.name;
        document.body.appendChild(link);

        window.open(file.fileUrl, "_blank");

        toast("Download Ready", {
          description: `"${file.name}" is ready to download.`,
          action: {
            label: "Action Success",
            onClick: () => console.log("Ok"),
          },
          style: {
            background: "#fff",
            color: "green",
          },
        });

        // // Trigger download
        link.click();

        // // Clean up
        document.body.removeChild(link);
        // URL.revokeObjectURL(blobUrl);
      } else {
        throw new Error("File not found");
      }
    } catch (error) {
      console.error("Error downloading file:", error);
      toast("Download Failed", {
        description: "We couldn't download the file. Please try again later.",
        action: {
          label: "Action Failed",
          onClick: () => console.log("Ok"),
        },
        style: {
          background: "#fff",
          color: "red",
        },
      });
    }
  };

  // Function to open image in a new tab with optimized view
  const openImageViewer = (file: FileType) => {
    if (file.type.startsWith("image/")) {
      window.open(file.fileUrl, "_blank");
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

  // Handle file or folder click
  const handleItemClick = (file: FileType) => {
    if (file.isFolder) {
      navigateToFolder(file.id, file.name);
    } else if (file.type.startsWith("image/")) {
      openImageViewer(file);
    }
  };

  if (loading) {
    return <FileLoadingState />;
  }

  return (
    <div>
      {" "}
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
          <Card className="w-full border border-default-200 bg-default-50 overflow-hidden">
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableCaption>A list of your files.</TableCaption>
                  <TableHeader>
                    <TableRow className="bg-default-100 text-default-800 font-medium text-sm">
                      <TableHead className="w-[100px]">Name</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Type
                      </TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Size
                      </TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Added
                      </TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFiles.map((file) => (
                      <TableRow
                        key={file.id}
                        className={`hover:bg-default-100 transition-colors ${
                          file.isFolder || file.type.startsWith("image/")
                            ? "cursor-pointer"
                            : ""
                        }`}
                        // onClick={() => handleItemClick(file)}
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <FileIcon file={file} />
                            <div>
                              <div className="font-medium flex items-center gap-2 text-default-800">
                                <span className="truncate max-w-[150px] sm:max-w-[200px] md:max-w-[300px]">
                                  {file.name}
                                </span>
                                {file.isStarred && (
                                  <Tooltip>
                                    <TooltipTrigger>
                                      {" "}
                                      <Star
                                        className="h-4 w-4 text-yellow-400"
                                        fill="currentColor"
                                      />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Starred</p>
                                    </TooltipContent>
                                  </Tooltip>
                                )}
                                {file.isFolder && (
                                  <Tooltip>
                                    <TooltipTrigger>
                                      {" "}
                                      <Folder className="h-3 w-3 text-default-400" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Folder</p>
                                    </TooltipContent>
                                  </Tooltip>
                                )}
                                {file.type.startsWith("image/") && (
                                  <Tooltip>
                                    <TooltipTrigger>
                                      {" "}
                                      <ExternalLink className="h-3 w-3 text-default-400" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Click to view image</p>
                                    </TooltipContent>
                                  </Tooltip>
                                )}
                              </div>
                              <div className="text-xs text-default-500 sm:hidden">
                                {formatDistanceToNow(new Date(file.createdAt), {
                                  addSuffix: true,
                                })}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {" "}
                          <div className="text-xs text-default-500">
                            {file.isFolder ? "Folder" : file.type}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {" "}
                          <div className="text-default-700">
                            {file.isFolder
                              ? "-"
                              : file.size < 1024
                                ? `${file.size} B`
                                : file.size < 1024 * 1024
                                  ? `${(file.size / 1024).toFixed(1)} KB`
                                  : `${(file.size / (1024 * 1024)).toFixed(1)} MB`}
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <div>
                            <div className="text-default-700">
                              {formatDistanceToNow(new Date(file.createdAt), {
                                addSuffix: true,
                              })}
                            </div>
                            <div className="text-xs text-default-500 mt-1">
                              {format(new Date(file.createdAt), "MMMM d, yyyy")}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell
                          onClick={(e) => e.stopPropagation()}
                          className="text-right"
                        >
                          <FileActions
                            file={file}
                            onStar={handleStarFile}
                            onTrash={handleTrashFile}
                            // onDelete={handleDeleteFile}
                            onDelete={(file) => {
                              setSelectedFile(file);
                              setDeleteModalOpen(true);
                            }}
                            onDownload={handleDownloadFile}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter></TableFooter>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Delete confirmation modal */}
          <AlertDialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <div className="flex items-center gap-2">
                  <X className="text-red-600 h-5 w-5" />
                  <AlertDialogTitle>
                    Confirm Permanent Deletion
                  </AlertDialogTitle>
                </div>
                <AlertDialogDescription>
                  Are you sure you want to permanently delete this file?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <p className="text-sm text-red-600 mt-2">
                You are about to permanently delete "{selectedFile?.name}". This
                file will be permanently removed from your account and cannot be
                recovered.
              </p>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    if (selectedFile) {
                      handleDeleteFile(selectedFile.id);
                    }
                  }}
                  className="bg-red-600 text-white hover:bg-red-700"
                >
                  Delete Permanently
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Empty trash confirmation modal */}
          <AlertDialog
            open={emptyTrashModalOpen}
            onOpenChange={setEmptyTrashModalOpen}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <div className="flex items-center gap-2">
                  <Trash className="text-red-600" />
                  <AlertDialogTitle>Empty Trash</AlertDialogTitle>
                </div>
                <AlertDialogDescription>
                  Are you sure you want to empty the trash?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <p className="text-sm text-red-600 mt-2">
                You are about to permanently delete all {trashCount} items in
                your trash. These files will be permanently removed from your
                account and cannot be recovered.
              </p>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleEmptyTrash}
                  className="bg-red-600 text-white hover:bg-red-700"
                >
                  Empty Trash
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </div>
  );
}

{
  /* <div className="flex flex-row m-2 items-center">
  <div className="mr-2">
    Delete confirmation modal
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Delete</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={selectedFile?.id} readOnly />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button
            variant="outline"
            onClick={() => {
              if (selectedFile) {
                handleDeleteFile(selectedFile.id);
              }
            }}
          >
            Confirm Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
  <div>
    Empty trash confirmation modal
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Empty</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue="https://ui.shadcn.com/docs/installation"
              readOnly
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</div>; */
}

{
  /* <Card className="w-full">
  <CardHeader>
    <CardTitle className="flex flex-row justify-between items-center">
      Card Title
    </CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    Card Content
    <div className="overflow-x-auto">
      <Table>
        <TableCaption>A list of your files.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Added</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredFiles.map((file) => (
            <TableRow key={file.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <FileIcon file={file} />
                  <div>
                    <div className="font-medium flex items-center gap-2 text-default-800">
                      <span className="truncate max-w-[150px] sm:max-w-[200px] md:max-w-[300px]">
                        {file.name}
                      </span>
                      {file.isStarred && (
                        <Tooltip>
                          <TooltipTrigger>
                            {" "}
                            <Star
                              className="h-4 w-4 text-yellow-400"
                              fill="currentColor"
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Add to library</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                      {file.isFolder && (
                        <Tooltip>
                          <TooltipTrigger>
                            {" "}
                            <Folder className="h-3 w-3 text-default-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Add to library</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                      {file.type.startsWith("image/") && (
                        <Tooltip>
                          <TooltipTrigger>
                            {" "}
                            <ExternalLink className="h-3 w-3 text-default-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Add to library</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                    <div className="text-xs text-default-500 sm:hidden">
                      {formatDistanceToNow(new Date(file.createdAt), {
                        addSuffix: true,
                      })}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {" "}
                <div className="text-xs text-default-500">
                  {file.isFolder ? "Folder" : file.type}
                </div>
              </TableCell>
              <TableCell>
                {" "}
                <div className="text-default-700">
                  {file.isFolder
                    ? "-"
                    : file.size < 1024
                    ? `${file.size} B`
                    : file.size < 1024 * 1024
                    ? `${(file.size / 1024).toFixed(1)} KB`
                    : `${(file.size / (1024 * 1024)).toFixed(1)} MB`}
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div className="text-default-700">
                    {formatDistanceToNow(new Date(file.createdAt), {
                      addSuffix: true,
                    })}
                  </div>
                  <div className="text-xs text-default-500 mt-1">
                    {format(new Date(file.createdAt), "MMMM d, yyyy")}
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <FileActions
                  file={file}
                  onStar={handleStarFile}
                  onTrash={handleTrashFile}
                  onDelete={(file) => {
                    setSelectedFile(file);
                    setDeleteModalOpen(true);
                  }}
                  onDownload={handleDownloadFile}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>
    </div>
  </CardContent>
  <CardFooter className="flex-col gap-2">Card Footer</CardFooter>
</Card>; */
}
