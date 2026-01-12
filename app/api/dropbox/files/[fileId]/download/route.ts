import { getLoginSession } from "@/app/dropbox/lib/utils";
import prisma from "@/lib/prisma";
import { list, put, del } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ fileId: string }> }
) {
  try {
    const login_session = await getLoginSession();
    if (!login_session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = login_session?.user?.id;

    const { fileId } = await props.params;

    if (!fileId) {
      return NextResponse.json(
        { error: "File ID is required" },
        { status: 400 }
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
    } else {
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
              prefix: vercelFileId, // ใช้ prefix แทน name
              limit: 1, // จำกัดจำนวนผลลัพธ์
            });

            // searchResults.blobs จะเป็น array ของไฟล์ที่เจอ
            // console.log("searchResults.blobs : ", searchResults.blobs);

            // import { list } from "@vercel/blob";
            // async function findFile(fileId: string) {
            //   const { blobs } = await list({
            //     prefix: fileId,
            //     limit: 1,
            //   });
            //   if (blobs.length > 0) {
            //     return blobs[0]; // ไฟล์ที่เจอ
            //   } else {
            //     return null; // ไม่เจอไฟล์
            //   }
            // }

            if (searchResults && searchResults.blobs.length > 0) {
              return NextResponse.json(searchResults.blobs[0].downloadUrl);
            } else {
              return NextResponse.json({
                message: "error something went wrong",
                status: "500",
              });
            }
          } catch (searchError) {
            console.error(`Error searching for file in ImageKit:`, searchError);
            await del(vercelFileId);
          }
        }
      } catch (error) {
        console.error(`Error deleting file ${fileId} from ImageKit:`, error);
      }
    }
  } catch (error) {
    return NextResponse.json({ message: "error", status: "500" });
  }
}
