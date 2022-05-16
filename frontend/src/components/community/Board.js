import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAsyncCommunityList } from "../../features/community/communitySlice";
import BoardList from "./BoardList";

export default function Board({ title }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAsyncCommunityList());
  }, [dispatch]);
  return <BoardList title={title}></BoardList>;
}
