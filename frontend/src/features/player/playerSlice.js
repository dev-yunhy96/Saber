import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serverApi from "../../common/api/serverApi";

export const fetchAsyncPlayer = createAsyncThunk(
  "user/fetchAsyncPlayer",
  async (keyword) => {
    const response = await serverApi.get(`match/list/${keyword}`);
    return response.data;
  }
);

const initialState = {
  matches: [],
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    removeSelectedPlayer: (state) => {
      state.matches = [];
    },
  },
  extraReducers: {
    [fetchAsyncPlayer.pending]: () => {
      console.log("Pending");
    },
    [fetchAsyncPlayer.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully!");
      return { ...state, matches: payload };
    },
    [fetchAsyncPlayer.rejected]: () => {
      console.log("Rejected!");
    },
  },
});

export const { removeSelectedPlayer } = playerSlice.actions;
export const getPlayer = (state) => state.player.matches;
export default playerSlice.reducer;
