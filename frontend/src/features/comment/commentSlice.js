import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serverApi from "../../common/api/serverApi";

//댓글 등록
export const fetchAsyncCommentPost = createAsyncThunk(
  "comment/fetchAsyncCommentPost",
  async (data) => {
    const url = `/comment`;
    const headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    const response = await serverApi.post(url, data, { headers });
    return response.data;
  }
);
//댓글 리스트 조회
export const fetchAsyncCommentList = createAsyncThunk(
  "comment/fetchAsyncCommentList",
  async (id) => {
    const url = `/comment/list/${id}`;
    const headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    const response = await serverApi.get(url, { headers });
    return response.data;
  }
);

//댓글 상세 조회
export const fetchAsyncCommentDetail = createAsyncThunk(
  "comment/fetchAsyncCommentDetail",
  async (id) => {
    const headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    const url = `/comment/${id}`;
    const response = await serverApi.get(url, { headers });
    return response.data;
  }
);
//댓글 삭제
export const fetchAsyncCommentDelete = createAsyncThunk(
  "comment/fetchAsyncCommentDelete",
  async (id) => {
    const headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    const url = `/comment/delete/${id}`;
    const data = {};
    const response = await serverApi.put(url, data, { headers });
    return response.data;
  }
);

//댓글 수정
export const fetchAsyncCommentUpdate = createAsyncThunk(
  "comment/fetchAsyncCommentUpdate",
  async (data) => {
    const headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    const url = `/comment`;
    const response = await serverApi.put(url, data, { headers });
    return response.data;
  }
);

const initialState = {
  comment: {},
  commentDetail: {},
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    commentinit: (state) => {
      state.comment.comment = {};
    },
  },
  extraReducers: {
    //댓글 등록
    [fetchAsyncCommentPost.pending]: () => {
      console.log("Pending");
    },
    [fetchAsyncCommentPost.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully!");
    },
    [fetchAsyncCommentPost.rejected]: () => {
      console.log("Rejected!");
    },

    //댓글 리스트 조회
    [fetchAsyncCommentList.pending]: () => {
      console.log("Pending");
    },
    [fetchAsyncCommentList.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully!");
      return { ...state, comment: payload };
    },
    [fetchAsyncCommentList.rejected]: () => {
      console.log("Rejected!");
    },

    //댓글 상세조회
    [fetchAsyncCommentDetail.pending]: () => {
      console.log("댓글 상세조회 Pending");
    },
    [fetchAsyncCommentDetail.fulfilled]: (state, { payload }) => {
      console.log("댓글 상세조회 Fetched Successfully!");
      return { ...state, commentDetail: payload };
    },
    [fetchAsyncCommentDetail.rejected]: () => {
      console.log("댓글 상세조회 Rejected!");
    },

    //댓글 삭제
    [fetchAsyncCommentDelete.pending]: () => {
      console.log("댓글 삭제 Pending");
    },
    [fetchAsyncCommentDelete.fulfilled]: (state, { payload }) => {
      console.log("댓글 삭제 Fetched Successfully!");
    },
    [fetchAsyncCommentDelete.rejected]: () => {
      console.log("댓글 삭제 Rejected!");
    },

    //댓글 수정
    [fetchAsyncCommentUpdate.pending]: () => {
      console.log("댓글 수정 Pending");
    },
    [fetchAsyncCommentUpdate.fulfilled]: (state, { payload }) => {
      console.log("댓글 수정 Fetched Successfully!");
    },
    [fetchAsyncCommentUpdate.rejected]: () => {
      console.log("댓글 수정 Rejected!");
    },
  },
});

// export const {} = userSlice.actions;
export const getAllComment = (state) => state.comment.comment;
export const getCommentDetail = (state) => state.comment.commentDetail;
export const { commentinit } = commentSlice.actions;
export default commentSlice.reducer;
