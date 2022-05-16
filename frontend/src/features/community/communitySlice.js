import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serverApi from "../../common/api/serverApi";

//게시판 리스트 조회
export const fetchAsyncCommunityList = createAsyncThunk(
  "community/fetchAsyncCommunityList",
  async () => {
    const url = `/community/list`;
    const headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    const response = await serverApi.get(url, { headers });
    return response.data;
  }
);

//게시판 상세 조회
export const fetchAsyncCommunityDetail = createAsyncThunk(
  "community/fetchAsyncCommunityDetail",
  async (id) => {
    const headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    const url = `/community/${id}`;
    console.log("url :", url);
    const response = await serverApi.get(url, { headers });
    return response.data;
  }
);
//게시판 삭제
export const fetchAsyncCommunityDelete = createAsyncThunk(
  "community/fetchAsyncCommunityDelete",
  async (id) => {
    const headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    const url = `/community/delete/${id}`;
    const data = {};
    const response = await serverApi.put(url, data, { headers });
    return response.data;
  }
);

//게시판 수정
export const fetchAsyncCommunityUpdate = createAsyncThunk(
  "community/fetchAsyncCommunityUpdate",
  async (data) => {
    const headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    const url = `/community`;
    const response = await serverApi.put(url, data, { headers });
    return response.data;
  }
);

const initialState = {
  community: {},
  communityDetail: {},
};

const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {
    boardinit: (state) => {
      state.community.communityDetail = {};
    },
  },
  extraReducers: {
    //게시판 리스트 조회
    [fetchAsyncCommunityList.pending]: () => {
      console.log("Pending");
    },
    [fetchAsyncCommunityList.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully!");
      return { ...state, community: payload };
    },
    [fetchAsyncCommunityList.rejected]: () => {
      console.log("Rejected!");
    },

    //게시판 상세조회
    [fetchAsyncCommunityDetail.pending]: () => {
      console.log("게시판 상세조회 Pending");
    },
    [fetchAsyncCommunityDetail.fulfilled]: (state, { payload }) => {
      console.log("게시판 상세조회 Fetched Successfully!");
      return { ...state, communityDetail: payload };
    },
    [fetchAsyncCommunityDetail.rejected]: () => {
      console.log("게시판 상세조회 Rejected!");
    },

    //게시판 삭제
    [fetchAsyncCommunityDelete.pending]: () => {
      console.log("게시판 삭제 Pending");
    },
    [fetchAsyncCommunityDelete.fulfilled]: (state, { payload }) => {
      console.log("게시판 삭제 Fetched Successfully!");
    },
    [fetchAsyncCommunityDelete.rejected]: () => {
      console.log("게시판 삭제 Rejected!");
    },

    //게시판 수정
    [fetchAsyncCommunityUpdate.pending]: () => {
      console.log("게시판 수정 Pending");
    },
    [fetchAsyncCommunityUpdate.fulfilled]: (state, { payload }) => {
      console.log("게시판 수정 Fetched Successfully!");
    },
    [fetchAsyncCommunityUpdate.rejected]: () => {
      console.log("게시판 수정 Rejected!");
    },
  },
});

// export const {} = userSlice.actions;
export const getAllCommunity = (state) => state.community.community;
export const getCommunityDetail = (state) => state.community.communityDetail;
export const { boardinit } = communitySlice.actions;
export default communitySlice.reducer;
