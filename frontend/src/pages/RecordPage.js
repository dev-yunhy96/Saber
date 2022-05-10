import { useState, useEffect } from "react";
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
// import Lined from "../components/Lined";
import Grid from "@mui/material/Grid";
import serverApi from "../common/api/serverApi";

function QuestionItem({ question }) {
  const [state, setstate] = useState(0);

  return (
    <div>
      <Card className={styles.questionItem} key={question.title}>
        <div className={styles.info}>
          <Link to={`/questions/${question.id}`}>
            <p className={styles.title}>
              {question.title}
              {question.answers.length > 0 && (
                <span className={styles.count}>
                  [{question.answers.length}]
                </span>
              )}
            </p>

            <p className={styles.date}>
              <DateText value={question.createdAt} />
            </p>
          </Link>
        </div>
        <div className={styles.writer}>
          <Avatar
            photo={question.writer.profile.photo}
            name={question.writer.name}
          />
        </div>
        <button
          onClick={() => {
            setstate(!state);
          }}
        >
          V
        </button>
      </Card>
      {!state ? null : (
        <Container className={styles.answers}>
          {question.answers.length > 0 ? (
            question.answers.map((answer) => (
              <Answer
                key={answer.id}
                className={styles.answerItem}
                answer={answer}
              />
            ))
          ) : (
            <Warn
              title="답변을 기다리고 있어요."
              description="이 질문의 첫 번째 답변을 달아주시겠어요?"
            />
          )}
        </Container>
      )}
    </div>
  );
}

function RecordPage() {
  const { userNick } = useParams();
  const [keyword, setKeyword] = useState(userNick);
  const [playerInfo, setPlayerInfo] = useState([]);
  const navigate = useNavigate();

  const getPlayerInfo = async () => {
    const response = await serverApi.get(`users?search=${keyword}`);
    setPlayerInfo(response.data[0]);
    setKeyword("");
  };
  useEffect(() => {
    getPlayerInfo();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/record/${keyword}`);
    getPlayerInfo();
  };

  return (
    <Container sx={{ display: "grid", gridAutoColumns: "1fr", gap: 1 }}>
      <div sx={{ gridRow: "1", gridColumn: "4" }}>{playerInfo.fname}</div>
      <div sx={{ gridRow: "1", gridColumn: "8" }}>
        <form className={searchBarStyles.form} onSubmit={handleSubmit}>
          <input
            name="keyword"
            value={keyword}
            placeholder="유저 검색"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit">
            <img src={searchIcon} alt="검색" />
          </button>
        </form>
      </div>
      {/* <p className={styles.count}>총 {questions.length}개 질문</p>

      {keyword && questions.length === 0 ? (
        <Warn
          className={styles.emptyList}
          title="조건에 맞는 질문이 없어요."
          description="올바른 검색어가 맞는지 다시 한 번 확인해 주세요."
        />
      ) : (
        <div className={styles.questionList}>
          {questions.map((question) => (
            <QuestionItem key={question.id} question={question} />
          ))}
        </div>
      )} */}
    </Container>
  );
}

export default RecordPage;
