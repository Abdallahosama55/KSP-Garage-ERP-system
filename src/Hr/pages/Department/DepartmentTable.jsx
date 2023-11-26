import React, { useEffect, useState } from "react";
import { Box, ButtonGroup, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import EditDepartment from "./EditDepartment";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext";
import CustomTableBox from "../../../components/customTableBox/CustomTableBox";
import CustomPagenation from "../../../components/CustomPagenation/CustomPagenation";
import CustomDelete from "../../../components/CutsomDelete/CustomDelete";
import AddDepartment from "./AddDepartment";
import {
  deleteDepartment,
  fetchDepartmentDataByPage,
  getDepartmentData,
} from "../../redux/Department";
// import CustomToolTip from "../../../components/CustomToolTip/customToolTip";
import hasPermission from "../../../utils/haspermission";

const DepartmentTable = () => {
  const dispatch = useDispatch();
  const nextPage = useSelector(
    (state) => state.Department.DepartmentLinks.next
  );
  const lastPage = useSelector(
    (state) => state.Department.DepartmentLinks.last
  );
  const prevPage = useSelector(
    (state) => state.Department.DepartmentLinks.prev
  );
  const currentPage = useSelector((state) => state.Department.currentPage);
  const firstPage = useSelector(
    (state) => state.Department.DepartmentLinks.first
  );
  const { sidebarRTL } = useSidebarContext();
  const { t } = useTranslation();
  const [pageSize, setPageSize] = useState(10);
  const loading = useSelector((state) => state.Department.loading);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const data = useSelector(
    (state) => state.Department.DepartmentData.data || []
  );

  let info = { pageSize: pageSize };

  const columns = [
    { field: "id", headerName: t("ID"), width: 150 },
    {
      field: "name",
      headerName: t("Name"),
      width: 250,
      cellClassName: "name-column--cell",
    },
    {
      field: "managerName",
      headerName: t("managerName"),
      width: 250,
      cellClassName: "name-column--cell",
      renderCell: (params) => <>{params.row.manager?.name}</>,
    },

    {
      field: "actions",
      headerName: t("Actions"),
      width: 300,
      renderCell: (params) => (
        <ButtonGroup
          sx={{
            display: "flex",
            flexDirection: sidebarRTL
              ? "row-reverse !important"
              : "row !important",
            alignItems: "center",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          {hasPermission("update-departments") && (
            <EditDepartment
              sx={{
                backGround: `${colors.grey[600]}`,
              }}
              id={params.id}
              icon={<EditIcon />}
              name={params.row.name}
            />
          )}
          {hasPermission("delete-departments") && (
            <CustomDelete
              sx={{
                background: `${colors.redAccent[600]}`,
              }}
              icon={<DeleteIcon />}
              id={params.id}
              action={deleteDepartment}
              pageSize={pageSize}
              rerenderAction={getDepartmentData}
            />
          )}
        </ButtonGroup>
      ),
    },
  ];
  const tableData = {
    rows: data.length > 0 && data,
    columns: columns,
    loading: loading,
    pageSize: pageSize,
    onPageSizeChange: (newPageSize) => setPageSize(newPageSize),
  };
  useEffect(() => {
    dispatch(getDepartmentData(info));
  }, [dispatch, pageSize]);
  return (
    <Box m="20px">
      <Box
        display="flex"
        dir={sidebarRTL ? "rtl" : "ltr"}
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title={t("Departments")} />
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection={sidebarRTL ? "row" : "row-reverse"}
      >
        {hasPermission("store-car") && <AddDepartment pageSize={pageSize} />}
      </Box>
      <CustomTableBox
        tableData={tableData}
        CustomPagenation={
          <CustomPagenation
            pageSize={pageSize}
            nextPage={nextPage}
            lastPage={lastPage}
            prevPage={prevPage}
            currentPage={currentPage}
            firstPage={firstPage}
            action={fetchDepartmentDataByPage}
          />
        }
      />
    </Box>
  );
};
export default DepartmentTable;
