import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";

import serverApi from "../../common/api/serverApi";
const Article = (prpos) => {
  const { data } = prpos;
  const userNickname = data.userNickname;
  const dispatch = useDispatch();
  const defaultImg = `${process.env.PUBLIC_URL}/images/character/00b6ba1b9d74bd6e9d8dc8f75288ed2419c68b466953b87ce4c22430f761bbcb.png`;
  const [img, setImg] = useState(defaultImg);
  useEffect(() => {
    async function a() {
      const response = await serverApi.get(`match/list/${userNickname}`);
      const sortedMatches = response.data.slice().sort(function (a, b) {
        if (a.match.startTime < b.match.startTime) return 1;
        else return -1;
      });
      if (sortedMatches.length > 0) {
        setImg(
          `${process.env.PUBLIC_URL}/images/character/${sortedMatches[0].characterType}.png`
        );
      }
    }
    a();
  }, [dispatch, userNickname]);
  return (
    <Link to={`${data.communityId}`}>
      <Box
        sx={{
          bgcolor: "background.paper",
          boxShadow: 1,
          borderRadius: 2,
          m: 2,
          minWidth: 300,
        }}
      >
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="이미지" src={img} />
          </ListItemAvatar>
          <ListItemText
            primary={data.title}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {data.content}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      </Box>
    </Link>
  );
};

export default Article;
