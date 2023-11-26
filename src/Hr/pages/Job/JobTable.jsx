import React, { useEffect, useState } from "react";
import { Box, ButtonGroup, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import EditJob from "./EditJob";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext";
import CustomTableBox from "../../../components/customTableBox/CustomTableBox";
import CustomPagenation from "../../../components/CustomPagenation/CustomPagenation";
import CustomDelete from "../../../components/CutsomDelete/CustomDelete";
import AddJob from "./AddJob";
import {  deleteJob, fetchJobDataByPage, getJobData } from "../../redux/Job";
import CustomToolTip from "../../../components/CustomToolTip/customToolTip";
import hasPermission from "../../../utils/haspermission";
import { Link } from "react-router-dom";

const JobTable = () => {
  const dispatch = useDispatch()
  const nextPage = useSelector((state) => state.Job.JobLinks.next);
  const lastPage = useSelector((state) => state.Job.JobLinks.last);
  const prevPage = useSelector((state) => state.Job.JobLinks.prev);
  const currentPage = useSelector((state) => state.Job.currentPage);
  const firstPage = useSelector((state) => state.Job.JobLinks.first);
  const { sidebarRTL } = useSidebarContext();
  const { t } = useTranslation();
  const [pageSize, setPageSize] = useState(10);
  const loading = useSelector((state) => state.Job.loading);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const data = useSelector(
    (state) => state.Job.JobData.data||[]
  );
console.log(data)
  let info={pageSize:pageSize
    
  }

  const columns = [
    { field: "id", headerName: t("ID"), width: 150 },
    {
      field: "name",
      headerName: t("Name"),
      width: 250,
      cellClassName: "name-column--cell",
    },
    {
      field: "department name",
      headerName: t("department name"),
      width: 250,
      cellClassName: "name-column--cell",
      renderCell:params=>(<CustomToolTip text={params.row.department.name} />)
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
                  justifyContent: "space-evenly",
                  width: "100%",
                }}
            >
          
              {hasPermission("update-working_jobs") && (
                
                <EditJob
                  sx={{
                    backGround: `${colors.grey[600]}`,
                  }}
                  id={params.id}
                
                  icon={<EditIcon />}
                  department_id={params.row.department.id}
                  name={params.row.name}
                  
                 
                
                />
              )}
           
              {hasPermission("delete-working_jobs") && (
                <CustomDelete
                  sx={{
                    background: `${colors.redAccent[600]}`,
                  }}
                  icon={<DeleteIcon />}
                  id={params.id}
                  action={deleteJob}
                  pageSize={pageSize}
                  rerenderAction={getJobData}
                />
              )}
              </ButtonGroup>
            ),
          },
  ];
  const tableData = {
    rows: data.length > 0 &&  data,
    columns: columns,
    loading: loading,
    pageSize: pageSize,
    onPageSizeChange: (newPageSize) => setPageSize(newPageSize),
  };
  useEffect(() => {
    dispatch(getJobData(info));
  },[dispatch, pageSize])
  return (
    <Box m="20px">
      <Box
        display="flex"
        dir={sidebarRTL ? "rtl" : "ltr"}
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title={t("Jobs")} />
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection={sidebarRTL ? "row" : "row-reverse"}
      >
        {hasPermission("store-car") && (
          <AddJob
           
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
            action={fetchJobDataByPage}
          />
        }
      />
    </Box>
  );
};
export default JobTable;
