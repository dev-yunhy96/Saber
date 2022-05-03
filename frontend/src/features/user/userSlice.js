import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serverApi from "../../common/api/serverApi";

export const fetchAsyncUsers = createAsyncThunk(
  "user/fetchAsyncUsers",
  async () => {
    const response = await serverApi.get(`/users`);
    return response.data;
  }
);

const initialState = {
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAsyncUsers.pending]: () => {
      console.log("Pending");
    },
    [fetchAsyncUsers.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully!");
      return { user: payload };
    },
    [fetchAsyncUsers.rejected]: () => {
      console.log("Rejected!");
    },
  },
});

// export const {} = userSlice.actions;
export const getAllUser = (state) => state.user.user;
export default userSlice.reducer;
