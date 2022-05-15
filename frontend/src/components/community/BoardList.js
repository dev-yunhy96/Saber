import { List, Pagination, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { getAllCommunity } from "../../features/community/communitySlice";
import Article from "./Article";
const BoardList = ({ title }) => {
  const board = useSelector(getAllCommunity);
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
