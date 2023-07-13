import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    userRegInfo: {
      name: "user",
      email: "user@mail.com",
    },
    isLogedin: false,
    isSubscribed: false,
  },
};

export const authSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setUserRegInfo: (state, action) => {
      state.value.userRegInfo = action.payload;
    },
    setLogin: (state, action) => {
      state.value.isLogedin = action.payload;
    },
    setSubscribed: (state, action) => {
      state.value.isSubscribed = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLogin, setUserRegInfo, setSubscribed } = authSlice.actions;

export default authSlice.reducer;
