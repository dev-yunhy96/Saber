import { Button, List, Pagination, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getAllCommunity } from "../../features/community/communitySlice";
import { getUser } from "../../features/user/userSlice";
import usePagination from "../usePagination";
import Article from "./Article";

const BoardList = ({ title }) => {
  const board = useSelector(getAllCommunity);
  const user = useSelector(getUser);
  const navigate = useNavigate();
  const PER_PAGE = 7;
  let [page, setPage] = useState(1);
  const [all, setAll] = useState(1);
  const [count, setCount] = useState(1);
  let _DATA = usePagination(
    !!board.communityGetResponselist ? board.communityGetResponselist : [],
    PER_PAGE
  );
  useEffect(() => {
    if (!!board.communityGetResponselist) {
      setAll(board.communityGetResponselist.length);
      setCount(Math.ceil(all / PER_PAGE));
    } else {
      return;
    }
  }, [board, all, count]);

  const isEmptyObj = (obj) => {
    if (obj.constructor === Object && Object.keys(obj).length === 0) {
      return true;
    }
    return false;
  };

  // let lenderBoard = "";
  // lenderBoard = !!board.communityGetResponselist ? (
  //   board.communityGetResponselist.map((article, index) => (
  //     <Article key={index} data={article} />
  //   ))
  // ) : (
  //   <div>
  //     <h3>게시판 글이 없습니다.</h3>
  //   </div>
  // );
  let lenderBoard2 = "";
  lenderBoard2 = !!board.communityGetResponselist ? (
    _DATA
      .currentData()
      .map((article, index) => <Article key={index} data={article} />)
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

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 780,
        bgcolor: "background.paper",
        borderRadius: 5,
        boxShadow: 1,
        m: 2,
      }}
    >
      <Typography align="center" variant="h4" component="div">
        {title}
      </Typography>

      {/* {lenderBoard} */}
      {lenderBoard2}
      <Box m={3} display="flex" justifyContent="flex-end" alignItems="flex-end">
        <Button variant="contained" onClick={handlePost}>
          글등록
        </Button>
      </Box>
      <Pagination
        sx={{ display: "flex", justifyContent: "center" }}
        count={count}
        size="large"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
        color="primary"
      />
    </List>
  );
};

export default BoardList;
