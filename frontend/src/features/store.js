import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import playerReducer from "./player/playerSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    player: playerReducer,
  },
});
