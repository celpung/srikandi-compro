import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { KejuruanState } from "../kejuruan/kejuruanSlice";

export interface PeralatanData {
  id: number;
  name: string;
  total: number;
  kejuruan: KejuruanState | null;
  image: string
}

export interface PeralatanState {
  data: PeralatanData[];
}

const initialState: PeralatanState = {
  data: [],
};

const peralatanSlice = createSlice({
  name: "peralatan",
  initialState,
  reducers: {
    setPeralatanData: (state, action: PayloadAction<PeralatanData[]>) => {
      state.data = action.payload;
    },
  }
})

export const { setPeralatanData } = peralatanSlice.actions;
export default peralatanSlice.reducer;