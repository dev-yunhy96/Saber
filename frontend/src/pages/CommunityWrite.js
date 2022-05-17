import React, { useState } from "react";
import Container from "../components/Container";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAsyncCommunityPost } from "../features/community/communitySlice";
import Swal from "sweetalert2";

const CommunityWrite = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handlePost = (e) => {
    e.preventDefault();
    if (title !== "" && content !== "") {
      let data = {
        title: title,
        content: content,
      }; // const reponse = await fetch();
      dispatch(fetchAsyncCommunityPost(data))
        .unwrap()
        .then((res) => {
          navigate("/community");
        })
        .catch((error) => {
          console.log(error);
          Swal.fire(
            "글 등록 실패",
            "글을 등록하는데 실패했습니다. 나중에 다시 시도해주세요",
            "error"
          );
        });
    } else {
      Swal.fire(
        "필수 항목 미기입",
        "제목, 내용을 작성하셨는지 확인해주세요.",
        "error"
      );
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    navigate("/community");
  };
  return (
    <Container>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          maxWidth: 720,
          bgcolor: "background.paper",
          borderRadius: 5,
          border: 1,
          borderColor: "grey.500",
          boxShadow: 1,
          p: 3,
          mx: "auto",
          my: 6,
          minHeight: "50vh",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                textAlign: "center",
                borderRadius: 3,
                border: 1,
                borderColor: "grey.500",
                m: 1,
                p: 1,
                width: 70,
              }}
            >
              Title
            </Box>
            <TextField
              sx={{
                width: 500,
              }}
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              m: 3,
            }}
          >
            <Box
              sx={{
                textAlign: "center",
                borderRadius: 3,
                border: 1,
                borderColor: "grey.500",
                m: 1,
                p: 1,
                width: 70,
              }}
            >
              Content
            </Box>
            <TextField
              sx={{
                width: 500,
              }}
              multiline={true}
              rows={15}
              variant="outlined"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Box>
          <Box
            sx={{
              "& button": { m: 1 },
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button onClick={handlePost} variant="outlined" color="success">
              작성
            </Button>
            <Button onClick={handleBack} variant="outlined" color="error">
              취소
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default CommunityWrite;
