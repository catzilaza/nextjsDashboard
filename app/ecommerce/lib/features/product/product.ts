import { create } from "zustand";
import { productDummyData } from "../assets/assets";

interface ProductState {
  list: any[];
  setProduct: (products: any[]) => void;
  clearProduct: () => void;
}

export const useProductStore = create<ProductState>((set) => ({
  list: productDummyData,

  setProduct: (products) =>
    set(() => ({
      list: products,
    })),

  clearProduct: () =>
    set(() => ({
      list: [],
    })),
}));

//================================================================================
// วิธีใช้งานใน component
// import { useProductStore } from './useProductStore'

// function ProductList() {
//   const list = useProductStore((state) => state.list)
//   const clearProduct = useProductStore((state) => state.clearProduct)

//   return (
//     <div>
//       <ul>
//         {list.map((p, i) => (
//           <li key={i}>{p.title}</li>
//         ))}
//       </ul>
//       <button onClick={clearProduct}>Clear Products</button>
//     </div>
//   )
// }
//================================================================================
// import { createSlice } from '@reduxjs/toolkit'
// import { productDummyData } from '@/assets/assets'

// const productSlice = createSlice({
//     name: 'product',
//     initialState: {
//         list: productDummyData,
//     },
//     reducers: {
//         setProduct: (state, action) => {
//             state.list = action.payload
//         },
//         clearProduct: (state) => {
//             state.list = []
//         }
//     }
// })

// export const { setProduct, clearProduct } = productSlice.actions

// export default productSlice.reducer
