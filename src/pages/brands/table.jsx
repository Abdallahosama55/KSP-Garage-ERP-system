import React, { useState, useEffect } from "react";
import { Avatar, Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  deleteBrand,
  fetchBrandsDataByPage,
  getBrands,
} from "../../redux/brands";
import { useSidebarContext } from "../global/sidebar/sidebarContext";
import CustomDelete from "../../components/CutsomDelete/CustomDelete";
import AddBrand from "./addBrand";
import EditBrand from "./EditBrand";
import CustomTableBox from "../../components/customTableBox/CustomTableBox";
import CustomPagenation from "./../../components/CustomPagenation/CustomPagenation";
import hasPermission from "../../utils/haspermission";

const BrandsTable = () => {
  const firstPage = useSelector((state) => state.brands.brandsLinks.first);
  const nextPage = useSelector((state) => state.brands.brandsLinks.next);
  const lastPage = useSelector((state) => state.brands.brandsLinks.last);
  const prevPage = useSelector((state) => state.brands.brandsLinks.prev);
  const currentPage = useSelector((state) => state.brands.currentPage);
  const { sidebarRTL } = useSidebarContext();
  const { t } = useTranslation();
  const theme = useTheme();
  const [pageSize, setPageSize] = useState(10);
  const colors = tokens(theme.palette.mode);
  const data = useSelector((state) => state.brands.brandsData.data) || [];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBrands({ pageSize: pageSize }));
  }, [dispatch, pageSize]);

  const nameWidth = 250;
  const idWidth = 200;

  const columns = [
    { field: "id", headerName: t("ID"), width: idWidth },
    {
      field: "name",
      headerName: t("Name"),
      width: nameWidth,
      cellClassName: "name-column--cell",
    },
    {
      field: "image",
      headerName: t("image"),
      width: 200,
      height: 200,
      renderCell: (params) => <Avatar alt={t("logo")} src={params.row.image} />,
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
          {hasPermission("update-brand") && (
            <EditBrand
              sx={{
                background: `${colors.primary[600]}`,
                m: 4,
              }}
              id={params.row.id}
              pageSize={pageSize}
              name={params.row.name}
              img={params.row.image}
              icon={<EditIcon />}
            />
          )}
          {hasPermission("delete-brand") && (
            <CustomDelete
              sx={{
                background: `${colors.redAccent[600]}`,
              }}
              id={params.row.id}
              action={deleteBrand}
              rerenderAction={getBrands}
              pageSize={pageSize}
              icon={<DeleteForeverIcon />}
            />
          )}
        </Box>
      ),
    },
  ];

  const tableData = {
    rows: data,
    loading: !data,
    pageSize: pageSize,
    onPageSizeChange: (newPageSize) => setPageSize(newPageSize),
    columns: columns,
  };

  return (
    <Box m="20px">
      <Box
        display="flex"
        flexDirection={sidebarRTL ? "row-reverse" : "row"}
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title={t("brands")} />
        {hasPermission("store-brand") && <AddBrand pageSize={pageSize} />}
      </Box>
      <CustomTableBox
        tableData={tableData}
        CustomPagenation={
          <CustomPagenation
            action={fetchBrandsDataByPage}
            currentPage={currentPage}
            prevPage={prevPage}
            nextPage={nextPage}
            lastPage={lastPage}
            firstPage={firstPage}
          />
        }
      />
    </Box>
  );
};
export default BrandsTable;
