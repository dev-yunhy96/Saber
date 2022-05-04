import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userapi from "../../api/userapi";
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
  async ({ email, password }) => {
    const url = `/api/login`;
    const data = {
      username: email,
      password: password,
    };
    const headers = { "Content-type": "application/json" };
    const response = await userapi.post(url, data, { headers });
    console.log(response.data);
    return response.data;
  }
);

const initialState = {
  test: ["a", "b"],
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
      console.log("data :");
      return { ...state, user: payload };
    },
    [fetchAsyncLogin.rejected]: () => {
      console.log("로그인 Rejected!");
    },
  },
});

// export const {} = userSlice.actions;
export const getAllUser = (state) => state.user.user;
export default userSlice.reducer;
