"use server";

import { type RoleBetterAuth as Role } from "../lib/db/schema";
import { isAdmin } from "./permissions";
import prisma from "@/lib/prisma";
import { auth } from "@/app/betterauth/lib/betterauth/auth";

export const addMember = async (
  organizationId: string,
  userId: string,
  role: Role,
) => {
  try {
    await auth.api.addMember({
      body: {
        userId,
        organizationId,
        role,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add member.");
  }
};

export const removeMember = async (memberId: string) => {
  const admin = await isAdmin();

  if (!admin) {
    return {
      success: false,
      error: "You are not authorized to remove members.",
    };
  }

  try {
    await prisma.member.delete({
      where: {
        id: memberId,
      },
    });

    await prisma.member.deleteMany({
      where: {
        id: memberId,
      },
    });

    return {
      success: true,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Failed to remove member.",
    };
  }
};
