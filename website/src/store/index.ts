'use client'

import { configureStore } from '@reduxjs/toolkit'
import aboutSlice from './features/about/aboutSlice'
import contactSlice from './features/contact/contactSlice'
import socmedSlice from './features/socmed/socmedSlice'
import kejuruanSlice from './features/kejuruan/kejuruanSlice'
import pelatihanSlice from './features/pelatihan/pelatihanSlice'
import prasaranaSlice from './features/prasarana/prasaranaSlice'
import peralatanSlice from './features/peralatan/peralatanSlice'

export const store = configureStore({
  reducer: {
    about: aboutSlice,
    contact: contactSlice,
    socmed: socmedSlice,
    kejuruan: kejuruanSlice,
    pelatihan: pelatihanSlice,
    prasarana: prasaranaSlice,
    peralatan: peralatanSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch