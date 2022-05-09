import * as React from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Pagination from "@mui/material/Pagination";
import Sample from "./Sample";
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
        m: 2,
      }}
    >
      <Typography align="center" variant="h4" component="div">
        {title}
      </Typography>
      {articles.map((article, index) => (
        <>
          <Sample key={index} title={article.title} content={article.content} />
          {index === articles.length - 1 ? (
            ""
          ) : (
            <Divider
              sx={{ borderBottomWidth: 2 }}
              variant="middle"
              component="li"
            />
          )}
        </>
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
