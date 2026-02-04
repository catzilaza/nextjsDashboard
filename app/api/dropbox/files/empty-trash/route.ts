import { getCurrentUser } from "@/app/betterauth/actions/users";
import { getLoginSession } from "@/app/dropbox/lib/utils";
import prisma from "@/lib/prisma";
import { del, list } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    // const login_session = await getLoginSession();
    const login_session = await getCurrentUser();
    if (!login_session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = login_session?.user?.id;

    const trashedFiles = await prisma.file.findMany({
      where: {
        userId: userId,
        isTrash: true,
      },
      orderBy: {
        createdAt: "desc", // ตัวอย่าง: เรียงตามวันที่
      },
    });

    if (trashedFiles.length === 0) {
      return NextResponse.json(
        { message: "No files in trash" },
        { status: 200 },
      );
    }

    // Delete files from vercel
    const deletePromises = trashedFiles
      .filter((file) => !file.isFolder) // Skip folders
      .map(async (file) => {
        try {
          let vercelFileId = null;

          if (file.fileUrl) {
            const urlWithoutQuery = file.fileUrl.split("?")[0];
            vercelFileId = urlWithoutQuery.split("/").pop();
          }

          if (!vercelFileId && file.path) {
            vercelFileId = file.path.split("/").pop();
          }

          if (vercelFileId) {
            try {
              const searchResults = await list({
                prefix: vercelFileId,
                limit: 1,
              });

              if (searchResults && searchResults.blobs.length > 0) {
                await del(searchResults.blobs[0].url);
              } else {
                await del(vercelFileId);
              }
            } catch (searchError) {
              console.error(
                `Error searching for file in ImageKit:`,
                searchError,
              );
              await del(vercelFileId);
            }
          }
        } catch (error) {
          console.error(`Error deleting file ${file.id} from ImageKit:`, error);
        }
      });

    // Wait for all vercel deletions to complete (or fail)
    await Promise.allSettled(deletePromises);

    // Delete all trashed files from the database
    const deletedFiles = await prisma.file.deleteMany({
      where: {
        userId: userId,
        isTrash: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Successfully deleted ${deletedFiles.count} files from trash`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to empty trash" },
      { status: 500 },
    );
  }
}
