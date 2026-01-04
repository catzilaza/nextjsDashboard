"use client";

import type { File as FileType } from "../lib/db/dataschema";
import { Button } from "@/components/ui/button";
import { ArrowUpFromLine, Download, Star, Trash, X } from "lucide-react";

interface FileActionsProps {
  file: FileType;
  onStar: (id: string) => void;
  onTrash: (id: string) => void;
  onDelete: (file: FileType) => void;
  onDownload: (file: FileType) => void;
}

export default function FileActions({
  file,
  onStar,
  onTrash,
  onDelete,
  onDownload,
}: FileActionsProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-end">
      {/* Download button */}
      {!file.isTrash && !file.isFolder && (
        <Button
          variant="link"
          size="sm"
          onClick={() => onDownload(file)}
          className="min-w-0 px-2"
        >
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Download</span>
        </Button>
      )}

      {/* Star button */}
      {!file.isTrash && (
        <Button
          variant="link"
          size="sm"
          onClick={() => onStar(file.id)}
          className="min-w-0 px-2"
        >
          <Star
            className={`h-4 w-4 ${
              file.isStarred ? "text-yellow-400 fill-current" : "text-gray-400"
            }`}
          />
          <span className="hidden sm:inline">
            {file.isStarred ? "Unstar" : "Star"}
          </span>
        </Button>
      )}

      {/* Trash/Restore button */}
      <Button
        variant="link"
        size="sm"
        onClick={() => onTrash(file.id)}
        className="min-w-0 px-2"
        color={file.isTrash ? "success" : "default"}
      >
        {file.isTrash ? (
          <ArrowUpFromLine className="h-4 w-4" />
        ) : (
          <Trash className="h-4 w-4" />
        )}
        <span className="hidden sm:inline">
          {file.isTrash ? "Restore" : "Delete"}
        </span>
      </Button>

      {/* Delete permanently button */}
      {file.isTrash && (
        <Button
          variant="link"
          size="sm"
          color="danger"
          onClick={() => onDelete(file)}
          className="min-w-0 px-2"
        >
          <X className="h-4 w-4" />
          <span className="hidden sm:inline">Remove</span>
        </Button>
      )}
    </div>
  );
}
