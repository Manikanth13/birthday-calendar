import { createSlice } from "@reduxjs/toolkit";
import { FriendData } from "../types";

export interface DataState {
  data: FriendData[];
}

const initialState = {
  data: [],
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    updateState: (state, action) => {
      const updatedState = {
        ...state,
        ...action.payload,
      };
      localStorage.setItem("data", JSON.stringify(updatedState.data));
      return updatedState;
    },
  },
});

export const dataActions = dataSlice.actions;
