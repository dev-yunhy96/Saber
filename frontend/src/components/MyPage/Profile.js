import { Card } from "@mui/material";
import React from "react";
import ProfileInform from "./ProfileInform";
import Battle from "./Battle";
const Article = () => {
  return (
    <article>
      <div>
        <h1>프로필 정보</h1>
      </div>
    </article>
  );
};

const Profile = () => {
  return (
    <>
      <Article></Article>
      <ProfileInform></ProfileInform>
      <Card variant="outlined" sx={{ mt: 3 }}>
        <Battle></Battle>
      </Card>
    </>
  );
};

export default Profile;
