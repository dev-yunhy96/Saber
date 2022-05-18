import { Button, List, Pagination, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getAllCommunity } from "../../features/community/communitySlice";
import { getUser } from "../../features/user/userSlice";
import Article from "./Article";
const BoardList = ({ title }) => {
  const board = useSelector(getAllCommunity);
  const user = useSelector(getUser);
  const navigate = useNavigate();
  const isEmptyObj = (obj) => {
    if (obj.constructor === Object && Object.keys(obj).length === 0) {
      return true;
    }
    return false;
  };
  console.log(board);
  let lenderBoard = "";
  lenderBoard = !!board.communityGetResponselist ? (
    board.communityGetResponselist.map((article, index) => (
      <Article key={index} data={article} />
    ))
  ) : (
    <div>
      <h3>게시판 글이 없습니다.</h3>
    </div>
  );
  const handlePost = (e) => {
    e.preventDefault();
    if (isEmptyObj(user)) {
      Swal.fire("비회원!!", "로그인이 필요한 기능입니다.", "error");
      navigate("/login");
      return;
    }
    navigate("/community/write");
  };
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 400,
        bgcolor: "background.paper",
        borderRadius: 5,
        boxShadow: 1,
        m: 2,
      }}
    >
      <Typography align="center" variant="h4" component="div">
        {title}
      </Typography>

      {lenderBoard}
      <Box m={1} display="flex" justifyContent="flex-end" alignItems="flex-end">
        <Button variant="contained" onClick={handlePost}>
          글등록
        </Button>
      </Box>
      <Pagination
        sx={{ display: "flex", justifyContent: "center" }}
        count={11}
        defaultPage={6}
        siblingCount={0}
        boundaryCount={2}
      />
    </List>
  );
};

export default BoardList;
