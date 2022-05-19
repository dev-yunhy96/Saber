import React from "react";
import BattleReceiveList from "./BattleReceiveList";
import BattleSendList from "./BattleSendList";
import BattleStartedList from "./BattleStartedList";
import BattleCheckedList from "./BattleCheckedList";
import BattleRecord from "./BattleRecord";
import Grid from "@mui/material/Grid";

const BattleManagement = ({ user }) => {
  return (
    <Grid container rowSpacing={2} columnSpacing={2}>
      <Grid sx={{ display: "flex", justifyContent: "center" }} item xs={12}>
        <BattleRecord userNick={user.nickname} />
      </Grid>
      <Grid sx={{ marginBottom: 5 }} item xs={6}>
        <BattleReceiveList userNick={user.nickname} />
      </Grid>
      <Grid sx={{ marginBottom: 5 }} item xs={6}>
        <BattleSendList userNick={user.nickname} />
      </Grid>
      <Grid sx={{ marginBottom: 5 }} item xs={6}>
        <BattleStartedList userNick={user.nickname} />
      </Grid>
      <Grid sx={{ marginBottom: 5 }} item xs={6}>
        <BattleCheckedList userNick={user.nickname} />
      </Grid>
    </Grid>
  );
};

export default BattleManagement;
