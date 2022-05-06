import Container from "./Container";
import classNames from "classnames";
import UserMenu from "./UserMenu";
import logoImg from "../assets/logo.png";
import styles from "./Ranking.module.css";
import { Link, NavLink } from "react-router-dom";
import { getRanker } from "../api";

function Ranking() {
  const Ranking = getRanker();
  return (
    <div className={classNames(styles.bg)}>
      <div className={classNames(styles.ranker)}>RP랭킹</div>
      {Ranking.map((Ranker, i) => {
        return (
          <div className={classNames(styles.ranker)}>
            {i + 1}.{Ranker}
          </div>
        );
      })}
    </div>
  );
}

export default Ranking;
