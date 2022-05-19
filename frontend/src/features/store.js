import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userReducer from "./user/userSlice";
import playerReducer from "./player/playerSlice";
import communityReducer from "./community/communitySlice";
import commentReducer from "./comment/commentSlice";
import battleReducer from "./battle/battleSlice";

import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const reducers = combineReducers({
  user: userReducer,
  player: playerReducer,
  community: communityReducer,
  comment: commentReducer,
  battle: battleReducer,
});

const persistConfig = { key: "root", storage };

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
