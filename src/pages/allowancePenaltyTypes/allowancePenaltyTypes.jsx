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
  deletePenalty,
  fetchPenaltyDataByPage,
  getPenalty,
  searchPenalty,
} from "../../Hr/redux/allowancePenaltyTypes";
import AddPenalty from "./addPenalty";
import EditPenalty from "./editPenalty";

const PenaltyTable = () => {
  const data = useSelector((state) => state.Penalty.penaltyData.data) || [];
  const loading = useSelector((state) => state.Penalty.loading);
  const firstPage = useSelector((state) => state.Penalty.penaltyLinks.first);
  const nextPage = useSelector((state) => state.Penalty.penaltyLinks.next);
  const lastPage = useSelector((state) => state.Penalty.penaltyLinks.last);
  const prevPage = useSelector((state) => state.Penalty.penaltyLinks.prev);
  const currentPage = useSelector((state) => state.Penalty.currentPage);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { sidebarRTL } = useSidebarContext();
  const [pageSize, SetPageSize] = useState(10);

  useEffect(() => {
    dispatch(getPenalty({ pageSize: pageSize }));
  }, [dispatch, pageSize]);

  const columns = [
    {
      field: "id",
      headerName: t("id"),
      width: 250,
    },
    {
      field: "name",
      headerName: t("name"),
      width: 300,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.name} />,
    },
    {
      field: "type",
      headerName: t("type"),
      width: 350,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.type} />,
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
          <EditPenalty
            name={params.row.name}
            type={params.row.type}
            id={params.row.id}
          />
          {/* {hasPermission("update-blog") && <EditBlogs id={params.row.id} />} */}
          {/* {hasPermission("delete-blog") && ( */}
          <CustomDelete
            sx={{
              background: `${colors.redAccent[600]}`,
            }}
            action={deletePenalty}
            rerenderAction={getPenalty}
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
        <Header title={t("Penalty")} />
        {hasPermission("store-employees_penalties") && <AddPenalty />}
      </Box>
      <CustomTableBox
        tableData={tableData}
        action={searchPenalty}
        CustomPagenation={
          <CustomPagenation
            action={fetchPenaltyDataByPage}
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
export default PenaltyTable;
