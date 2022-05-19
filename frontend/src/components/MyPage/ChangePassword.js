import React, { useState } from "react";
import styles from "./ChangePassword.module.css";
import Container from "../Container";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

//알림창
import Swal from "sweetalert2";

//mui
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import ButtonUnstyled from "@mui/base/ButtonUnstyled";
import InputUnstyled, { inputUnstyledClasses } from "@mui/base/InputUnstyled";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { styled } from "@mui/system";
import { Button } from "@mui/material";
import { fetchAsyncPasswordChange } from "../../features/user/userSlice";

const blue = {
  100: "#DAECFF",
  200: "#80BFFF",
  400: "#3399FF",
  600: "#0072E5",
};

const grey = {
  50: "#F3F6F9",
  100: "#E7EBF0",
  200: "#E0E3E7",
  300: "#CDD2D7",
  400: "#B2BAC2",
  500: "#A0AAB4",
  600: "#6F7E8C",
  700: "#3E5060",
  800: "#2D3843",
  900: "#1A2027",
};

const StyledInputRoot = styled("div")(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  display: flex;
  font-weight: 500;
  border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[300]};
  border-radius: 8px;
  background: ${theme.palette.mode === "dark" ? grey[900] : grey[50]};
  align-items: center;
  justify-content: center;

  &.${inputUnstyledClasses.focused} {
    outline: 3px solid ${theme.palette.mode === "dark" ? blue[600] : blue[100]};
  }

  &:hover {
    background: ${theme.palette.mode === "dark" ? "" : grey[100]};
    border-color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
  }
`
);

const StyledInputElement = styled("input")(
  ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  flex-grow: 1;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 12px 12px;
  outline: 0;
`
);

const IconButton = styled(ButtonUnstyled)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: inherit;
  cursor: pointer;
`;

const InputAdornment = styled("div")`
  margin: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const CustomInput = React.forwardRef(function CustomInput(props, ref) {
  const { components, ...other } = props;
  return (
    <InputUnstyled
      components={{
        Root: StyledInputRoot,
        Input: StyledInputElement,
        ...components,
      }}
      {...other}
      ref={ref}
    />
  );
});

CustomInput.propTypes = {
  /**
   * The components used for each slot inside the InputBase.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Input: PropTypes.elementType,
    Root: PropTypes.elementType,
    Textarea: PropTypes.elementType,
  }),
};

function ChangePassword() {
  const dispatch = useDispatch();
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const [changePassword, setChangePassword] = React.useState({
    password: "",
    showPassword: false,
  });
  const [confirmPassword, setConfirmPassword] = React.useState({
    password: "",
    showPassword: false,
  });
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleChange2 = (prop) => (event) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!event.target.value || passwordRegex.test(event.target.value))
      setPasswordError(false);
    else setPasswordError(true);
    if (!confirmPassword || event.target.value === confirmPassword)
      setConfirmPasswordError(false);
    else setConfirmPasswordError(true);
    setChangePassword({ ...changePassword, [prop]: event.target.value });
  };
  const handleChange3 = (prop) => (event) => {
    if (changePassword.password === event.target.value)
      setConfirmPasswordError(false);
    else setConfirmPasswordError(true);
    setConfirmPassword({ ...confirmPassword, [prop]: event.target.value });
  };
  const validation = () => {
    if (!changePassword) {
      setPasswordError(true);
    }
    if (!confirmPassword) {
      setConfirmPasswordError(true);
    }

    if (changePassword && confirmPassword) {
      return false;
    } else return true;
  };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleClickShowPassword2 = () => {
    setChangePassword({
      ...changePassword,
      showPassword: !changePassword.showPassword,
    });
  };
  const handleClickShowPassword3 = () => {
    setConfirmPassword({
      ...confirmPassword,
      showPassword: !confirmPassword.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validation()) return;
    const data = new FormData(event.currentTarget);
    const password_data = {
      oldPassword: data.get("currnetPassword"),
      newPassword: data.get("changePassword"),
    };

    dispatch(fetchAsyncPasswordChange(password_data))
      .unwrap()
      .then((response) => {
        Swal.fire(
          "비밀번호 변경 성공!",
          "정상적으로 비밀번호가 변경되었습니다.",
          "success"
        );
      })
      .catch((error) => {
        Swal.fire(
          "비밀번호 변경 실패!",
          "현재 비밀번호가 틀립니다. 다시 입력해주세요",
          "error"
        );
      });
  };

  return (
    <Container>
      <div>
        <h1 className={styles.title}>비밀번호 변경</h1>
        <div className={styles.head}>
          개인정보 보호를 위해 비밀번호를 주기적으로 변경해주세요
        </div>

        <Box
          sx={{ "& > * + *": { mt: 1 } }}
          component="form"
          onSubmit={handleSubmit}
        >
          <h3 className={styles.body}>현재 비밀번호를 입력해주세요</h3>
          <CustomInput
            id="outlined-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            margin="normal"
            endAdornment={
              <InputAdornment>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="start"
                  name="currnetPassword"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <h3 className={styles.body}>사용하실 비밀번호를 입력해주세요</h3>
          <CustomInput
            id="outlined-adornment-password"
            type={changePassword.showPassword ? "text" : "password"}
            value={changePassword.password}
            onChange={handleChange2("password")}
            name="changePassword"
            endAdornment={
              <InputAdornment>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword2}
                  onMouseDown={handleMouseDownPassword}
                >
                  {changePassword.showPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
          {passwordError && (
            <div className={styles.errorMessage}>
              문자,숫자를 포함해서 최소 8자리를 입력해주세요{" "}
            </div>
          )}

          <h3 className={styles.body}>
            사용하실 비밀번호를 다시 한번 입력해주세요
          </h3>
          <CustomInput
            id="outlined-adornment-password"
            type={confirmPassword.showPassword ? "text" : "password"}
            value={confirmPassword.password}
            onChange={handleChange3("password")}
            endAdornment={
              <InputAdornment>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword3}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {confirmPassword.showPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />

          {confirmPasswordError && (
            <div className={styles.errorMessage}>
              입력하신 비밀번호와 다릅니다. 확인해주세요.
            </div>
          )}

          <div style={{ width: "100px", margin: "auto" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 4, mb: 2 }}
              style={{
                width: "200px",
                height: "50px",
              }}
            >
              비밀번호 수정
            </Button>
          </div>
        </Box>
      </div>
    </Container>
  );
}

export default ChangePassword;
