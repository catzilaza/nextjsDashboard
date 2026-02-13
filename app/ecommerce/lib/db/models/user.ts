export interface IRole {
  MEMBER: "member";
  ADMIN: "admin";
  OWNER: "owner";
}
export type Role = IRole[keyof IRole];

export interface IUser {
  id: string;
  name?: string | null | undefined;
  password?: string | null | undefined;
  email: string | undefined;
  emailVerified?: boolean | null | undefined;
  image?: string | null | undefined;
  role?: Role | null | undefined;
  createdAt?: Date | null | undefined;
  updatedAt?: Date | null | undefined;
}

export type User = {
  id: string;
  name?: string | null | undefined;
  password?: string | null | undefined;
  email: string | undefined;
  emailVerified?: boolean | null | undefined;
  image?: string | null | undefined;
  role?: Role | null | undefined;
  createdAt?: Date | null | undefined;
  updatedAt?: Date | null | undefined;
};

// model User {
//   id            String    @id @default(uuid())
//   name          String?
//   password      String?
//   email         String    @unique
//   emailVerified Boolean?  @default(false)
//   image         String?
//   role          Role?     @default(guest)
//   createdAt     DateTime? @default(now())
//   updatedAt     DateTime? @updatedAt

//   // Relations
//   sessions    Session[]
//   accounts    Account[]
//   invitations Invitation[]
//   members     Member[]
//   files       File[]
//   customer    Customer?

//      // Optional for WebAuthn support
//   // authenticatorAuthjs AuthenticatorAuthjs[]
// }
