"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertTriangle,
  ArrowRight,
  FileUp,
  FolderPlus,
  Upload,
  X,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import axios from "axios";

interface FileUploadFormProps {
  userId: string;
  onUploadSuccess?: () => void;
  currentFolder?: string | null;
}

export default function FileUploadForm({
  userId,
  onUploadSuccess,
  currentFolder,
}: FileUploadFormProps) {
  // const files = true;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Folder creation state
  const [folderModalOpen, setFolderModalOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [creatingFolder, setCreatingFolder] = useState(false);

  // useEffect(() => {
  //   console.log("uploading ===> : ", uploading);
  //   console.log("folderModalOpen ===> : ", folderModalOpen);
  //   console.log("creatingFolder ===> : ", creatingFolder);
  //   console.log("fileInputRef.current ===> : ", fileInputRef.current);
  // }, [uploading, folderModalOpen, creatingFolder, fileInputRef.current]);

  // const handleFileChange = async () => {
  //   if (htmlInputRef.current?.files?.[0]) {
  //     setSelectedFileName(htmlInputRef.current.files[0].name);
  //     setProbImage(htmlInputRef.current.files[0].name.trim());
  //     alert(htmlInputRef.current.files[0].name);
  //     setProgress(80);
  //     setUploading(true);
  //   } else {
  //     setSelectedFileName(null);
  //     alert("null");
  //   }
  // };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("++++++++ handleFileChange: ", e.target.files);

    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      // console.log("selectedFile +++ : ", selectedFile.name);

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
    // alert("handleDrop");
    console.log("handleDrop ****** : ", e.target.dispatchEvent.length);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // alert("handleDragOver");
    console.log("handleDragOver +++++ : ", e.target.dispatchEvent.length);
  };

  const clearFile = () => {
    setFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = async () => {
    // console.log("handleUpload");
    // alert("handleUpload");

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

      toast(
        `title: Upload Successful, 
        description: ${file.name} has been uploaded successfully., 
        color: "success",`
      );

      // Clear the file after successful upload
      clearFile();

      // Call the onUploadSuccess callback if provided
      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Failed to upload file. Please try again.");
      toast(
        `title: Upload Failed,
        description: "We couldn't upload your file. Please try again.",
        color: "danger",`
      );
    } finally {
      setUploading(false);
    }
  };

  const handleCreateFolder = async () => {
    // console.log("handleCreateFolder");
    // alert("handleCreateFolder");

    if (!folderName.trim()) {
      toast(
        `title: Invalid Folder Name,
        description: Please enter a valid folder name.,
        color: danger,`
      );
      return;
    }

    setCreatingFolder(true);

    try {
      await axios.post("/api/dropbox/folders/create", {
        name: folderName.trim(),
        userId: userId,
        parentId: currentFolder,
      });

      toast(
        `title: Folder Created,
        description: Folder ${folderName} has been created successfully.,
        color: success,`
      );

      // Reset folder name and close modal
      setFolderName("");
      setFolderModalOpen(false);

      // Call the onUploadSuccess callback to refresh the file list
      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (error) {
      console.error("Error creating folder:", error);
      toast(
        `title: Folder Creation Failed,
        description: We couldn't create the folder. Please try again.,
        color: danger,`
      );
    } finally {
      setCreatingFolder(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* File drop area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={` mt-8 mb-14 border-2 border-dashed rounded-lg p-6 text-center transition-colors
          ${
            error
              ? "border-danger/30 bg-danger/5"
              : file
              ? "border-primary/30 bg-primary/5"
              : "border-default-300 hover:border-primary/5"
          }`}
        // className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors`}
      >
        {!file ? (
          <div className="space-y-3">
            <FileUp className="h-12 w-12 mx-auto text-primary/70" />
            <div>
              <p className="text-2xl">
                Drag and drop your image here, or{" "}
                <Button
                  type="button"
                  onClick={() => {
                    fileInputRef.current?.click();
                    // alert("Add Image");
                  }}
                  className="text-emerald-400 text-xl cursor-pointer font-bold inline bg-transparent border-2 px-1 py-1 mx-2"
                >
                  browse image
                </Button>
              </p>
              <p className="text-xs mt-1">Images up to 5MB</p>
            </div>
            <Input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
              // accept="image/jpeg, image/png, image/gif"
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
                variant="default"
                size="sm"
                onClick={clearFile}
                className="text-2xl"
                // isIconOnly
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
              <Progress
                value={progress}
                color="primary"
                className="max-w-full"
                // showValueLabel={true}
              />
            )}

            <Button
              color="primary"
              onClick={handleUpload}
              className="w-full"
              //   isLoading={uploading}
              //   isDisabled={!!error}
              //   startContent={<Upload className="h-4 w-4" />}
              //   endContent={!uploading && <ArrowRight className="h-4 w-4" />}
            >
              {uploading ? `Uploading... ${progress}%` : "Upload Image"}
              <Upload className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 mb-2">
        {/* <Button
          color="primary"
          variant="default"
          onClick={() => {
            setFolderModalOpen(true);
          }}
          className="flex-1"
        >
          <FolderPlus className="h-4 w-4" />
          New Folder
        </Button> */}
        {/* Create Folder Modal */}
        <Dialog>
          <DialogTrigger className="flex flex-1 gap-4 justify-center items-center border bg-black text-white text-xs px-2 py-2 rounded-md">
            <FolderPlus className="h-5 w-5 text-white" />
            New Folder
          </DialogTrigger>
          <DialogContent className="border bg-slate-50">
            <DialogHeader className="border-b flex gap-2 items-center">
              <DialogTitle className="flex flex-1 gap-4">
                {" "}
                <FolderPlus className="h-5 w-5 text-primary" />
                <span>New Folder</span>
              </DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-default-600">
                Enter a name for your folder:
              </p>
              <Input
                type="text"
                placeholder="My Images"
                onChange={(e) => setFolderName(e.target.value)}
                autoFocus
                // label="Folder Name"
                // value={folderName}
              />
            </div>
            <DialogFooter>
              <Button
                variant="default"
                color="default"
                onClick={(e) => {
                  setFolderModalOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                onClick={handleCreateFolder}
                //   isLoading={creatingFolder}
                //   isDisabled={!folderName.trim()}
                //   endContent={!creatingFolder && <ArrowRight className="h-4 w-4" />}
              >
                Create
                <ArrowRight className="h-4 w-4" />
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button
          color="primary"
          variant="default"
          onClick={() => {
            fileInputRef.current?.click();
            // alert("Add Image");
          }}
          className="flex-1"
        >
          <FileUp className="h-4 w-4" />
          Add Image
        </Button>
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
      {/* <Dialog>
        <DialogTrigger className="flex gap-4 w-full items-center border bg-slate-100 text-xs px-2 py-2 rounded-md">
          <FolderPlus className="h-5 w-5 text-primary" />
          New Folder
        </DialogTrigger>
        <DialogContent className="border bg-slate-50">
          <DialogHeader className="border-b flex gap-2 items-center">
            <DialogTitle className="flex-1">
              {" "}
              <FolderPlus className="h-5 w-5 text-primary" />
              <span>New Folder</span>
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-default-600">
              Enter a name for your folder:
            </p>
            <Input
              type="text"
              placeholder="My Images"
              onChange={(e) => setFolderName(e.target.value)}
              autoFocus
              // label="Folder Name"
              // value={folderName}
            />
          </div>
          <DialogFooter className="border-t border">
            <Button
              variant="default"
              color="default"
              onClick={(e) => {
                setFolderModalOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={handleCreateFolder}
              //   isLoading={creatingFolder}
              //   isDisabled={!folderName.trim()}
              //   endContent={!creatingFolder && <ArrowRight className="h-4 w-4" />}
            >
              Create
              <ArrowRight className="h-4 w-4" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
    </div>
  );
}
