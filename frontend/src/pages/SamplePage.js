import * as React from "react";
import Box from "@mui/material/Box";
import Board from "../components/Board";
export default function SamplePage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "75vh",
      }}
    >
      <Board title={"1대1 배틀"} />
      <Board title={"자유게시판"} />
    </Box>
  );
}
