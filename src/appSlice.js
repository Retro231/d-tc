import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    loading: false,
  },
};

export const appSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.value.loading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoading } = appSlice.actions;

export default appSlice.reducer;
