import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { getUser } from "../../features/user/userSlice";
const ProfileInform = () => {
  const user = useSelector(getUser);
  return (
    <Grid item xs={12} md={6}>
      <Card sx={{ display: "flex" }}>
        <CardContent sx={{ flex: 2 }}>
          <Typography component="h2" variant="h5">
            {user.username}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {user.id}
          </Typography>
          <Typography variant="subtitle1" paragraph>
            {user.description}
          </Typography>
          <Typography variant="body1" color="black">
            Continue reading...
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          sx={{ width: 260, display: { xs: "none", sm: "block" } }}
          image={user.avatar}
          alt="사진"
        />
      </Card>
    </Grid>
  );
};
export default ProfileInform;
