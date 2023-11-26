import { Box } from "@mui/material";
// import { Box, useTheme } from '@mui/material';
import React, { useEffect } from "react";
import Header from "./../../components/Header";
import { useTranslation } from "react-i18next";
import CustomTableBox from "../../components/customTableBox/CustomTableBox";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContactUsDataByPage, getContactUs } from "../../redux/contact_us";
import CustomPagenation from "./../../components/CustomPagenation/CustomPagenation";
import ScrollDialog from "../../components/info_component/info";
import hasPermission from "./../../utils/haspermission";
const ContactUs = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const contact = useSelector((state) => state.contactUs.contactUs.data) || [];
  const currentPage = useSelector((state) => state.contactUs.currentPage);
  const next = useSelector((state) => state.contactUs.contactLinks.next);
  const first = useSelector((state) => state.contactUs.contactLinks.first);
  const prev = useSelector((state) => state.contactUs.contactLinks.prev);
  const last = useSelector((state) => state.contactUs.contactLinks.last);
  const loading = useSelector((state) => state.contactUs.loading);
  const [pageSize, setPageSize] = useState(10);

  const columns = [
    {
      field: "name",
      headerName: t("Name"),
      width: 350,
      //   cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: t("email"),
      width: 400,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: t("phone"),
      width: 350,
      headerAlign: "center",
      cellClassName: "super-app-theme--header",
    },
    {
      field: "action",
      headerAlign: "center",
      headerName: t("Message"),
      width: 100,
      renderCell: (params) => {
        hasPermission("all-contact_us") && (
          <ScrollDialog
            id={params.id}
            message={params.row.message}
            name={params.row.name}
            phone={params.row.phone}
          />
        );
      },
    },
  ];

  const tableData = {
    pageSize: pageSize,
    rows: contact,
    loading: loading,
    columns: columns,
    onPageSizeChange: (newPageSize) => setPageSize(newPageSize),
  };

  useEffect(() => {
    dispatch(getContactUs(pageSize));
  }, [dispatch, pageSize]);

  return (
    <Box m={2}>
      <Header title={t("contact-us")} />
      <CustomTableBox
        tableData={tableData}
        CustomPagenation={
          <CustomPagenation
            nextPage={next}
            firstPage={first}
            prevPage={prev}
            lastPage={last}
            currentPage={currentPage}
            pageSize={pageSize}
            action={fetchContactUsDataByPage}
          />
        }
      />
    </Box>
  );
};

export default ContactUs;
