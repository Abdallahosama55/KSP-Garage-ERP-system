import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, ButtonGroup, Container, useTheme } from "@mui/material";
import RoundaboutRightIcon from "@mui/icons-material/RoundaboutRight";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import EditEmployee from "./EditEmployees";
import EditEmployees from "./EditEmployees";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext";
import CustomTableBox from "../../../components/customTableBox/CustomTableBox";
import CustomPagenation from "../../../components/CustomPagenation/CustomPagenation";
import CustomDelete from "../../../components/CutsomDelete/CustomDelete";
import AddEmployees from "./AddEmployees";
import {
  deleteEmployees,
  fetchEmployeesDataByPage,
  getEmployeesData,
  getOneEmployeesData,
} from "../../redux/Employees";
import CustomToolTip from "../../../components/CustomToolTip/customToolTip";
import hasPermission from "../../../utils/haspermission";
import FiredEmployees from "./FiredEmployees";
import { Link } from "react-router-dom";
import DefaultButton from "./defaultBtn";

const EmployeesTable = () => {
  const dispatch = useDispatch();

  const dataEmploye = useSelector(
    (state) => state.Employees.EmployeesDataOne.data
  );
  const nextPage = useSelector((state) => state.Employees.EmployeesLinks.next);
  const lastPage = useSelector((state) => state.Employees.EmployeesLinks.last);
  const prevPage = useSelector((state) => state.Employees.EmployeesLinks.prev);
  const currentPage = useSelector((state) => state.Employees.currentPage);
  const firstPage = useSelector(
    (state) => state.Employees.EmployeesLinks.first
  );
  const { sidebarRTL } = useSidebarContext();
  const { t } = useTranslation();
  const [pageSize, setPageSize] = useState(10);
  const loading = useSelector((state) => state.Employees.loading);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const data = useSelector((state) => state.Employees.EmployeesData.data || []);
  const [examId, setExamId] = useState();
  let info = { pageSize: pageSize };

  const columns = [
    { field: "id", headerName: t("ID"), width: 150 },
    {
      field: " user name",
      headerName: t("name"),
      width: 250,
      cellClassName: "name-column--cell",
      renderCell: (params) => params.row.user.name,
    },
    {
      field: "job Name",
      headerName: t("job_name"),
      width: 250,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.job.name} />,
    },

    {
      field: "is_fired",
      headerName: t("Is Fired"),
      width: 250,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.is_fired} />,
    },
    {
      field: "birth_date",
      headerName: t("birth_date"),
      width: 250,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.birth_date} />,
    },
    {
      field: "military_service",
      headerName: t("military_service"),
      width: 250,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <CustomToolTip text={params.row.military_service} />
      ),
    },
    {
      field: " working_shift",
      headerName: t("working_shift_name"),
      width: 250,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <CustomToolTip text={params.row.working_shift.name} />
      ),
    },
    {
      field: " user Email",
      headerName: t("email"),
      width: 250,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.user.email} />,
    },

    {
      field: " user phone",
      headerName: t("phone"),
      width: 200,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.user.phone} />,
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
              backgroundColor: colors.greenAccent[200],
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
      width: 600,
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
          {hasPermission("update-car") && (
            <button className="btn btn-primary text-white ms-2">
              <Link to={`/contract?idAB=${params.id}`}>
                <span className="text-white">{t("contract")}</span>
              </Link>
            </button>
          )}
          <Container>
            <FiredEmployees
              
              id={params.id}
              icon={<RoundaboutRightIcon />}
              is_fired={params.row.is_fired}
            />
          </Container>

          {hasPermission("update-employees") && (
            <Link to={`/editemployee/${params.id}`}>
              <button className="m-2 bg-dark btn text-white btn-dark">
                <span>{t("Edit")}</span>
              </button>
            </Link>
          )}
          {hasPermission("delete-employees") && (
            <CustomDelete
              sx={{
                background: `${colors.redAccent[600]}`,
                margin: `90px`,
              }}
              icon={<DeleteIcon />}
              id={params.id}
              action={deleteEmployees}
              pageSize={pageSize}
              rerenderAction={getEmployeesData}
            />
          )}
        </ButtonGroup>
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
    dispatch(getEmployeesData(info));
  }, [dispatch, pageSize]);

  return (
    <Box m="20px">
      <Box
        display="flex"
        dir={sidebarRTL ? "rtl" : "ltr"}
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title={t("Employees")} />
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection={sidebarRTL ? "row" : "row-reverse"}
      >
        {hasPermission("store-car") && (
          <Link to="/Add_Employee">
            <DefaultButton text="ADD">ADD</DefaultButton>
          </Link>
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
            action={fetchEmployeesDataByPage}
          />
        }
      />
    </Box>
  );
};
export default EmployeesTable;
