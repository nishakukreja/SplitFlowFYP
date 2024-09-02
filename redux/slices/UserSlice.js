import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: {},
    userAuthToken: {},

  },
  reducers: {
    

    setCurrentUserAuthToken(state, action) {
      state.userAuthToken = action.payload;
    },
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
  },
});
export const {setCurrentUserAuthToken, setCurrentUser} =
userSlice.actions;
export const getUserData = (state) => state.user.currentUser;

export default userSlice.reducer;
