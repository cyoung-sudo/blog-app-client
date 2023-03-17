import { createSlice } from "@reduxjs/toolkit";

export const AppSlice = createSlice({
  name: "App",
  initialState: {
    authUser: null,
    refresh: false
  },
  reducers: {
    //----- Set authenticated user
    setAuthUser: (state, action) => {
      state.authUser = action.payload
    },
    //----- Manual refresh
    refresh: state => {
      state.refreshToggle = !state.refreshToggle;
    }
  }
})

// Action creators are generated for each case reducer function
export const { setAuthUser, refresh } = AppSlice.actions

export default AppSlice.reducer