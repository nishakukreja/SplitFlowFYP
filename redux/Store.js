import {configureStore} from '@reduxjs/toolkit'
import interestSlice from './slices/InterestSlice'
import categoriesSlice from './slices/CategoriesSlice'
import userSlice from './slices/UserSlice'

export const store = configureStore({
  reducer: {
    interests: interestSlice,
    categories: categoriesSlice,
    user: userSlice,

  },
})