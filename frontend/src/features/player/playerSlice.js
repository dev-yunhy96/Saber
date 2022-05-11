import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serverApi from "../../common/api/serverApi";

export const fetchAsyncPlayer = createAsyncThunk(
  "user/fetchAsyncPlayer",
  async (keyword) => {
    const response = await serverApi.get(`users?search=${keyword}`);
    return response.data[0];
  }
);

const initialState = {
  player: {},
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {},
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

// export const {} = userSlice.actions;
export const getPlayer = (state) => state.player.player;
export default playerSlice.reducer;
