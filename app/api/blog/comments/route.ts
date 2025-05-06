import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: NextResponse) => {
  const { searchParams } = new URL(req.url);
  const postSlug = searchParams.get("postSlug") as string;

  try {
    const comments = await prisma.comment.findMany();
    // const [comments] = await prisma.comment.findMany({
    //   where: {
    //     ...(postSlug && { postSlug }),
    //   },
    //   include: { user: true },
    // });
    console.log("GET ++++++ comments", comments);
    return new NextResponse(JSON.stringify(comments), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 }
    );
  }
};

//CREATE A COMMENT
export const POST = async (req: NextResponse) => {
  const session = await auth();

  if (!session) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    const body = await req.json();
    const comment = await prisma.comment.create({
      data: {
        ...body,
        userEmail: session.user.email as string,
      },
    });

    return new NextResponse(JSON.stringify(comment), {
      status: 201,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      {
        status: 500,
      }
    );
  }
};
