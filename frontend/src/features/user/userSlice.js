import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serverApi from "../../common/api/serverApi";
export const fetchAsyncLogin = createAsyncThunk(
  "user/fetchAsyncLogin",
  async ({ username, password }) => {
    const url = `/users/login`;
    const data = {
      email: username,
      password,
    };
    const headers = {
      "Content-type": "application/json",
    };
    const response = await serverApi.post(url, data, { headers });
    return response.data;
  }
);

//회원정보 조회
export const fetchAsyncUserDetail = createAsyncThunk(
  "user/fetchAsyncUserDetail",
  async (token) => {
    const url = `/users/`;
    const headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const response = await serverApi.get(url, { headers });
    return response.data;
  }
);

//회원탈퇴
export const fetchAsyncQuit = createAsyncThunk(
  "user/fetchAsyncQuit",
  async (id) => {
    const headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    const data = {};
    const url = `/users/delete/${id}`;
    const response = await serverApi.put(url, data, { headers });
    return response.data;
  }
);

//비밀번호 변경
export const fetchAsyncPasswordChange = createAsyncThunk(
  "user/fetchAsyncPasswordChange",
  async (data) => {
    const headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    const url = `/users/update`;

    const response = await serverApi.put(url, data, { headers });
    return response.data;
  }
);
const initialState = {
  userInfo: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = {};
      localStorage.removeItem("token");
    },
  },
  extraReducers: {
    //로그인
    [fetchAsyncLogin.pending]: () => {
      console.log("로그인중");
    },
    [fetchAsyncLogin.fulfilled]: (state, { payload }) => {
      console.log("로그인 Successfully!");
      // return { ...state, userInfo: payload };
    },
    [fetchAsyncLogin.rejected]: () => {
      console.log("로그인 Rejected!");
    },

    //정보조회
    [fetchAsyncUserDetail.pending]: () => {
      console.log("정보조회중");
    },
    [fetchAsyncUserDetail.fulfilled]: (state, { payload }) => {
      console.log("정보조회 Successfully!");
      return { ...state, userInfo: payload };
    },
    [fetchAsyncUserDetail.rejected]: () => {
      console.log("정보조회 Rejected!");
    },

    //회원삭제
    [fetchAsyncQuit.pending]: () => {
      console.log("회원삭제중");
    },
    [fetchAsyncQuit.fulfilled]: (state, { payload }) => {
      console.log("회원삭제 Successfully!");
    },
    [fetchAsyncQuit.rejected]: () => {
      console.log("회원삭제 Rejected!");
    },
    //비밀번호 변경
    [fetchAsyncPasswordChange.pending]: () => {
      console.log("비밀번호 변경중");
    },
    [fetchAsyncPasswordChange.fulfilled]: (state, { payload }) => {
      console.log("비밀번호 변경 Successfully!");
    },
    [fetchAsyncPasswordChange.rejected]: () => {
      console.log("비밀번호 변경 실패 Rejected!");
    },
  },
});

export const { logout } = userSlice.actions;
export const getUser = (state) => state.user.userInfo;
export default userSlice.reducer;
