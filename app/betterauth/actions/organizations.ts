"use server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "./users";
import { auth } from "@/app/betterauth/lib/betterauth/auth";
import { headers } from "next/headers";

export const CreateOrganization = async (name: string, slug: string) => {
  try {
    const data = await auth.api.createOrganization({
      body: {
        name: name, // required
        slug: slug, // required
        keepCurrentActiveOrganization: false,
      },
      // This endpoint requires session cookies.
      headers: await headers(),
    });

    return {
      success: true,
      message: "CreateOrganization.",
    };
  } catch (error) {
    const e = error as Error;

    return {
      success: false,
      message: e.message || "An unknown error occurred.",
    };
  }
};

export async function getOrganizations() {
  const { currentUser } = await getCurrentUser();

  // 1. หา members ของ user ปัจจุบัน
  const members = await prisma.member.findMany({
    where: {
      userId: currentUser.id,
    },
  });

  const organizations = await prisma.organization.findMany({
    where: {
      id: {
        in: members.map((m) => m.organizationId),
      },
    },
  });

  return organizations;
}

export async function getActiveOrganization(userId: string) {
  // 1. หา memberUser ของ userId
  const memberUser = await prisma.member.findFirst({
    where: {
      userId: userId,
    },
  });

  if (!memberUser) {
    return null;
  }

  // 2. หา activeOrganization ที่ตรงกับ memberUser.organizationId
  const activeOrganization = await prisma.organization.findFirst({
    where: {
      id: memberUser.organizationId,
    },
  });

  return activeOrganization;
}

export async function getOrganizationBySlug(slug: string) {
  try {
    // const decodedSlug = decodeURIComponent(slug as string);

    const organizationBySlug = await prisma.organization.findFirst({
      where: {
        slug: slug,
      },
      include: {
        members: {
          include: {
            users: true, // ดึงข้อมูล user ที่อยู่ในแต่ละ member
          },
        },
      },
    });

    return organizationBySlug;
  } catch (error) {
    console.error(error);
    return null;
  }
}
