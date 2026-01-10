"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  AlertTriangle,
  ArrowRight,
  FileUp,
  FolderPlus,
  Loader2,
  Upload,
  X,
} from "lucide-react";
import React, { useRef, useState } from "react";
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
import { Label } from "@/components/ui/label";
import axios from "axios";
import { toast } from "sonner";

interface FileUploadFormProps {
  userId: string;
  onUploadSuccess?: () => void;
  currentFolder?: string | null;
}

export default function FileUploadForm({
  userId,
  onUploadSuccess,
  currentFolder = null,
}: FileUploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Folder creation state
  const [folderModalOpen, setFolderModalOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [creatingFolder, setCreatingFolder] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      // Validate file size (5MB limit)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError("File size exceeds 5MB limit");
        return;
      }

      setFile(selectedFile);
      setError(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];

      // Validate file size (5MB limit)
      if (droppedFile.size > 5 * 1024 * 1024) {
        setError("File size exceeds 5MB limit");
        return;
      }

      setFile(droppedFile);
      setError(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);
    if (currentFolder) {
      formData.append("parentId", currentFolder);
    }

    setUploading(true);
    setProgress(0);
    setError(null);

    try {
      await axios.post("/api/dropbox/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          }
        },
      });

      toast("Upload Successful", {
        description: `${file.name} has been uploaded successfully.`,
        action: {
          label: "uploaded successfully",
          onClick: () => console.log("Ok"),
        },
        style: {
          background: "#fff",
          color: "green",
        },
      });

      // Clear the file after successful upload
      clearFile();

      // Call the onUploadSuccess callback if provided
      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Failed to upload file. Please try again.");

      toast("Upload Failed", {
        description: "We couldn't upload your file. Please try again.",
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
      setUploading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCreateFolder = async () => {
    if (!folderName.trim()) {
      toast("Invalid Folder Name", {
        description: "Please enter a valid folder name.",
        action: {
          label: "Invalid Folder Name",
          onClick: () => console.log("Ok"),
        },
        style: {
          background: "#fff",
          color: "red",
        },
      });
      return;
    }

    setCreatingFolder(true);

    try {
      await axios.post("/api/folders/create", {
        name: folderName.trim(),
        userId: userId,
        parentId: currentFolder,
      });

      toast("Folder Created", {
        description: `Folder "${folderName}" has been created successfully.`,
        action: {
          label: "Successfully Created",
          onClick: () => console.log("Ok"),
        },
        style: {
          background: "#fff",
          color: "green",
        },
      });

      // Reset folder name and close modal
      setFolderName("");
      setFolderModalOpen(false);

      // Call the onUploadSuccess callback to refresh the file list
      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (error) {
      console.error("Error creating folder:", error);

      toast("Folder Creation Failed", {
        description: "We couldn't create the folder. Please try again.",
        action: {
          label: "Folder Creation Failed",
          onClick: () => console.log("Ok"),
        },
        style: {
          background: "#fff",
          color: "red",
        },
      });
    } finally {
      setCreatingFolder(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 mb-2">
        {/* Action buttons */}
        <Button
          color="primary"
          variant="default"
          onClick={() => setFolderModalOpen(true)}
          className="flex-1"
        >
          <FolderPlus className="h-4 w-4" />
          New Folder
        </Button>
        <Button
          color="primary"
          variant="default"
          onClick={() => fileInputRef.current?.click()}
          className="flex-1"
        >
          <FileUp className="h-4 w-4" />
          Add Image
        </Button>
      </div>

      {/* File drop area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          error
            ? "border-danger/30 bg-danger/5"
            : file
            ? "border-primary/30 bg-primary/5"
            : "border-default-300 hover:border-primary/5"
        }`}
      >
        {!file ? (
          <div className="space-y-3">
            <FileUp className="h-12 w-12 mx-auto text-primary/70" />
            <div>
              <p>
                Drag and drop image here or{" "}
                <Button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="hover:bg-slate-200 rounded-md transition-colors text-primary cursor-pointer font-medium inline bg-transparent border-1 p-2 m-0"
                >
                  browse
                </Button>
              </p>
              <p className="text-xs text-default-500 mt-1">Images up to 5MB</p>
            </div>
            <Input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-md">
                  <FileUp className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium truncate max-w-[180px]">
                    {file.name}
                  </p>
                  <p className="text-xs text-default-500">
                    {file.size < 1024
                      ? `${file.size} B`
                      : file.size < 1024 * 1024
                      ? `${(file.size / 1024).toFixed(1)} KB`
                      : `${(file.size / (1024 * 1024)).toFixed(1)} MB`}
                  </p>
                </div>
              </div>
              <Button
                variant="link"
                size="sm"
                onClick={clearFile}
                className="text-default-500"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {error && (
              <div className="bg-danger-5 text-danger-700 p-3 rounded-lg flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {uploading && (
              <div className="w-full max-w-full">
                <Progress value={progress} className="h-2 bg-gray-200" />
                {/* แสดงค่าเปอร์เซ็นต์ */}
                <span className="text-sm text-muted-foreground mt-1 block">
                  {progress}%
                </span>
              </div>
            )}

            <Button
              onClick={handleUpload}
              disabled={uploading || !!error}
              variant="default" // ใช้แทน color="primary"
              className="w-full flex items-center gap-2"
            >
              {/* ไอคอนด้านซ้าย */}
              {uploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Upload className="h-4 w-4" />
              )}

              {/* ข้อความ */}
              {uploading ? `Uploading... ${progress}%` : "Upload Image"}

              {/* ไอคอนด้านขวา */}
              {!uploading && <ArrowRight className="h-4 w-4" />}
            </Button>
          </div>
        )}
      </div>

      {/* Upload tips */}
      <div className="bg-default-100/5 p-4 rounded-lg">
        <h4 className="text-sm font-medium mb-2">Tips</h4>
        <ul className="text-xs text-default-600 space-y-1">
          <li>• Images are private and only visible to you</li>
          <li>• Supported formats: JPG, PNG, GIF, WebP</li>
          <li>• Maximum file size: 5MB</li>
        </ul>
      </div>

      {/* Create Folder Modal */}
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button variant="outline">Open Dialog</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {" "}
                <FolderPlus className="h-5 w-5 text-primary" />
                <span>New Folder</span>
              </DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="space-y-4">
                <p className="text-sm text-default-600">
                  Enter a name for your folder:
                </p>
                <Label htmlFor="name-1">Folder Name</Label>
                <Input
                  type="text"
                  placeholder="My Images"
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                  autoFocus
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  color="default"
                  onClick={() => setFolderModalOpen(false)}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                onClick={() => handleCreateFolder}
                disabled={creatingFolder || !folderName.trim()}
                variant="default" // ใช้แทน color="primary"
                className="w-full flex items-center gap-2"
              >
                {/* ถ้า loading ให้แสดง spinner */}
                {creatingFolder ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Create"
                )}

                {/* ไอคอนด้านขวา */}
                {!creatingFolder && <ArrowRight className="h-4 w-4" />}
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}
