import { UserData } from "../../types";

//Build Role-Based Dashboard with React 19 & Next.js 16 | Authentication & Authorization
//https://www.youtube.com/watch?v=5d02lZ5FnzY

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

type TUserData = UserData;

const userData: TUserData = {
  id: "0123",
  email: "email@eemail.comstring",
  role: "admin",
  teamId: null,
  createdAt: "2026-1-17T21:37:11.766z",
  updatedAt: "2026-1-17T21:37:11.766z",
};

class ApiAuth {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      headers: {
        "Content-type": "application/json",
        ...options.headers,
      },
      credentials: "include", // Important for cookies
      ...options,
    };
    const response = await fetch(url, config);

    // Handle 401 (unauthroized) gracefully
    if (response.status === 401) {
      return null;
    }
    if (!response.ok) {
      const error = await response.json().catch(() => ({
        error: "Network error",
      }));
      throw new Error(error.error || "Request failed");
    }

    const data = await response.json();

    return data;
  }

  //Auth Methods
  async register(userData: unknown) {
    return this.request("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({}),
    });
  }

  async login(email: string, password: string) {
    return this.request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  //   async function login(email: string, password: string) {
  //   try {
  //     const response = await fetch("/api/auth/login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     // ตรวจสอบว่า response.ok หรือไม่ (status 200–299)
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     console.log("Login success:", data);
  //     return data;
  //   } catch (error: any) {
  //     console.error("Login failed:", error.message || error);
  //     return { success: false, error: error.message || "Unknown error" };
  //   }
  // }

  async logout() {
    return this.request("/api/auth/logout", {
      method: "POST",
    });
  }
  async getCurrentUser() {
    return this.request("/api/auth/current_user");
  }

  // User Methods
  async gettUser() {
    return this.request("/api/user");
  }

  // Admin Methods
  async updateUserRole(userId: string, role: string) {
    return this.request(`/api/user/${userId}/role`, {
      method: "PATH",
      body: JSON.stringify({ role }),
    });
  }
  async assignUserToTeam(userId: string, teamId: string) {
    return this.request(`/api/user/${userId}/team`, {
      method: "PATH",
      body: JSON.stringify({ teamId }),
    });
  }
}

export const apiAuth = new ApiAuth();
