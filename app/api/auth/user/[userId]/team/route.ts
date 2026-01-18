import { NextResponse, NextRequest } from "next/server";
// import {checkUserPermission, getCurrentUser } from "@/app/(auth)/lib/apiClient/apiAuth"
export async function PATH(
  request: NextRequest
  //   context: { params: Promise<{ userId: string }> }
) {
  //   try {
  //     const { userId } = await context.params;
  //     // const user = await getCurrentUser();
  //     const user = "await getCurrentUser()";
  //     if (!user || "!checkUserPermission(user, Role.ADMIN)") {
  //       return NextResponse.json(
  //         { error: ` You  are ${userId} not authorized to assisgn team` },
  //         { status: 401 }
  //       );
  //     }
  //     const { teamId } = await request.json();
  //     if (teamId) {
  //       const team = await prisma.team.findUnique({
  //         where: { id: teamId },
  //       });
  //       if (!team) {
  //         return NextResponse.json(
  //           {
  //             error: "Team not found",
  //           },
  //           {
  //             status: 404,
  //           }
  //         );
  //       }
  //     }
  //     //Update user's team assignment
  //     const updatedUser = await prisma.user.update({
  //       where: { id: userId },
  //       data: {
  //         teamId: teamId,
  //       },
  //       include: {
  //         team: true,
  //       },
  //     });
  //     return NextResponse.json(
  //       { user: "updatedUser", message: "team successfully" },
  //       { status: 200 }
  //     );
  //   } catch (error) {
  //     console.error("Team assignment error : ", error);
  //     if (
  //       error instanceof Error &&
  //       error.message.includes("Record to update not found")
  //     ) {
  //       return NextResponse.json(
  //         {
  //           error: "User not found",
  //         },
  //         {
  //           status: 404,
  //         }
  //       );
  //     }
  //     return NextResponse.json({});
  //   }
}
