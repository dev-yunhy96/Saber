import { useCallback, useEffect, useState } from "react";
import personIcon from "../assets/person.png";
import styles from "./UserMenu.module.css";
import { Link } from "react-router-dom";
function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);

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
          <li>
            <Link to="/wishlist">위시리스트</Link>
          </li>
          <li>
            <Link to="/signup">회원가입</Link>
          </li>
<<<<<<< HEAD
          <li className={styles.disabled}>로그인</li>
=======
          <li>
            <Link to="/login">로그인</Link>
          </li>
>>>>>>> d347f2eec9d0953c3f1a3cb5dd5e5158e0ecc2b8
        </ul>
      )}
    </div>
  );
}

export default UserMenu;
