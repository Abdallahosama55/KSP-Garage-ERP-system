import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, ButtonGroup, useTheme } from "@mui/material";
import CustomTableBox from "../../components/customTableBox/CustomTableBox";
import { useSidebarContext } from "../global/sidebar/sidebarContext";
import Header from "../../components/Header";
import { useTranslation } from "react-i18next";
import CustomPagenation from "../../components/CustomPagenation/CustomPagenation";
import CustomDelete from "../../components/CutsomDelete/CustomDelete";
import { tokens } from "../../theme";
import CustomToolTip from "../../components/CustomToolTip/customToolTip";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import {
  deleteExpenses,
  fetchExpensesDataByPage,
  getExpenses,
  getSearchExpenses,
} from "../../redux/Expenses";
import EditExpenses from "./editExpenses";
import AddExpenses from "./addExpenses";
import hasPermission from "./../../utils/haspermission";

const Expenses = () => {
  const data = useSelector((state) => state.Expenses.expensesData.data) || [];
  const loading = useSelector((state) => state.Expenses.loading);
  const firstPage = useSelector((state) => state.Expenses.expensesLinks.first);
  const nextPage = useSelector((state) => state.Expenses.expensesLinks.next);
  const lastPage = useSelector((state) => state.Expenses.expensesLinks.last);
  const prevPage = useSelector((state) => state.Expenses.expensesLinks.prev);
  const currentPage = useSelector((state) => state.Expenses.currentPage);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { sidebarRTL } = useSidebarContext();
  const [pageSize, SetPageSize] = useState(10);
  useEffect(() => {
    const info = {
      handle: "",
      pageSize: pageSize,
    };
    dispatch(getExpenses(info));
  }, [dispatch, pageSize]);
  const columns = [
    {
      field: "id",
      headerName: t("id"),
      width: 80,
    },
    {
      field: "name",
      headerName: t("name"),
      width: 280,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.name} />,
    },
    {
      field: "price",
      headerName: t("price"),
      width: 180,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.price} />,
    },
    {
      field: "created_at",
      headerName: t("created_at"),
      cellClassName: "name-column--cell",
      width: 200,
      renderCell: (params) => <CustomToolTip text={params.row.created_at} />,
    },
    {
      field: "expense_type",
      headerName: t("expense_type"),
      cellClassName: "name-column--cell",
      width: 200,
      renderCell: (params) => (
        <CustomToolTip text={params.row.expense_type.name} />
      ),
    },
    {
      field: "actions",
      headerName: t("Actions"),
      width: 300,
      renderCell: (params) => (
        <ButtonGroup sx={{ display: "flex", alignItems: "center" }}>
          {hasPermission("update-expense") && (
            <EditExpenses id={params.row.id}>{t("edit")}</EditExpenses>
          )}
          {hasPermission("delete-expense") && (
            <CustomDelete
              sx={{
                background: `${colors.redAccent[600]}`,
              }}
              action={deleteExpenses}
              rerenderAction={getExpenses}
              id={params.id}
              pageSize={pageSize}
            />
          )}
        </ButtonGroup>
      ),
    },
  ];

  const tableData = {
    rows: data.length > 0 && data,
    pageSize: pageSize,
    columns: columns,
    loading: loading,
    onPageSizeChange: (newPageSize) => SetPageSize(newPageSize),
  };

  return !loading ? (
    <Box m={2}>
      <Box
        flexDirection={sidebarRTL ? "row-reverse" : "row"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title={t("Expenses")} />
        {hasPermission("store-expense") && <AddExpenses />}
      </Box>
      <Box
        flexDirection={sidebarRTL ? "row-reverse" : "row"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      ></Box>
      <CustomTableBox
        tableData={tableData}
        action={getSearchExpenses}
        CustomPagenation={
          <CustomPagenation
            action={fetchExpensesDataByPage}
            firstPage={firstPage}
            nextPage={nextPage}
            lastPage={lastPage}
            prevPage={prevPage}
            currentPage={currentPage}
            pageSize={pageSize}
          />
        }
      />
    </Box>
  ) : (
    <CustomLoader />
  );
};
export default Expenses;
