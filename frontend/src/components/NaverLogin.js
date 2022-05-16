import { useEffect } from "react";
const { naver } = window;

// 환경변수로 관리 필요
const NAVER_CALLBACK_URL = "http://localhost:3000/naver";
const NAVER_CLIENT_ID = "bsyeHD5O125at50bPEyR";

const NaverLogin = () => {
  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: NAVER_CLIENT_ID,
      callbackUrl: NAVER_CALLBACK_URL,
      isPopup: false,
      loginButton: { color: "green", height: 45 },
      callbackHandle: true,
    });
    naverLogin.init();
  };
  useEffect(() => {
    initializeNaverLogin();
  }, []);
  return <div id="naverIdLogin"></div>;
};

export default NaverLogin;
