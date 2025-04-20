import prisma from "../../prisma";

export const getUserById = async (userId: string) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        user_id: userId,
      },
    });
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
    // return null
  }
};

export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.users.findFirst({
      where: {
        email: email,
      },
    });
    return user;
  } catch (error) {
    console.error("Failed to fetch user by email:", error);
    throw new Error("Failed to fetch user by email.");
    // return null
  }
}
