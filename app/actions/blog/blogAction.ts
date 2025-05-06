import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { console } from "inspector";

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

export async function postDataBlogAction(data: any) {
  const session = await auth();

  if (!session) {
    console.log("Not Authenticated!");
    return null;
  }

  try {
    // const post = await prisma.post.create({
    //   data: { ...body, userEmail: session.user.email },
    // });
    console.log("Create Post Successfully");
  } catch (error) {
    console.log(error);
  }
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
