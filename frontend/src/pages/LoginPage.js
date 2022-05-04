import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LoginIcon from "@mui/icons-material/Login";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../features/user/userSlice";
import { store } from "../features/store";
import validate from "../components/Validate";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import NaverLogin from "../components/NaverLogin";
import { fetchAsyncLogin } from "../features/user/userSlice";

export default function LoginPage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const theme = createTheme();

  const [user, setUser] = useState(store.getState());
  //const [data, setData] = useState(null);
  //const [errors, setErrors] = useState({});
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  // async function loginUser(credentials) {
  //   const url = "https://www.mecallapi.com/api/login";
  //   const headers = { "Content-type": "application/json" };
  //   const data = {
  //     username: credentials.email,
  //     password: credentials.password,
  //   };
  //   return axios.post(url, data, { headers }).then((res) => res.data);
  // }
  //karn.yong@mecallapi.com
  //mecallapi

  const handleSubmit = async (event) => {
    setSubmitting(true);
    event.preventDefault();
    await dispatch(fetchAsyncLogin({ email, password }));
    console.log(store.getState());
    setUser((user) => (user = store.getState()));
    setEmail("");
    setPassword("");
    // setErrors(validate({ email: email, password: password }));

    // const response = await loginUser({ email, password });

    // if (response) {
    //   Swal.fire("로그인 성공", {
    //     buttons: false,
    //     timer: 2000,
    //   }).then(() => {
    //     // Vue store도 localstore ->
    //     localStorage.setItem("token", response.accessToken);
    //     axios.defaults.headers.common["Authorization"] =
    //       "Bearer " + response.jwt_token;
    //     setData(response);
    //     navigate("/");
    //   });
    // } else {
    //   Swal.fire("이메일, 비밀번호를 다시 확인해주세요");
    //   console.log("에러");
    //   console.log("respnose ", response.status);
    // }
  };

  // useEffect(() => {
  //   if (submitting) {
  //     if (Object.keys(errors).length === 0) {
  //     }
  //     setSubmitting(false);
  //     console.log("useEffect", data);
  //   }
  // }, [errors]);
  useEffect(() => {
    console.log("useEffect", user.user.user);
    if (Object.keys(user.user.user).length !== 0) {
      Swal.fire("로그인 성공", {
        buttons: false,
        timer: 2000,
      }).then(() => {
        console.log(user.user);

        navigate("/");
      });
    }
  }, [user]);
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
          <Avatar sx={{ m: 1, bgcolor: "success.light" }}>
            <LoginIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
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
              label="Email Address"
              name={email}
              autoComplete="email"
              autoFocus
              onChange={onEmailHandler}
            />
            {/* {errors.email && (
              <span className="errorMessage">{errors.email}</span>
            )} */}
            <TextField
              margin="normal"
              required
              fullWidth
              name={password}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onPasswordHandler}
            />
            {/* {errors.password && (
              <span className="errorMessage">{errors.password}</span>
            )} */}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={submitting}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body1">
                  비밀번호 찾기
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body1">
                  회원가입
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <NaverLogin></NaverLogin>
      </Container>
    </ThemeProvider>
  );
}
