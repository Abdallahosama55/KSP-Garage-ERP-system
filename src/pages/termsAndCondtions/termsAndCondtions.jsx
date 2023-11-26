import { Box, Button, useTheme } from "@mui/material";
import { useFormik } from "formik";
import { tokens } from "../../theme";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useSidebarContext } from "../global/sidebar/sidebarContext";
import { CustomFormikTextFeild } from "../../components/CustomFormikTextFeild/customFormikTextFeild";
import { TasksSchema } from "../../utils/ValidationSchema";
import { StatuseCode } from "../../statuseCodes";
import CustomLable from "../../components/CustomLable";
import { useNavigate } from "react-router-dom";
import {
  getTermsAndCondtions,
  updateTermsAndCondtions,
} from "../../redux/termsAndCondtions";
import hasPermission from "./../../utils/haspermission";

const TermsAndCondtions = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const termsAndCondtions =
    useSelector(
      (state) => state.termsAndCondtions.termsAndCondtionsData.data
    ) || [];
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);
  const { sidebarRTL } = useSidebarContext();
  const loading = useSelector((state) => state.termsAndCondtions.loading);

  const formik = useFormik({
    initialValues: {
      employee_terms: termsAndCondtions.employee_terms,
      client_terms: termsAndCondtions.client_terms,
    },
    enableReinitialize: true,
    validationSchema: TasksSchema,
    onSubmit: (values) => handleFormSubmit(values),
  });

  useEffect(() => {
    dispatch(getTermsAndCondtions());
  }, [dispatch]);

  const handleFormSubmit = async (values) => {
    dispatch(updateTermsAndCondtions(values)).then((res) =>
      res.payload.code === StatuseCode.OK
        ? dispatch(getTermsAndCondtions()) && navigate(-1)
        : null
    );
  };

  const textFields = [
    {
      name: "employee_terms",
      value: formik.values.employee_terms,
      isMulti: true,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: t("employee_terms"),
      error: !!formik.touched.employee_terms && !!formik.errors.employee_terms,
      helperText: formik.touched.employee_terms && formik.errors.employee_terms,
    },
    {
      name: "client_terms",
      value: formik.values.client_terms,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: t("client_terms"),
      error: !!formik.touched.client_terms && !!formik.errors.client_terms,
      helperText: formik.touched.client_terms && formik.errors.client_terms,
    },
  ];
  return (
    <Box m="20px">
      <form onSubmit={formik.handleSubmit} dir={sidebarRTL ? "ltr" : "rtl"}>
        {textFields.map((item, index) => (
          <Box dir={sidebarRTL ? "rtl" : "ltr"} key={index}>
            <CustomLable title={item.placeholder} />
            <CustomFormikTextFeild
              // placeholder={item.placeholder}
              onBlur={item.onBlur}
              onChange={item.handleChange}
              value={item.value}
              name={item.name}
              isMulti={item.isMulti}
              error={item.error}
              helperText={item.helperText}
            />
          </Box>
        ))}
        {hasPermission("update-terms_and_conditions") && (
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              marginTop: "2rem",
              padding: "10px 20px",
            }}
            fullWidth
            type="submit"
          >
            {loading ? t("wait") : t("save")}
          </Button>
        )}
      </form>
    </Box>
  );
};

export default TermsAndCondtions;
