import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  boardinit,
  fetchAsyncCommunityDelete,
  fetchAsyncCommunityDetail,
  getCommunityDetail,
} from "../../features/community/communitySlice";
import Swal from "sweetalert2";
import {
  Box,
  Button,
  Grid,
  Menu,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import Comment from "./Comment";
import { fetchAsyncCommentList } from "../../features/comment/commentSlice";
import Container from "../Container";
import { getUser } from "../../features/user/userSlice";
import serverApi from "../../common/api/serverApi";
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const BoardDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { communityId } = useParams();
  const user = useSelector(getUser);
  const data = useSelector(getCommunityDetail);
  const [battleValue, setBattleValue] = useState();
  //리스트 열기 변수
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  //모달 변수
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleModalClose = () => setModalOpen(false);
  const isEmptyObj = (obj) => {
    if (obj.constructor === Object && Object.keys(obj).length === 0) {
      return true;
    }
    return false;
  };

  //리스트 열기
  const handleClick = (event, param) => {
    // setBattleValue()
    setBattleValue(param);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //배틀 신청 모달
  const handleSendBattle = (event) => {
    setModalOpen(true);
    setAnchorEl(null);
  };
  //배틀 신청 데이터 전송
  const handleSendBattle2 = (event) => {
    if (isEmptyObj(user)) {
      Swal.fire("비회원!!", "로그인시 가능한 기능입니다.", "error");
      navigate("/login");
      return;
    }
    const url = `/battle/send`;
    const headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    const data = {
      receiver: battleValue,
      sender: user.nickname,
    };
    serverApi
      .post(url, data, { headers })
      .then((res) => {
        if (res.data === 200) {
          setModalOpen(false);
          Swal.fire(
            "배틀 신청!",
            `${battleValue}님에게 대결을 신청하셨습니다.`,
            "success"
          );
        } else if (res.data === 500) {
          setModalOpen(false);
          Swal.fire("배틀 중복 신청!", "이미 배틀을 신청하셨습니다!", "error");
        }
      })
      .catch((error) => {
        console.error(error);
        setModalOpen(false);
        Swal.fire("배틀 중복 신청!", "이미 배틀을 신청하셨습니다!", "error");
      });
  };
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
                  onClick={(e) => {
                    handleClick(e, data.userNickname);
                  }}
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
                {data.userId !== user.id ? (
                  <></>
                ) : (
                  <>
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
                  </>
                )}
              </Grid>
            </Grid>

            <Comment communityId={communityId}></Comment>
          </Container>
        </>
      )}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleSendBattle}>배틀신청</MenuItem>
      </Menu>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h1"
            align="center"
          >
            배틀신청
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="error"
              style={{ float: "left" }}
              onClick={handleModalClose}
            >
              취소
            </Button>
            <Button
              variant="contained"
              style={{ float: "right" }}
              onClick={handleSendBattle2}
            >
              신청
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
export default BoardDetail;
