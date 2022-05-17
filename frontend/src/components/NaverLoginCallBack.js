import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import serverApi from "../common/api/serverApi";
import { useDispatch } from "react-redux";
import { fetchAsyncUserDetail } from "../features/user/userSlice";

const NaverLoginCallBack = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = location.hash.split("=")[1].split("&")[0];

  const getUserInfo = () => {
    if (location.hash) {
      serverApi
        .get(`/oauth/naver?accessToken=${accessToken}`, {})
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          dispatch(fetchAsyncUserDetail(response.data.token));
        })
        .then(() => {
          navigate("/");
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
