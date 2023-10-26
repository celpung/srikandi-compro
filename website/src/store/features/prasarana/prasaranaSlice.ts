import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PelatihanState } from "../pelatihan/pelatihanSlice";

// Define PrasaranaData interface
export interface PrasaranaData {
  id: number;
  name: string;
  pelatihan: PelatihanState[] | null;
  peralatan: string | null;
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
}

// Define PrasaranaState interface
export interface PrasaranaState {
  data: PrasaranaData[];
}

const initialState: PrasaranaState = {
  data: [],
};

const prasaranaSlice = createSlice({
  name: "prasarana",
  initialState,
  reducers: {
    setPrasaranaData: (state, action: PayloadAction<PrasaranaData[]>) => {
      state.data = action.payload;
    },
  },
});

export const { setPrasaranaData } = prasaranaSlice.actions;
export default prasaranaSlice.reducer;
