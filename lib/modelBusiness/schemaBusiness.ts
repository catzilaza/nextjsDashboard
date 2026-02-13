// datasource db {
//   provider = "postgresql"
//   url      = env("DATABASE_URL")
// }

// generator client {
//   provider = "prisma-client-js"
// }

// model User {
//   id        String    @id @default(cuid())
//   email     String    @unique
//   password  String
//   role      String    @default("customer")
//   createdAt DateTime  @default(now())

//   // Relations
//   orders    Order[]
//   addresses Address[]
// }

// model Address {
//   id          String   @id @default(cuid())
//   name        String
//   street      String
//   city        String
//   state       String
//   zip         String
//   country     String
//   phone       String
//   description String?
//   createdAt   DateTime @default(now())

//   // Relations
//   userId String
//   user   User    @relation(fields: [userId], references: [id], onDelete: Cascade)
//   orders Order[]
// }

// model Product {
//   id        String      @id @default(cuid())
//   name      String
//   price     Int
//   stock     Int
//   createdAt DateTime    @default(now())

//   // Relations
//   orderItems OrderItem[]
// }

// model Order {
//   id        String      @id @default(cuid())
//   status    String      @default("pending")
//   createdAt DateTime    @default(now())

//   // Relations
//   userId   String
//   user     User         @relation(fields: [userId], references: [id], onDelete: Cascade)

//   addressId String?
//   address   Address?    @relation(fields: [addressId], references: [id])

//   orderItems OrderItem[]
//   payment    Payment?
// }

// model OrderItem {
//   id        String   @id @default(cuid())
//   quantity  Int
//   amount    Int

//   // Relations
//   orderId   String
//   order     Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)

//   productId String
//   product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)

//   @@unique([orderId, productId]) // ป้องกัน duplicate สินค้าใน order เดียวกัน
// }

// model Payment {
//   id        String   @id @default(cuid())
//   amount    Int
//   status    String   @default("pending")
//   provider  String   @default("stripe")
//   createdAt DateTime @default(now())

//   // Relations
//   orderId String  @unique
//   order   Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
// }
