import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

const battleSlice = createSlice({
  name: "battle",
  initialState,
  reducers: {
    countBattle: (state) => {
      state.count = state.count + 1;
    },
  },
});

export const { countBattle } = battleSlice.actions;
export const getCount = (state) => state.battle.count;
export default battleSlice.reducer;
