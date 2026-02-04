"use server";

import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import prisma from "@/lib/prisma";
import { put } from "@vercel/blob";
import { getLoginSession } from "@/app/dropbox/lib/utils";
import { getCurrentUser } from "@/app/betterauth/actions/users";

// import ImageKit from "imagekit";

// // Initialize ImageKit with your credentials
// const imagekit = new ImageKit({
//   publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
//   privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
//   urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "",
// });

export async function POST(request: NextRequest) {
  try {
    // const login_session = await getLoginSession();
    const login_session = await getCurrentUser();
    if (!login_session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = login_session?.user?.id;

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const formUserId = formData.get("userId") as string;
    const parentId = (formData.get("parentId") as string) || null;

    // // Verify the user is uploading to their own account
    if (formUserId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
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
          { status: 404 },
        );
      }
    }

    // Only allow image uploads
    // if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
    //   return NextResponse.json(
    //     { error: "Only image files are supported" },
    //     { status: 400 }
    //   );
    // }

    const buffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(buffer);

    const originalFilename = file.name.toString();
    const fileExtension = originalFilename.split(".").pop() || "";
    const uniqueFilename = `${uuidv4()}.${fileExtension}`;

    // // Create folder path based on parent folder if exists
    // const folderPath = parentId
    //   ? `/droply/${userId}/folders/${parentId}`
    //   : `/droply/${userId}`;

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return new Response(
        "Missing BLOB_READ_WRITE_TOKEN. Don't forget to add that to your .env file.",
        {
          status: 401,
        },
      );
    }

    const contentType = request.headers.get("content-type") || "text/plain";

    const uploadResponse = await put(uniqueFilename, fileBuffer, {
      contentType,
      access: "public",
    });

    // const file = req.body || "";
    // const filename = req.headers.get("x-vercel-filename") || "file.txt";
    // const contentType = req.headers.get("content-type") || "text/plain";
    // const fileType = `.${contentType.split("/")[1]}`;

    // construct final filename based on content-type if not provided
    //   const finalName = filename.includes(fileType)
    //     ? filename
    //     : `${filename}${fileType}`
    //   const blob = await put(finalName, file, {
    //     contentType,
    //     access: 'public'
    //   })

    // const uploadResponse = await imagekit.upload({
    //   file: fileBuffer,
    //   fileName: uniqueFilename,
    //   folder: folderPath,
    //   useUniqueFileName: false,
    // });

    const fileData = {
      id: uniqueFilename,
      name: originalFilename,
      path: uploadResponse.pathname,
      size: file.size,
      type: file.type,
      fileUrl: uploadResponse.url,
      thumbnailUrl: uploadResponse.downloadUrl,
      userId: userId,
      parentId: parentId,
      isFolder: false,
      isStarred: false,
      isTrash: false,
    };

    // const [newFile] = await db.insert(files).values(fileData).returning();
    const newFile = await prisma.file.create({
      data: fileData,
    });

    // return NextResponse.json({
    //   success: true,
    //   message: "Uploaded file successfully",
    //   newFile: newFile,
    // });

    return NextResponse.json(newFile);
    // return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 },
    );
  }
}

// "use server";

// import { NextRequest, NextResponse } from "next/server";
// import { auth } from "@/auth";
// import { v4 as uuidv4 } from "uuid";
// import prisma from "@/lib/prisma";
// import { put } from "@vercel/blob";
// import { getLoginSession } from "@/app/dropbox/lib/utils";
// // import { File } from "@/app/dropbox/lib/db/dataschema";

// // import ImageKit from "imagekit";

// // // Initialize ImageKit with your credentials
// // const imagekit = new ImageKit({
// //   publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
// //   privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
// //   urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "",
// // });

// export async function POST(request: NextRequest) {
//   try {
//     // const login_session = await getLoginSession();
//     // if (!login_session?.user?.id) {
//     //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     // }

//     // const userId = session.user.id;
//     const userId = "user001";
//     // const userId = login_session?.user?.id;

//     const formData = await request.formData();
//     const file = formData.get("file") as File;
//     const formUserId = formData.get("userId") as string;
//     const parentId = (formData.get("parentId") as string) || null;

//     console.log(" **** Dropbox/Files/Upload/route.ts ****");
//     console.log(` **** file : ${file.name} ****`);
//     console.log(` **** formUserId : ${formUserId} ****`);
//     console.log(` **** parentId : ${parentId} ****`);

//     // Verify the user is uploading to their own account
//     if (formUserId !== userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     if (!file) {
//       return NextResponse.json({ error: "No file provided" }, { status: 400 });
//     }

//     // Check if parent folder exists if parentId is provided
//     // if (parentId) {
//     // const [parentFolder] = await db
//     //   .select()
//     //   .from(files)
//     //   .where(
//     //     and(
//     //       eq(files.id, parentId),
//     //       eq(files.userId, userId),
//     //       eq(files.isFolder, true)
//     //     )
//     //     );

//     //   if (!parentFolder) {
//     //     return NextResponse.json(
//     //       { error: "Parent folder not found" },
//     //       { status: 404 }
//     //     );
//     //   }
//     // }

//     // Check if parent folder exists if parentId is provided
//     if (parentId) {
//       const parentFolder = await prisma.file.findFirst({
//         where: {
//           id: parentId,
//           userId: userId,
//           isFolder: true,
//         },
//       });

//       if (!parentFolder) {
//         return NextResponse.json(
//           { error: "Parent folder not found" },
//           { status: 404 }
//         );
//       }
//     }

//     // Only allow image uploads
//     if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
//       return NextResponse.json(
//         { error: "Only image files are supported" },
//         { status: 400 }
//       );
//     }

//     const buffer = await file.arrayBuffer();
//     const fileBuffer = Buffer.from(buffer);

//     const originalFilename = file.name;
//     const fileExtension = originalFilename.split(".").pop() || "";
//     const uniqueFilename = `${uuidv4()}.${fileExtension}`;

//     // Create folder path based on parent folder if exists
//     const folderPath = parentId
//       ? `/droply/${userId}/folders/${parentId}`
//       : `/droply/${userId}`;

//     if (!process.env.BLOB_READ_WRITE_TOKEN) {
//       return new Response(
//         "Missing BLOB_READ_WRITE_TOKEN. Don't forget to add that to your .env file.",
//         {
//           status: 401,
//         }
//       );
//     }

//     const contentType = request.headers.get("content-type") || "text/plain";

//     const uploadResponse = await put(uniqueFilename, fileBuffer, {
//       contentType,
//       access: "public",
//     });

//     // const file = req.body || "";
//     // const filename = req.headers.get("x-vercel-filename") || "file.txt";
//     // const contentType = req.headers.get("content-type") || "text/plain";
//     // const fileType = `.${contentType.split("/")[1]}`;

//     // construct final filename based on content-type if not provided
//     //   const finalName = filename.includes(fileType)
//     //     ? filename
//     //     : `${filename}${fileType}`
//     //   const blob = await put(finalName, file, {
//     //     contentType,
//     //     access: 'public'
//     //   })

//     // const uploadResponse = await imagekit.upload({
//     //   file: fileBuffer,
//     //   fileName: uniqueFilename,
//     //   folder: folderPath,
//     //   useUniqueFileName: false,
//     // });

//     const fileData = {
//       name: originalFilename,
//       path: uploadResponse.pathname,
//       size: file.size,
//       type: file.type,
//       fileUrl: uploadResponse.url,
//       thumbnailUrl: uploadResponse.downloadUrl,
//       userId: userId,
//       parentId: parentId,
//       isFolder: false,
//       isStarred: false,
//       isTrash: false,
//     };

//     // const [newFile] = await db.insert(files).values(fileData).returning();
//     const newFile = await prisma.file.create({
//       data: fileData,
//     });

//     return NextResponse.json(newFile);

//     // console.log(" **** Dropbox/Files/Upload/route.ts ****");
//     // console.log(` **** newFile.name : ${newFile.name} ****`);
//     // console.log(` **** newFile.userId : ${newFile.userId} ****`);
//     // console.log(` **** newFile.fileUrl : ${newFile.fileUrl} ****`);
//     // console.log(` **** folderPath : ${folderPath} ****`);

//     // return NextResponse.json(
//     //   { success: true, message: "Successfully" },
//     //   { status: 200 }
//     // );
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     return NextResponse.json(
//       { error: "Failed to upload file" },
//       { status: 500 }
//     );
//   }
// }
