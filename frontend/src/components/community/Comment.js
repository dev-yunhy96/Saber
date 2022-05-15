import { Button, Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchAsyncCommentDelete,
  fetchAsyncCommentList,
  fetchAsyncCommentPost,
} from "../../features/comment/commentSlice";

const Comment = (props) => {
  const [value, setValue] = useState();
  //   const [commentList, setCommentList] = useState([]);
  const commentList = useSelector((state) => state.comment.comment);
  console.log("commentList", commentList);
  const dispatch = useDispatch();
  const { communityId } = props;
  useEffect(() => {
    dispatch(fetchAsyncCommentList(communityId));
  }, [dispatch, communityId]);
  const getValue = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setValue(e.target.value);
  };
  const addComment = (e) => {
    e.preventDefault();
    const data = {
      communityId,
      content: value,
    };
    dispatch(fetchAsyncCommentPost(data))
      .unwrap()
      .then((res) => {
        dispatch(fetchAsyncCommentList(communityId));
      })
      .catch();
    console.log(e.target.value);
    // setCommentList([...commentList, value]);
    setValue("");
  };
  const addCommEnter = (e) => {
    if (e.key === "Enter") {
      addComment();
    }
  };

  const deleteHandler = (e) => {
    console.log(e.target.getAttribute("commentId"));
    dispatch(fetchAsyncCommentDelete(e.target.getAttribute("commentId")))
      .unwrap()
      .then((res) => {
        dispatch(fetchAsyncCommentList(communityId));
      })
      .catch();
  };
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={getValue}
        onKeyPress={addCommEnter}
      />
      <button onClick={addComment}>submit</button>
      <ul>
        <li>hello</li>
        {commentList.commentGetListResponseDto &&
          commentList.commentGetListResponseDto.map((comm, idx) => {
            return (
              <Card key={idx} sx={{ m: 1 }}>
                <li>{comm.userNickname}</li>
                <li>{comm.content}</li>
                <Button commentId={comm.commentId} onClick={deleteHandler}>
                  삭제
                </Button>
              </Card>
            );
          })}
      </ul>
    </div>
  );
};

export default Comment;
