import React, { useState } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const BattleReceiveList = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 90, headerAlign: "center" },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      editable: true,
      headerAlign: "center",
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
      editable: true,
      headerAlign: "center",
    },

    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      headerAlign: "center",
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "button",
      headerName: "button",
      headerAlign: "center",
      align: "center",
      width: 150,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation();
          console.log(e);
          console.log(params);
        };
        return (
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={onClick}
          >
            Open
          </Button>
        );
      },
    },
    {
      field: "actions",
      headerName: "",
      width: 120,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        const onClick = () => {
          const rowsToDelete = rows.filter((row) => params.row.id !== row.id);
          setRows(rowsToDelete);
        };
        return (
          <Box
            sx={{
              backgroundColor: "whitesmoke",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton onClick={onClick}>
              <DeleteIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  const data = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];
  const [rows, setRows] = useState(data);
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};

export default BattleReceiveList;
