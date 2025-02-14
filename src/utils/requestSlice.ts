/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (__, action) => {
      return action.payload;
    },
    removeRequests: (state: any, action) => {
      const newArray = state.filter((r: any) => r._id !== action.payload )
      return newArray
    },
  },
});

export const { addRequests, removeRequests } = requestSlice.actions;

export default requestSlice.reducer;
