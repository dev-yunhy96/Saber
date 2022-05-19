import React, { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import serverApi from "../../../common/api/serverApi";

const BattleRecord = ({ userNick }) => {
  const [record, setRecord] = useState({});
  const getRecord = () => {
    serverApi
      .get(`battle/battleRecord/${userNick}`)
      .then((response) => {
        setRecord(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getRecord();
  }, []);

  return (
    <Skeleton
      sx={{
        bgcolor: "#00FFFF",
        display: "flex",
        fontSize: 24,
        color: "#8A2BE2",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
      }}
      variant="rectangular"
      height={60}
    >
      {userNick} 배틀 전적 {record.total}전 {record.win}승 {record.lose}패
    </Skeleton>
  );
};

export default BattleRecord;
