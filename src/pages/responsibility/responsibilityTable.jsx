import React, { useEffect, useState } from "react";
import { Box, ButtonGroup, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import Pagenation from "./pagenation";
import AddRoles from "./AddRoles";
import EditRole from "./EditRoles";
import { useTranslation } from "react-i18next";
import {
  Responsibility,
  ResponsibilitySearch,
  deleteResponsibility,
} from "../../redux/responsibility";
import { useSidebarContext } from "../global/sidebar/sidebarContext";
import CustomSearch from "../../components/customSearch/customSearch";
import CustomDelete from "../../components/CutsomDelete/CustomDelete";

const ResponsibilityTable = () => {
  const permission =
    useSelector((state) => state.user.userInfo.data.permissions) || [];
  const [pageSize, setPageSize] = useState(10);
  const { sidebarRTL } = useSidebarContext();
  const { t } = useTranslation();
  const roles = useSelector((state) => state.roles.roles);
  const loading = useSelector((state) => state.roles.loading);
  const theme = useTheme();
  const dispatch = useDispatch();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: t("ID"), width: 500 },
    {
      field: "name",
      headerName: `${t("Name")}`,
      width: 500,
      cellClassName: "name-column--cell",
    },

    {
      field: "actions",
      headerName: `${t("Actions")}`,
      width: 400,
      renderCell: (params) => (
        <ButtonGroup
          sx={{
            display: "flex",
            flexDirection: sidebarRTL
              ? "row-reverse !important"
              : "row !important",
            alignItems: "center",
          }}
        >
          <EditRole
            variant="contained"
            sx={{
              background: `${colors.primary[600]}`,
              m: 4,
            }}
            id={params.id}
            icon={<EditIcon />}
            pageSize={pageSize}
          />
          <CustomDelete
            variant="contained"
            sx={{
              background: `${colors.redAccent[600]}`,
            }}
            id={params.id}
            icon={<DeleteForeverIcon />}
            pageSize={pageSize}
            action={deleteResponsibility}
            rerenderAction={Responsibility}
          />
        </ButtonGroup>
      ),
    },
  ];

  useEffect(() => {
    const info = {
      pageSize,
    };
    dispatch(Responsibility(info));
  }, [dispatch, pageSize]);
  return (
    <Box m="20px">
      <Box
        display="flex"
        flexDirection={sidebarRTL ? "row-reverse" : "row"}
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title={t("Power_And_Responsibility")} />
        <AddRoles
          // show={permission.includes("store-role")}
          pageSize={pageSize}
          icon={<AddIcon />}
        />
      </Box>
      <Box
        m="8px 0 0 0"
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
            fontWeight: "bold",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
            fontWeight: "bold",
            fontSize: "20px",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiChackbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiButtonGroup-root.MuiButtonGroup-outlined.css-iajp3t-MuiButtonGroup-root":
            {
              display: "flex",
              alignItems: "center",
              flexDirection: sidebarRTL ? "row-reverse" : "row",
              gap: sidebarRTL ? "35px" : "0px",
            },
          "& .MuiDataGrid-cell.MuiDataGrid-cell--textLeft": {
            justifyContent: sidebarRTL
              ? "flex-end !important"
              : "flex-start !important",
          },
          "& .MuiDataGrid-columnHeaderDraggableContainer": {
            flexDirection: sidebarRTL
              ? "row-reverse !important"
              : "row !important",
          },
          "& .MuiDataGrid-columnHeaderTitleContainer": {
            justifyContent: sidebarRTL ? "end !important" : "start !important",
            flexDirection: sidebarRTL
              ? "row-reverse !important"
              : "row !important",
          },
        }}
      >
        <CustomSearch action={ResponsibilitySearch} pageSize={pageSize} />
        <DataGrid
          sx={{
            fontWeight: "bold",
            fontSize: "14px",
          }}
          rows={roles?.data ?? []}
          columns={sidebarRTL ? columns.reverse() : columns}
          autoHeight
          disableSelectionOnClick={true}
          componentsProps={{
            pagination: {
              labelRowsPerPage: t("rowsPerPageText"),
              dir: sidebarRTL ? "rtl" : "ltr",
            },
          }}
          pageSize={pageSize}
          loading={loading}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 15]}
        />
        <Pagenation pageSize={pageSize} />
      </Box>
    </Box>
  );
};

export default ResponsibilityTable;
