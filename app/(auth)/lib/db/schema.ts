// model UserAuthjs {
//   id            String          @id @default(cuid())
//   name          String?
//   email         String?         @unique
//   password      String?
//   emailVerified DateTime?
//   image         String?
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt

//   Relatoion
//   accountAuthjs      AccountAuthjs[]
//   sessionAuthjs      SessionAuthjs[]

//   // Optional for WebAuthn support
//   authenticatorAuthjs AuthenticatorAuthjs[]
// }

// model AccountAuthjs {
//   id                String  @id @default(cuid())
//   type              String
//   provider          String
//   providerAccountId String
//   refresh_token     String?
//   access_token      String?
//   expires_at        Int?
//   token_type        String?
//   scope             String?
//   id_token          String?
//   session_state     String?
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt

//   Relation
//   userId            String
//   userAuthjs UserAuthjs @relation(fields: [userId], references: [id], onDelete: Cascade)

//   @@unique([provider, providerAccountId])
// }

// enum Role {
//   member
//   admin
//   owner
//   guest
//   user
// }

// model SessionAuthjs {
//   id           String   @id @default(cuid())
//   sessionToken String   @unique
//   userId       String
//   expires      DateTime
//   userAuthjs         UserAuthjs     @relation(fields: [userId], references: [id], onDelete: Cascade)

//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
// }

// model VerificationTokenAuthjs {
//   identifier String
//   token      String
//   expires    DateTime

//   @@unique([identifier, token])
// }

// Optional for WebAuthn support
// model AuthenticatorAuthjs {
//   credentialID         String  @unique
//   providerAccountId    String
//   credentialPublicKey  String
//   counter              Int
//   credentialDeviceType String
//   credentialBackedUp   Boolean
//   transports           String?

//   Relation
//   userId               String
//   userAuthjs UserAuthjs @relation(fields: [userId], references: [id], onDelete: Cascade)

//   @@id([userId, credentialID])
// }
// export enum Role {
//   MEMBER = "member",
//   ADMIN = "admin",
//   OWNER = "owner",
//   GUEST = "guest",
//   USER = "user",
// }

// export type Role = "member" | "admin" | "owner" | "guest" | "user";

export interface IUserAuthjs {
  id: string;
  name?: string | null;
  email?: string | null;
  emailVerified?: Date | null;
  password?: string | null;
  role?: RoleAuthjs | null;
  image?: string | null;

  // accounts: AccountAuthjs[];
  // sessions: SessionAuthjs[];
  // Authenticator: AuthenticatorAuthjs[];

  createdAt: Date;
  updatedAt: Date;
}
export type UserAuthjs = IUserAuthjs;

export interface ISessionAuthjs {
  id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
  createdAt: Date;
  updatedAt: Date;
  // user: UserAuthjs; // ต้องมี interface User ประกอบด้วย
}
export type SessionAuthjs = ISessionAuthjs;

export interface IAccountAuthjs {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string | null;
  access_token?: string | null;
  expires_at?: number | null;
  token_type?: string | null;
  scope?: string | null;
  id_token?: string | null;
  session_state?: string | null;
  createdAt: Date;
  updatedAt: Date;

  // user: UserAuthjs;
}
export type AccountAuthjs = IAccountAuthjs;

export interface IVerificationAuthjs {
  identifier: string;
  token: string;
  expires: Date;
}

export type VerificationAuthjs = IVerificationAuthjs;

// แบบ Interface + Union Type
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

export interface AuthenticatorAuthjs {
  credentialID: string;
  userId: string;
  providerAccountId: string;
  credentialPublicKey: string;
  counter: number;
  credentialDeviceType: string;
  credentialBackedUp: boolean;
  transports?: string | null;

  // user: UserAuthjs; // ต้องมี interface User ประกอบด้วย
}
