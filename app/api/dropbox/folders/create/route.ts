"use server";

import { getLoginSession } from "@/app/dropbox/lib/utils";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import React from "react";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const login_session = await getLoginSession();
    if (!login_session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = login_session?.user?.id;

    const body = await request.json();
    const { name, userId: bodyUserId, parentId = null } = body;

    console.log("++++ body ++++ : ", body);

    // Verify the user is creating a folder in their own account
    if (bodyUserId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json(
        { error: "Folder name is required" },
        { status: 400 }
      );
    }

    // Check if parent folder exists if parentId is provided
    if (parentId) {
      const parentFolder = await prisma.file.findFirst({
        where: {
          parentId: parentId,
          userId: userId,
          isFolder: true,
        },
      });

      if (!parentFolder) {
        return NextResponse.json(
          { error: "Parent folder not found" },
          { status: 404 }
        );
      }
    }

    // Create folder record in database
    const folderData = {
      id: uuidv4(),
      name: name.trim(),
      path: `/folders/${userId}/${uuidv4()}`,
      size: 0,
      type: "folder",
      fileUrl: "",
      thumbnailUrl: null,
      userId,
      parentId,
      isFolder: true,
      isStarred: false,
      isTrash: false,
    };

    const newFolder = await prisma.file.create({
      data: folderData,
    });

    // 💡 ช่วยเพิ่มการตรวจสอบเพิ่มเติม
    // (เช่น ป้องกันการสร้างโฟลเดอร์ชื่อซ้ำภายใน parent เดียวกัน)

    return NextResponse.json({
      success: true,
      message: "Folder created successfully",
      folder: newFolder,
    });
  } catch (error) {
    console.error("Error creating folder:", error);
    return NextResponse.json(
      { error: "Failed to create folder" },
      { status: 500 }
    );
  }
}
