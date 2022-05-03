import { useCallback, useEffect, useState } from "react";
import personIcon from "../assets/person.png";
import styles from "./UserMenu.module.css";
import { useNavigate } from "react-router-dom";
function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

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
<<<<<<< HEAD
          <li>
            <Link to="/wishlist">위시리스트</Link>
          </li>
          <li>
            <Link to="/signup">회원회원회원도커도커도커11번째시도가입</Link>
          </li>
          <li>
            <Link to="/login">로그인</Link>
          </li>
=======
          <li onClick={() => navigate("/wishlist")}>위시리스트</li>
          <li onClick={() => navigate("/signup")}>회원가입</li>
          <li onClick={() => navigate("/login")}>로그인</li>
>>>>>>> c1a7865fc8d2d9a475ef773442b290afbff1ba84
        </ul>
      )}
    </div>
  );
}

export default UserMenu;
