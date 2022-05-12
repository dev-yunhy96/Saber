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
  player: {},
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    removeSelectedPlayer: (state) => {
      state.player = {};
    },
  },
  extraReducers: {
    [fetchAsyncPlayer.pending]: () => {
      console.log("Pending");
    },
    [fetchAsyncPlayer.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully!");
      return { ...state, player: payload };
    },
    [fetchAsyncPlayer.rejected]: () => {
      console.log("Rejected!");
    },
  },
});

export const { removeSelectedPlayer } = playerSlice.actions;
export const getPlayer = (state) => state.player.player;
export default playerSlice.reducer;
