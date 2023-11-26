import { Box, Button, Dialog, DialogContent, useTheme } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMediaQuery } from "@mui/material";
import { tokens } from "../../theme";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useSidebarContext } from "../global/sidebar/sidebarContext";
import CustomSelectMenu from "../../components/CustomSelect/CustomSelect";
import CustomLable from "../../components/CustomLable";
import { CustomFormikTextFeild } from "../../components/CustomFormikTextFeild/customFormikTextFeild";
import { getPenalty } from "../../Hr/redux/allowancePenaltyTypes";
import { useRef } from "react";
import { useEffect } from "react";
import {
  getEmployeeAllowances,
  getMyManagermenu,
} from "../../redux/select_menus";
import { addEmployeeAllowances } from "../../Hr/redux/employee_allowances";
const AddAllowances = () => {
  const EmployeePenalties = useSelector(
    (state) => state.selectMenu.EmployeeAllowances.data
  );
  const Employee = useSelector((state) => state.selectMenu.MyManagermenu.data);
  console.log("EmployeePenalties", EmployeePenalties);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { sidebarRTL } = useSidebarContext();
  const loading = useSelector((state) => state.cars.loading);

  const checkoutSchema = yup.object().shape({
    name: yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      reason: "",
      amount: "",
    },
    // validationSchema: checkoutSchema,
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };

  const handleFormSubmit = async (values) => {
    await dispatch(addEmployeeAllowances(values)).then((res) => {
      dispatch(getPenalty({ pageSize: 10 }));
      handleClose();
    });
  };

  const handleEmployeePenaltiesChange = (value) => {
    formik.setFieldValue("allowance_penalty_type_id", value?.id);
  };
  const handleEmployeeChange = (value) => {
    formik.setFieldValue("employee_id", value?.id);
  };

  const employeeRef = useRef(true);
  useEffect(() => {
    dispatch(getEmployeeAllowances());
    dispatch(getMyManagermenu());
  }, [employeeRef, dispatch]);
  return (
    <Box m="20px">
      <Button
        sx={{
          backgroundColor: colors.blueAccent[700],
          color: colors.grey[100],
          fontSize: "14px",
          fontWeight: "bold",
          padding: "10px 20px",
        }}
        variant="outlined"
        onClick={handleClickOpen}
        endIcon={<AddIcon />}
      >
        {t("Add")}
      </Button>
      <Dialog
        sx={{ width: { xs: "100%", md: "50%" }, margin: "auto", padding: "0" }}
        open={open}
        onClose={handleClose}
      >
        <DialogContent dir={sidebarRTL ? "rtl" : "ltr"}>
          <form onSubmit={formik.handleSubmit} dir={sidebarRTL ? "ltr" : "rtl"}>
            <CustomSelectMenu
              lable={"Employee"}
              options={Employee}
              onChange={handleEmployeeChange}
            />
            <CustomSelectMenu
              lable={"EmployeePenalties"}
              options={EmployeePenalties}
              onChange={handleEmployeePenaltiesChange}
            />
            <Box
              dir={sidebarRTL ? "rtl" : "ltr"}
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <CustomLable title="amount" />
              <CustomFormikTextFeild
                fullWidth
                variant="outlined"
                type="text"
                placeholder={t("amount")}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.amount}
                name="amount"
                error={!!formik.touched.amount && !!formik.errors.amount}
                helperText={formik.touched.amount && formik.errors.amount}
              />
            </Box>
            <Box
              dir={sidebarRTL ? "rtl" : "ltr"}
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <CustomLable title="reason" />
              <CustomFormikTextFeild
                fullWidth
                variant="outlined"
                type="text"
                placeholder={t("reason")}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.reason}
                name="reason"
                error={!!formik.touched.reason && !!formik.errors.reason}
                helperText={formik.touched.reason && formik.errors.reason}
              />
            </Box>
            <Box
              dir={sidebarRTL ? "rtl" : "ltr"}
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            ></Box>
            <Box display="flex" width="100%" justifyContent="end" mt="20px">
              <Button
                variant="contained"
                fullWidth
                type="submit"
                sx={{
                  backgroundColor: colors.blueAccent[700],
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                }}
                disabled={loading}
                onClick={handleClickOpen}
              >
                {loading ? t("wait") : t("Add")}
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AddAllowances;
