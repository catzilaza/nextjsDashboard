import { create } from "zustand";
import { addressDummyData } from "../assets/assets";

interface AddressState {
  list: any[];
  addAddress: (address: any) => void;
}

export const useAddressStore = create<AddressState>((set) => ({
  list: [],

  addAddress: (address) =>
    set((state) => ({
      list: [...state.list, address],
    })),
}));

//================================================================================
// วิธีใช้งานใน component
// import { useAddressStore } from './useAddressStore'

// function AddressList() {
//   const list = useAddressStore((state) => state.list)
//   const addAddress = useAddressStore((state) => state.addAddress)

//   return (
//     <div>
//       <ul>
//         {list.map((addr, i) => (
//           <li key={i}>{addr.street}</li>
//         ))}
//       </ul>
//       <button
//         onClick={() =>
//           addAddress({ street: 'New Street', city: 'Bangkok' })
//         }
//       >
//         Add Address
//       </button>
//     </div>
//   )
// }
//================================================================================
// import { addressDummyData } from '@/assets/assets'
// import { createSlice } from '@reduxjs/toolkit'

// const addressSlice = createSlice({
//     name: 'address',
//     initialState: {
//         list: [addressDummyData],
//     },
//     reducers: {
//         addAddress: (state, action) => {
//             state.list.push(action.payload)
//         },
//     }
// })

// export const { addAddress } = addressSlice.actions

// export default addressSlice.reducer
