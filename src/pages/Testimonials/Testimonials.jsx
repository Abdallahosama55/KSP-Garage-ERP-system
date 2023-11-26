import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Avatar, Box } from "@mui/material";
import CustomTableBox from "./../../components/customTableBox/CustomTableBox";
import { useSidebarContext } from "../global/sidebar/sidebarContext";
import Header from "../../components/Header";
import { useTranslation } from "react-i18next";
import CustomPagenation from "../../components/CustomPagenation/CustomPagenation";
import CustomDelete from "../../components/CutsomDelete/CustomDelete";
import CustomToolTip from "../../components/CustomToolTip/customToolTip";
import hasPermission from "./../../utils/haspermission";
import {
  deleteTestimonials,
  fetchTestimonialsDataByPage,
  getTestimonialsData,
} from "../../redux/Testimonials";

export const Testimonials = () => {
  const data =
    useSelector((state) => state.testimonials.getTestimonialsData.data) || [];
  const loading = useSelector((state) => state.colors.loading);
  const firstPage = useSelector(
    (state) => state.testimonials.TestimonialsLinks.first
  );
  const nextPage = useSelector(
    (state) => state.testimonials.TestimonialsLinks.next
  );
  const lastPage = useSelector(
    (state) => state.testimonials.TestimonialsLinks.last
  );
  const prevPage = useSelector(
    (state) => state.testimonials.TestimonialsLinks.prev
  );
  const currentPage = useSelector((state) => state.testimonials.currentPage);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { sidebarRTL } = useSidebarContext();
  const [pageSize, SetPageSize] = useState(10);

  const dataRef = useRef(true);
  useEffect(() => {
    dispatch(getTestimonialsData({ pageSize: pageSize }));
  }, [dispatch, pageSize, dataRef]);

  const columns = [
    {
      field: "content",
      headerName: t("content"),
      width: 620,

      renderCell: (params) => <CustomToolTip text={params.row.content} />,
    },
    {
      field: "image",
      headerName: "",
      width: 200,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => <Avatar src={params.row.image} />,
    },
    {
      field: "user_id",
      headerName: t("userName"),
      width: 200,
      renderCell: (params) => <p>{params.row.user_id.name}</p>,
    },

    {
      field: "actions",
      headerName: t("Actions"),
      width: 200,
      renderCell: (params) =>
        hasPermission("delete-testimonial") && (
          <CustomDelete
            action={deleteTestimonials}
            rerenderAction={getTestimonialsData}
            id={params.id}
            pageSize={pageSize}
          />
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
  return (
    <Box m={2}>
      <Box
        flexDirection={sidebarRTL ? "row-reverse" : "row"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title={t("Testimonials")} />
      </Box>
      <CustomTableBox
        tableData={tableData}
        CustomPagenation={
          <CustomPagenation
            action={fetchTestimonialsDataByPage}
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
  );
};
