import { create } from "zustand";

interface CartState {
  total: number;
  cartItems: Record<string, number>;
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  deleteItemFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  total: 0,
  cartItems: {},

  addToCart: (productId) =>
    set((state) => {
      const newCartItems = { ...state.cartItems };
      if (newCartItems[productId]) {
        newCartItems[productId]++;
      } else {
        newCartItems[productId] = 1;
      }
      return {
        cartItems: newCartItems,
        total: state.total + 1,
      };
    }),

  removeFromCart: (productId) =>
    set((state) => {
      const newCartItems = { ...state.cartItems };
      if (newCartItems[productId]) {
        newCartItems[productId]--;
        if (newCartItems[productId] === 0) {
          delete newCartItems[productId];
        }
        return {
          cartItems: newCartItems,
          total: state.total - 1,
        };
      }
      return state;
    }),

  deleteItemFromCart: (productId) =>
    set((state) => {
      const newCartItems = { ...state.cartItems };
      const removedCount = newCartItems[productId] || 0;
      delete newCartItems[productId];
      return {
        cartItems: newCartItems,
        total: state.total - removedCount,
      };
    }),

  clearCart: () =>
    set(() => ({
      cartItems: {},
      total: 0,
    })),
}));

//================================================================================
// วิธีใช้งานใน component
// import { useCartStore } from './useCartStore'

// function CartButton({ productId }: { productId: string }) {
//   const addToCart = useCartStore((state) => state.addToCart)
//   const removeFromCart = useCartStore((state) => state.removeFromCart)
//   const total = useCartStore((state) => state.total)
//   const { items, removeItem, addItem, updateUserName } = useCartStore();

//   return (
//     <div>
//       <button onClick={() => addToCart(productId)}>Add</button>
//       <button onClick={() => removeFromCart(productId)}>Remove</button>
//       <p>Total items: {total}</p>
//     </div>
//   )
// }

//================================================================================
// import { createSlice } from '@reduxjs/toolkit'

// const cartSlice = createSlice({
//     name: 'cart',
//     initialState: {
//         total: 0,
//         cartItems: {},
//     },
//     reducers: {
//         addToCart: (state, action) => {
//             const { productId } = action.payload
//             if (state.cartItems[productId]) {
//                 state.cartItems[productId]++
//             } else {
//                 state.cartItems[productId] = 1
//             }
//             state.total += 1
//         },
//         removeFromCart: (state, action) => {
//             const { productId } = action.payload
//             if (state.cartItems[productId]) {
//                 state.cartItems[productId]--
//                 if (state.cartItems[productId] === 0) {
//                     delete state.cartItems[productId]
//                 }
//             }
//             state.total -= 1
//         },
//         deleteItemFromCart: (state, action) => {
//             const { productId } = action.payload
//             state.total -= state.cartItems[productId] ? state.cartItems[productId] : 0
//             delete state.cartItems[productId]
//         },
//         clearCart: (state) => {
//             state.cartItems = {}
//             state.total = 0
//         },
//     }
// })

// export const { addToCart, removeFromCart, clearCart, deleteItemFromCart } = cartSlice.actions

// export default cartSlice.reducer
