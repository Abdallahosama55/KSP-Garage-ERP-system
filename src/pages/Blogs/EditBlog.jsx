import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../global/sidebar/sidebarContext";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { useFormik } from "formik";
import { CustomFormikTextFeild } from "../../components/CustomFormikTextFeild/customFormikTextFeild";
import CustomLable from "../../components/CustomLable";
import { editBlog, getBlogs, getOneBlog } from "../../redux/Blogs";
import { StatuseCode } from "../../statuseCodes";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import { BlogsSchema } from "../../utils/ValidationSchema";

const EditBlogs = ({ id }) => {
  const { sidebarRTL } = useSidebarContext();
  const oneBlogData = useSelector((state) => state.Blogs.oneBlogData?.data);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [img, setImg] = useState("/assets/mainImg.png");
  const fileRef = useRef();
  const loading = useSelector((state) => state.Blogs.loading);

  const formik = useFormik({
    initialValues: {
      title: oneBlogData?.title,
      description: oneBlogData?.description,
      blog_image: null,
    },
    enableReinitialize: true,
    validationSchema: BlogsSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  const handleSubmit = (values) => {
    console.log(values);
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    values.blogImage !== null ??
      formData.append("blog_image", values.blog_image);
    dispatch(editBlog({ id: id, values: formData })).then((res) =>
      res.payload.code === StatuseCode.OK
        ? dispatch(getBlogs({ pageSize: 10 })).then(() => setOpen(false))
        : setOpen(true)
    );
  };

  const handleClickOpen = async () => {
    await dispatch(getOneBlog(id));
    setOpen(true);
  };
  useEffect(() => {
    setImg(oneBlogData?.blogImage);
  }, [dispatch, oneBlogData]);

  const handleChangePhoto = async (e) => {
    await formik.setFieldValue("blog_image", e.target.files[0]);
    await setImg(URL.createObjectURL(e.target.files[0]));
  };

  const handleFileRef = () => {
    fileRef.current.click();
  };
  const textField = [
    {
      name: "title",
      value: formik.values.title,
      isMulti: false,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: "title",
      error: !!formik.touched.title && !!formik.errors.title,
      helperText: formik.touched.title && formik.errors.title,
    },
    {
      name: "description",
      value: formik.values.description,
      isMulti: true,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: "description",
      error: !!formik.touched.description && !!formik.errors.description,
      helperText: formik.touched.description && formik.errors.description,
    },
  ];
  return (
    <Box dir={sidebarRTL ? "rtl" : "ltr"}>
      <Button variant="contained" onClick={handleClickOpen}>
        {t("Edit")}
      </Button>
      <Dialog
        fullWidth={true}
        sx={{ width: { xs: "100%", md: "50%" }, margin: "auto", padding: "0" }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogContent dir={sidebarRTL ? "rtl" : "ltr"}>
          <form onSubmit={formik.handleSubmit}>
            {textField.map((item, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <CustomLable title={item.name} />
                <CustomFormikTextFeild
                  placeholder={item.name}
                  isMulti={item.isMulti}
                  onBlur={item.onBlur}
                  fullWidth={true}
                  value={item.value}
                  onChange={formik.handleChange}
                  helperText={item.helperText}
                  error={item.error}
                  name={item.name}
                />
              </div>
            ))}
            <input
              type="file"
              id="fileInput"
              onChange={handleChangePhoto}
              style={{ display: "none" }}
              ref={fileRef}
            />
            <img
              src={img}
              alt="img"
              style={{ margin: "1rem auto" }}
              onClick={handleFileRef}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={() => setOpen(false)}
          >
            {t("Cancel")}
          </Button>
          {loading ? (
            <CustomLoader />
          ) : (
            <Button
              type="submit"
              onClick={formik.handleSubmit}
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 15px",
              }}
              disabled={loading}
            >
              {t("Edit")}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EditBlogs;
