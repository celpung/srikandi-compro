'use client'

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: ContactState = {
  id: 0,
  title: "",
  content: "",
};

export interface ContactState {
  id?: number,
  title: string,
  content: string,
}

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    setContactData: (state, action: PayloadAction<ContactState>) => {
      state.id = action.payload.id;
      state.title = action.payload.title;
      state.content = action.payload.content;
    },
  },
});

export const { setContactData } = contactSlice.actions;
export default contactSlice.reducer;