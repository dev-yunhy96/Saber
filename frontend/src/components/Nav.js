import { useState, useEffect } from "react";
import Container from "./Container";
import UserMenu from "./UserMenu";
import logoImg from "../assets/logo.png";
import styles from "./Nav.module.css";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import searchBarStyles from "../components/SearchBar.module.css";
import searchIcon from "../assets/search.svg";
import { useSelector } from "react-redux";
import { Badge, IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import serverApi from "../common/api/serverApi";
import { getUser } from "../features/user/userSlice";

function getLinkStyle({ isActive }) {
  return {
    fontSize: "1.2em",
    textDecoration: isActive ? "underline" : undefined,
  };
}

function Nav() {
  const user = useSelector(getUser);
  const location = useLocation();
  const navigate = useNavigate();
  const [userNick, setUserNick] = useState("");
  const [count, setCount] = useState(0);

  const getCount = (player) => {
    serverApi
      .get(`battle/navCount/${player}`)
      .then((response) => {
        setCount(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (user.nickname) {
      getCount(user.nickname);
    } else {
      setCount(0);
    }
  }, [location.pathname, user.nickname]);

  const handleSubmit = (e) => {
    e.preventDefault();
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
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              {count ? (
                <Badge badgeContent={count} color="error">
                  <NotificationsIcon />
                </Badge>
              ) : (
                <Badge>
                  <NotificationsIcon />
                </Badge>
              )}
            </IconButton>
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
