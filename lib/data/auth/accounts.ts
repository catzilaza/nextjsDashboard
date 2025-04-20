import prisma from "@/lib/prisma";

export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await prisma.account.findFirst({
      where: {
        userId: userId,
      },
    });
    return account;
  } catch (error) {
    console.error("Failed to fetch account:", error);
    throw new Error("Failed to fetch account.");
    // return null
  }
};
