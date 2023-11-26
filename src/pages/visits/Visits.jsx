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
import {
  deleteVisit,
  fetchVisitsDataByPage,
  getVisits,
  searchVisits,
} from "./../../redux/visits";
import { getGaragesMenu } from "../../redux/select_menus";
import CustomSelectMenu from "../../components/CustomSelect/CustomSelect";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import AddVisit from "./addVisit";
import EditVisit from "./editVisit";
import hasPermission from "./../../utils/haspermission";

const Visits = () => {
  const data = useSelector((state) => state.visits.VisitsData.data) || [];
  const garagesMenu =
    useSelector((state) => state.selectMenu.garagesMenu.data) || [];
  const loading = useSelector((state) => state.visits.loading);
  const firstPage = useSelector((state) => state.visits.VisitsLinks.first);
  const nextPage = useSelector((state) => state.visits.VisitsLinks.next);
  const lastPage = useSelector((state) => state.visits.VisitsLinks.last);
  const prevPage = useSelector((state) => state.visits.VisitsLinks.prev);
  const currentPage = useSelector((state) => state.visits.currentPage);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { sidebarRTL } = useSidebarContext();
  const [pageSize, SetPageSize] = useState(10);
  const [selectedGarage, SetSelectedGarage] = useState(null);
  const handleGarageChange = (value) => {
    SetSelectedGarage(value?.id);
  };
  useEffect(() => {
    dispatch(getGaragesMenu());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getVisits({ id: selectedGarage, pageSize: pageSize }));
  }, [dispatch, selectedGarage, pageSize]);

  const columns = [
    {
      field: "visitor",
      headerName: t("visitor"),
      width: 180,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.visitor.name} />,
    },
    {
      field: "garage",
      headerName: t("garage"),
      width: 130,
      renderCell: (params) => <CustomToolTip text={params.row.garage.name} />,
    },
    {
      field: "reason",
      headerName: t("reason"),
      width: 300,
      renderCell: (params) => <CustomToolTip text={params.row.reason} />,
    },
    {
      field: "created_at",
      headerName: t("created_at"),
      width: 180,
      renderCell: (params) => <CustomToolTip text={params.row.created_at} />,
    },
    {
      field: "actions",
      headerName: t("Actions"),
      width: 400,
      renderCell: (params) => (
        <ButtonGroup sx={{ display: "flex", alignItems: "center" }}>
          {hasPermission("update-visit") && (
            <EditVisit
              rerenderId={selectedGarage}
              id={params.row.id}
              pageSize={pageSize}
            />
          )}
          {hasPermission("delete-visit") && (
            <CustomDelete
              sx={{
                background: `${colors.redAccent[600]}`,
              }}
              action={deleteVisit}
              rerenderAction={getVisits}
              id={params.id}
              rerenderId={selectedGarage}
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
        <Header title={t("visits")} />

        <CustomSelectMenu
          defaultData={selectedGarage}
          onChange={handleGarageChange}
          lable="select_garage"
          options={garagesMenu}
        />
        {hasPermission("store-visit") && (
          <AddVisit rerenderId={selectedGarage} pageSize={pageSize} />
        )}
      </Box>
      <CustomTableBox
        tableData={tableData}
        id={selectedGarage}
        action={searchVisits}
        CustomPagenation={
          <CustomPagenation
            action={fetchVisitsDataByPage}
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
export default Visits;
