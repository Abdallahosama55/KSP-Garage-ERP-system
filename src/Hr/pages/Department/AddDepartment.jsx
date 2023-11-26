import {
  Box,
  Button,
  Dialog,
  DialogContent,
  TextField,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMediaQuery } from "@mui/material";
import { tokens } from "../../../theme";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { addDepartment, getDepartmentData    ,} from "../../redux/Department";
import { useState } from "react";

import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext";
import CustomSelectMenu from "./../../../components/CustomSelect/CustomSelect";
import { useEffect } from "react";
import {getMyManagermenu} from "../../../redux/select_menus";

const AddDepartment = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const managers = useSelector((state) => state.selectMenu.MyManagermenu.data) || [];

  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { sidebarRTL } = useSidebarContext();
  const loading = useSelector((state) => state.Department.loading);

  const checkoutSchema = yup.object().shape({
    name: yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      manager_id: "",
    },
    validationSchema: checkoutSchema,
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
  useEffect(() => {
    // dispatch(getFullMarkGrades());
    dispatch(getMyManagermenu());
  }, [dispatch]);
  const handleFormSubmit = async (values) => {
    const info = {
      id: props.pageSize,
    };
    const formData = {
      ...values,
    };
    await dispatch(addDepartment(formData)).then((res) => {
      dispatch(getDepartmentData(info));
      handleClose();
    });
  };

  const handlemanagerChange = (value) => {
    formik.setFieldValue("manager_id", value?.id);
  };

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
              lable={"select_manager"}
              options={managers}
              onChange={handlemanagerChange}
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
              <label
                style={{ fontSize: "18px", fontWeight: "Bold", width: "10rem" }}
              >
                {t("name")}
              </label>
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                placeholder={t("name")}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
                name="name"
                error={!!formik.touched.name && !!formik.errors.name}
                helperText={formik.touched.name && formik.errors.name}
                dir={sidebarRTL ? "rtl" : "ltr"}
                sx={{ gridColumn: "span 10" }}
                inputProps={{
                  style: { fontSize: "18px", fontWeight: "bold" }, // Adjust the font size here
                }}
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
                  color: colors.grey[100],
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

export default AddDepartment;
