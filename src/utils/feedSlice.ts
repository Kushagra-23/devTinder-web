import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (__, action) => {
      return action.payload;
    },
    removeFeed: (state: any, action) => {
      const newArray = state.filter((r: any) => r._id !== action.payload )
      return newArray
    },
  },
});

export const { addFeed, removeFeed } = feedSlice.actions;

export default feedSlice.reducer;
