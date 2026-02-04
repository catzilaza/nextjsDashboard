import { getCurrentUser } from "@/app/betterauth/actions/users";
import { getLoginSession } from "@/app/dropbox/lib/utils";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  props: { params: Promise<{ fileId: string }> },
) {
  try {
    // const login_session = await getLoginSession();
    const login_session = await getCurrentUser();

    if (!login_session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = login_session?.user?.id;

    const { fileId } = await props.params;

    if (!fileId) {
      return NextResponse.json(
        { error: "File ID is required" },
        { status: 400 },
      );
    }

    const file = await prisma.file.findUnique({
      where: {
        id: fileId,
        userId: userId, // ถ้า composite unique
      },
    });

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const updatedFiles = await prisma.file.update({
      where: { id: fileId, userId: userId },
      data: { isTrash: !file.isTrash },
    });

    if (!updatedFiles) {
      return NextResponse.json({ error: "File not update" }, { status: 404 });
    }

    const action = updatedFiles.isTrash ? "moved to trash" : "restored";

    return NextResponse.json({
      ...updatedFiles,
      message: `File ${action} successfully`,
    });
    return NextResponse.json({ message: "Successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating trash status:", error);
    return NextResponse.json(
      { error: "Failed to update file trash status" },
      { status: 500 },
    );
  }
}
