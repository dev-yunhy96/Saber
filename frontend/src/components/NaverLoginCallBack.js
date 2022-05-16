import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import serverApi from "../common/api/serverApi";

const NaverLoginCallBack = () => {
  const location = useLocation();
  const accessToken = location.hash.split("=")[1].split("&")[0];
  console.log(accessToken);

  const getUserInfo = () => {
    if (location.hash) {
      serverApi
        .get(`/oauth/naver?accessToken=${accessToken}`, {
          // withCredentials: true,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);
};

export default NaverLoginCallBack;
