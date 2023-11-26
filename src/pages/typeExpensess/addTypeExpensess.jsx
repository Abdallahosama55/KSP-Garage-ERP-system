import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DefaultButton from "./defaultBtn";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../global/sidebar/sidebarContext";
import CustomDialogActions from "../../components/DialogActions/DialogActions";
import { addTypeExpensess, getTypeExpensess } from "../../redux/TypeExpensess";
import { StatuseCode } from "../../statuseCodes";

const validationSchema = Yup.object().shape({
  name: Yup.string().trim().required("Name is required"),
});

const AddTypeExpensess = ({ icon, pageSize, show }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const { sidebarRTL } = useSidebarContext();

  const info = {
    pageSize,
  };

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      await dispatch(addTypeExpensess(values)).then((res) =>
        res.payload.code === StatuseCode.CREATED
          ? dispatch(getTypeExpensess(info)) && handleClose()
          : setOpen(true)
      );
    },
  });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
        onClose={handleClose}
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
        </DialogContent>
        <CustomDialogActions
          onClick={handleClose}
          onClickAction={formik.handleSubmit}
          text={"add"}
        />
      </Dialog>
    </div>
  );
};
export default AddTypeExpensess;
