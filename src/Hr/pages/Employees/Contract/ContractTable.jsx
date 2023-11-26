import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Button,
  ButtonGroup,
  TextField,
  useTheme,
} from "@mui/material";
import { tokens } from "../../../../theme";
import AddIcon from "@mui/icons-material/Add";
import Header from "../../../../components/Header";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../../../../pages/global/sidebar/sidebarContext";
import CustomTableBox from "../../../../components/customTableBox/CustomTableBox";
import CustomPagenation from "../../../../components/CustomPagenation/CustomPagenation";
import { deleteContract, fetchContractDataByPage, getContractData, AddContract } from "../../../redux/Contract";
import CustomDelete from '../../../../components/CutsomDelete/CustomDelete';
import AddContractComponent from "./AddContract";
import EditContract from "./EditContract";

const ContractTable = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const idAB = searchParams.get('idAB');
  const nextPage = useSelector((state) => state.Contract.ContractLinks.next);
  const lastPage = useSelector((state) => state.Contract.ContractLinks.last);
  const prevPage = useSelector((state) => state.Contract.ContractLinks.prev);
  const firstPage = useSelector((state) => state.Contract.ContractLinks.first);
  const currentPage = useSelector((state) => state.Contract.currentPage);

  const { t } = useTranslation();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [pageSize, setPageSize] = useState(10);
  const [id, setid] = useState(idAB);

  const { sidebarRTL } = useSidebarContext();

  useEffect(() => {
    dispatch(getContractData({ pageSize, id }));
  }, [dispatch, pageSize, id]);

  const data = useSelector((state) => state.Contract.ContractData) || [];
  const loading = useSelector((state) => state?.Contract?.loading);

  const columns = [
    // ... your columns configuration
  ];

  const tableData = {
    rows: data.length > 0 && data,
    columns: columns,
    loading: loading === true,
    pageSize: pageSize,
    id: idAB,
    onPageSizeChange: (newPageSize) => setPageSize(newPageSize),
  };

  return (
    <Box m="20px">
      <h1>employee id: {idAB}</h1>
      <Box
        flexDirection={sidebarRTL ? "row-reverse" : "row"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title={t("Contract")} />
        <AddContractComponent pageSize={pageSize} icon={<AddIcon />} />
      </Box>
      <CustomTableBox
        tableData={tableData}
        CustomPagenation={
          <CustomPagenation
            pageSize={pageSize}
            nextPage={nextPage}
            lastPage={lastPage}
            prevPage={prevPage}
            firstPage={firstPage}
            currentPage={currentPage}
            action={fetchContractDataByPage}
          />
        }
      />
    </Box>
  );
};

export default ContractTable;
