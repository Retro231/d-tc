import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    questionsDB: [],
  },
};

export const dbSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuestionsDB: (state, action) => {
      state.value.questionsDB = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setQuestionsDB } = dbSlice.actions;

export default dbSlice.reducer;
