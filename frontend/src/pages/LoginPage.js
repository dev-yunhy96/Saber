import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import {
  fetchAsyncLogin,
  fetchAsyncUserDetail,
} from "../features/user/userSlice";

import Swal from "sweetalert2";
import NaverLogin from "../components/NaverLogin";

export default function LoginPage() {
  const theme = createTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user_data = {
      username: data.get("email"),
      password: data.get("password"),
    };
    dispatch(fetchAsyncLogin(user_data))
      .unwrap()
      .then((response) => {
        Swal.fire("로그인 성공", {
          buttons: false,
          timer: 2000,
        });

        return response;
      })
      .then((response) => {
        console.log(response);
        // Vue store도 localstore ->
        // axios.defaults.headers.common["Authorization"] =
        //   "Bearer " + response.jwt_token;
        // setData(response);
        dispatch(fetchAsyncUserDetail(response.token));
        localStorage.setItem("token", response.token);
      })
      .then((response) => {
        navigate("/");
      })
      .catch((err) => {
        Swal.fire("이메일, 비밀번호를 다시 확인해주세요");
      });

    // setErrors(validate({ email: email, password: password }));
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
            src="https://mblogthumb-phinf.pstatic.net/20160127_218/newiwep_1453882353807zsN3O_JPEG/1404457644_thumb.jpg?type=w800"
            sx={{
              m: 1,
              width: 48,
              height: 48,
              border: 1,
              borderColor: "secondary.main",
            }}
          ></Avatar>
          <Typography sx={{ fontWeight: 600 }} component="div" variant="h5">
            로그인
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="이메일"
              name="email"
              autoComplete="email"
              autoFocus
            />
            {/* {errors.email && (
              <span className="errorMessage">{errors.email}</span>
            )} */}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="비밀번호"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* {errors.password && (
              <span className="errorMessage">{errors.password}</span>
            )} */}
            <FormControlLabel
              style={{ marginTop: 10 }}
              control={<Checkbox value="remember" color="primary" />}
              label="로그인 유지하기"
            />
            <Button
              type="submit"
              fullWidth
              style={{ height: 45 }}
              variant="contained"
              sx={{ mt: 2, mb: 2, fontSize: 20, fontWeight: 600 }}
            >
              로그인
            </Button>
            <Grid container spacing={0} alignItems="center">
              <Grid item xs>
                <NaverLogin />
              </Grid>
              <Grid item>
                <Link
                  component="button"
                  onClick={() => {
                    navigate("/signup");
                  }}
                  variant="h6"
                >
                  회원가입
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
