import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: PelatihanState = {
  data: [],
};

export interface PelatihanState {
  data: PelatihanData[];
}

export interface PelatihanData {
  id: number;
  name: string;
  funding: string;
  audience: number;
  kejuruan_id: number;
  prasarana: [];
}

const pelatihanSlice = createSlice({
  name: "pelatihan",
  initialState,
  reducers: {
    setPelatihanData: (state, action: PayloadAction<PelatihanData[]>) => {
      state.data = action.payload;
    },
  },
});

export const { setPelatihanData } = pelatihanSlice.actions;
export default pelatihanSlice.reducer;
