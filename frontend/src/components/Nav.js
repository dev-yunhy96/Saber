import Container from "./Container";
import UserMenu from "./UserMenu";
import logoImg from "../assets/logo.svg";
import styles from "./Nav.module.css";
import { Link, NavLink } from "react-router-dom";

function getLinkStyle({ isActive }) {
  return {
    textDecoration: isActive ? "underline" : undefined,
  };
}

function Nav() {
  return (
    <div className={styles.nav}>
      <Container className={styles.container}>
        <ul className={styles.menu}>
          <li>
            <NavLink to="/courses" style={getLinkStyle}>
              홈
            </NavLink>
          </li>
          <li>
            <NavLink to="/questions" style={getLinkStyle}>
              통계
            </NavLink>
          </li>
          <li>
            <NavLink to="/questions" style={getLinkStyle}>
              내 주변 PC방
            </NavLink>
          </li>
          <li>
            <NavLink to="/questions" style={getLinkStyle}>
              오늘의 운세
            </NavLink>
          </li>
        </ul>
      </Container>
    </div>
  );
}

export default Nav;
