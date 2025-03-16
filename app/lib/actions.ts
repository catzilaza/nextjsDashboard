"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";

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
  id: z.string(),
  productId: z.string({
    invalid_type_error: "Please select a product.",
  }),
  price: z.string({ message: "Please enter an price." }),
  amount: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." }),
  date: z.string(),
});

export type StateProductDessert = {
  errors?: {
    productId?: string[];
    amount?: string[];
    price?: string[];
  };
  message?: string | null;
};

const CreateProductDessert = FormSchemaProductDessert.omit({
  id: true,
  date: true,
});

export async function createProductDessert(
  prevState: StateProductDessert,
  formData: FormData
) {
  const validatedFields = CreateProductDessert.safeParse({
    productId: formData.get("productId"),
    amount: formData.get("amount"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Product.",
    };
  }

  // Prepare data for insertion into the database
  const { productId, amount } = validatedFields.data;
  const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
      INSERT INTO products (amount, date)
      VALUES (${amount}, ${date})
    `;
  } catch (error) {
    // We'll log the error to the console for now
    console.error(error);
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}

const UpdateProductDessert = FormSchemaProductDessert.omit({
  id: true,
  date: true,
});

export async function updateProductDessert(
  id: string,
  prevState: StateProductDessert,
  formData: FormData
) {
  const validatedFields = UpdateProductDessert.safeParse({
    productId: formData.get("productId"),
    amount: formData.get("amount"),
    price: formData.get("price"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update product.",
    };
  }

  const { productId, amount, price } = validatedFields.data;

  // console.log("function updateProduct amount ==> : ", amount);

  try {
    await sql`
        UPDATE products_desserts
        SET amount = ${amount}, price = ${price}
        WHERE dessert_id = ${id}`;
  } catch (error) {
    // We'll log the error to the console for now
    console.error(error);
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}

export async function deleteProduct(id: string) {
  // throw new Error('Failed to Delete Invoice');
  await sql`DELETE FROM products_dessert WHERE dessert_id = ${id}`;
  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}
