import Container from "./Container";
import Card from "./Card";
import classNames from "classnames";
import UserMenu from "./UserMenu";
import logoImg from "../assets/logo.png";
import styles from "./Statics.module.css";
import { Link, NavLink } from "react-router-dom";
import { getStaticsspeed, getStaticsitem, kartById } from "../api";

function Statics() {
  const sStats = getStaticsspeed();
  const iStats = getStaticsitem();

  return (
    <div className={classNames(styles.wrapper)}>
      <div className={classNames(styles.bg)}>
        <div className={classNames(styles.stats)}>스피드 픽률 TOP5</div>
        <div className={classNames(styles.stats)}>
          {sStats.map((kart, i) => {
            const kartname = "./kart.jpg";
            return (
              <div className={classNames(styles.statcomponent)}>
                <img
                  className={classNames(styles.kartimage)}
                  src={`https://s3-ap-northeast-1.amazonaws.com/solution-userstats/metadata/kart/${kart}.png?v=1645798750`}
                  alt=""
                />

                <div>{kartById(kart)}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={classNames(styles.bg)}>
        <div className={classNames(styles.stats)}>아이템 픽률 TOP5</div>
        <div className={classNames(styles.stats)}>
          {iStats.map((kart, i) => {
            return (
              <div className={classNames(styles.statcomponent)}>
                <img
                  // className={classNames(styles.courseIcon, className)}
                  className={classNames(styles.kartimage)}
                  src={`https://s3-ap-northeast-1.amazonaws.com/solution-userstats/metadata/kart/${kart}.png?v=1645798750`}
                  alt=""
                />
                <div>{kartById(kart)}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Statics;
