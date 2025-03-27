import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { userSlice } from "./users";


export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    user: userSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;