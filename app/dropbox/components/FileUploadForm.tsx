"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  AlertTriangle,
  ArrowRight,
  FileUp,
  FolderPlus,
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

export default function FileUploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Folder creation state
  const [folderModalOpen, setFolderModalOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [creatingFolder, setCreatingFolder] = useState(false);
  return (
    <div className="space-y-4">
      <div className="flex gap-2 mb-2">
        {/* Action buttons */}
        <Button
          color="primary"
          variant="default"
          //   startContent={<FolderPlus className="h-4 w-4" />}
          //   onClick={() => setFolderModalOpen(true)}
          className="flex-1"
        >
          New Folder
        </Button>
        <Button
          color="primary"
          variant="default"
          //   startContent={<FileUp className="h-4 w-4" />}
          //   onClick={() => fileInputRef.current?.click()}
          className="flex-1"
        >
          Add Image
        </Button>
      </div>

      {/* File drop area */}
      <div className="border-2 border-dashed rounded-lg p-6 text-center transition-colors">
        {!file ? (
          <div className="space-y-3">
            <FileUp className="h-12 w-12 mx-auto text-primary/70" />
            <div>
              <p>
                Drag and drop image here or{" "}
                <Button
                  type="button"
                  onClick={() => alert("fileInputRef.current?.click()")}
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
              // onChange={handleFileChange}
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
                // isIconOnly
                // variant="light"
                // size="sm"
                // onClick={clearFile}
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
              <Progress
                value={progress}
                color="primary"
                // size="sm"
                // showValueLabel={true}
                className="max-w-full"
              />
            )}

            <Button
              color="primary"
              // startContent={<Upload className="h-4 w-4" />}
              // endContent={!uploading && <ArrowRight className="h-4 w-4" />}
              // onClick={handleUpload}
              // isLoading={uploading}
              className="w-full"
              // isDisabled={!!error}
            >
              {uploading ? `Uploading... ${progress}%` : "Upload Image"}
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
                color="primary"
                onClick={() => alert("handleCreateFolder")}
                // isLoading={creatingFolder}
                // isDisabled={!folderName.trim()}
                // endContent={!creatingFolder && <ArrowRight className="h-4 w-4" />}
              >
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}
