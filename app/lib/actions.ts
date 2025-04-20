"use server";

import postgres from "postgres";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { fetchUser } from "./data";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: "Please select a customer.",
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." }),
  status: z.enum(["pending", "paid"], {
    invalid_type_error: "Please select an invoice status.",
  }),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  // console.log("Amount : ",amount);

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    // We'll log the error to the console for now
    console.error(error);
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

// Use Zod to update the expected types
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Invoice.",
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  console.log("function updateInvoice amount ==> : ", amount);

  try {
    await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `;
  } catch (error) {
    // We'll log the error to the console for now
    console.error(error);
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function deleteInvoice(id: string) {
  // throw new Error('Failed to Delete Invoice');
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath("/dashboard/invoices");
}

//====================================================================

// dessert_id: string;
// name_eng: string;
// name: string;
// image_url: string;
// price: string;
// amount: number;
// status: "avialable" | "unavialable";
// date: string;

const FormSchemaProductDessert = z.object({
  // id: z.string(),
  productId: z.string({
    message: "Please enter a product id.",
  }),
  name: z.string({ message: "Please enter name." }),
  name_eng: z.string({ message: "Please enter name." }),
  amount: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." }),
  price: z.string({ message: "Please enter price." }),
  date: z.string(),
  image_url: z.string({ message: "Please enter image_url." }),
});

export type StateProductDessert = {
  errors?: {
    productId?: string[];
    name?: string[];
    name_eng?: string[];
    price?: string[];
    amount?: string[];
    image_url?: string[];
  };
  message?: string | null;
};

const CreateProductDessert = FormSchemaProductDessert.omit({
  // id: true,
  date: true,
});

export async function createProductDessert(
  prevState: StateProductDessert,
  formData: FormData
) {
  const validatedFields = CreateProductDessert.safeParse({
    productId: formData.get("productId"),
    name: formData.get("name"),
    name_eng: formData.get("name_eng"),
    amount: formData.get("amount"),
    price: formData.get("price"),
    image_url: formData.get("image_url"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    console.log(
      "validatedFields Error",
      validatedFields.error.flatten().fieldErrors
    );
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Product.",
    };
  }

  // Prepare data for insertion into the database
  const { productId, name, name_eng, price, amount, image_url } =
    validatedFields.data;

  const status = "avialable";
  const date = new Date().toISOString().split("T")[0];

  // const date = "2024-02-26";
  // const dessert_id = "d6e15727-9fe1-0001-8c5b-ea44a9bd81aa";
  // const name = "ขนมไข่กล้วยหอม";
  // const name_eng = "Banana Egg Cake";
  // const image_url = "/products/product-001-ขนมไข่กล้วยหอม.jpg";

  try {
    await sql`
      INSERT INTO products_desserts (dessert_id, name, name_eng, image_url, price, amount, status, date)
      VALUES (${productId}, ${name}, ${name_eng}, ${image_url}, ${price}, ${amount}, ${status}, ${date})
    `;
    console.log("INSERT INTO products_desserts : success!!!");
  } catch (error) {
    // We'll log the error to the console for now
    console.error(error);
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}

const UpdateProductDessert = FormSchemaProductDessert.omit({
  // id: true,
  date: true,
});

export async function updateProductDessert(
  id: string,
  prevState: StateProductDessert,
  formData: FormData
) {
  const validatedFields = UpdateProductDessert.safeParse({
    productId: formData.get("productId"),
    name: formData.get("name"),
    name_eng: formData.get("name_eng"),
    amount: formData.get("amount"),
    price: formData.get("price"),
    image_url: formData.get("image_url"),
  });

  if (!validatedFields.success) {
    console.log(
      "validatedFields Error",
      validatedFields.error.flatten().fieldErrors
    );
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update product.",
    };
  }

  const { productId, name, name_eng, amount, price, image_url } =
    validatedFields.data;

  // console.log("function updateProduct name ==> : ", name);

  try {
    await sql`
        UPDATE products_desserts
        SET amount = ${amount}, price = ${price}
        WHERE dessert_id = ${id}`;
    console.log("UPDATE : success!!!");
  } catch (error) {
    // We'll log the error to the console for now
    console.error(error);
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}

export async function deleteProduct(id: string) {
  // throw new Error('Failed to Delete Invoice');
  await sql`DELETE FROM products_desserts WHERE dessert_id = ${id}`;
  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}

//===============================================================================
//Website Learn useActionState
//https://dev.to/bookercodes/learn-useactionstate-quickly-4jj7

// const SignUpSchema = z.object({
//   username: z.string().min(4, { message: "Be at least 4 characters long" }),
//   password: z
//     .string()
//     .min(8, { message: "Be at least 8 characters long" })
//     .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
//     .regex(/[0-9]/, { message: "Contain at least one number." })
//     .regex(/[^a-zA-Z0-9]/, {
//       message: "Contain at least one special character.",
//     })
//     .trim(),
//   email: z.string({
//     invalid_type_error: "Invalid Email",
//   }),
// });

// export type SignUpActionState = {
//   username?: string;
//   password?: string;
//   email?: string;
//   errors?: {
//     username?: string[];
//     password?: string[];
//     email?: string[];
//   };
//   message?: string | null;
// };

// const SignUpSchemaOmit = SignUpSchema.omit({});

// export async function SignUp(
//   _prevState: SignUpActionState,
//   form: FormData
// ): Promise<SignUpActionState> {
//   const user_id = uuidv4();
//   const username = form.get("username") as string;
//   const password = form.get("password") as string;
//   const email = form.get("email") as string;
//   const status = true;
//   const role = "user";
//   const date = new Date().toISOString().split("T")[0];
//   const image_blob = "";
//   const image_url = "/customers/balazs-orban.png";

//   const validatedFields = SignUpSchemaOmit.safeParse({
//     username,
//     password,
//     email,
//   });

//   if (!validatedFields.success) {
//     console.log("ERROR : ", validatedFields.error.flatten().fieldErrors);
//     return {
//       username,
//       password,
//       errors: validatedFields.error.flatten().fieldErrors,
//     };
//   }

//   // console.log("username : ", username);
//   // console.log("password : ", password);
//   // console.log("email : ", email);

//   // process validated form inputs here
//   const hashedPassword = await bcrypt.hash(password, 10);

//   try {
//     await sql`
//       INSERT INTO users (user_id, username, email, password, status, role , date, image_url)
//       VALUES (${user_id}, ${username}, ${email}, ${hashedPassword}, ${status}, ${role}, ${date}, ${image_url})
//     `;

//     console.log("INSERT INTO users : success!!!");
//   } catch (error) {
//     // We'll log the error to the console for now
//     console.error(error);
//   }

//   revalidatePath("/");
//   redirect("/");

//   // return { username, password };
// }

//===========================================================================

const LogInSchema = z.object({
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

export type LogInActionState = {
  password?: string;
  email?: string;
  errors?: {
    password?: string[];
    email?: string[];
  };
  message?: string | null;
};

const LogInSchemaOmit = LogInSchema.omit({});

export async function Login(
  prevState: LogInActionState,
  formData: FormData
): Promise<LogInActionState> {
  const validatedFields = LogInSchemaOmit.safeParse({
    password: formData.get("password"),
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    console.log(
      "validatedFields Error",
      validatedFields.error.flatten().fieldErrors
    );
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to fetch user by id.",
    };
  }

  const { password, email } = validatedFields.data;

  const data = await fetchUser(email, password);
  // console.log("Fetch User By Email ", data);
  // if (!data) return null;
  // const passwordsMatch = await bcrypt.compare(password, data.password);

  revalidatePath("/login");
  redirect("/login");
}

// export async function authenticate(
//   prevState: string | undefined,
//   formData: FormData
// ) {
//   try {
//     await signIn("credentials", formData);
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case "CredentialsSignin":
//           return "Invalid credentials.";
//         default:
//           return "Something went wrong.";
//       }
//     }
//     throw error;
//   }
// }

// export async function createInvoice(prevState: State, formData: FormData) {
//   const validatedFields = CreateInvoice.safeParse({
//     customerId: formData.get("customerId"),
//     amount: formData.get("amount"),
//     status: formData.get("status"),
//   });

//   // If form validation fails, return errors early. Otherwise, continue.
//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: "Missing Fields. Failed to Create Invoice.",
//     };
//   }

//   // Prepare data for insertion into the database
//   const { customerId, amount, status } = validatedFields.data;
//   const amountInCents = amount * 100;
//   const date = new Date().toISOString().split("T")[0];

//   // console.log("Amount : ",amount);

//   try {
//     await sql`
//       INSERT INTO invoices (customer_id, amount, status, date)
//       VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
//     `;
//   } catch (error) {
//     // We'll log the error to the console for now
//     console.error(error);
//   }

//   revalidatePath("/dashboard/invoices");
//   redirect("/dashboard/invoices");
// }
