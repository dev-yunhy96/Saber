import { useState } from "react";
import ListPage from "../components/ListPage";
import styles from "./HomePage.module.css";
import searchBarStyles from "../components/SearchBar.module.css";
import searchIcon from "../assets/search.svg";
import Ranking from "../components/Ranking";
import Statics from "../components/Statics";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAsyncPlayer } from "../features/player/playerSlice";

function HomePage() {
  const [userNick, setUserNick] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchAsyncPlayer(userNick));
    navigate(`/record/${userNick}`);
  };
  return (
    <ListPage
      variant="catalog"
      title="SABER.GG"
      description="자체 제작된 코스들로 기초를 쌓으세요."
    >
      <form className={searchBarStyles.form} onSubmit={handleSubmit}>
        <input
          name="keyword"
          value={userNick}
          onChange={(e) => setUserNick(e.target.value)}
          placeholder="유저 검색"
        ></input>
        <button type="submit">
          <img src={searchIcon} alt="검색" />
        </button>
      </form>
      <div className={styles.content}>
        <Ranking />
        <Statics />
      </div>
    </ListPage>
  );
}

export default HomePage;
