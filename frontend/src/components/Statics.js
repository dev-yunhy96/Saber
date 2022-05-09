import Container from "./Container";
import Card from "./Card";
import classNames from "classnames";
import UserMenu from "./UserMenu";
import logoImg from "../assets/logo.png";
import styles from "./Statics.module.css";
import { Link, NavLink } from "react-router-dom";
import { getStaticsspeed, getStaticsitem } from "../api";

function Statics() {
  const sStats = getStaticsspeed();
  const iStats = getStaticsitem();
  return (
    <div className={classNames(styles.wrapper)}>
      <div className={classNames(styles.bg)}>
        <div className={classNames(styles.stats)}>스피드 픽률 TOP5</div>
        <div className={classNames(styles.stats)}>
          {sStats.map((Ranker, i) => {
            return (
              <div key={i} className={classNames(styles.statcomponent)}>
                <img
                  // className={classNames(styles.courseIcon, className)}
                  src="asdfasdf"
                />
                <div>{Ranker}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={classNames(styles.bg)}>
        <div className={classNames(styles.stats)}>아이템 픽률 TOP5</div>
        <div className={classNames(styles.stats)}>
          {iStats.map((Ranker, i) => {
            return (
              <div key={i} className={classNames(styles.statcomponent)}>
                <img
                  // className={classNames(styles.courseIcon, className)}
                  src="asdfasdf"
                />
                <div>{Ranker}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Statics;
