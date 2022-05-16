import * as React from "react";
import { Link } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Article = (prpos) => {
  const { data } = prpos;
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
            <Avatar alt="이미지" src="/static/images/avatar/1.jpg" />
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
