import { useFormik } from "formik";
import React from "react";
import { settingsSchema } from "../../utils/ValidationSchema";
import { Box, Button, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../global/sidebar/sidebarContext";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editSetting, getSetting } from "../../redux/settings";
import { CustomFormikTextFeild } from "../../components/CustomFormikTextFeild/customFormikTextFeild";
import { StatuseCode } from "./../../statuseCodes";
import { tokens } from "../../theme";
import hasPermission from "./../../utils/haspermission";

const Settings = () => {
  const { t } = useTranslation();
  const { SidebarRTL } = useSidebarContext();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const settingData =
    useSelector((state) => state.settings.settingsData.data) || [];
  useEffect(() => {
    dispatch(getSetting());
  }, [dispatch]);
  const formik = useFormik({
    initialValues: {
      title: settingData?.title,
      facebook: settingData?.facebook,
      whatsapp: settingData?.whatsapp,
      youtube: settingData?.youtube,
      checking_amount: settingData?.checking_amount,
    },
    enableReinitialize: true,
    validationSchema: settingsSchema,
    onSubmit: (values) => handleFormSubmit(values),
  });
  const handleFormSubmit = (values) => {
    dispatch(editSetting(values))
      .unwrap()
      .then((res) =>
        res.code === StatuseCode.OK ? dispatch(getSetting()) : null
      );
  };
  const textFieldsArray = [
    {
      name: "title",
      value: formik.values.title,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: t("title"),
      error: !!formik.touched.title && !!formik.errors.title,
      helperText: formik.touched.title && formik.errors.title,
    },
    {
      name: "facebook",
      value: formik.values.facebook,
      handleChange: formik.handleChange,
      placeholder: t("facebook"),
      onBlur: formik.handleBlur,
      error: !!formik.touched.facebook && !!formik.errors.facebook,
      helperText: formik.touched.facebook && formik.errors.facebook,
    },
    {
      name: "whatsapp",
      value: formik.values.whatsapp,
      placeholder: t("whatsapp"),
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      error: !!formik.touched.whatsapp && !!formik.errors.whatsapp,
      helperText: formik.touched.whatsapp && formik.errors.whatsapp,
    },
    {
      name: "youtube",
      value: formik.values.youtube,
      placeholder: t("youtube"),
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      error: !!formik.touched.youtube && !!formik.errors.youtube,
      helperText: formik.touched.youtube && formik.errors.youtube,
    },
    {
      name: "checking_amount",
      value: formik.values.checking_amount,
      placeholder: t("checking_amount"),
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      error:
        !!formik.touched.checking_amount && !!formik.errors.checking_amount,
      helperText:
        formik.touched.checking_amount && formik.errors.checking_amount,
    },
  ];
  return (
    <Box m={2} dir={SidebarRTL ? "rtl" : "ltr"}>
      <Header title={t("settings")} />
      <form onSubmit={formik.handleSubmit}>
        {textFieldsArray.map((item, index) => (
          <Box key={index} sx={{ margin: "2rem" }}>
            <label
              style={{ fontWeight: "bold", fontSize: "16px", margin: ".5rem" }}
            >
              {item.name}
            </label>
            <CustomFormikTextFeild
              placeholder={t(item.placeholder)}
              onBlur={item.onBlur}
              onChange={item.handleChange}
              value={item.value}
              name={item.name}
              error={item.error}
              helperText={item.helperText}
            />
          </Box>
        ))}
        {hasPermission("update-settings") && (
          <Button
            fullWidth
            sx={{
              background: colors.blueAccent[600],
              color: colors.grey[100],
              fontSize: "16px",
              fontWeight: "bold",
              margin: ".5rem auto",
            }}
            type="submit"
          >
            {t("Save")}
          </Button>
        )}
      </form>
    </Box>
  );
};

export default Settings;
