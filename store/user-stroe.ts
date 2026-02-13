import { create } from "zustand";
import { User, Role } from "@/app/ecommerce/lib/db/models/user";
//https://zustand.docs.pmnd.rs/getting-started/introduction

const emptyUser: User = {
  id: "",
  name: "",
  email: "",
  image: "",
  role: null,
  emailVerified: false,
};

interface UsertStore {
  user: User;
  updateUser: (
    id: string,
    email: string,
    name?: string | null | undefined,
    image?: string | null | undefined,
    role?: Role | null | undefined,
  ) => void;
  clearUser: () => void;
}

export const useUserStore = create<UsertStore>((set) => ({
  user: emptyUser,

  updateUser: (id, email, name, image, role) =>
    set(() => ({ user: { id, name, email, image, role } })),

  clearUser: () => set(() => ({ user: emptyUser })),
}));

// import { create } from "zustand";
// //https://zustand.docs.pmnd.rs/getting-started/introduction
// export const useStore = create((set) => ({
//   user: {
//     username: "admin",
//     role: "admin",
//   },
//   bears: 0,
//   increasePopulation: () => set((state: any) => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 }),
//   updateBears: (newBears: any) => set({ bears: newBears }),
//   updateUser: (newUser: any) => set({ user: newUser }),
//   updateUserName: (newUserName: any) =>
//     set((state: any) => ({ user: { ...state.user, username: newUserName } })),
//   fetchUser: async () => {
//     const response = await fetch("/api/user", { method: "GET" });
//     const data = await response.json();
//     set({ user: data });
//   },
// }));
