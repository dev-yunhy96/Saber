import React from "react";
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
import { fetchAsyncLogin } from "../features/user/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import validate from "../components/Validate";
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
        navigate("/");
        return response;
      })
      .then((response) => {
        // Vue store도 localstore ->
        localStorage.setItem("token", response.accessToken);
        // axios.defaults.headers.common["Authorization"] =
        //   "Bearer " + response.jwt_token;
        // setData(response);
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
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
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
