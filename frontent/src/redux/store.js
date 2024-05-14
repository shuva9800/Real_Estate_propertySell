import { configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist';
export const store = configureStore({
  reducer: {persistReducer},
})