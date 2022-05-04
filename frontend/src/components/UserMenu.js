import { useCallback, useEffect, useState } from "react";
import personIcon from "../assets/person.png";
import styles from "./UserMenu.module.css";
import { useNavigate } from "react-router-dom";
import { store } from "../features/store";
function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [login, setLogin] = useState(store.getState().user.user);
  const [check, setCheck] = useState(false);
  useEffect(() => {
    if (Object.keys(login).length !== 0 && check === false) {
      setCheck(true);
      return;
    } else if (Object.keys(login).length === 0 && check === true) {
      setCheck(false);
      return;
    }
  }, [login, check]);
  const handleButtonClick = useCallback((e) => {
    e.stopPropagation();
    setIsOpen((nextIsOpen) => !nextIsOpen);
    setLogin(store.getState().user.user);
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
          <li onClick={() => navigate("/wishlist")}>위시리스트</li>
          {!check && (
            <>
              <li onClick={() => navigate("/signup")}>회원가입</li>
              <li onClick={() => navigate("/login")}>로그인</li>
            </>
          )}
        </ul>
      )}
    </div>
  );
}

export default UserMenu;
