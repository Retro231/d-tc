import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    show: false,
  },
};

export const myToastSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setShow: (state, action) => {
      state.value.show = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setShow } = myToastSlice.actions;

export default myToastSlice.reducer;
