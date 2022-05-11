import { useState } from "react";
import { getQuestions } from "../api";
import DateText from "../components/DateText";
import ListPage from "../components/ListPage";
import Warn from "../components/Warn";
import Card from "../components/Card";
import Avatar from "../components/Avatar";
import styles from "./RecordPage.module.css";
import searchBarStyles from "../components/SearchBar.module.css";
import searchIcon from "../assets/search.svg";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { Answer } from "./QuestionPage";
import Container from "../components/Container";
import { getMatch } from "../api";
// import Lined from "../components/Lined";
function QuestionItem({ question }) {
  const [state, setstate] = useState(0);
  const matchinfo = getMatch();
  return (
    <div>
      <Card className={styles.questionItem} key={question.title}>
        <div className={styles.info}>승리</div>
        <div className={styles.info}>1위</div>
        <div className={styles.info}>빌리지 붐힐터널</div>
        <div className={styles.info}>01:02:273</div>

        <button
          onClick={() => {
            setstate(!state);
          }}
        >
          {state ? "∧" : "∨"}
        </button>
      </Card>
      {!state ? null : (
        <Card className={styles.answers}>
          <div className={styles.matchheader}>
            <div className={styles.rank}>순위</div>
            <div className={styles.nick}>닉네임 </div>
            <div className={styles.rec}>기록</div>
            <div className={styles.kart}>카트</div>
          </div>
          {matchinfo.map((e, i) => {
            return (
              <div className={styles.matchdetail}>
                <div className={styles.rank}>{i + 1}</div>
                <Link to={`/record/${e.nick}`}>
                  <div className={styles.nick}>{e.nick}</div>
                </Link>

                <div className={styles.rec}>{e.record}</div>
                <div className={styles.kart}>{e.kart}</div>
              </div>
            );
          })}
        </Card>
      )}
    </div>
  );
}

function QuestionListPage() {
  const { userNick } = useParams();
  const [keyword, setKeyword] = useState(userNick);
  const navigate = useNavigate();
  const questions = getQuestions(keyword);

  const handleKeywordChange = (e) => setKeyword(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/record/${keyword}`);
  };
  return (
    <Container
      variant="community"
      // title="커뮤니티"
      description="코드댓의 2만 수강생들과 함께 공부해봐요."
    >
      <QuestionItem question="" />
    </Container>
  );
}

export default QuestionListPage;
