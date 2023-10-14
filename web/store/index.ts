'use client'

import { configureStore } from '@reduxjs/toolkit'
import aboutSlice from './features/about/aboutSlice'

export const store = configureStore({
  reducer: {
    about: aboutSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch