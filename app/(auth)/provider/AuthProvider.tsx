"use client";

import {
  createContext,
  useActionState,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContextType, Role, RoleType, UserData } from "../types";
import { apiAuth } from "../lib/apiClient/apiAuth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type LoginState = {
  success?: boolean;
  user?: UserData | null;
  error?: string;
};
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loginState, loginAction, isLoginPending] = useActionState(
    async (prevState: LoginState, formData: FormData): Promise<LoginState> => {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      try {
        const data = await apiAuth.login(email, password);
        setUser(data?.user);

        return {
          success: data.success,
          error: data.error.message,
          user: data.user as UserData,
        };
      } catch (error) {
        console.error("Error: ", error);
        return {
          error: error instanceof Error ? error.message : "Login failed",
        };
      }
    },
    {
      success: undefined,
      error: undefined,
      user: undefined,
    } as LoginState
  );

  //   setUser({
  //     id: loginState.user?.id,
  //     email: loginState.user?.email,
  //     role: loginState.user?.role,
  //     teamId: loginState.user?.teamId,
  //     createdAt: loginState.user?.createdAt,
  //     updatedAt: loginState.user?.updatedAt,
  //   });

  //   const [logout, setLogout] = useState<UserData | null>(null);

  const logout = async () => {
    try {
      await apiAuth.logout();
      setUser(null);
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error: ", error);
    }
  };
  //   const [hasPermission, setHaspermission] = useState<UserData | null>(null);
  const hasPermission = (requiredRole: Role): boolean => {
    if (!user) return false;
    const roleHierarchy = {
      [RoleType.ADMIN]: 0,
      [RoleType.USER]: 1,
    };
    const result =
      roleHierarchy[user.role as RoleType] >= roleHierarchy[requiredRole.role];
    return result;
  };

  //Load user on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await apiAuth.getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error("Failed to load user: ", error);
      }
    };
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login: loginAction, logout, hasPermission }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within an AuthProvider`);
  }
  return context;
};

export default AuthProvider;
