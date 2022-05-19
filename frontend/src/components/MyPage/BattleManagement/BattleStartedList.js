import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import serverApi from "../../../common/api/serverApi";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getCount, checkFinished } from "../../../features/battle/battleSlice";
import Swal from "sweetalert2";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 48,
  p: 3,
};

const StyledGridOverlay = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  "& .ant-empty-img-1": {
    fill: theme.palette.mode === "light" ? "#aeb8c2" : "#262626",
  },
  "& .ant-empty-img-2": {
    fill: theme.palette.mode === "light" ? "#f5f5f7" : "#595959",
  },
  "& .ant-empty-img-3": {
    fill: theme.palette.mode === "light" ? "#dce0e6" : "#434343",
  },
  "& .ant-empty-img-4": {
    fill: theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
  },
  "& .ant-empty-img-5": {
    fillOpacity: theme.palette.mode === "light" ? "0.8" : "0.08",
    fill: theme.palette.mode === "light" ? "#f5f5f5" : "#fff",
  },
}));

function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <svg
        width="120"
        height="100"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <Box sx={{ mt: 1 }}>준비된 배틀이 없습니다</Box>
    </StyledGridOverlay>
  );
}
const BattleStartedList = ({ userNick }) => {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState(0);
  const dispatch = useDispatch();
  const count = useSelector(getCount);
  const handleClose = () => setOpen(false);
  const getStartList = () => {
    serverApi
      .get(`battle/startList/${userNick}`)
      .then((response) => {
        setRows(response.data.reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const checkBattle = (battleId) => {
    const data = {
      battleId,
    };
    serverApi
      .put(`battle/check`, data)
      .then((response) => {
        if (response.data === 200) {
          dispatch(checkFinished());
          const rowsToDelete = rows.filter((row) => battleId !== row.id);
          setRows(rowsToDelete);
        } else if (response.data === 500) {
          Swal.fire("배틀을 진행해 주세요");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleOnCellClick = (params) => {
    console.log(params);
    setTitle(params.row.title);
    setPassword(params.row.password);
    setOpen(true);
  };

  useEffect(() => {
    getStartList();
  }, [count]);
  const columns = [
    {
      field: "sender",
      headerName: "보낸 사람",
      width: 100,
      sortable: false,
      editable: true,
      headerAlign: "center",
      align: "center",
      valueFormatter: ({ value }) => value.characterName,
    },
    {
      field: "receiver",
      headerName: "받은 사람",
      width: 100,
      sortable: false,
      editable: true,
      headerAlign: "center",
      align: "center",
      valueFormatter: ({ value }) => value.characterName,
    },
    {
      field: "actions",
      headerName: "체크",
      headerAlign: "center",
      width: 100,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        const onClick = () => {
          checkBattle(params.row.id);
        };
        return (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton onClick={onClick}>
              <CheckCircleOutlineOutlinedIcon color="secondary" />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Typography
        sx={{ fontWeight: 600 }}
        variant="h5"
        gutterBottom
        component="div"
      >
        준비된 배틀 목록
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        components={{ NoRowsOverlay: CustomNoRowsOverlay }}
        onCellDoubleClick={handleOnCellClick}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ borderRadius: 3, boxShadow: 1, p: 2 }}>
            <Typography sx={{ fontWeight: 600 }} variant="h5" component="div">
              방제 : {title}
            </Typography>
          </Box>
          <Box sx={{ borderRadius: 3, boxShadow: 1, mt: 2, p: 2 }}>
            <Typography sx={{ fontWeight: 600 }} variant="h5" component="div">
              비밀번호 : {password}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button variant="contained" onClick={handleClose}>
              닫기
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default BattleStartedList;
