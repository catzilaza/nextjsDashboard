import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { mockfiles } from "@/app/dropbox/lib/db/dataschema";
import { number } from "better-auth";
import { getLoginSession } from "@/app/dropbox/lib/utils";

export async function GET(request: NextRequest) {
  try {
    const login_session = await getLoginSession();
    if (!login_session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // console.log("login_session : ", login_session);

    const userId = login_session?.user?.id;

    // // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const queryUserId = searchParams.get("userId") as string;
    const parentId = searchParams.get("parentId") as string;

    // Verify the user is requesting their own files
    if (!queryUserId || queryUserId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // // Fetch files from database based on parentId
    let userFiles;

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

    // return NextResponse.json({
    //   success: true,
    //   message: "Fetched files successfully",
    //   userFiles: userFiles,
    // });
  } catch (error) {
    console.error("Error fetching files:", error);
    return NextResponse.json(
      { error: "Failed to fetch files" },
      { status: 500 }
    );
  }
}
