import { useCallback, useEffect, useState } from "react";
import personIcon from "../assets/person.png";
import styles from "./UserMenu.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser, logout } from "../features/user/userSlice";

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUser);

  const isEmptyObj = (obj) => {
    if (obj.constructor === Object && Object.keys(obj).length === 0) {
      return true;
    }
    return false;
  };

  const handleMenuClick = () => {
    localStorage.removeItem("token");
    dispatch(logout());
  };

  const handleButtonClick = useCallback((e) => {
    e.stopPropagation();
    setIsOpen((nextIsOpen) => !nextIsOpen);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = () => setIsOpen(false);
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={styles.userMenu}>
      <button className={styles.iconButton} onClick={handleButtonClick}>
        <img src={personIcon} alt="유저 메뉴" />
      </button>
      {isOpen && (
        <ul className={styles.popup}>
          {isEmptyObj(user) ? (
            <>
              <li onClick={() => navigate("/signup")}>회원가입</li>
              <li onClick={() => navigate("/login")}>로그인</li>
            </>
          ) : (
            <>
              <li onClick={() => navigate("/wishlist")}>위시리스트</li>
              <li onClick={() => navigate("/mypage")}>마이페이지</li>
              <li onClick={() => handleMenuClick()}>로그아웃</li>
            </>
          )}
        </ul>
      )}
    </div>
  );
}

export default UserMenu;
