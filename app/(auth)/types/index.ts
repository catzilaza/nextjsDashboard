export interface UserData {
  id: string | null | undefined;
  email: string | null | undefined;
  role: string | null | undefined;
  teamId: string | null | undefined;
  createdAt: string | Date | undefined;
  updatedAt: string | Date | undefined;
}

export enum RoleType {
  USER = "user",
  ADMIN = "admin",
}

export interface Role {
  role: RoleType;
}
//การใช้งาน
//const r1: Role = { role: "user" };
//const r2: Role = { role: "admin" };

export interface AuthContextType {
  user: UserData | null;
  login: (formData: FormData) => void;
  logout: () => void;
  hasPermission: (requiredRole: Role) => boolean;
}
