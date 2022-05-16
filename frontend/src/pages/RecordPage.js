import { useState, useEffect } from "react";
import Card from "../components/Card";
import styles from "./RecordPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "../components/Container";
import { getMatch, trackById, gameTypeById, kartById } from "../api";
import { useDispatch } from "react-redux";
import {
  fetchAsyncPlayer,
  getMatches,
  removeSelectedPlayer,
} from "../features/player/playerSlice";
import serverApi from "../common/api/serverApi";

function sectomin(record) {
  const zeroPad = (num, places) => String(num).padStart(places, "0");
  const min = zeroPad(parseInt(record / 1000 / 60), 2);
  const sec = zeroPad(parseInt(record / 1000) % 60, 2);
  const msec = zeroPad(record % 1000, 3);
  return `${min}:${sec}:${msec}`;
}
function timeForToday(value) {
  const today = new Date();
  const timeValue = new Date(value);

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60
  );
  if (betweenTime < 1) return "방금전";
  if (betweenTime < 60) {
    return `${betweenTime}분전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return `${betweenTimeDay}일전`;
  }

  return `${Math.floor(betweenTimeDay / 365)}년전`;
}
function MatchItem({ match }) {
  const [open, setOpen] = useState(false);
  const [matchDetail, setmatchDetail] = useState([]);
  //const matchinfo = getMatch();
  const navigate = useNavigate();
  const matchId = match.match.matchId;
  // const matchId = match.match.matchId;
  // console.log(matchId);
  // const dispatch = useDispatch();
  // const matchDetail = serverApi.get(`match/detail/${matchId}`);
  // //console.log(matchID);
  // console.log(matchDetail);
  // useEffect(() => {
  //   dispatch(fetchAsyncMatch(matchId));
  //   return () => {
  //     dispatch(removeSelectedMatch());
  //   };
  // }, [dispatch, matchId]);

  return (
    <div>
      <Card className={styles.matchItem} key={match.title}>
        <div className={styles.minfo}>
          {" "}
          <div>{match.matchWin ? "승리" : "패배"}</div>
          <div>{gameTypeById(match.match.matchType)}</div>
        </div>

        <div className={styles.mrank}>
          {match.matchRank === "99" ? "리타이어" : `${match.matchRank}위`}
        </div>
        <div className={styles.mtrack}>{trackById(match.match.trackId)}</div>
        {/* <div className={styles.info}>{match.matchTime}</div> */}
        <div className={styles.mrec}>
          {match.matchRank === "99" ? "-" : sectomin(match.matchTime)}
        </div>
        <div className={styles.mdate}>
          {timeForToday(match.match.startTime)}
        </div>

        <button
          onClick={async () => {
            setOpen((state) => !state);
            if (matchDetail.length === 0) {
              await serverApi
                .get(`match/detail/${matchId}`)
                .then((e) => {
                  const sorteds = e.data.slice().sort(function (a, b) {
                    if (a.matchRank > b.matchRank) return 1;
                    else return -1;
                  });
                  setmatchDetail(sorteds);
                })
                .catch();
            }
            console.log(matchDetail);
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
          {matchDetail.map((e, i) => (
            <div key={i} className={styles.matchdetail}>
              <div className={styles.rank}>
                {e.matchRank === "99" ? "-" : e.matchRank}
              </div>
              <div
                onClick={() => {
                  // navigate(`/record/${e.player.characterName}`, {
                  //   replace: false,
                  // });
                  window.open(`${e.player.characterName}`, "_blank");
                }}
                className={styles.nick2}
              >
                {e.player.characterName}
              </div>{" "}
              <div className={styles.rec}>
                {e.matchRank === "99" ? "-" : sectomin(e.matchTime)}
              </div>
              <div className={styles.kart}>
                {e.kart ? kartById(e.kart) : null}
              </div>
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
  const matches = useSelector(getMatches);
  console.log(matches);
  useEffect(() => {
    dispatch(fetchAsyncPlayer(userNick));
    return () => {
      dispatch(removeSelectedPlayer());
    };
  }, [dispatch, userNick]);
  const sortedMatches = matches.slice().sort(function (a, b) {
    if (a.match.startTime < b.match.startTime) return 1;
    else return -1;
  });
  return (
    <Container>
      {sortedMatches.map((e) => (
        <MatchItem match={e} />
      ))}

      {/* <div>{playerInfo.fname}</div> */}
      {/* <p className={styles.count}>총 {matchs.length}개 질문</p>

      {keyword && matchs.length === 0 ? (
        <Warn
          className={styles.emptyList}
          title="조건에 맞는 질문이 없어요."
          description="올바른 검색어가 맞는지 다시 한 번 확인해 주세요."
        />
      ) : (
        <div className={styles.matchList}>
          {matchs.map((match) => (
            <MatchItem key={match.id} match={match} />
          ))}
        </div>
      )} */}
    </Container>
  );
}

export default RecordPage;
