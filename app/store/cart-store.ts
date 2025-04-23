import { create } from "zustand";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
  quantity: number;
}

interface CartStore {
  user: {
    username: string;
    role: string;
  };
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  updateUserName: (newUserName: string, nrole: string) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  user: {
    username: "",
    role: "",
  },
  items: [],
  updateUserName: (newUserName: string, nrole: string) =>
    set((state) => ({
      user: { ...state.user, username: newUserName, role: nrole },
    })),
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);

      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      }

      return { items: [...state.items, item] };
    }),

  removeItem: (id) =>
    set((state) => {
      return {
        items: state.items
          .map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0),
      };
    }),
  clearCart: () =>
    set(() => {
      return { items: [] };
    }),
}));
