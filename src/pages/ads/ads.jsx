import React, { useState, useEffect } from "react";
import { Avatar, Box, Button, ButtonGroup, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../global/sidebar/sidebarContext";
import CustomDelete from "../../components/CutsomDelete/CustomDelete";
import CustomTableBox from "../../components/customTableBox/CustomTableBox";
import CustomPagenation from "../../components/CustomPagenation/CustomPagenation";
import {
  deleteAds,
  fetchAdsDataByPage,
  getAds,
  searchAds,
} from "../../redux/ads";
import CustomToolTip from "../../components/CustomToolTip/customToolTip";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import { Link } from "react-router-dom";
import CustomButton from "../../components/Button/Button";
import hasPermission from "./../../utils/haspermission";

const AdsTable = () => {
  const firstPage = useSelector((state) => state.ads.adsLinks.first);
  const nextPage = useSelector((state) => state.ads.adsLinks.next);
  const lastPage = useSelector((state) => state.ads.adsLinks.last);
  const prevPage = useSelector((state) => state.ads.adsLinks.prev);
  const currentPage = useSelector((state) => state.ads.currentPage);
  const { sidebarRTL } = useSidebarContext();
  const { t } = useTranslation();
  const theme = useTheme();
  const [pageSize, setPageSize] = useState(10);
  const colors = tokens(theme.palette.mode);
  const data = useSelector((state) => state.ads.adsData.data) || [];
  const loading = useSelector((state) => state.ads.loading);
  const dispatch = useDispatch();
  // console.log(useSelector(state=>state))
  useEffect(() => {
    dispatch(getAds({ pageSize: pageSize }));
  }, [dispatch, pageSize]);

  const columns = [
    { field: "id", headerName: t("ID"), width: 100 },
    {
      field: "title",
      headerName: t("title"),
      width: 200,
      cellClassName: "name-column--cell",
    },
    {
      field: "discount",
      headerName: t("discount"),
      width: 100,
      cellClassName: "name-column--cell",
    },
    {
      field: "description",
      headerName: t("description"),
      width: 300,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.description} />,
    },
    {
      field: "image",
      headerName: t("image"),
      width: 80,
      renderCell: (params) => <Avatar alt={t("logo")} src={params.row.image} />,
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
          }}
        >
          {hasPermission("update-ad") && (
            <Link to={`edit-ads/${params.row.id}`}>
              <Button
                sx={{
                  background: `${colors.primary[600]}`,

                  m: 4,
                }}
                variant="contained"
              >
                {t("edit")}
              </Button>
            </Link>
          )}
          {hasPermission("delete-ad") && (
            <CustomDelete
              sx={{
                background: `${colors.redAccent[600]}`,
              }}
              id={params.row.id}
              action={deleteAds}
              rerenderAction={getAds}
              pageSize={pageSize}
              icon={<DeleteForeverIcon />}
            />
          )}
        </ButtonGroup>
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

  return !loading ? (
    <Box m="20px">
      <Box
        display="flex"
        flexDirection={sidebarRTL ? "row-reverse" : "row"}
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title={t("ads")} />
        {hasPermission("store-ad") && (
          <Link to="add-ads">
            <CustomButton text={t("add")} />
          </Link>
        )}
      </Box>

      <CustomTableBox
        tableData={tableData}
        action={searchAds}
        CustomPagenation={
          <CustomPagenation
            action={fetchAdsDataByPage}
            currentPage={currentPage}
            prevPage={prevPage}
            nextPage={nextPage}
            lastPage={lastPage}
            firstPage={firstPage}
          />
        }
      />
    </Box>
  ) : (
    <CustomLoader />
  );
};
export default AdsTable;
