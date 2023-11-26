import React from 'react';
import { useLocation } from 'react-router-dom';

import { Box, ButtonGroup, useTheme, Avatar, Button, Switch } from "@mui/material";

import { tokens } from "../../../../theme";
import Header from "../../../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import Editinterviews from "./Editinterviews";
import { useSidebarContext } from "../../../../pages/global/sidebar/sidebarContext";
import CustomTableBox from "../../../../components/customTableBox/CustomTableBox";
import CustomPagenation from "../../../../components/CustomPagenation/CustomPagenation";
import CustomDelete from "../../../../components/CutsomDelete/CustomDelete";
import Addinterviews from "./Addinterviews";
import { deleteinterviews, editinterviews, fetchinterviewsDataByPage, getinterviewsData,changeToggles } from "../../../redux/interviews";
import CustomToolTip from "../../../../components/CustomToolTip/customToolTip";
import hasPermission from "../../../../utils/haspermission";
import { Link, useNavigate } from "react-router-dom";
import { useState,useEffect } from 'react';
import { getEmployeesData } from '../../../redux/Employees';
function InterviewsTable(props) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [statusToggle, setStatusToggle] = useState(true);

  const idAB = searchParams.get('idAB');
  const dispatch = useDispatch();
  const nextPage = useSelector((state) => state.interviews.interviewsLinks.next);
  const lastPage = useSelector((state) => state.interviews.interviewsLinks.last);
  const prevPage = useSelector((state) => state.interviews.interviewsLinks.prev);
  const currentPage = useSelector((state) => state.interviews.currentPage);
  const firstPage = useSelector((state) => state.interviews.interviewsLinks.first);
  const { sidebarRTL } = useSidebarContext();
  const { t } = useTranslation();
  const [pageSize, setPageSize] = useState(10);
  const loading = useSelector((state) => state.interviews.loading);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const data = useSelector((state) => state.interviews.interviewsData.data || []);
  const [employee_id, setemployee_id] = useState();
  const [reason, setreason_id] = useState();
  const [type, settype_id] = useState();
  
  const [toggleStates, setToggleStates] = useState({});
  const [open, setOpen] = useState(false);


  const handleStatusToggle = (id) => {
    setToggleStates((prevStates) => {
      const currentState = prevStates[id] || ''; // Get the current state or an empty string
      const newState = currentState === 'accepted' ? 'rejected' : 'accepted';
      return {
        ...prevStates,
        [id]: newState,
      };
    });
  };

 
  let info = { pageSize: pageSize,id:idAB };
  const columns = [
    { field: "id", headerName: t("ID"), width: 150 },
    {
      field: "name",
      headerName: t("Name"),
      width: 250,
      cellClassName: "name-column--cell",
    },

    {
      field:"starts_at",
      headerName: t("starts_at"),
      width: 250,
      cellClassName: "name-column--cell",
      renderCell: (params) => (<CustomToolTip text={params.row.starts_at} />)
    },
    {
      field: "status",
      headerName: t("status"),
      width: 250,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Box>
          <Switch
            checked={toggleStates[params.row.id] === 'accepted'}
            onChange={() => handleStatusToggle(params.row.id)}
            disabled={params.row.status !== 'pending'} 
            inputProps={{ 'aria-label': 'controlled' }}
            onClick={handleApiCallToggle}

          />
          {/* Conditionally render the word based on the toggle state */}
          {toggleStates[params.row.id] && (
            <span>{toggleStates[params.row.id]}</span>
          )}
        </Box>
      ),
    },
    {
      field:"interviewer Name",
      headerName: t("interviewer"),
      width: 250,
      cellClassName: "name-column--cell",
      renderCell: (params) => (<CustomToolTip text={params.row.interviewer.name} />)
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
          {hasPermission("update-car") && (
            <Editinterviews
              sx={{
                backGround: `${colors.grey[600]}`,
              }}
              icon={<EditIcon />}
              id={params.id}
              name={params.row.name}
              status={params.row.status}
              starts_at={params.starts_at}
              applicant_id={idAB}
              interviewer_id={params.id}
            />
          )}
          {hasPermission("delete-car") && (
            <CustomDelete
              sx={{
                background: `${colors.redAccent[600]}`,
              }}
              icon={<DeleteIcon />}
              id={params.id}
              action={deleteinterviews}
              pageSize={pageSize}
              rerenderAction={getinterviewsData}
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
    dispatch(getinterviewsData(info));
  }, [dispatch, pageSize,idAB]);

/////////////////////////////////////////////////

const handleApiCall = async () => {





  const info = {
    id: idAB,
  };

  await dispatch(editinterviews(info)).then((res) =>
    res.payload.code === 201
      ? dispatch(getinterviewsData(props.pageSize)).then(setOpen(false))
      : setOpen(true)
  );
};
////////////////////////////////////////


const handleApiCallToggle = async () => {
  const handleStatusToggle = async (id) => {
    // Get the current toggle state for the specified id
    const currentState = toggleStates[id] || '';
    // Calculate the new toggle state
    const newState = currentState === 'accepted' ? 'rejected' : 'accepted';

    // Update the local state with the new toggle state
    setToggleStates((prevStates) => ({
      ...prevStates,
      [id]: newState,
    }));
  };

  // Prepare data for console log
  const interviewsToUpdate = [];
  for (const id in toggleStates) {
    if (toggleStates.hasOwnProperty(id)) {
      interviewsToUpdate.push({ id, status: toggleStates[id] });
    }
  }


  
  console.log('Data being sent:', interviewsToUpdate);

  try {
    await dispatch(changeToggles(interviewsToUpdate)).then((res) =>
      res.payload.code === 201
        ? dispatch(getinterviewsData(props.pageSize)).then(setOpen(false))
        : setOpen(true)
    );
  } catch (error) {
    console.error('Error updating toggle states:', error.message);
  }

};


////////////////////


//////////////////////////////////////////



  return (
    <div>
     
      {/* Render your interviews table with the data for the specified ID */}

      <Box m="20px">
      <Box m="20px">
        {/* ... (Your existing code) */}
      </Box>
      <Box
        display="flex"
        dir={sidebarRTL ? "rtl" : "ltr"}
        justifyContent="space-between"
        alignItems="center"
      >
          <Header title={t("Interviews With Applicants ")} />
          
        </Box>
        <h3>Number :{idAB }</h3>
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection={sidebarRTL ? "row" : "row-reverse"}
      >
        {hasPermission("store-car") && (
          <Addinterviews
            employee_id={employee_id}
            reason={reason}
            refreshTable={getinterviewsData}
            type={type}
            pageSize={pageSize}
            id={idAB}
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
            action={fetchinterviewsDataByPage}
          />
        }
      
      />
    </Box>
    </div>
  );
}

export default InterviewsTable;
