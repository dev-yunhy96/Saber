import React, { useState, useEffect } from "react";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchAsyncCommunityDetail,
  fetchAsyncCommunityUpdate,
} from "../../features/community/communitySlice";
import { useDispatch } from "react-redux";
import styles from "./BoardUpdate.modules.css";
import { Container } from "@mui/material";
import Swal from "sweetalert2";

function BoardUpdate(props) {
  const [title, setTitle] = useState("");
  const [userNickname, setuserNickname] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const { communityId } = useParams();
  const navigate = useNavigate();

  const postUpdate = () => {
    try {
      if (title !== "" && content !== "") {
        let data = {
          communityId: communityId,
          title: title,
          content: content,
        }; // const reponse = await fetch();
        dispatch(fetchAsyncCommunityUpdate(data))
          .unwrap()
          .then((res) => {
            navigate(`/community/${communityId}`);
          })
          .catch((error) => {
            Swal.fire("게시글 수정 실패!", "업데이트 에러.", "error");
          });
      } else {
        Swal.fire(
          "게시글 수정 실패!",
          "제목과 내용이 비어있습니다. 확인해주세요.",
          "error"
        );
        alert("모든 칸을 작성해야합니다!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    try {
      dispatch(fetchAsyncCommunityDetail(communityId))
        .unwrap()
        .then((data) => {
          setTitle(data.title);
          setuserNickname(data.userNickname);
          setContent(data.content);
        });
    } catch (e) {
      console.log(e);
    }
  }, [communityId, dispatch]);

  const TitleOnchange = (e) => {
    setTitle(e.currentTarget.value);
  };

  const ContentOnchange = (e) => {
    setContent(e.currentTarget.value);
  };

  return (
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
            value={title}
            onChange={TitleOnchange}
          />
        </Grid>
        <Grid item xs={10}>
          <TextField
            className="textField"
            id="author"
            name="author"
            label="Author"
            variant="outlined"
            value={userNickname}
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
            value={content}
            onChange={ContentOnchange}
          />
        </Grid>
        <Grid item xs={10}>
          <Link href={`/community/${communityId}`}>
            <Button variant="outlined">수정취소</Button>
          </Link>
          <Button
            className={styles.button}
            variant="outlined"
            onClick={postUpdate}
          >
            전송하기
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
export default BoardUpdate;
