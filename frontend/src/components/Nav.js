import { useState } from "react";
import Container from "./Container";
import UserMenu from "./UserMenu";
import logoImg from "../assets/logo.png";
import styles from "./Nav.module.css";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import searchBarStyles from "../components/SearchBar.module.css";
import searchIcon from "../assets/search.svg";
import { fetchAsyncPlayer } from "../features/player/playerSlice";

function getLinkStyle({ isActive }) {
  return {
    fontSize: "1.2em",
    textDecoration: isActive ? "underline" : undefined,
  };
}

function Nav() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userNick, setUserNick] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchAsyncPlayer(userNick));
    navigate(`/record/${userNick}`);
    setUserNick("");
  };
  return (
    <div className={styles.nav}>
      <Container className={styles.container}>
        <Link to="/">
          <img src={logoImg} alt="Codethat Logo" />
        </Link>
        {location.pathname.substring(1, 7) === "record" ? (
          <form className={searchBarStyles.form} onSubmit={handleSubmit}>
            <input
              name="keyword"
              value={userNick}
              placeholder="유저 검색"
              onChange={(e) => setUserNick(e.target.value)}
            />
            <button type="submit">
              <img src={searchIcon} alt="검색" />
            </button>
          </form>
        ) : (
          <></>
        )}
        <ul className={styles.menu}>
          <li>
            <NavLink to="/" style={getLinkStyle}>
              홈
            </NavLink>
          </li>
          <li>
            <NavLink to="/community" style={getLinkStyle}>
              커뮤니티
            </NavLink>
          </li>
          <li>
            <UserMenu />
          </li>
        </ul>
      </Container>
    </div>
  );
}

export default Nav;
