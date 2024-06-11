import {createSlice} from '@reduxjs/toolkit';

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    categoriesTemp: [
      {label: 'All', icon: 'circle'},
      {label: 'Photography', icon: 'camera'},
      {label: 'Food', icon: 'cutlery'},
      {label: 'Weddings', icon: 'heart'},
      {label: 'Events', icon: 'calendar'},
      {label: 'Music', icon: 'music'},
      {label: 'Decor', icon: 'tree'},
      {label: 'Others', icon: 'ellipsis-h'},
    ],
    currentSelectedCategory: {},
  },
  reducers: {
    setAllCategories(state, action) {
      state.categories = action.payload;
    },

    setCurrentSelectedCategory(state, action) {
      state.currentSelectedCategory = action.payload;
    },
  },
});
export const {setAllCategories, setCurrentSelectedCategory} =
  categoriesSlice.actions;

export default categoriesSlice.reducer;
