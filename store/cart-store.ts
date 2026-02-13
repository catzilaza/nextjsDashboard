import { create } from "zustand";
import { IProduct, Product } from "@/app/ecommerce/lib/db/models/product";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image_url?: string | null | undefined;
  quantity: number;
  //   stock: number;
}

const emptyCart: CartItem[] = [];

interface CartStore {
  items: CartItem[];
  total: number;
  remainStock: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;

  getTotalItem: () => number;
}
export const useCartStore = create<CartStore>((set, get) => ({
  items: emptyCart,
  total: 0,
  remainStock: 0,

  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);
      let updatedItems;

      if (!existing) {
        updatedItems = [...state.items, item];
      } else {
        updatedItems = state.items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i,
        );
      }

      return {
        items: updatedItems,
        total: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
      };
    }),

  removeItem: (id) =>
    set((state) => {
      let updatedItems = state.items
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0);

      return {
        items: updatedItems,
        total: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
      };
    }),

  clearCart: () => set(() => ({ items: emptyCart, total: 0, remainStock: 0 })),

  getTotalItem: () => {
    const { items } = get();
    return items.reduce((sum, i) => sum + i.quantity * i.price, 0);
  },

  getRemainStock: () => {
    return get().remainStock;
  },
}));

// import { create } from "zustand";

// export interface DessertProduct {
//   id: string;
//   name: string;
//   price: number;
//   imageUrl: string | null;
//   quantity: number;
// }

// export interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   imageUrl: string | null;
//   quantity: number;
// }

// interface CartStore {
//   user: {
//     userId: string;
//     username: string;
//     role: string | null | undefined;
//   };
//   items: CartItem[];
//   addItem: (item: CartItem) => void;
//   removeItem: (id: string) => void;
//   clearCart: () => void;
//   updateUser: (userId: string, ewUserName: string, nrole: string) => void;
//   orderInfo: () => void;
//   clearUser: () => void;
// }

// export const useCartStore = create<CartStore>((set) => ({
//   user: {
//     userId: "",
//     username: "",
//     role: "",
//   },
//   items: [],

//   updateUser: (nuserId: string, newUserName: string, nrole: string) =>
//     set((state) => ({
//       user: {
//         ...state.user,
//         userId: nuserId,
//         username: newUserName,
//         role: nrole,
//       },
//     })),
//   addItem: (item) =>
//     set((state) => {
//       const existing = state.items.find((i) => i.id === item.id);

//       if (existing) {
//         return {
//           items: state.items.map((i) =>
//             i.id === item.id
//               ? { ...i, quantity: i.quantity + item.quantity }
//               : i,
//           ),
//         };
//       }

//       return { items: [...state.items, item] };
//     }),
//   removeItem: (id) =>
//     set((state) => {
//       return {
//         items: state.items
//           .map((item) =>
//             item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
//           )
//           .filter((item) => item.quantity > 0),
//       };
//     }),
//   clearCart: () =>
//     set(() => {
//       return { items: [] };
//     }),
//   orderInfo: () =>
//     set(() => {
//       return { user: { userId: "", username: "", role: "" } };
//     }),
//   clearUser: () => set({ user: { userId: "", username: "", role: "" } }),
// }));

//================================================================================

//================================================================================
// มี array ของสินค้า
// const items = [
//   { id: 1, name: "Shoes", price: 1200 },
//   { id: 2, name: "Bag", price: 800 },
//   { id: 3, name: "Hat", price: 300 },
// ];

// // สมมติเราต้องการหาสินค้าที่ id = 2
// const itemIdToFind = 2;

// const foundItem = items.find((i) => i.id === itemIdToFind); //- หาตัวแรกที่ตรงเงื่อนไข

// console.log(foundItem);
// // Output: { id: 2, name: "Bag", price: 800 }

// const cheapItems = items.filter((i) => i.price < 1000); //- filter() → หาหลายตัวที่ตรงเงื่อนไข
// console.log(cheapItems);
// // Output: [ { id: 2, name: "Bag", price: 800 }, { id: 3, name: "Hat", price: 300 } ]

// const itemNames = items.map((i) => i.name); //- map() → แปลง array เป็นรูปแบบใหม่
// console.log(itemNames);
// // Output: ["Shoes", "Bag", "Hat"]

// const hasHat = items.some((i) => i.name === "Hat"); //- some() → ตรวจสอบว่ามี element ที่ตรงเงื่อนไขหรือไม่
// console.log(hasHat); // true

// const totalPrice = items.reduce((sum, i) => sum + i.price, 0); //- reduce() → รวมค่าใน array
// console.log(totalPrice); // 2300
//================================================================================
// const items = [
//   { id: 1, name: "Shoes", quantity: 2 },
//   { id: 2, name: "Bag", quantity: 1 },
//   { id: 3, name: "Hat", quantity: 5 },
// ];

// const item = { id: 2, quantity: 3 }; // ต้องการเพิ่ม Bag อีก 3 ชิ้น

// const updatedItems = items.map((i) =>
//   i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i,
// );

// console.log(updatedItems);
// /*
// [
//   { id: 1, name: "Shoes", quantity: 2 },
//   { id: 2, name: "Bag", quantity: 4 }, // อัปเดตจาก 1 → 4
//   { id: 3, name: "Hat", quantity: 5 }
// ]
// */
// - โค้ดนี้ใช้ .map() เพื่ออัปเดตค่าใน array โดยไม่แก้ไข array เดิม (immutable)
// - เหมาะกับการจัดการ state เช่นใน React หรือ Zustand
// - ใช้ pattern { ...i, field: newValue } เพื่อ copy object และแก้ไขเฉพาะ field ที่ต้องการ

// - .map() → ใช้เมื่ออยากอัปเดต array แบบ immutable (สร้าง array ใหม่) → เหมาะกับ React/Zustand/Redux
// - .forEach() → ใช้เมื่ออยากแก้ไข array เดิม หรือทำ side-effect เช่น console.log → ไม่คืนค่าใหม่
// - .find() → ใช้เมื่ออยากค้นหา element เดียวใน array → ไม่เหมาะกับการอัปเดตทั้ง arra

// ================================================================================
// const state = {
//   items: ["Shoes", "Bag"],
// };

// const newItem = "Hat";

// const newState = {
//   ...state,
//   items: [...state.items, newItem],
// };

// console.log(newState);
// // Output: { items: ["Shoes", "Bag", "Hat"] }
// // - โค้ดนี้แสดงการเพิ่ม item ลงใน array ภายใน object state แบบ immutable
// // - ใช้ spread operator (...) เพื่อ copy ค่าเดิมของ state และ items
// // - สร้าง array ใหม่ที่มี item ใหม่ต่อท้าย array เดิม
// // - เหมาะกับการจัดการ state ใน React/Zustand/Redux ที่ต้องการหลีกเลี่ยงการแก้ไข state โดยตรง

// const state = {
//   items: [1, 2],
//   total: 2,
// };

// const item = 3;

// const newState = {
//   ...state,
//   items: [...state.items, item],
//   total: state.total + 1,
// };

// console.log(newState);
// // Output: { items: [1, 2, 3], total: 3 }
// // - โค้ดนี้แสดงการเพิ่ม item ลงใน array และอัปเดต total ใน object state แบบ immutable
// // - ใช้ spread operator (...) เพื่อ copy ค่าเดิมของ state และ items
// // - สร้าง array ใหม่ที่มี item ใหม่ต่อท้าย array เดิม
// // - อัปเดต total โดยเพิ่มค่าเดิมทีละ 1
// // - เหมาะกับการจัดการ state ใน React/Zustand/Redux ที่ต้องการหลีกเลี่ยงการแก้ไข state โดยตรง

// setState((state) => ({
//   ...state,
//   items: [...state.items, newItem],
// }));
// // - โค้ดนี้ใช้ในฟังก์ชัน setState ของ React/Zustand เพื่ออัปเดต state แบบ immutable
// // - รับ state ปัจจุบันเป็นอาร์กิวเมนต์ และคืนค่า state ใหม่ที่มี item ใหม่เพิ่มเข้าไปใน array items
// // - ใช้ spread operator (...) เพื่อ copy ค่าเดิมของ state และ items
// // - สร้าง array ใหม่ที่มี item ใหม่ต่อท้าย array เดิม

// - items: [...state.items, item] = การสร้าง array ใหม่ที่มี element เดิมทั้งหมด + element ใหม่
// - เป็นวิธีที่นิยมใช้ใน React/Redux/Zustand เพราะ ไม่แก้ไข state เดิม (immutable)
// - เหมาะกับการอัปเดต state ที่เป็น array เช่น ตะกร้าสินค้า, รายการ todo, รายการ address เป็นต้น

//================================================================================
//Spread Operator (Immutable)
// const state = { items: ["Shoes", "Bag"] };
// const newItem = "Hat";

// const newState = {
//   ...state,
//   items: [...state.items, newItem],
// };

// console.log(newState);
// // { items: ["Shoes", "Bag", "Hat"] }

// //Array.push() (Mutable)
// const state = { items: ["Shoes", "Bag"] };
// const newItem = "Hat";

// state.items.push(newItem);

// console.log(state);
// // { items: ["Shoes", "Bag", "Hat"] }
