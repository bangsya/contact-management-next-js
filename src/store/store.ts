import { configureStore } from "@reduxjs/toolkit";
import userDataSlice from "./userDataSlice";
import searchSlice from "./searchSlice";

export const store = configureStore({
  reducer: {
    userData: userDataSlice,
    search: searchSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
