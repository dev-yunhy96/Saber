import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import playerReducer from "./player/playerSlice";
import communityReducer from "./community/communitySlice";
import commentReducer from "./comment/commentSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    player: playerReducer,
    community: communityReducer,
    comment: commentReducer,
  },
});
