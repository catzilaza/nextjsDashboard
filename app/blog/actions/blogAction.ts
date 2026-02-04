"use server";

// import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

export async function getDataBlogAction() {
  try {
    // const categories = await prisma.category.findMany();
    // console.log("GET ++++++ categories", categories);
    // return categories;
  } catch (error) {
    console.log(error);
  }
}

export async function getDataPageBlogAction() {
  // const { searchParams } = new URL(req.url);
  // const page = searchParams.get("page") || 1;
  // const cat = searchParams.get("cat") || undefined;
  // const POST_PER_PAGE = 2;

  // const query = {
  //   take: POST_PER_PAGE,
  //   skip: POST_PER_PAGE * (Number(page) - 1),
  //   where: {
  //     ...(cat && { catSlug: cat }),
  //   },
  // };

  try {
    // const posts = await prisma.post.findMany();
    // const count = await prisma.post.count();
    // const [posts, count] = await prisma.$transaction([
    //   prisma.post.findMany(query),
    //   prisma.post.count({ where: query.where }),
    // ]);
    // console.log("GET ++++++ posts", posts, count);
    // return { posts, count };
  } catch (error) {
    console.log(error);
  }
}

type PostDataBlogState = {
  errors?: {
    name?: string[] | null;
    title?: string[] | null;
    // img?: string[] | null;
    desc?: string[] | null;
    errMsg?: string | null;
    imgFile?: string[] | null;
  } | null;
  message?: string | undefined | null;
};

const PostDataBlogSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  desc: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  // img: z.string().min(2, {
  //   message: "Title must be at least 2 characters.",
  // }),
  imgFile: z
    .instanceof(File, {
      message: "Title must be at least 2 characters.",
    })
    .optional(),
});

export async function postDataBlogAction(
  prevState: PostDataBlogState,
  formData: FormData,
): Promise<PostDataBlogState> {
  // const session = await auth();

  // if (!session) {
  //   console.log("Not Authenticated!");
  //   return null;
  // }

  const title = formData.get("title");
  const desc = formData.get("desc");
  // const img = formData.get("img");
  const imgFile = formData.get("imgFile") as File;
  const name = formData.get("name");

  const validatedFields = PostDataBlogSchema.safeParse({
    name,
    title,
    // img,
    desc,
    imgFile,
  });

  if (!validatedFields.success) {
    // console.log("ERROR : ", validatedFields.error.flatten().fieldErrors);
    console.log("ERROR : ", "validatedFields.error.flatten().fieldErrors");
    return {
      errors: {
        name: validatedFields.error.flatten().fieldErrors.name,
        title: validatedFields.error.flatten().fieldErrors.title,
        // img: validatedFields.error.flatten().fieldErrors.img,
        desc: validatedFields.error.flatten().fieldErrors.desc,
        imgFile: validatedFields.error.flatten().fieldErrors.imgFile,
      },
      message: null,
    };
  }

  console.log("Server received data:", { title, desc, name, imgFile });

  try {
    // const resultCreate = await prisma.user.create({
    //   data: {
    // name: name as string,
    // email: `${name}.martinez@x.dummyjson.com`,
    // image_url: image_url as string,
    // password: "defaultPassword123",
    // Post: {
    //   create: [
    //     {
    //       title: "Lifestyle",
    //       slug: "Fish",
    //       img: "/blog/style.png",
    //       desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    //       catSlug: "Fish",
    //       categories: {
    //         create: [
    //           {
    //             title: "Lifestyle",
    //             img: "/blog/style.png",
    //             slug: "Fish", // Added the required slug property
    //           },
    //         ],
    //       },
    //       comments: {
    //         create: [
    //           {
    //             desc: "Great post!",
    //             user: {
    //               connect: { email: "ethan.martinez@x.dummyjson.com" }, // Replace with the appropriate user connection logic
    //             },
    //           },
    //         ],
    //       },
    //     },
    //   ],
    // },
    //   },
    // });

    console.log("Create Post Successfully");
    return { message: "Post created successfully!", errors: null };

    // if (resultCreate) {
    //   console.log("Create Post Successfully", resultCreate);
    //   return { message: "Post created successfully!" };
    // } else {
    //   // throw new Error("Create Post Failed!");
    //   return { errors: "Post created error!" };
    // }
  } catch (error) {
    console.log("Error creating post:", error);
    //return { message: "", errors: error instanceof Error ? error.message : "An error occurred" };
    return { errors: { errMsg: "An error occurred" } };
  }

  // try {
  //   // const post = await prisma.post.create({
  //   //   data: { ...body, userEmail: session.user.email },
  //   // });
  //   console.log("Create Post Successfully");
  // } catch (error) {
  //   console.log(error);
  // }
}

// export async function getCommentAction() {
//   try {
//     const comments = await prisma.comment.findMany();
//     // const [comments] = await prisma.comment.findMany({
//     //   where: {
//     //     ...(postSlug && { postSlug }),
//     //   },
//     //   include: { user: true },
//     // });
//     // console.log("GET ++++++ comments", comments);
//     return comments;
//   } catch (error) {
//     console.log(error);
//   }
// }

//CREATE A COMMENT
// export async function postCommentAction(bodyData: any) {
//   const session = await auth();

//   if (!session) {
//     console.log("Not Authenticated!");
//     return null;
//   }

//   try {
//     const comment = await prisma.comment.create({
//       data: {
//         ...bodyData,
//         userEmail: session.user.email as string,
//       },
//     });
//     return comment;
//   } catch (error) {
//     console.log(error);
//   }
// }
