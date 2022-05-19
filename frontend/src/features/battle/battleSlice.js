import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
  check: 0,
};

const battleSlice = createSlice({
  name: "battle",
  initialState,
  reducers: {
    countBattle: (state) => {
      state.count = state.count + 1;
    },
    checkFinished: (state) => {
      state.check = state.check + 1;
    },
  },
});

export const { countBattle, checkFinished } = battleSlice.actions;
export const getCount = (state) => state.battle.count;
export const getCheck = (state) => state.battle.check;
export default battleSlice.reducer;
