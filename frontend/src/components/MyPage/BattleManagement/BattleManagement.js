import React from "react";
import BattleReceiveList from "./BattleReceiveList";
import BattleSendList from "./BattleSendList";
import BattleStartedList from "./BattleStartedList";
import BattleCheckedList from "./BattleCheckedList";
import Grid from "@mui/material/Grid";
import Container from "../../Container";

const BattleManagement = ({ user }) => {
  return (
    <Container>
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item xs={6}>
          <BattleReceiveList userNick={user.nickname} />
        </Grid>
        <Grid item xs={6}>
          <BattleSendList userNick={user.nickname} />
        </Grid>
        <Grid item xs={6}>
          <BattleStartedList userNick={user.nickname} />
        </Grid>
        <Grid item xs={6}>
          <BattleCheckedList userNick={user.nickname} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default BattleManagement;
