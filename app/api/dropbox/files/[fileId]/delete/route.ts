import { getLoginSession } from "@/app/dropbox/lib/utils";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { put, list, del } from "@vercel/blob";
// import ImageKit from "imagekit";
// Initialize ImageKit with your credentials
// const imagekit = new ImageKit({
//   publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
//   privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
//   urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "",
// });

export async function DELETE(
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

    //ถ้าต้องการลบเฉพาะเมื่อเป็นของผู้ใช้คนนั้น (ปลอดภัย/อะตอมมิก):
    // const result = await prisma.file.deleteMany({
    //   where: { id: fileId, userId },
    // });
    // result.count === 1 => ลบสำเร็จ

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // Delete file from ImageKit if it's not a folder
    if (!file.isFolder) {
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
            console.log(searchResults.blobs);

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
              // ลบไฟล์แรกจากผลลัพธ์
              await del(searchResults.blobs[0].url);
            } else {
              // ลบไฟล์ตาม id หรือ path ที่คุณมี
              await del(vercelFileId);
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
    // Delete file from database
    const deletedFile = await prisma.file.delete({
      where: {
        id: fileId,
        userId: userId, // ถ้า schema กำหนดเป็น composite unique
      },
    });

    return NextResponse.json({
      success: true,
      message: "File deleted successfully",
      deletedFile,
    });
    // return NextResponse.json({ message: "Successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete file" },
      { status: 500 }
    );
  }
}
