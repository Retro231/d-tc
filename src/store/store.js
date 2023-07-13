import { getDefaultMiddleware, configureStore } from "@reduxjs/toolkit";
import appReducer from "../appSlice";
import authReducer from "../components/feature/auth/authSlice";
import quizReducer from "../components/feature/quiz/quizSlice";
import dbReducer from "../dbSlice";
import myToastReducer from "../utils/toast/myToastSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    quiz: quizReducer,
    auth: authReducer,
    db: dbReducer,
    myToast: myToastReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
