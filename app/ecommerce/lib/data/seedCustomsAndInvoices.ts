import prisma from "@/lib/prisma";
import { customersandinvoices } from "./placeDataEcom";

async function main() {
  console.log("Start seeding customers...");

  for (const data of customersandinvoices) {
    const { invoices, ...customer } = data;

    await prisma.customer.create({
      data: {
        ...customer,
        // ใช้ Nested Write เพื่อสร้าง Invoices ไปพร้อมกับ Customers
        invoices: {
          create: invoices.map((inv) => ({
            amount: inv.amount,
            status: inv.status,
            date: new Date(inv.date),
          })),
        },
      },
    });
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
