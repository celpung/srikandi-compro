import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: SocmendState = {
  facebook: "",
  twitter: "",
  instagram: "",
};

export interface SocmendState {
  facebook: string;
  twitter: string;
  instagram: string;
}

const socmedSlice = createSlice({
  name: "socmed",
  initialState,
  reducers: {
    setSocmedData: (state, action: PayloadAction<SocmendState>) => {
      state.facebook = action.payload.facebook;
      state.twitter = action.payload.twitter;
      state.instagram = action.payload.instagram;
    },
  },
});

export const { setSocmedData } = socmedSlice.actions;
export default socmedSlice.reducer;
