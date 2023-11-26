import React, { useState } from "react";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import { useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../global/sidebar/sidebarContext";
import { CustomFormikTextFeild } from "../../components/CustomFormikTextFeild/customFormikTextFeild";
import { StatuseCode } from "../../statuseCodes";
import { useNavigate } from "react-router-dom";
import CustomLable from "../../components/CustomLable";
import { SubmitButton } from "../../components/SubmitButton";
import { adsSchema } from "../../utils/ValidationSchema";
import { addAds, getAds } from "../../redux/ads";

const AddAds = () => {
  const [adImg, setAdImg] = useState(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { sidebarRTL } = useSidebarContext();
  const loading = useSelector((state) => state.ads.loading);

  const formik = useFormik({
    initialValues: {
      title: "",
      discount: "",
      description: "",
    },
    enableReinitialize: true,
    validationSchema: adsSchema,
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  const handleFormSubmit = async (values) => {
    const pageSize = 10;
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("discount", values.discount);
    formData.append("description", values.description);
    formData.append("image", adImg);
    try {
      await dispatch(addAds(formData)).then((res) => {
        if (res.payload.code === StatuseCode.CREATED) {
          dispatch(getAds({ pageSize: pageSize }));
          formik.resetForm();
          navigate(-1);
        }
      });
    } catch (error) {
      throw error;
    }
  };

  const textFields = [
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
      name: "discount",
      value: formik.values.discount,
      handleChange: formik.handleChange,
      placeholder: t("discount"),
      onBlur: formik.handleBlur,
      error: !!formik.touched.discount && !!formik.errors.discount,
      helperText: formik.touched.discount && formik.errors.discount,
    },
    {
      name: "description",
      value: formik.values.description,
      placeholder: t("description"),
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      error: !!formik.touched.description && !!formik.errors.description,
      helperText: formik.touched.description && formik.errors.description,
    },
  ];
  const [ShowAdImg, setShowAdImg] = useState("");
  const handleFileChange = (e) => {
    console.log(e);
    setAdImg(e.target.files[0]);

    setShowAdImg(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <Box m="20px">
      <form onSubmit={formik.handleSubmit} dir={sidebarRTL ? "ltr" : "rtl"}>
        {textFields.map((item, index) => (
          <Box
            key={index}
            dir={sidebarRTL ? "rtl" : "ltr"}
            display="grid"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <CustomLable title={item.placeholder} />
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
        <Box>
          <input type="file" onChange={handleFileChange} />
          {ShowAdImg !== "" ? <img src={ShowAdImg} alt="ad Img" /> : null}
        </Box>
        <SubmitButton loading={loading} text="add" />
      </form>
    </Box>
  );
};

export default AddAds;
