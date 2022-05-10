import * as React from "react";
import List from "@mui/material/List";
import Pagination from "@mui/material/Pagination";
import Article from "./Article";
import Typography from "@mui/material/Typography";

export default function Board({ title }) {
  const articles = [
    { title: "apple", content: "good apple" },
    { title: "banana", content: "good banana" },
    { title: "pineapple", content: "good pineapple" },
    { title: "water", content: "good water" },
    { title: "lemon", content: "good lemon" },
    { title: "mango", content: "good mango" },
    { title: "tomato", content: "good tomato" },
  ];
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
      {articles.map((article, index) => (
        <Article key={index} title={article.title} content={article.content} />
      ))}
      <Pagination
        sx={{ display: "flex", justifyContent: "center" }}
        count={11}
        defaultPage={6}
        siblingCount={0}
        boundaryCount={2}
      />
    </List>
  );
}
