import React, { useEffect, useState } from "react";
import { Box, ButtonGroup, useTheme, Avatar, Button } from "@mui/material";

import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext";
import CustomTableBox from "../../../components/customTableBox/CustomTableBox";
import CustomPagenation from "../../../components/CustomPagenation/CustomPagenation";
import CustomDelete from "../../../components/CutsomDelete/CustomDelete";
import AddApplicants from "./AddApplicants";
import {
  deleteApplicants,
  fetchApplicantsDataByPage,
  getApplicantsData,
} from "../../redux/Applicants";
import CustomToolTip from "../../../components/CustomToolTip/customToolTip";
import hasPermission from "../../../utils/haspermission";
import { Link, useNavigate } from "react-router-dom";
import DefaultButton from "./defaultBtn";
import EditApplicant from "./EditApplicants";

const ApplicantsTable = () => {
  const nav = useNavigate();

  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
  const handleViewInterview = (departmentId) => {
    setSelectedDepartmentId(departmentId);
  };
  const dispatch = useDispatch();
  const nextPage = useSelector(
    (state) => state.Applicants.ApplicantsLinks.next
  );
  const lastPage = useSelector(
    (state) => state.Applicants.ApplicantsLinks.last
  );
  const prevPage = useSelector(
    (state) => state.Applicants.ApplicantsLinks.prev
  );
  const currentPage = useSelector((state) => state.Applicants.currentPage);
  const firstPage = useSelector(
    (state) => state.Applicants.ApplicantsLinks.first
  );
  const { sidebarRTL } = useSidebarContext();
  const { t } = useTranslation();
  const [pageSize, setPageSize] = useState(10);
  const loading = useSelector((state) => state.Applicants.loading);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const data = useSelector(
    (state) => state.Applicants.ApplicantsData.data || []
  );
  const [employee_id, setemployee_id] = useState();
  const [reason, setreason_id] = useState();
  const [type, settype_id] = useState();
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
      field: "email",
      headerName: t("email"),
      width: 250,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.email} />,
    },
    {
      field: "birth_date",
      headerName: t("birth_date"),
      width: 250,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.birth_date} />,
    },
    {
      field: "status",
      headerName: t("status"),
      width: 250,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.status} />,
    },
    {
      field: "cv",
      headerName: t("cv"),
      width: 250,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <a href={params.row.cv} target="_blank" rel="noreferrer">
          <Button
            sx={{
              backgroundColor: colors.greenAccent[300],
              fontSize: "14px",
              fontWeight: "bold",

            }}
            variant="contained"
          >
            {t("cv")}
            </Button>
        </a>
      ),
    },
    {
      field: "actions",
      headerName: t("Actions"),
      width: 400,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            width:"100%",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          {hasPermission("update-applicants") && (
            <EditApplicant
              sx={{
                backGround: `${colors.grey[600]}`,
              }}
              disabled={params.row.status !== 'pending'}
              id={params.id}
              name={params.row.name}
              status={params.row.status}
            />
          )}
          {hasPermission("delete-applicants") && (
            <CustomDelete
              sx={{
                background: `${colors.redAccent[600]}`,
              }}
              icon={<DeleteIcon />}
              id={params.id}
              action={deleteApplicants}
              pageSize={pageSize}
              rerenderAction={getApplicantsData}
            />
          )}
          {hasPermission("update-applicants") && (
            <button className="btn btn-primary text-white ms-2" disabled={params.row.status !== 'pending'}>
              <Link to={`/interviews?idAB=${params.id}`}>
                <span className="text-white">{t("interviews")}</span>
              </Link>
            </button>
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
    dispatch(getApplicantsData(info));
  }, [dispatch, pageSize]);

  return (
    <Box m="20px">
      <Box m="20px">{/* ... (Your existing code) */}</Box>
      <Box
        display="flex"
        dir={sidebarRTL ? "rtl" : "ltr"}
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title={t("Applicants")} />
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection={sidebarRTL ? "row" : "row-reverse"}
      >
        {hasPermission("store-car") && (
          <AddApplicants
            employee_id={employee_id}
            reason={reason}
            type={type}
            pageSize={pageSize}
          />
        )}
      </Box>
      <CustomTableBox
        tableData={tableData}
        CustomPagenation={
          <CustomPagenation
            pageSize={pageSize}
            nextPage={nextPage}
            lastPage={lastPage}
            prevPage={prevPage}
            currentPage={currentPage}
            firstPage={firstPage}
            action={fetchApplicantsDataByPage}
          />
        }
      />
    </Box>
  );
};

export default ApplicantsTable;
