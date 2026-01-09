import { NextRequest, NextResponse } from "next/server";
import React from "react";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { mockfiles } from "@/app/dropbox/lib/db/dataschema";

import type { File as FileType } from "@/app/dropbox/lib/db/dataschema";
import { list } from "@vercel/blob";
import { number } from "better-auth";
import { getLoginSession } from "@/app/dropbox/lib/utils";

export async function GET(request: NextRequest) {
  try {
    const login_session = await getLoginSession();
    if (!login_session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = login_session?.user?.id;

    // // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const queryUserId = searchParams.get("userId");
    // const parentId = searchParams.get("parentId");

    // // Verify the user is requesting their own files
    if (!queryUserId || queryUserId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // // Fetch files from database based on parentId
    // let userFiles;
    // // const userId = "user001";
    // // const parentId = "user001";
    // if (parentId) {
    //   // Fetch files within a specific folder
    //   userFiles = await prisma.file.findMany({
    //     where: {
    //       userId: userId,
    //       parentId: parentId,
    //     },
    //   });
    // } else {
    //   // Fetch root-level files (where parentId is null)
    //   userFiles = await prisma.file.findMany({
    //     where: {
    //       userId: userId,
    //       parentId: null, // parentId is null for root-level files
    //     },
    //   });
    // }
    // return NextResponse.json(userFiles);

    // id: `uuid-file-${String(11 + i).padStart(3, "0")}`,
    // name: `image-${String(11 + i).padStart(3, "0")}`,
    const response = await list();
    const tempBlobfiles: FileType[] = response.blobs.map((obj, i) => ({
      id: `uuid-file-${String(11 + i).padStart(3, "0")}`,
      name: `image-${String(11 + i).padStart(3, "0")}`,
      path: obj.pathname ?? "/documents/work/notes.txt",
      size: obj.size ?? 2048,
      type: "image/png",
      fileUrl:
        obj.downloadUrl ?? "http://localhost:3000/documents/work/notes.txt",
      thumbnailUrl: obj.url ?? undefined,
      userId: userId,
      parentId: "uuid-folder-004",
      isFolder: false,
      isStarred: false,
      isTrash: false,
      createdAt: obj.uploadedAt,
      updatedAt: obj.uploadedAt,
    }));

    const userFiles = await prisma.file.findMany({
      where: {
        userId: userId,
      },
    });

    const tempUserFiles: FileType[] = userFiles.map((obj, i) => ({
      id: obj.id ?? `uuid-file-${String(11 + i).padStart(3, "0")}`,
      name: obj.name ?? `image-${String(11 + i).padStart(3, "0")}`,
      path: obj.path ?? "/documents/work/notes.txt",
      size: obj.size ?? 2048,
      type: "image/png",
      fileUrl: obj.fileUrl ?? "http://localhost:3000/documents/work/notes.txt",
      thumbnailUrl: obj.thumbnailUrl ?? undefined,
      userId: obj.userId ?? userId,
      parentId: obj.parentId ?? "uuid-folder-004",
      isFolder: obj.isFolder ?? false,
      isStarred: obj.isStarred ?? false,
      isTrash: obj.isTrash ?? false,
      createdAt: obj.createdAt,
      updatedAt: obj.updatedAt,
    }));

    const tempMockfiles: FileType[] = [...tempUserFiles];
    // const tempMockfiles: FileType[] = [...mockfiles, ...tempBlobfiles, ...tempUserFiles];

    return NextResponse.json(tempMockfiles);

    // return NextResponse.json(
    //   { message: "Successfully to fetch files" },
    //   { status: 200 }
    // );
  } catch (error) {
    console.error("Error fetching files:", error);
    return NextResponse.json(
      { error: "Failed to fetch files" },
      { status: 500 }
    );
  }
}
