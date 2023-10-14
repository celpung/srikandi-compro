'use client'

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: AboutState = {
  id: 0,
  title: "",
  content: "",
};

export interface AboutState {
  id?: number,
  title: string,
  content: string,
}

const aboutSlice = createSlice({
  name: 'about',
  initialState,
  reducers: {
    setAboutData: (state, action: PayloadAction<AboutState>) => {
      state.id = action.payload.id;
      state.title = action.payload.title;
      state.content = action.payload.content;
    },
  },
});

export const { setAboutData } = aboutSlice.actions;
export default aboutSlice.reducer;