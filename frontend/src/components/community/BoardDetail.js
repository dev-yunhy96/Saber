import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  boardinit,
  fetchAsyncCommunityDelete,
  fetchAsyncCommunityDetail,
  getCommunityDetail,
} from "../../features/community/communitySlice";
import Swal from "sweetalert2";
import { Button, Container, Grid, Link, TextField } from "@mui/material";
import Comment from "./Comment";
import { fetchAsyncCommentList } from "../../features/comment/commentSlice";
const BoardDetail = () => {
  const { communityId } = useParams();
  const dispatch = useDispatch();
  const data = useSelector(getCommunityDetail);
  const navigate = useNavigate();
  console.log("commnuity detail : ", communityId);
  useEffect(() => {
    dispatch(fetchAsyncCommunityDetail(communityId));
    dispatch(fetchAsyncCommentList(communityId));
    return () => {
      dispatch(boardinit());
    };
  }, [dispatch, communityId]);
  const updateHandler = (event) => {
    event.preventDefault();
    navigate(`/community/update/${communityId}`);
  };
  const deleteHandler = (event) => {
    event.preventDefault();
    dispatch(fetchAsyncCommunityDelete(communityId))
      .unwrap()
      .then((result) => {
        Swal.fire("삭제 성공!", "게시글을 성공적으로 지웠습니다.", "success");
        navigate("/community");
      })
      .catch((error) => {
        console.error(error);
        Swal.fire("삭제 실패!", "이미 존재하지 않는 게시판입니다.!", "error");
        navigate("/community");
      });
  };

  const backHandler = (event) => {
    event.preventDefault();
    navigate("/community");
  };
  return (
    <div className="movie-section">
      {Object.keys(data).length === 0 ? (
        <div>...Loading</div>
      ) : (
        <>
          <Container>
            <Grid
              container
              justifyContent="center"
              spacing={3}
              sx={{ margin: "10px auto" }}
            >
              <Grid item xs={10}>
                <TextField
                  className="textField"
                  id="title"
                  name="title"
                  label="Title"
                  variant="outlined"
                  value={data.title}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  className="textField"
                  id="author"
                  name="author"
                  label="Author"
                  variant="outlined"
                  value={data.userNickname}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  className="textField"
                  id="content"
                  name="content"
                  label="Content"
                  multiline
                  rows={15}
                  variant="outlined"
                  value={data.content}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={10}>
                <Button variant="outlined" onClick={backHandler}>
                  뒤로
                </Button>
                <Button
                  className="Button"
                  variant="outlined"
                  onClick={deleteHandler}
                >
                  삭제
                </Button>
                <Button
                  className="Button"
                  variant="outlined"
                  onClick={updateHandler}
                >
                  수정
                </Button>
              </Grid>
            </Grid>

            <Comment communityId={communityId}></Comment>
          </Container>
        </>
      )}
    </div>
  );
};
export default BoardDetail;
