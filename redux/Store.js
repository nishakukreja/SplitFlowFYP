import {configureStore} from '@reduxjs/toolkit'
import interestSlice from './slices/InterestSlice'
import categoriesSlice from './slices/CategoriesSlice'
export const store = configureStore({
  reducer: {
    interests: interestSlice,
    categories: categoriesSlice,
  },
})