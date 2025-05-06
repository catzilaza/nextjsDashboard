import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  // const { slug } = params;

  try {
    const post = await prisma.post.findMany();
    // const post = await prisma.post.update({
    //   where: { slug },
    //   data: { views: { increment: 1 } },
    //   include: { user: true },
    // });
    // console.log("GET Slug ++++++ post", post);

    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
