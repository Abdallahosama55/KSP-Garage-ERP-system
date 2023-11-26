import React, { useEffect, useState } from "react";
import { Box, ButtonGroup, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import EditCar from "./EditCar";
import { useSidebarContext } from "../global/sidebar/sidebarContext";
import CustomTableBox from "../../components/customTableBox/CustomTableBox";
import CustomPagenation from "../../components/CustomPagenation/CustomPagenation";
import CustomDelete from "../../components/CutsomDelete/CustomDelete";
import AddCar from "./AddCar";
import {
  SearchCars,
  deleteCars,
  fetchCarsDataByPage,
  getCarsData,
} from "../../redux/cars";
import CustomToolTip from "../../components/CustomToolTip/customToolTip";
import hasPermission from "../../utils/haspermission";

const CarsTable = () => {
  const dispatch = useDispatch();
  const nextPage = useSelector((state) => state.cars.carsLinks.next);
  const lastPage = useSelector((state) => state.cars.carsLinks.last);
  const prevPage = useSelector((state) => state.cars.carsLinks.prev);
  const currentPage = useSelector((state) => state.cars.currentPage);
  const firstPage = useSelector((state) => state.cars.carsLinks.first);
  const { sidebarRTL } = useSidebarContext();
  const { t } = useTranslation();
  const [pageSize, setPageSize] = useState(10);
  const loading = useSelector((state) => state.cars.loading);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const data = useSelector((state) => state.cars.carsData.data || []);
  const [examId, setExamId] = useState();
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
      field: "brand",
      headerName: t("brand"),
      width: 250,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.brand.name} />,
    },

    {
      field: "actions",
      headerName: t("Actions"),
      width: 300,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: sidebarRTL
              ? "row-reverse !important"
              : "row !important",
            alignItems: "center",
          }}
        >
          {hasPermission("update-car") && (
            <EditCar
              sx={{
                backGround: `${colors.grey[600]}`,
              }}
              id={params.id}
              icon={<EditIcon />}
              name={params.row.name}
              brand_id={params.row.brand.id}
            />
          )}
          {hasPermission("delete-car") && (
            <CustomDelete
              sx={{
                background: `${colors.redAccent[600]}`,
              }}
              icon={<DeleteIcon />}
              id={params.id}
              action={deleteCars}
              pageSize={pageSize}
              rerenderAction={getCarsData}
            />
          )}
        </Box>
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
    dispatch(getCarsData(info));
  }, [dispatch, pageSize]);
  return (
    <Box m="20px">
      <Box
        display="flex"
        dir={sidebarRTL ? "rtl" : "ltr"}
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title={t("cars")} />
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection={sidebarRTL ? "row" : "row-reverse"}
      >
        {hasPermission("store-car") && (
          <AddCar exam_id={examId} pageSize={pageSize} />
        )}
      </Box>
      <CustomTableBox
        tableData={tableData}
        action={SearchCars}
        CustomPagenation={
          <CustomPagenation
            pageSize={pageSize}
            nextPage={nextPage}
            lastPage={lastPage}
            prevPage={prevPage}
            currentPage={currentPage}
            firstPage={firstPage}
            action={fetchCarsDataByPage}
          />
        }
      />
    </Box>
  );
};
export default CarsTable;
