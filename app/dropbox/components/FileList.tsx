"use client";

import React, { useEffect, useMemo, useState } from "react";
import FileActions from "./FileActions";
import FileIcon from "./FileIcon";
import { formatDistanceToNow, format } from "date-fns";
import { Separator } from "@/components/ui/separator";
// import { FileType } from "../lib/db/dataschema";
import type { File as FileType } from "../lib/db/dataschema";
import { mockfiles } from "../lib/db/dataschema";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
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
import { ExternalLink, Folder, Star } from "lucide-react";
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

export default function FileList() {
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

  //   // All files
  //   console.log("Files:", files);

  //   // Count starred files
  //   const starredCount = files.filter((file) => file.isStarred).length;
  //   console.log("Starred Count:", starredCount);

  //   // Count files in trash
  //   const trashCount = files.filter((file) => file.isTrash).length;
  //   console.log("Trash Count:", trashCount);

  //   const nonTrashFiles = files.filter((file) => !file.isTrash);
  //   console.log("Non-Trash Files:", nonTrashFiles);

  // Fetch files
  const fetchFiles = async () => {
    setLoading(true);
    try {
      let url = `/api/dropbox/files`;
      //   if (currentFolder) {
      //     url += `&parentId=${currentFolder}`;
      //   }

      const response = await axios.get(url);
      setFiles(response.data);
    } catch (error) {
      console.error("Error fetching files:", error);
      toast("Event has been created", {
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
    fetchFiles();
  }, []);

  // Filter files based on active tab
  const filteredFiles = useMemo(() => {
    switch (activeTab) {
      case "starred":
        return files.filter((file) => file.isStarred && !file.isTrash);
      case "trash":
        return files.filter((file) => file.isTrash);
      case "all":
      default:
        return files.filter((file) => !file.isTrash);
    }
  }, [files, activeTab]);

  // All files
  console.log("Files:", files);

  // async function handleStarFile(id: string): Promise<void> {
  //   throw new Error("Function not implemented.");
  // }

  // async function handleDownloadFile(file: File): Promise<void> {
  //   throw new Error("Function not implemented.");
  // }

  const handleStarFile = async (id: string) => {
    // Implement star file logic here
    console.log("Star file with id:", id);
  };

  const handleTrashFile = async (id: string) => {
    // Implement trash file logic here
    console.log("Trash file with id:", id);
  };
  const handleDownloadFile = async (file: FileType) => {
    // Implement download file logic here
    console.log("Download file:", file);
  };

  return (
    <div>
      {" "}
      {/* Tabs for filtering files */}
      {/* <FileTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        files={files}
        starredCount={starredCount}
        trashCount={trashCount}
      /> */}
      {/* Folder navigation */}
      {/* {activeTab === "all" && (
        <FolderNavigation
          folderPath={folderPath}
          navigateUp={navigateUp}
          navigateToPathFolder={navigateToPathFolder}
        />
      )} */}
      {/* Action buttons */}
      {/* <FileActionButtons
        activeTab={activeTab}
        trashCount={trashCount}
        folderPath={folderPath}
        onRefresh={fetchFiles}
        onEmptyTrash={() => setEmptyTrashModalOpen(true)}
      /> */}
      <Separator className="my-4" />
      {/* Files table */}
      {filteredFiles.length === 0 ? (
        <>
          {/* <FileEmptyState activeTab={activeTab} /> */}
          <div>"FileEmptyState activeTab={activeTab}</div>
        </>
      ) : (
        <>
          {" "}
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex flex-row justify-between items-center">
                {/* <div> Login to your account </div>
                <div className="bg-slate-100 rounded-lg">
                  <Button variant="link">Sign Up</Button>
                </div> */}
              </CardTitle>
              <CardDescription>
                {/* Enter your email below to login to your account */}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* <form>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <Input id="password" type="password" required />
                  </div>
                </div>
              </form> */}
              <div className="overflow-x-auto">
                <Table>
                  <TableCaption>A list of your recent invoices.</TableCaption>
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
                            onTrash={handleStarFile}
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
                  <TableFooter>
                    {/* <TableRow>
                      <TableCell colSpan={3}>Total</TableCell>
                      <TableCell className="text-right">$2,500.00</TableCell>
                    </TableRow> */}
                  </TableFooter>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              {/* <Button type="submit" className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button> */}
            </CardFooter>
          </Card>
        </>
      )}
      <div className="flex flex-row m-2 items-center">
        <div className="mr-2">
          {" "}
          {/* Delete confirmation modal */}
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
        <div>
          {" "}
          {/* Empty trash confirmation modal */}
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
      </div>
    </div>
  );
}
