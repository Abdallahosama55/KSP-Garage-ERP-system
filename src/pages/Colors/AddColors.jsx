import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../global/sidebar/sidebarContext";
import DefaultButton from "./defaultBtn";
import ColorInput from "./colorInput";
import { addColors, getColors } from "../../redux/colors";
import { StatuseCode } from "./../../statuseCodes";

const validationSchema = Yup.object().shape({
  name: Yup.string().trim().required("Name is required"),
});

const AddColors = ({ icon, pageSize, show }) => {
  const { t } = useTranslation();
  const [colorValue, setColorValue] = useState("");
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const { sidebarRTL } = useSidebarContext();

  const formik = useFormik({
    initialValues: {
      name: "",
      code: colorValue,
    },
    validationSchema,
    onSubmit: async (values) => handleSubmit(values),
  });
  const handleSuccessClose = () => {
    dispatch(getColors({ pageSize }));
    setOpen(false);
    formik.resetForm();
  };
  const handleSubmit = async (values) => {
    const data = {
      name: values.name,
      code: values.code,
    };
    await dispatch(addColors(data)).then((res) => {
      res.payload.code === StatuseCode.CREATED && handleSuccessClose();
    });
  };
  const handleClickOpen = () => {
    setOpen(true);
    formik.resetForm();
  };
  return (
    <div>
      <DefaultButton
        show={show}
        handleClick={handleClickOpen}
        text={t("Add")}
      />
      <Dialog
        fullWidth={true}
        sx={{ width: { xs: "100%", md: "50%" }, margin: "auto", padding: "0" }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogContent dir={sidebarRTL ? "rtl" : "ltr"}>
          <label style={{ fontSize: "18px", fontWeight: "Bold" }}>
            {t("Name")}
          </label>
          <TextField
            autoFocus
            margin="dense"
            placeholder={t("Name")}
            type="text"
            fullWidth
            variant="outlined"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            dir={sidebarRTL ? "rtl" : "ltr"}
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: colors.blueAccent[700],
                },
            }}
            inputProps={{
              style: { fontSize: "18px", fontWeight: "bold" }, // Adjust the font size here
            }}
          />
          <ColorInput
            setValueFeild={formik.setFieldValue}
            setColorValue={setColorValue}
          />
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
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 15px",
            }}
            disabled={!formik.isValid || formik.isSubmitting}
            onClick={formik.handleSubmit}
            endIcon={icon}
          >
            {t("Add")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddColors;
