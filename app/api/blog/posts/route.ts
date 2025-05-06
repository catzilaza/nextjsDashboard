import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: NextResponse) => {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || 1;
  const cat = searchParams.get("cat") || undefined;
  const POST_PER_PAGE = 2;

  // console.log("GET ++++++ page", page);
  // console.log("GET ++++++ cat", cat);

  const query = {
    take: POST_PER_PAGE,
    skip: POST_PER_PAGE * (Number(page) - 1),
    where: {
      ...(cat && { catSlug: cat }),
    },
  };

  try {
    const posts = await prisma.post.findMany();
    const count = await prisma.post.count();
    // const [posts, count] = await prisma.$transaction([
    //   prisma.post.findMany(query),
    //   prisma.post.count({ where: query.where }),
    // ]);
    // console.log("GET ++++++ posts", posts, count);
    return new NextResponse(JSON.stringify({ posts, count }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

//CREATE POST
export const POST = async (req: NextResponse) => {
  const session = await auth();

  if (!session) {
    return new NextResponse(JSON.stringify({ message: "Not Authenticated!" }), {
      status: 401,
    });
  }

  try {
    const body = await req.json();
    const post = await prisma.post.create({
      data: { ...body, userEmail: session.user.email },
    });
    return new NextResponse(JSON.stringify(post), { status: 201 });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
