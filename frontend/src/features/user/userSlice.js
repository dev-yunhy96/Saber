import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serverApi from "../../common/api/serverApi";

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
  userInfo: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    //로그인
    [fetchAsyncLogin.pending]: () => {
      console.log("로그인중");
    },
    [fetchAsyncLogin.fulfilled]: (state, { payload }) => {
      console.log("로그인 Successfully!");
      return { ...state, userInfo: payload };
    },
    [fetchAsyncLogin.rejected]: () => {
      console.log("로그인 Rejected!");
    },
  },
});

// export const {} = userSlice.actions;
export const getUser = (state) => state.user.userInfo;
export default userSlice.reducer;
