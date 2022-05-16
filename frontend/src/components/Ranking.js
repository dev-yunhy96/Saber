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
      <div className={classNames(styles.title)}>
        <div className={classNames(styles.a)}>RP랭킹</div>

        <div className={classNames(styles.b)}>
          <a
            href="https://kart.nexon.com/Kart/Ranking/RP/List.aspx"
            target="_blank"
          >
            더보기
          </a>
        </div>
      </div>
      {Ranking.map((Ranker, i) => {
        return (
          <div key={i} className={classNames(styles.ranker)}>
            {i + 1}.{Ranker}
          </div>
        );
      })}
    </div>
  );
}

export default Ranking;
