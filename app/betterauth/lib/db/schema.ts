// model UserBetterAuth {
//   id                 String              @id @default(uuid())
//   name               String?
//   email              String              @unique
//   emailVerified      Boolean             @default(false)
//   role               RoleBetterAuth?      @default(member)
//   image              String?
//   createdAt          DateTime            @default(now())
//   updatedAt          DateTime            @updatedAt
//   sessionBetterAuths SessionBetterAuth[]
//   accountBetterAuths AccountBetterAuth[]
// }

// model SessionBetterAuth {
//   id        String   @id @default(uuid()) // Unique identifier for each session
//   userId    String // The ID of the user
//   token     String   @unique // Unique session token
//   expiresAt DateTime // Expiration time of the session
//   ipAddress String? // IP address of the device (optional)
//   userAgent String? // User agent information (optional)
//   createdAt DateTime @default(now()) // Timestamp when session was created
//   updatedAt DateTime @updatedAt // Timestamp when session was updated

//   // Relation: เชื่อมกับ User table
//   userBetterAuth UserBetterAuth @relation(fields: [userId], references: [id], onDelete: Cascade)
// }

// model AccountBetterAuth {
//   id                    String    @id @default(uuid()) // Unique identifier for each account
//   userId                String // The ID of the user
//   accountId             String // Account ID from SSO or equal to userId for credentials
//   providerId            String // Provider ID (e.g. google, github, etc.)
//   accessToken           String? // Access token returned by provider
//   refreshToken          String? // Refresh token returned by provider
//   accessTokenExpiresAt  DateTime? // Expiration time of access token
//   refreshTokenExpiresAt DateTime? // Expiration time of refresh token
//   scope                 String? // Scope returned by provider
//   idToken               String? // ID token returned by provider
//   password              String? // Password (for email/password auth)
//   createdAt             DateTime  @default(now()) // Timestamp when account was created
//   updatedAt             DateTime  @updatedAt // Timestamp when account was updated

//   // Relation: เชื่อมกับ User table
//   userBetterAuth UserBetterAuth @relation(fields: [userId], references: [id], onDelete: Cascade)

//   @@unique([providerId, accountId]) // ป้องกันไม่ให้มี account ซ้ำจาก provider เดียวกัน
// }

// model VerificationBetterAuth {
//   id         String   @id @default(uuid()) // Unique identifier for each verification
//   identifier String // Identifier for the verification request (เช่น email หรือ phone)
//   value      String // Value ที่ต้องการตรวจสอบ (เช่น code หรือ token)
//   expiresAt  DateTime // เวลาหมดอายุของ verification request
//   createdAt  DateTime @default(now()) // เวลาที่สร้าง request
//   updatedAt  DateTime @updatedAt // เวลาที่แก้ไขล่าสุด
// }

// enum RoleBetterAuth {
//   member
//   admin
//   owner
// }

// model MemberBetterAuth {
//   id             String   @id @default(uuid())
//   organizationId String
//   userId         String
//   role           Role     @default(member)   // ใช้ enum Role
//   createdAt      DateTime @default(now())

//   // Relations
//   organizationBetterAuth OrganizationBetterAuth @relation(fields: [organizationId], references: [id], onDelete: Cascade)
//   userBetterAuth         UserBetterAuth         @relation(fields: [userId], references: [id], onDelete: Cascade)
// }

// model OrganizationBetterAuth {
//   id        String   @id @default(uuid()) // Primary key
//   name      String // ชื่อองค์กร
//   slug      String?  @unique // slug ต้อง unique และเป็น optional
//   logo      String? // โลโก้ (optional)
//   createdAt DateTime @default(now()) // เวลาสร้าง
//   metadata  String? // metadata (optional)

//   // Relations
//   members MemberBetterAuth[] // 1 Organization → หลาย Member
// }
// export interface IRoleAuthjs {
//   MEMBER: "member";
//   ADMIN: "admin";
//   OWNER: "owner";
// }
// export type RoleAuthjs = IRoleAuthjs[keyof IRoleAuthjs];

// export interface IUserAuthjs {
//   id: string | null;
//   name?: string | null;
//   password?: string | null;
//   email: string;
//   image?: string | null;
//   role?: Role | null;
//   createdAt: Date | null;
//   updatedAt: Date | null;
// }
// export type UserAuthjs = IUserAuthjs;

export interface IUser {
  id: string | null;
  name?: string | null;
  password?: string | null;
  email: string;
  emailVerified: boolean | null;
  image?: string | null;
  role?: Role | null | undefined;
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
  role?: string | null | undefined; // ใช้ enum Role
  // role?: Role | null | undefined; // ใช้ enum Role
  createdAt: Date; // Timestamp ตอนสร้าง

  // Relations
  organization?: IOrganization | null;
  users?: IUser | null;
}

export type Member = IMember;

export interface IOrganization {
  id: string; // Primary key
  name: string; // ชื่อองค์กร
  slug?: string | null; // slug (unique, optional)
  logo?: string | null; // โลโก้ (optional)
  createdAt: Date; // เวลาสร้าง
  metadata?: string | null; // metadata (optional)
  // role?: Role | null | undefined;

  // Relations
  member?: Member[] | null;
}

export type Organization = IOrganization;

// Interface ของ Invitation
export interface IInvitation {
  id: string;
  organizationId: string;
  email: string;
  role?: string | null | undefined;
  // role?: Role | null | undefined;
  status: string; // default "pending"
  expiresAt: Date;
  inviterId: string;

  // Relations
  organization?: IOrganization | null;
  inviter?: User | null;
}

export type Invitation = IInvitation;
