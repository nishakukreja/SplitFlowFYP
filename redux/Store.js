import { configureStore } from '@reduxjs/toolkit'
import interestSlice from './slices/InterestSlice'
export const store = configureStore({
  reducer: {
    interests:interestSlice,
  },
})