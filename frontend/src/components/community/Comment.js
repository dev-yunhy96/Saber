import {
  Button,
  Card,
  Menu,
  MenuItem,
  Tooltip,
  IconButton,
  TextField,
  Modal,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncCommentDelete,
  fetchAsyncCommentList,
  fetchAsyncCommentPost,
} from "../../features/comment/commentSlice";
import { Box } from "@mui/system";
import { getUser } from "../../features/user/userSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
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
const Comment = (props) => {
  const [value, setValue] = useState();
  const [battleValue, setBattleValue] = useState();
  //   const [commentList, setCommentList] = useState([]);
  const user = useSelector(getUser);
  const commentList = useSelector((state) => state.comment.comment);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  //댓글에 커뮤니티 아이디 전달
  const { communityId } = props;

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
    console.log(param);
    setBattleValue(param.userNickname);
    setAnchorEl(event.currentTarget);
  };

  //배틀 신청 모달
  const handleSendBattle = (event) => {
    console.log("배틀 신청");
    setModalOpen(true);
    setAnchorEl(null);
  };
  //배틀 신청 데이터 전송
  const handleSendBattle2 = (event) => {
    console.log(user);
    if (isEmptyObj(user)) {
      Swal.fire("비회원!!", "로그인시 가능한 기능입니다.", "error");
      navigate("/login");
      return;
    }
    console.log("배틀 데이터 전송");
    const url = `/battle/send`;
    const headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    const data = {
      receiver: battleValue,
      sender: user.nickname,
    };
    console.log(data);
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
  const handleClose = () => {
    setAnchorEl(null);
  };

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
    if (isEmptyObj(user)) {
      Swal.fire("비회원!!", "로그인시 가능한 기능입니다.", "error");
      navigate("/login");
      return;
    }
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

  const deleteHandler = (param, e) => {
    console.log(param);
    console.log("삭제");
    dispatch(fetchAsyncCommentDelete(param))
      .unwrap()
      .then((res) => {
        dispatch(fetchAsyncCommentList(communityId));
      })
      .catch();
  };
  return (
    <div>
      <TextField
        style={{ marginTop: "30px", marginLeft: "100px", width: "600px" }}
        type="text"
        value={value || ""}
        onChange={getValue}
        onKeyPress={addCommEnter}
      />
      <button
        style={{ marginTop: "30px", height: "52px" }}
        onClick={addComment}
      >
        댓글달기
      </button>
      <div>
        {commentList.commentGetListResponseDto &&
          commentList.commentGetListResponseDto.map((comm, idx) => {
            return (
              <Card key={idx} sx={{ m: 2 }} style={{ marginLeft: "60px" }}>
                <div style={{ float: "left", width: "600px" }}>
                  <Button
                    style={{ marginLeft: "10px", marginBottom: "0px" }}
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={(e) => {
                      handleClick(e, comm);
                    }}
                  >
                    <p>{comm.userNickname}</p>
                  </Button>
                  <p
                    style={{
                      marginLeft: "20px",
                      marginTop: "0px",
                      wordWrap: "break-word",
                    }}
                  >
                    {comm.content}
                  </p>
                </div>
                <div style={{ float: "right", marginTop: "10px" }}>
                  {comm.userId !== user.id ? (
                    <></>
                  ) : (
                    <Tooltip title="Delete" placement="right">
                      <IconButton
                        onClick={(e) => {
                          deleteHandler(comm.commentId, e);
                        }}
                      >
                        <DeleteIcon sx={{ fontSize: 40 }} />
                      </IconButton>
                    </Tooltip>
                  )}
                </div>
              </Card>
            );
          })}
      </div>
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

export default Comment;
