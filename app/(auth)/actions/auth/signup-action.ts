"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const SignUpSchema = z.object({
  username: z.string().min(4, { message: "Be at least 4 characters long" }),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
  email: z.string({
    invalid_type_error: "Invalid Email",
  }),
});

export type SignUpActionState = {
  errors?: {
    username?: string[] | null;
    password?: string[] | null;
    email?: string[] | null;
    messageError?: string | null;
  } | null;
  message?: string | null;
};

const SignUpSchemaOmit = SignUpSchema.omit({});

export async function SignUp(
  _prevState: SignUpActionState,
  form: FormData
): Promise<SignUpActionState> {
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  const id = uuidv4();
  const name = form.get("username") as string;
  const username = form.get("username") as string;
  const password = form.get("password") as string;
  const email = form.get("email") as string;
  // const status = true;
  const role = "user";
  const date = new Date().toISOString().split("T")[0];
  const image_blob = "";
  const image_url = "/customers/amy-burns.png";

  const validatedFields = SignUpSchemaOmit.safeParse({
    name,
    username,
    password,
    email,
  });

  if (!validatedFields.success) {
    // console.log("ERROR : ", validatedFields.error.flatten().fieldErrors);
    console.log("ERROR : ", "validatedFields.error.flatten().fieldErrors");
    return {
      errors: {
        username: validatedFields.error.flatten().fieldErrors.username,
        password: validatedFields.error.flatten().fieldErrors.password,
        email: validatedFields.error.flatten().fieldErrors.email,
        messageError: "ERROR!!!",
      },
      message: null,
    };
  }

  // console.log("username : ", username);
  // console.log("password : ", password);
  // console.log("email : ", email);

  // process validated form inputs here
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        id,
        name,
        email,
        password: hashedPassword,
        // status: status.toString(),
        role,
        date: new Date(date), // Ensure `date` is a valid Date object
        image_url,
      },
    });

    console.log("INSERT INTO users: success!!! : ");
    return { errors: null, message: "successfully" };
  } catch (error) {
    console.log("Database Error!!!");
    return { errors: { messageError: "error" }, message: null };
  }

  // revalidatePath("/");
  // redirect("/");

  // return { username, password };
}
