import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import serverApi from "../common/api/serverApi";
import { useDispatch } from "react-redux";
import { fetchAsyncUserDetail } from "../features/user/userSlice";
import Swal from "sweetalert2";

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
          Swal.fire("로그인 성공", {
            buttons: false,
            timer: 2000,
          });
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
