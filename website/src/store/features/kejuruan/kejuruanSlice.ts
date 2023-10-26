import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PelatihanState } from "../pelatihan/pelatihanSlice";

const initialState: KejuruanState = {
  data: [],
};

// Define KejuruanState
export interface KejuruanState {
  data: KejuruanData[];
}

export interface KejuruanData {
  id: number;
  name: string;
  pelatihan: PelatihanState[] | null;
  peralatan: string | null;
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
}

const kejuruanSlice = createSlice({
  name: "kejuruan",
  initialState,
  reducers: {
    setKejuruanData: (state, action: PayloadAction<KejuruanData[]>) => {
      state.data = action.payload
    },
  }
})

export const { setKejuruanData } = kejuruanSlice.actions;
export default kejuruanSlice.reducer;