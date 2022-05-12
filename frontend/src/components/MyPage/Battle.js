import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";
import styles from "./Profile.modules.css";
import image1 from "../../assets copy/img/faces/face-3.jpg";
const BattleArticle = () => {
  return (
    <article>
      <div>
        <h2 style={{ textAlign: "center" }}>최근 배틀 정보</h2>
      </div>
    </article>
  );
};
function battleData(name, img, desc) {
  return { name, img, desc };
}
const battle = [
  battleData("권도혁", image1, "desc"),
  battleData("권도혁2", image1, "desc"),
  battleData("권도혁3", image1, "desc"),
];
const BattleCard = () => {
  return (
    <Grid container>
      {battle.map((battle) => (
        <Grid item xs={4} key={battle.name} style={{ textAlign: "center" }}>
          <Card sx={{ maxWidth: 245, mb: 2 }}>
            <div className={styles.gallery}>
              <CardMedia
                component="img"
                height="200px"
                image={battle.img}
                alt="밑에 깔리는 이미지"
                style={{ width: "100%", objectFit: "fill" }}
              />

              {/* <img
                className={styles.item}
                src={battle.img}
                alt="밑에 깔리는 이미지"
              ></img> */}
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {battle.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {battle.desc}
                </Typography>
              </CardContent>
            </div>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

const Battle = () => {
  return (
    <>
      <BattleArticle></BattleArticle>
      <BattleCard></BattleCard>
    </>
  );
};

export default Battle;
