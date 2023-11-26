import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, useTheme } from "@mui/material";
import CustomTableBox from "../../components/customTableBox/CustomTableBox";
import { useSidebarContext } from "../global/sidebar/sidebarContext";
import Header from "../../components/Header";
import { useTranslation } from "react-i18next";
import CustomPagenation from "../../components/CustomPagenation/CustomPagenation";
import CustomDelete from "../../components/CutsomDelete/CustomDelete";
import { tokens } from "../../theme";
import CustomToolTip from "../../components/CustomToolTip/customToolTip";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import hasPermission from "../../utils/haspermission";
import {
  fetchPenaltyDataByPage,
  searchPenalty,
} from "../../Hr/redux/allowancePenaltyTypes";
import AddPenalty from "./addAllowances";
import {
  deleteEmployeeAllowances,
  fetchEmployeeAllowancesDataByPage,
  getEmployeeAllowances,
  searchEmployeeAllowances,
} from "../../Hr/redux/employee_allowances";
import EditAllowances from "./editAllowances";

const EmployeeAllowances = () => {
  const data =
    useSelector(
      (state) => state.employeeAllowances.getemployeeAllowancesData.data
    ) || [];
  console.log(data);
  const loading = useSelector((state) => state.employeeAllowances.loading);
  const firstPage = useSelector(
    (state) => state.employeeAllowances.employeeAllowancesLinks.first
  );
  const nextPage = useSelector(
    (state) => state.employeeAllowances.employeeAllowancesLinks.next
  );
  const lastPage = useSelector(
    (state) => state.employeeAllowances.employeeAllowancesLinks.last
  );
  const prevPage = useSelector(
    (state) => state.employeeAllowances.employeeAllowancesLinks.prev
  );
  const currentPage = useSelector(
    (state) => state.employeeAllowances.currentPage
  );
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { sidebarRTL } = useSidebarContext();
  const [pageSize, SetPageSize] = useState(10);

  useEffect(() => {
    dispatch(getEmployeeAllowances({ pageSize: pageSize }));
  }, [dispatch, pageSize]);

  const columns = [
    {
      field: "id",
      headerName: t("id"),
      width: 250,
    },
    {
      field: "amount",
      headerName: t("amount"),
      width: 120,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.amount} />,
    },
    {
      field: "employee",
      headerName: t("employee"),
      width: 150,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <CustomToolTip text={params.row.employee.user.name} />
      ),
    },
    {
      field: "reason",
      headerName: t("reason"),
      width: 350,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.reason} />,
    },
    {
      field: "actions",
      headerName: t("Actions"),
      width: 200,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
          }}
        >
          <EditAllowances
            employee_id={params.row.employee.id}
            reason={params.row.reason}
            amount={params.row.amount}
            employeePenalty={params.row.employee.user.id}
            id={params.row.id}
          />
          {/* {hasPermission("update-blog") && <EditBlogs id={params.row.id} />} */}
          {/* {hasPermission("delete-blog") && ( */}
          <CustomDelete
            sx={{
              background: `${colors.redAccent[600]}`,
            }}
            action={deleteEmployeeAllowances}
            rerenderAction={getEmployeeAllowances}
            id={params.id}
            pageSize={pageSize}
          />
          {/* )} */}
        </Box>
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
        <Header title={t("employee_allowances")} />
        {hasPermission("store-employees_penalties") && <AddPenalty />}
      </Box>
      <CustomTableBox
        tableData={tableData}
        action={searchEmployeeAllowances}
        CustomPagenation={
          <CustomPagenation
            action={fetchEmployeeAllowancesDataByPage}
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
export default EmployeeAllowances;
