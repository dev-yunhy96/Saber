import { useState, useEffect } from "react";
import Card from "../components/Card";
import styles from "./RecordPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "../components/Container";
import { getMatch } from "../api";
import { useDispatch } from "react-redux";
import {
  fetchAsyncPlayer,
  getPlayer,
  removeSelectedPlayer,
} from "../features/player/playerSlice";

function QuestionItem({ question }) {
  const [open, setOpen] = useState(false);
  const matchinfo = getMatch();
  const navigate = useNavigate();
  return (
    <div>
      <Card className={styles.questionItem} key={question.title}>
        <div className={styles.info}>승리</div>
        <div className={styles.info}>1위</div>
        <div className={styles.info}>빌리지 붐힐터널</div>
        <div className={styles.info}>01:02:273</div>

        <button
          onClick={() => {
            setOpen((state) => !state);
          }}
        >
          {open ? "∧" : "∨"}
        </button>
      </Card>
      {!open ? null : (
        <Card className={styles.answers}>
          <div className={styles.matchheader}>
            <div className={styles.rank}>순위</div>
            <div className={styles.nick}>닉네임 </div>
            <div className={styles.rec}>기록</div>
            <div className={styles.kart}>카트</div>
          </div>
          {matchinfo.map((e, i) => (
            <div key={i} className={styles.matchdetail}>
              <div className={styles.rank}>{i + 1}</div>
              <div
                onClick={() => {
                  navigate(`/record/${e.nick}`);
                }}
                className={styles.nick2}
              >
                {e.nick}
              </div>
              <div className={styles.rec}>{e.record}</div>
              <div className={styles.kart}>{e.kart}</div>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}

function RecordPage() {
  const { userNick } = useParams();
  const dispatch = useDispatch();
  const player = useSelector(getPlayer);
  useEffect(() => {
    dispatch(fetchAsyncPlayer(userNick));
    return () => {
      dispatch(removeSelectedPlayer());
    };
  }, [dispatch, userNick]);
  return (
    <Container>
      <p>{player.fname}</p>
      <p>{player.lname}</p>
      <p>{player.username}</p>
      <img src="player.avatar" alt="player" />
      <QuestionItem question="" />
      {/* <div>{playerInfo.fname}</div> */}
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
