import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { blue } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import serverApi from "../common/api/serverApi";
import Swal from "sweetalert2";

const theme = createTheme();

export default function SignUp() {
  const [userNick, setUserNick] = useState("");
  const [userCheck, setUserCheck] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("password") !== data.get("passwordConfirm")) {
      Swal.fire("비밀번호를 확인해주세요");
    } else {
      serverApi
        .post(`users/signup`, {
          email: data.get("email"),
          nickname: data.get("userNick"),
          password: data.get("password"),
        })
        .then((res) => {
          console.log(res);
          navigate("/login");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const nickCheck = () => {
    console.log(userNick);
    // serverApi
    //   .post("users/check", {
    //     //true 또는 false 값을 백엔드에서 리턴받음
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     setUserCheck(true);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            alt="Dio"
            src="https://image.msscdn.net/special/slowacid3/item3-1.png"
            sx={{
              m: 1,
              width: 48,
              height: 48,
              bgcolor: blue[500],
              borderColor: "primary.main",
            }}
          />
          <Typography sx={{ fontWeight: 600 }} component="div" variant="h5">
            회원가입
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="이메일"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  required
                  fullWidth
                  name="userNick"
                  label="닉네임"
                  id="userNick"
                  autoComplete="new-userNick"
                  onChange={(e) => setUserNick(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  fullWidth
                  color="secondary"
                  style={{ height: 45 }}
                  variant="contained"
                  sx={{ fontSize: 20, fontWeight: 600 }}
                  onClick={nickCheck}
                >
                  체크
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="비밀번호"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="passwordConfirm"
                  label="비밀번호 확인"
                  type="password"
                  id="passwordConfirm"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              style={{ height: 45 }}
              variant="contained"
              sx={{ mt: 3, mb: 2, fontSize: 20, fontWeight: 600 }}
            >
              회원가입
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  component="button"
                  onClick={() => {
                    navigate("/login");
                  }}
                  variant="h6"
                >
                  계정이 있으신가요? 로그인으로
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
