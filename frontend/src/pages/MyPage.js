import React from "react";
//material ui
import Container from "../components/Container";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import image1 from "../assets copy/img/faces/face-3.jpg";
import styles from "./MyPage.modules.css";
import ChangePassword from "../components/MyPage/ChangePassword";
import Quit from "../components/MyPage/Quit";
const Article = () => {
  return (
    <article>
      <div>
        <h2 style={{ marginLeft: "130px" }}>프로필 정보</h2>
      </div>
    </article>
  );
};
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
          <Card sx={{ maxWidth: 345 }}>
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
const ProfileImage = () => {
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <img
          src={image1}
          alt="프로필 사진"
          style={{
            width: "160px",
            height: "160px",
            borderRadius: "80px",
            margin: "auto",
          }}
        />
      </div>
    </>
  );
};
function createData(name, calories) {
  return { name, calories };
}

const rows = [
  createData("이메일", "fsa3806@naver.com"),
  createData("생성일자", "create date"),
  createData("닉네임", "nickname "),
];
const ProfileDescription = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                style={{
                  backgroundColor: "Gainsboro",
                  border: "1px groove Gainsboro",
                }}
              >
                {row.name}
              </TableCell>
              <TableCell component="td" align="left" colSpan={2}>
                {row.calories}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

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

//프로필 정보
const Test = () => {
  return (
    <Grid container>
      <Grid item xs={4}>
        <ProfileImage></ProfileImage>
      </Grid>
      <Grid item xs={8}>
        <ProfileDescription></ProfileDescription>
      </Grid>
    </Grid>
  );
};

const MyPage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
                <Tab label="개인정보 관리" {...a11yProps(0)} />
                <Tab label="비밀번호 변경" {...a11yProps(1)} />
                <Tab label="회원 탈퇴" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Article></Article>
              <Test></Test>
              <BattleArticle></BattleArticle>
              <BattleCard></BattleCard>
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
