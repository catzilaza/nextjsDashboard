import { NextRequest, NextResponse } from "next/server";
import React from "react";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    // const { userId } = await auth();
    // if (!userId) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }
    // const session = await auth();
    // if (!session) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const userId = "user001";

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const queryUserId = searchParams.get("userId");
    const parentId = searchParams.get("parentId");

    // Verify the user is requesting their own files
    if (!queryUserId || queryUserId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch files from database based on parentId
    let userFiles;
    // const userId = "user001";
    // const parentId = "user001";
    if (parentId) {
      // Fetch files within a specific folder
      userFiles = await prisma.file.findMany({
        where: {
          userId: userId,
          parentId: parentId,
        },
      });
    } else {
      // Fetch root-level files (where parentId is null)
      userFiles = await prisma.file.findMany({
        where: {
          userId: userId,
          parentId: null, // parentId is null for root-level files
        },
      });
    }
    return NextResponse.json(userFiles);

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
