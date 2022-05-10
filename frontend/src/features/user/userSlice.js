import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serverApi from "../../common/api/serverApi";

export const fetchAsyncUsers = createAsyncThunk(
  "user/fetchAsyncUsers",
  async () => {
    const response = await serverApi.get(`/users`);
    return response.data;
  }
);
export const fetchAsyncLogin = createAsyncThunk(
  "user/fetchAsyncLogin",
  async ({ username, password }) => {
    const url = `/login`;
    const data = {
      username,
      password,
    };
    const headers = { "Content-type": "application/json" };
    const response = await serverApi.post(url, data, { headers });
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

    //로그인
    [fetchAsyncLogin.pending]: () => {
      console.log("로그인중");
    },
    [fetchAsyncLogin.fulfilled]: (state, { payload }) => {
      console.log("로그인 Successfully!");
      return { ...state, user: payload };
    },
    [fetchAsyncLogin.rejected]: () => {
      console.log("로그인 Rejected!");
    },
  },
});

// export const {} = userSlice.actions;
export const getUser = (state) => state.user.user;
export default userSlice.reducer;
