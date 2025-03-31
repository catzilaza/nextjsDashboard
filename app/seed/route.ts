import bcrypt from "bcrypt";
import postgres from "postgres";
import {
  invoices,
  customers,
  revenue,
  users,
  products_desserts,
} from "../lib/placeholder-data";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      user_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      status VARCHAR(255) NOT NULL,      
      roll VARCHAR(255) NOT NULL,      
      date DATE NOT NULL,
      image_blob BYTEA,    
      image_url VARCHAR(255)
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return sql`
        INSERT INTO users (user_id, username, email, password, status, roll, date, image_url)
        VALUES (${user.user_id}, ${user.username}, ${user.email}, ${hashedPassword}, ${user.status}, ${user.roll}, ${user.date}, ${user.image_url})
        ON CONFLICT (user_id) DO NOTHING;
      `;
    })
  );

  return insertedUsers;
}

async function seedInvoices() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS invoices (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      customer_id UUID NOT NULL,
      amount INT NOT NULL,
      status VARCHAR(255) NOT NULL,
      date DATE NOT NULL
    );
  `;

  const insertedInvoices = await Promise.all(
    invoices.map(
      (invoice) => sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertedInvoices;
}

async function seedCustomers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS customers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL
    );
  `;

  const insertedCustomers = await Promise.all(
    customers.map(
      (customer) => sql`
        INSERT INTO customers (id, name, email, image_url)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertedCustomers;
}

// async function seedRevenue() {
//   await sql`
//     CREATE TABLE IF NOT EXISTS revenue (
//       month VARCHAR(4) NOT NULL UNIQUE,
//       revenue INT NOT NULL
//     );
//   `;

//   const insertedRevenue = await Promise.all(
//     revenue.map(
//       (rev) => sql`
//         INSERT INTO revenue (month, revenue)
//         VALUES (${rev.month}, ${rev.revenue})
//         ON CONFLICT (month) DO NOTHING;
//       `
//     )
//   );

//   return insertedRevenue;
// }

async function seedProducts_Dessert() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS products_desserts (
      dessert_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name_eng VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL,
      price VARCHAR(255) NOT NULL,
      amount INT NOT NULL,
      status VARCHAR(15),
      date DATE NOT NULL
    );
  `;

  const insertedProducts = await Promise.all(
    products_desserts.map(
      (product) => sql`
        INSERT INTO products_desserts (dessert_id, name_eng, name, image_url, price, amount, status, date)
        VALUES (${product.dessert_id}, ${product.name_eng}, ${product.name}, ${product.image_url}, ${product.price}, ${product.amount}, ${product.status}, ${product.date})
        ON CONFLICT (dessert_id) DO NOTHING;
      `
    )
  );

  return insertedProducts;
}

async function seedUser_session() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE user_sessions (
    id SERIAL PRIMARY KEY,
    userId INTEGER NOT NULL REFERENCES users(id),
    expiresAt TIMESTAMP NOT NULL
    );
  `;
}

export async function GET() {
  // return Response.json({
  //   message:
  //     "Uncomment this file and remove this line. You can delete this file when you are finished.",
  // });
  try {
    const result = await sql.begin((sql) => [
      seedUser_session(),
      // seedProducts_Dessert(),
      // seedUsers(),
      // seedCustomers(),
      // seedInvoices(),
      // seedRevenue(),
    ]);

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
