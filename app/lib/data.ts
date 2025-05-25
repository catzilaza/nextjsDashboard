import postgres from "postgres";
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
  ProductDessertTableType,
  ProductDessertForm,
  ProductDessertField,
  User,
} from "./definitions";
import { formatCurrency } from "./utils";
import { products_desserts } from "./placeholder-data";
import bcrypt from "bcrypt";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function fetchRevenue() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log("Fetching revenue data...");
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    // const data = await sql<Revenue[]>`SELECT * FROM Revenue`;
    // const data = await sql<any>`SELECT * FROM Revenue`;
    // const data = await prisma.revenue.findMany();

    const data = await sql<Revenue[]>`
    SELECT * FROM "Revenue"`;

    // console.log("Data fetch completed after 3 seconds.");

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function fetchLatestInvoices() {
  try {
    // const data = await sql<LatestInvoiceRaw[]>`
    //   SELECT Invoices.amount, Customers.name, Customers.image_url, Customers.email, Invoices.id
    //   FROM Invoices
    //   JOIN Customers ON Invoices.customerId = Customers.id
    //   ORDER BY Invoices.date DESC
    //   LIMIT 5`;

    const data = await sql<LatestInvoiceRaw[]>`
    SELECT "Invoices".amount, "Customers".name, "Customers".image_url, "Customers".email, "Invoices".id
      FROM "Invoices"
      JOIN "Customers" ON "Invoices"."customerId" = "Customers".id
      ORDER BY "Invoices".date DESC
      LIMIT 5`;

    // const data = await prisma.invoices.findMany({
    //   take: 5, // LIMIT 5
    //   orderBy: {
    //     date: "desc", // ORDER BY Invoices.date DESC
    //   },
    //   include: {
    //     customer: {
    //       // JOIN Customers ON Invoices.customerId = Customers.id
    //       select: {
    //         name: true,
    //         image_url: true,
    //         email: true,
    //       },
    //     },
    //   },
    // });

    const latestInvoices = data.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the latest invoices.");
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = await sql`SELECT COUNT(*) FROM "Invoices"`;
    const customerCountPromise = await sql`SELECT COUNT(*) FROM "Customers"`;
    const invoiceStatusPromise = await sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM "Invoices"`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0][0].count ?? "0");
    const numberOfCustomers = Number(data[1][0].count ?? "0");
    const totalPaidInvoices = formatCurrency(data[2][0].paid ?? "0");
    const totalPendingInvoices = formatCurrency(data[2][0].pending ?? "0");

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch card data.");
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable[]>`
      SELECT
        "Invoices".id,
        "Invoices".amount,
        "Invoices".date,
        "Invoices".status,
        "Customers".name,
        "Customers".email,
        "Customers".image_url
      FROM "Invoices"
      JOIN "Customers" ON "Invoices"."customerId" = "Customers".id
      WHERE
        "Customers".name ILIKE ${`%${query}%`} OR
        "Customers".email ILIKE ${`%${query}%`} OR
        "Invoices".amount::text ILIKE ${`%${query}%`} OR
        "Invoices".date::text ILIKE ${`%${query}%`} OR
        "Invoices".status ILIKE ${`%${query}%`}
      ORDER BY "Invoices".date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoices.");
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM "Invoices"
    JOIN "Customers" ON "Invoices"."customerId" = "Customers".id
    WHERE
      "Customers".name ILIKE ${`%${query}%`} OR
      "Customers".email ILIKE ${`%${query}%`} OR
      "Invoices".amount::text ILIKE ${`%${query}%`} OR
      "Invoices".date::text ILIKE ${`%${query}%`} OR
      "Invoices".status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of invoices.");
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm[]>`
      SELECT
        "Invoices".id,
        "Invoices"."customerId",
        "Invoices".amount,
        "Invoices".status
      FROM "Invoices"
      WHERE "Invoices".id = ${id};
    `;

    const invoice = data.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    // console.log(invoice); // Invoice is an empty array []

    return invoice[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoice.");
  }
}

export async function fetchCustomers() {
  try {
    const customers = await sql<CustomerField[]>`
      SELECT
        id,
        name
      FROM "Customers"
      ORDER BY name ASC
    `;

    return customers;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all customers.");
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType[]>`
  SELECT
    "Customers".id,
    "Customers".name,
    "Customers".email,
    "Customers".image_url,
  COUNT("Invoices".id) AS total_invoices,
  SUM(CASE WHEN "Invoices".status = 'pending' THEN "Invoices".amount ELSE 0 END) AS total_pending,
  SUM(CASE WHEN "Invoices".status = 'paid' THEN "Invoices".amount ELSE 0 END) AS total_paid
  FROM "Customers"
  LEFT JOIN "Invoices" ON "Customers".id = "Invoices"."customerId"
	WHERE
		"Customers".name ILIKE ${`%${query}%`} OR
    "Customers".email ILIKE ${`%${query}%`}
  GROUP BY "Customers".id, "Customers".name, "Customers".email, "Customers".image_url
  ORDER BY "Customers".name ASC`;

    const customers = data.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch customer table.");
  }
}

//================================================================

export async function fetchProducts_Dessert() {
  // await new Promise((resolve) => setTimeout(resolve, 10000));

  try {
    const products = await sql<ProductDessertField[]>`
      SELECT
        *
      FROM products_desserts
      ORDER BY name ASC
    `;

    return products;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all products_desserts.");
  }
}

export async function fetchProducts_DessertById(id: string) {
  try {
    const data = await sql<ProductDessertForm[]>`
      SELECT
        *
      FROM products_desserts
      WHERE products_desserts.dessert_id = ${id};
    `;
    //  console.log("function fetchProductById(id: string) ===> : ", data);
    const product = data.map((product) => ({
      ...product,
    }));

    return product[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch products_desserts.");
  }
}

const ITEMS_PER_PAGE_PRODUCT = 5;
export async function fetchFilteredProducts_Dessert(
  query: string,
  currentPage: number
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE_PRODUCT;

  try {
    const products = await sql<ProductDessertTableType[]>`
      SELECT
        *
      FROM products_desserts      
      WHERE
      products_desserts.name ILIKE ${`%${query}%`} OR
      products_desserts.name_eng ILIKE ${`%${query}%`}   
      LIMIT ${ITEMS_PER_PAGE_PRODUCT} OFFSET ${offset}
    `;

    return products;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch filtered products_desserts.");
  }
}

export async function fetchProducts_DessertPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM products_desserts
    WHERE
    products_desserts.name ILIKE ${`%${query}`} OR
    products_desserts.name_eng ILIKE ${`%${query}`}
  `;

    const totalPages = Math.ceil(
      Number(data[0].count) / ITEMS_PER_PAGE_PRODUCT
    );
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of products_desserts.");
  }
}

export async function fetchUserByEmail(email: string) {
  try {
    const data = await sql<User[]>`
      SELECT
        *
      FROM User
      WHERE User.email = ${email};
    `;

    return data[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch user by email.");
  }
}

export async function fetchUser(email: string, password: string) {
  console.log("FetchUser Step 0: email : password : ", email, password);
  try {
    const data = await sql<User[]>`
      SELECT
        *
      FROM User
      WHERE (User.email = ${email});
    `;

    console.log("FetchUser Step 1: data : ", data);

    if (!data) return null;

    const passwordsMatch = await bcrypt.compare(password, data[0].password);

    if (!passwordsMatch) return null;
    console.log("FetchUser Step Match : passwordsMatch : ", passwordsMatch);

    return data[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function getLoginSession() {
  const session: any = await auth();
  // console.log("getLoginSession : ", session);
  return session;
}
