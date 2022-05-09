import { Container } from "@mui/material";
import React from "react";
import image1 from "../assets copy/img/faces/face-3.jpg";
import styles from "./MyPageDemo2.module.css";
const MyPageDemo2 = () => {
  return (
    <Container>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            margin: "18px 0px",
            borderBottom: "1px solid black",
          }}
        >
          <div>
            <img
              style={{ width: "160px", height: "160px", borderRadius: "80px" }}
              src={image1}
              alt="프로필"
            ></img>
          </div>
          <div>
            <h1>프로필 내용</h1>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div>내용</div>
              <div>내용</div>
              <div>내용</div>
              <div>내용</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.gallery}>
        <img
          className={styles.item}
          src={image1}
          alt="밑에 깔리는 이미지"
        ></img>
        <img
          className={styles.item}
          src={image1}
          alt="밑에 깔리는 이미지"
        ></img>
        <img
          className={styles.item}
          src={image1}
          alt="밑에 깔리는 이미지"
        ></img>
        <img
          className={styles.item}
          src={image1}
          alt="밑에 깔리는 이미지"
        ></img>
        <img
          className={styles.item}
          src={image1}
          alt="밑에 깔리는 이미지"
        ></img>
        <img
          className={styles.item}
          src={image1}
          alt="밑에 깔리는 이미지"
        ></img>
      </div>
    </Container>
  );
};

export default MyPageDemo2;
