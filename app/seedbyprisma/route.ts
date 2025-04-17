// import bcrypt from "bcrypt";
// import { PrismaClient } from "@prisma/client";

// import {
//   invoices,
//   customers,
//   revenue,
//   users,
//   products_desserts,
// } from "../lib/placeholder-data";

// const prisma = new PrismaClient();

// async function seedUsers() {
//   for (const user of users) {
//     const hashedPassword = await bcrypt.hash(user.password, 10);

//     await prisma.users.create({
//       // Check for conflict on `user_id`
//       // Do nothing if the user already exists
//       data: {
//         user_id: user.user_id,
//         username: user.username,
//         email: user.email,
//         password: hashedPassword,
//         status: "user.status",
//         role: user.role,
//         date: user.date,
//         image_url: user.image_url,
//       },
//     });
//   }
// }

// async function seedInvoices() {
//   await dbConnect();

//   const insertedInvoices = await Promise.all(
//     invoices.map((invoice) =>
//       Invoices.create({
//         customer_id: invoice.customer_id,
//         amount: invoice.amount,
//         status: invoice.status,
//         date: invoice.date,
//       })
//     )
//   );

//   return insertedInvoices;
// }

// async function seedCustomers() {
//   await dbConnect();

//   const insertedCustomers = await Promise.all(
//     customers.map((customer) =>
//       Customer.create({
//         id: customer.id,
//         name: customer.name,
//         email: customer.email,
//         image_url: customer.image_url,
//       })
//     )
//   );
//   return insertedCustomers;
// }

// async function seedRevenue() {
//   await dbConnect();

//   const insertedRevenue = await Promise.all(
//     revenue.map((rev) =>
//       Revenue.create({
//         month: rev.month,
//         revenue: rev.revenue,
//       })
//     )
//   );

//   return insertedRevenue;
// }

// export async function GET() {
// return Response.json({ message: "Database seeded successfully" });

// try {
// await client.sql`BEGIN`;
// await seedUsers();
// await seedCustomers();
// await seedInvoices();
// await seedRevenue();
// await client.sql`COMMIT`;

//   return Response.json({ message: "Database seeded successfully" });
// } catch (error) {
//   //   await client.sql`ROLLBACK`;
//   return Response.json({ error }, { status: 500 });
// }
//   seedUsers()
//     .then(() => {
//       console.log("Users seeded successfully");
//       prisma.$disconnect();
//     })
//     .catch((error) => {
//       console.error("Error seeding users:", error);
//       prisma.$disconnect();
//     });
// }
//
