"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { auth } from "@/app/betterauth/lib/betterauth/auth";

export const getCurrentSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return false;
  } else {
    return true;
  }
};

export const getCurrentUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/betterauth/signin");
  }

  const currentUser = await prisma.user.findFirst({
    where: {
      id: session.user.id,
    },
  });

  if (!currentUser) {
    redirect("/betterauth/signin");
  }

  // console.log("From folder /Actions User ==> getCurrentUser : ", currentUser);
  // console.log(
  //   "From folder /Actions User ==> getCurrentUser Session : ",
  //   session,
  // );

  return {
    ...session,
    currentUser,
  };
};

export const signIn = async (email: string, password: string) => {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    return {
      success: true,
      message: "Signed in successfully.",
    };
  } catch (error) {
    const e = error as Error;

    return {
      success: false,
      message: e.message || "An unknown error occurred.",
    };
  }
};

export const signUp = async (
  email: string,
  password: string,
  username: string,
) => {
  try {
    const result = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name: username,
      },
    });

    return {
      success: true,
      message: "Signed up successfully.",
    };
  } catch (error) {
    console.log("SignUP error ===>", error);
    const e = error as Error;
    console.log("SignUp e.message ====> ", e.message);

    return {
      success: false,
      message: e.message || "An unknown error occurred.",
    };
  }
};
//organizationId: string
export const getUsers = async (organizationId: string) => {
  try {
    // 1. ดึง members ของ organization
    const members = await prisma.member.findMany({
      where: {
        organizationId: organizationId,
      },
    });

    // 2. ดึง users ที่ไม่อยู่ใน members
    const users = await prisma.user.findMany({
      where: {
        id: {
          notIn: members.map((m) => m.userId),
        },
      },
    });

    // const users = await prisma.user.findMany();

    return users;
  } catch (error) {
    console.error(error);
    console.log("getUsers Error ====> ", error);
    return [];
  }
};

export const signOut = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const result = await auth.api.signOut({
      headers: await headers(),
    });

    if (!result.success) {
      throw new Error(
        "From /betterauth/actions/users : SignOut Something Wrong!!!",
      );
    }

    return { success: true, message: "Sign out successful" };
  } catch (error) {
    console.error(error);
    return { success: false, message: (error as Error).message };
  }
};
