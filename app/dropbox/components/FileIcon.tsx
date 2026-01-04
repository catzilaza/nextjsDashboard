"use client";

import React from "react";
import type { File as FileType } from "../lib/db/dataschema";
import { mockfiles } from "../lib/db/dataschema";
import { FileText, Folder } from "lucide-react";
// import { IKImage } from "imagekitio-next";
import Image from "next/image";

interface FileIconProps {
  file: FileType;
}

export default function FileIcon({ file }: FileIconProps) {
  if (file.isFolder) return <Folder className="h-5 w-5 text-blue-500" />;
  const fileType = file.type.split("/")[0];
  switch (fileType) {
    case "image":
      return (
        <div className="h-12 w-12 relative overflow-hidden rounded">
          {/* <IKImage
            path={file.path}
            transformation={[
              {
                height: 48,
                width: 48,
                focus: "auto",
                quality: 80,
                dpr: 2,
              },
            ]}
            loading="lazy"
            lqip={{ active: true }}
            alt={file.name}
            style={{ objectFit: "cover", height: "100%", width: "100%" }}
          /> */}
          <img
            src={file.fileUrl || file.thumbnailUrl || "/not-found.jpg"}
            alt={file.name}
            width={48}
            height={48}
            loading="lazy"
            style={{ objectFit: "cover", height: "100%", width: "100%" }}
          />

          {/* <Image
            src={file.path} // ต้องเป็น URL ที่เข้าถึงได้ เช่นจาก Vercel Blob หรือ CDN
            alt={file.name}
            width={48}
            height={48}
            loading="lazy"
            style={{ objectFit: "cover", height: "100%", width: "100%" }}
          /> */}
        </div>
      );
    case "application":
      if (file.type.includes("pdf")) {
        return <FileText className="h-5 w-5 text-red-500" />;
      }
      return <FileText className="h-5 w-5 text-orange-500" />;
    case "video":
      return <FileText className="h-5 w-5 text-purple-500" />;
    default:
      return <FileText className="h-5 w-5 text-gray-500" />;
  }
}
