import React from "react";
//material ui
import Container from "../components/Container";
import { Paper } from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ChangePassword from "../components/MyPage/ChangePassword";
import Quit from "../components/MyPage/Quit";
import BattleManagement from "../components/MyPage/BattleManagement/BattleManagement";
import { useSelector } from "react-redux";
import { getUser } from "../features/user/userSlice";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const MyPage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const user = useSelector(getUser);
  console.log(user);
  return (
    <>
      <Container>
        <Paper style={{ margin: "18px auto" }}>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="배틀 관리" {...a11yProps(0)} />
                <Tab label="비밀번호 변경" {...a11yProps(1)} />
                <Tab label="회원 탈퇴" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <BattleManagement user={user}></BattleManagement>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <ChangePassword></ChangePassword>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Quit></Quit>
            </TabPanel>
          </Box>
        </Paper>
      </Container>
    </>
  );
};
export default MyPage;
