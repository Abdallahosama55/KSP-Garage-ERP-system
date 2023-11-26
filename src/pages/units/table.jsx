import React, { useState, useEffect } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import AddIcon from "@mui/icons-material/Add";
import Header from "../../components/Header";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../global/sidebar/sidebarContext";
import CustomTableBox from "../../components/customTableBox/CustomTableBox";
import {
  getParentUnits,
  getSearchUnits,
  removeParentUnits,
} from "../../redux/Units";
import AddUnit from "./AddUnit";
import CustomDelete from "../../components/CutsomDelete/CustomDelete";
import EditUnits from "./EditUnits";
import { Link } from "react-router-dom";
import hasPermission from "../../utils/haspermission";

const UnitsTable = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [pageSize, setPageSize] = useState(10);
  const dispatch = useDispatch();
  const info = { pageSize };
  const { sidebarRTL } = useSidebarContext();

  useEffect(() => {
    dispatch(getParentUnits(info));
  }, [dispatch, pageSize]);

  const data = useSelector((state) => state.units?.unitsParentData?.data) || [];
  const loading = useSelector((state) => state?.units?.loading);

  const columns = [
    { field: "id", headerName: t("ID"), width: 300 },
    {
      field: "name",
      headerName: t("Name"),
      width: 300,
      cellClassName: "name-column--cell",
    },
    {
      field: "actions",
      headerName: t("Actions"),
      width: 500,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "75%",
            alignItems: "center",
          }}
        >
          {hasPermission("update-parent_unit") && (
            <EditUnits
              sx={{
                background: `${colors.primary[600]}`,
              }}
              id={params.id}
              icon={<EditIcon />}
              pageSize={pageSize}
            />
          )}
          {hasPermission("delete-parent_unit") && (
            <CustomDelete
              sx={{
                background: `${colors.redAccent[600]}`,
              }}
              id={params.id}
              pageSize={pageSize}
              icon={<DeleteForeverIcon />}
              action={removeParentUnits}
              rerenderAction={getParentUnits}
            />
          )}
          <Link to={`${params.id}/sub_units`}>
            <Button
              sx={{ background: `${colors.greenAccent[500]}` }}
              variant="contained"
            >
              {t("Sub Units")}
            </Button>
          </Link>
        </Box>
      ),
    },
  ];
  const tableData = {
    rows: data.length > 0 && data,
    columns: columns,
    loading: loading === true,
    pageSize: pageSize,
    onPageSizeChange: (newPageSize) => setPageSize(newPageSize),
  };
  return (
    <Box m="20px">
      <Box
        flexDirection={sidebarRTL ? "row-reverse" : "row"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title={t("Parent Units")} />
        {hasPermission("store-parent_unit") && (
          <AddUnit pageSize={pageSize} icon={<AddIcon />} />
        )}
      </Box>
      <CustomTableBox tableData={tableData} action={getSearchUnits} />
    </Box>
  );
};
export default UnitsTable;