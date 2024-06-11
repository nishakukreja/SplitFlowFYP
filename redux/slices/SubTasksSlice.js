import {createSlice} from '@reduxjs/toolkit';

const subTasksSlice = createSlice({
  name: 'categories',
  initialState: {
    allSuggestedSubTasks: [
      {
        title: 'Event Management',
        priorty: 'High',
        deadline: 'June 10, 2022',
      },
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
  subTasksSlice.actions;

export default subTasksSlice.reducer;
