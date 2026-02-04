import { create } from "zustand";

interface Rating {
  id: number;
  score: number;
}

interface RatingState {
  ratings: Rating[];
  addRating: (rating: Rating) => void;
  removeRating: (id: number) => void;
  clearRatings: () => void;
}

export const useRatingStore = create<RatingState>((set) => ({
  ratings: [],

  addRating: (rating) =>
    set((state) => ({
      ratings: [...state.ratings, rating],
    })),

  removeRating: (id) =>
    set((state) => ({
      ratings: state.ratings.filter((r) => r.id !== id),
    })),

  clearRatings: () => set(() => ({ ratings: [] })),
}));

//================================================================================
// วิธีใช้งานใน component
//
// import { useRatingStore } from './useRatingStore'

// function RatingComponent() {
//   const ratings = useRatingStore((state) => state.ratings)
//   const addRating = useRatingStore((state) => state.addRating)
//   const removeRating = useRatingStore((state) => state.removeRating)
//   const clearRatings = useRatingStore((state) => state.clearRatings)

//   return (
//     <div>
//       <button onClick={() => addRating({ id: 1, score: 5 })}>
//         Add Rating (id=1, score=5)
//       </button>
//       <button onClick={() => clearRatings()}>Clear All</button>
//       <ul>
//         {ratings.map((r) => (
//           <li key={r.id}>
//             {r.score} ⭐
//             <button onClick={() => removeRating(r.id)}>Remove</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }

//================================================================================

// import { createSlice } from "@reduxjs/toolkit";

// const ratingSlice = createSlice({
//   name: "rating",
//   initialState: {
//     ratings: [],
//   },
//   reducers: {
//     addRating: (state, action) => {
//       state.ratings.push(action.payload);
//     },
//   },
// });

// export const { addRating } = ratingSlice.actions;

// export default ratingSlice.reducer;
