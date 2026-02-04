export type typeUserProfile = {
  id?: string | null | undefined;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  role?: string | null | undefined;
  // role?: Role| null | undefined;
  expiredAt?: string | null | undefined;
};

export interface IRole {
  MEMBER: "member";
  ADMIN: "admin";
  OWNER: "owner";
}
export type Role = IRole[keyof IRole];

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
