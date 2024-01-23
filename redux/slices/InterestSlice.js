import { createSlice } from "@reduxjs/toolkit"

const interestSlice = createSlice({
    name: "interests",
    initialState: {
      interests: [],
    },
    reducers: {
        getAllInterests(state, action) {
            state.interests = action.payload
          }
    }
  })
  export const { getAllInterests } = interestSlice.actions

  export default interestSlice.reducer
  