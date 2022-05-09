import * as React from "react";
import Container from "../Container";
import styles from "./Quit.module.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { fetchAsyncQuit, logout } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Quit({ values = [] }) {
  const [checked, setChecked] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const eventHandler = (event) => {
    event.preventDefault();
    dispatch(fetchAsyncQuit())
      .unwrap()
      .then((response) => {
        Swal.fire("삭제 성공", {
          buttons: false,
          timer: 2000,
        });
        return response;
      })
      .then((response) => {
        console.log("데이터삭제");
        dispatch(logout());
        navigate("/");
      })
      .catch((err) => {
        Swal.fire("삭제 실패");
      });
  };
  return (
    <Container>
      <div className={styles.title}>
        <h1>회원 탈퇴</h1>
        <div>회원 탈퇴 전에 반드시 유의사항을 확인하고 진행해주세요.</div>

        <div>
          <h3 className={styles.body}>개인정보 및 서비스 이용 기록 삭제</h3>
          <div className={styles.sub}>
            개인정보 및 개인화 서비스 이용기록이 모두 삭제 되며, 삭제된 데이터는
            복구되지 않습니다. 필요한 데이터는 미리 백업해 주시기 바랍니다.
          </div>
          <h3 className={styles.body}>소셜 계정 연결 정보 삭제</h3>
          <div className={styles.sub}>
            이메일 ID에 소셜 계정을 연결한 경우 탈퇴 시 연결 정보도 함께
            삭제됩니다.
          </div>
          <h3 className={styles.body}>커뮤니티 서비스 등록 게시물 유지</h3>
          <div className={styles.sub}>
            회원가입 이후 등록하신 게시물들은 회원탈퇴 후에도 삭제 되지 않고
            유지됩니다. 삭제를 원하시는 경우에는 직접 삭제하신 후 회원탈퇴를
            진행하시기 바랍니다.
          </div>
          <h3 className={styles.body}>개인정보 보관</h3>
          <div className={styles.sub}>
            회원 탈퇴 시 일부 개인정보는 개인정보처리방침에 따라 탈퇴일로부터
            30일간 보관되며, 그 이후 관계법령에 필요한 경우에는 별도 보관합니다.
          </div>
          <h3 className={styles.body}>탈퇴 후 제한</h3>
          <div className={styles.sub}>
            탈퇴 처리된 이메일 ID는 30일동안 재가입이 불가합니다.
          </div>
        </div>
        <hr className={styles.hr}></hr>
        <div className={styles.checkBox}>
          <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
          회원탈퇴 시 유의사항을 확인하였으며, 모두 동의합니다.
        </div>
        <div className={styles.button}>
          <Stack
            spacing={2}
            direction="row"
            style={{ margin: "auto", width: 300, marginTop: "50px" }}
          >
            <Button
              variant="contained"
              style={{
                width: "150px",
                height: "50px",
              }}
              size="large"
              onClick={() => {
                navigate("/");
              }}
            >
              비동의
            </Button>
            <Button
              variant="contained"
              size="large"
              color="success"
              disabled={!checked}
              style={{
                width: "150px",
                height: "50px",
              }}
              onClick={eventHandler}
            >
              동의
            </Button>
          </Stack>
        </div>
      </div>
    </Container>
  );
}

export default Quit;
