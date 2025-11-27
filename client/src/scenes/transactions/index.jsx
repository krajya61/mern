/* --- Transactions.jsx (FIXED FULL FILE) --- */
import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTransactionsQuery } from "state/api";
import Header from "components/Header";
// import DataGridCustomToolbar from "components/DataGridCustomToolbar";

const Transactions = () => {
  const theme = useTheme();

  // v6-compliant pagination state
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });

  const [sortModel, setSortModel] = useState([]);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // Extract values for API call
  const page = paginationModel.page;
  const pageSize = paginationModel.pageSize;
  const sort = sortModel[0] || {};

  const { data, isLoading } = useGetTransactionsQuery({
    page: page + 1, // <-- FIXED
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="TRANSACTIONS" subtitle="Entire list of transactions" />
      <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
            padding: "0.5rem 1rem",
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data.transactions) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}
          pagination
          paginationMode="server"
          sortingMode="server"
          pageSizeOptions={[20, 50, 100]}
          paginationModel={paginationModel}
          onPaginationModelChange={(model) => setPaginationModel(model)}
          sortModel={sortModel}
          onSortModelChange={(model) => setSortModel(model)}
          slots={{
            // toolbar: DataGridCustomToolbar,
          }}
          slotProps={{
            toolbar: {
              searchInput,
              setSearchInput,
              setSearch,
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Transactions;
