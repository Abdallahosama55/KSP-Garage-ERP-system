import { Box, useTheme } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteSubUnit, getSubUnits } from "../../redux/Units";
import CustomDelete from "../../components/CutsomDelete/CustomDelete";
import { tokens } from "../../theme";
import { useTranslation } from "react-i18next";
import CustomTableBox from "../../components/customTableBox/CustomTableBox";
import EditSubUnits from "./EditSubUnit";
import { useSidebarContext } from "../global/sidebar/sidebarContext";
import Header from "../../components/Header";
import AddSubUnit from "./AddSubUnit";
import hasPermission from "./../../utils/haspermission";

const SubUnitsTbale = () => {
  const { id } = useParams();
  const { sidebarRTL } = useSidebarContext();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const data = useSelector((state) => state.units.unitsSubData.data) || [];
  const loading = useSelector((state) => state.units.loading);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: t("ID"), width: 200 },
    {
      field: "name",
      headerName: t("Name"),
      width: 320,
      cellClassName: "name-column--cell",
    },
    {
      field: "symbol",
      headerName: t("symbol"),
      width: 300,
      cellClassName: "name-column--cell",
    },
    {
      field: "actions",
      headerName: t("Actions"),
      width: 400,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          {hasPermission("update-sub_unit") && (
            <EditSubUnits
              sx={{
                background: `${colors.primary[600]}`,
              }}
              id={params.row.id}
            />
          )}
          {hasPermission("delete-sub_unit") && (
            <CustomDelete
              sx={{
                background: `${colors.redAccent[600]}`,
              }}
              action={deleteSubUnit}
              rerenderAction={getSubUnits}
              id={params.id}
              rerenderId={id}
            />
          )}
        </Box>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getSubUnits({ id }));
  }, [id, dispatch]);

  const tableData = {
    rows: data.length > 0 && data,
    columns: columns,
    loading: loading,
  };
  return (
    <Box m={2}>
      <Box
        flexDirection={sidebarRTL ? "row-reverse" : "row"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title={t("sub Units")} />
        {hasPermission("store-sub_unit") && <AddSubUnit />}
      </Box>
      <CustomTableBox tableData={tableData} />
    </Box>
  );
};

export default SubUnitsTbale;
