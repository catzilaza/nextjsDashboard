//============== Section User =========================
export interface IUser {
  id: string | null;
  name?: string | null;
  password?: string | null;
  email: string;
  emailVerified: boolean | null;
  image?: string | null;
  role?: Role | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}
export type User = IUser;

export interface ISession {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  ipAddress?: string | null;
  userAgent?: string | null;
  activeOrganizationId?: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}
export type Session = ISession;

export interface IAccount {
  id: string;
  userId: string;
  accountId: string;
  providerId: string;
  accessToken?: string | null;
  refreshToken?: string | null;
  idToken?: string | null;
  accessTokenExpiresAt?: Date | null;
  refreshTokenExpiresAt?: Date | null;
  scope?: string | null;
  password?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
export type Account = IAccount;

// VerificationBetterAuth
export interface IVerification {
  id: string; // Unique identifier
  identifier: string; // เช่น email หรือ phone
  value: string; // เช่น code หรือ token
  expiresAt: Date; // เวลาหมดอายุ
  createdAt: Date; // เวลาที่สร้าง
  updatedAt: Date; // เวลาที่แก้ไขล่าสุด
}

export type Verification = IVerification;

// แบบ Interface + Union Type
export interface IRole {
  MEMBER: "member";
  ADMIN: "admin";
  OWNER: "owner";
}
export type Role = IRole[keyof IRole];

export interface IRoleAuthjs {
  MEMBER: "member";
  ADMIN: "admin";
  OWNER: "owner";
}
export type RoleAuthjs = IRoleAuthjs[keyof IRoleAuthjs];

// แบบ Object + typeof
// export enum RoleBetterAuth {
//   MEMBER = "member",
//   ADMIN = "admin",
//   OWNER = "owner",
// }
//export type RoleBetterAuth = typeof RoleBetterAuth[keyof typeof RoleBetterAuth];

export interface IMember {
  id: string; // Primary key
  organizationId: string; // FK ไป Organization
  userId: string; // FK ไป User
  role: Role; // ใช้ enum Role
  createdAt: Date; // Timestamp ตอนสร้าง

  // Relations
  organization?: Organization | null;
  users?: User | null;
}

export type Member = IMember;

export interface IOrganization {
  id: string; // Primary key
  name: string; // ชื่อองค์กร
  slug?: string | null; // slug (unique, optional)
  logo?: string | null; // โลโก้ (optional)
  createdAt: Date; // เวลาสร้าง
  metadata?: string | null; // metadata (optional)

  // Relations
  member?: Member[] | null;
}

export type Organization = IOrganization;

// Interface ของ Invitation
export interface IInvitation {
  id: string;
  organizationId: string;
  email: string;
  role?: Role | null;
  status: string; // default "pending"
  expiresAt: Date;
  inviterId: string;

  // Relations
  organization?: IOrganization | null;
  inviter?: User | null;
}

export type Invitation = IInvitation;

export interface IAddress {
  id: string;
  name: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  description?: string;
  createdAt: Date;

  // Relations
  // order?: any[] | null; // สามารถปรับเป็น type ของ Order ที่คุณมี
  // users?: IUser | null; // สามารถปรับเป็น type ของ User ที่คุณมี
}

export type Address = IAddress;

//============== Section Product =========================

// model products_desserts {
//   dessert_id String   @id @default(uuid())
//   name_eng   String   @db.VarChar(255)
//   name       String   @db.VarChar(255)
//   image_url  String   @db.VarChar(255)
//   price      String   @db.VarChar(255)
//   amount     Int
//   status     String?  @db.VarChar(15)
//   date       DateTime @db.Date

//   //Relation
//   orderItems OrderItem[]
//   order      Order[]
// }

// model OrderItem {
//   id       String  @id @default(uuid())
//   quantity Int
//   price    Decimal

//   //Relation
//   orderId String
//   order   Order  @relation(fields: [orderId], references: [id], onDelete: Cascade)

//   productIdDessert String
//   productDesserts  products_desserts @relation(fields: [productIdDessert], references: [dessert_id])
// }

// model Order {
//   id                String    @id @default(uuid())
//   userName          String?
//   userEmail         String?
//   productName       String?
//   productImage      String?
//   quantity          Int?
//   price             Decimal?
//   totalPrice        Decimal?
//   orderDate         DateTime? @default(now())
//   status            String?   @default("pending")
//   stripe_session_id String?

//   //Relation
//   productId  String
//   product    products_desserts @relation(fields: [productId], references: [dessert_id])
//   userId     String
//   users      User              @relation(fields: [userId], references: [id], onDelete: Cascade)
//   orderItems OrderItem[]
//   payment    Payment?
//   shipment   Shipment?
// }

// model Payment {
//   id          String   @id @default(uuid())
//   amount      Decimal
//   paymentDate DateTime @default(now())

//   //Relation
//   orderId String @unique
//   order   Order  @relation(fields: [orderId], references: [id])
// }

// model Shipment {
//   id             String   @id @default(uuid())
//   shippingDate   DateTime @default(now())
//   trackingNumber String
//   //Relation
//   orderId        String   @unique
//   order          Order    @relation(fields: [orderId], references: [id])
// }

// model Profile {
//   id      String  @id @default(uuid())
//   address String?

//   //Relation
//   userId String @unique
//   users  User   @relation(fields: [userId], references: [id], onDelete: Cascade)
// }

// model File {
//   id           String   @id @default(uuid())
//   name         String
//   path         String
//   size         Int
//   type         String
//   fileUrl      String   @map("file_url")
//   thumbnailUrl String?  @map("thumbnail_url")
//   parentId     String?  @map("parent_id")
//   isFolder     Boolean  @default(false) @map("is_folder")
//   isStarred    Boolean  @default(false) @map("is_starred")
//   isTrash      Boolean  @default(false) @map("is_trash")
//   createdAt    DateTime @default(now()) @map("created_at")
//   updatedAt    DateTime @updatedAt @map("updated_at")

//   //Relation
//   userId String?
//   users  User?   @relation(fields: [userId], references: [id], onDelete: Cascade)

//   // Self-relation for parent/children
//   parent   File?  @relation("FileToFile", fields: [parentId], references: [id])
//   children File[] @relation("FileToFile")

//   @@map("files")
// }

// model Customers {
//   id        String     @id @default(uuid())
//   name      String
//   email     String     @unique
//   image_url String
//   invoices  Invoices[]
// }

// model Invoices {
//   id     String   @id @default(uuid())
//   amount Int
//   status String
//   date   DateTime @default(now())

//   //Relation
//   customerId String
//   customers  Customers @relation(fields: [customerId], references: [id])
// }

// model Revenue {
//   month   String @unique @db.VarChar(4)
//   revenue Int
// }
