import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serverApi from "../../common/api/serverApi";

export const fetchAsyncMatch = createAsyncThunk(
  "user/fetchAsyncMatch",
  async (keyword) => {
    const response = await serverApi.get(`match/detail/${keyword}`);
    return response.data;
  }
);

const initialState = {
  matches: [],
};

const matchSlice = createSlice({
  name: "match",
  initialState,
  reducers: {
    removeSelectedPlayer: (state) => {
      state.matches = [];
    },
  },
  extraReducers: {
    [fetchAsyncMatch.pending]: () => {
      console.log("Pending");
    },
    [fetchAsyncMatch.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully!");
      return { ...state, matches: payload };
    },
    [fetchAsyncMatch.rejected]: () => {
      console.log("Rejected!");
    },
  },
});

export const { removeSelectedMatch } = matchSlice.actions;
export const getDetail = (state) => state;
export default matchSlice.reducer;
