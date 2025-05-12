"use server";

// import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { PrismaClient, Prisma } from "generated/prisma";
import prisma from "@/lib/prisma";

// const prisma = new PrismaClient();

export async function getDataBlogAction() {
  try {
    const categories = await prisma.category.findMany();
    // console.log("GET ++++++ categories", categories);
    return categories;
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
    const posts = await prisma.post.findMany();
    const count = await prisma.post.count();
    // const [posts, count] = await prisma.$transaction([
    //   prisma.post.findMany(query),
    //   prisma.post.count({ where: query.where }),
    // ]);
    // console.log("GET ++++++ posts", posts, count);
    return { posts, count };
  } catch (error) {
    console.log(error);
  }
}

type State = {
  errors?: string | undefined | null;
  message?: string | undefined | null;
};

export async function postDataBlogAction(
  prevState: State,
  formData: FormData
): Promise<State> {
  // const session = await auth();

  // if (!session) {
  //   console.log("Not Authenticated!");
  //   return null;
  // }

  // alert("handleSubmit");
  // console.log("postAction ====> prevState : ", prevState);
  // console.log("postAction ====> formData : ", formData);
  const title = formData.get("title");
  const desc = formData.get("desc");
  const image = formData.get("image");
  const username = formData.get("username");

  console.log("Server received data:", { title, desc, image, username });

  // Perform your server-side logic here (e.g., database operations)
  // return { message: "Post created successfully!" };

  try {
    const resultCreate = await prisma.user.create({
      data: {
        name: username as string,
        email: `${username}.martinez@x.dummyjson.com`,
        image: image as string,
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
      },
    });

    if (resultCreate) {
      console.log("Create Post Successfully", resultCreate);
      return { message: "Post created successfully!" };
    } else {
      // throw new Error("Create Post Failed!");
      return { errors: "Post created error!" };
    }
  } catch (error) {
    console.log("Error creating post:", error);
    //return { message: "", errors: error instanceof Error ? error.message : "An error occurred" };
    return { errors: "An error occurred" };
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

export async function getCommentAction() {
  try {
    const comments = await prisma.comment.findMany();
    // const [comments] = await prisma.comment.findMany({
    //   where: {
    //     ...(postSlug && { postSlug }),
    //   },
    //   include: { user: true },
    // });
    // console.log("GET ++++++ comments", comments);
    return comments;
  } catch (error) {
    console.log(error);
  }
}

//CREATE A COMMENT
export async function postCommentAction(bodyData: any) {
  const session = await auth();

  if (!session) {
    console.log("Not Authenticated!");
    return null;
  }

  try {
    const comment = await prisma.comment.create({
      data: {
        ...bodyData,
        userEmail: session.user.email as string,
      },
    });
    return comment;
  } catch (error) {
    console.log(error);
  }
}
