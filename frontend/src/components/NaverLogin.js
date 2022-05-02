import { Container } from "@mui/material";
import { useEffect } from "react";
import styles from "./NaverLogin.module.css";
const { naver } = window;

const NAVER_CALLBACK_URL = "http://127.0.0.1:3000/login";
const NAVER_CLIENT_ID = "bsyeHD5O125at50bPEyR";

// const NaverLogin = () => {
//   const location = useLocation();

//   const initializeNaverLogin = () => {
//     const naverLogin = new naver.LoginWithNaverId({
//       clientId: NAVER_CLIENT_ID,
//       callbackUrl: NAVER_CALLBACK_URL,
//       isPopup: false,
//       loginButton: { color: "green", type: 3, height: 62 },
//     });
//     naverLogin.init();
//   };

//   //   const getNaverToken = () => {
//   //     if (!location.hash) return;
//   //     const token = location.hash.split("=")[1].split("&")[0];
//   //     console.log(token);
//   //   };

//   useEffect(() => {
//     initializeNaverLogin();
//   }, []);

//   return (
//     <Container>
//       <div id="naverLogin"></div>
//     </Container>
//   );
// };

const NaverLogin = () => {
  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: NAVER_CLIENT_ID,
      callbackUrl: NAVER_CALLBACK_URL,
      loginButton: { color: "green", type: 2, height: 40 },
    });

    naverLogin.init();
  };
  useEffect(() => {
    initializeNaverLogin();
  }, []);
  return (
    <Container>
      <div id="naverIdLogin" className={styles.naverButton}></div>
    </Container>
  );
};

export default NaverLogin;
