import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import defaultAPI from "../../axiosInstance";
import { useSidebarContext } from "../global/sidebar/sidebarContext";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import ColorInput from "./colorInput";
import { StatuseCode } from './../../statuseCodes';
import { getColors } from "../../redux/colors";

const validationSchema = Yup.object().shape({
  name: Yup.string().trim().required("Name is required"),
});

const EditColors = ({ icon, sx, id, pageSize }) => {
    const { t } = useTranslation();
    const [loading,setLoading] = useState(false)
    const [colorValue, setColorValue] = useState("");

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const info = {
    id,
    pageSize,
  };

  const handleClickOpen = async () => {
    const apiUrl = `/admin/colors/${id}`;
      try {
        setLoading(true)
      const res = await defaultAPI.get(apiUrl);
      await formik.setFieldValue("name", res.data.data.name);
      await formik.setFieldValue("code", res.data.data.code);
        await setColorValue(res.data.data.code);
          setOpen(true);
          res&&
        setLoading(false)
    } catch (error) {
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
            name: "",
            code:""
    },
    validationSchema,
    onSubmit: (values) => handleSubmit(values)
  })

  const handleSubmit = async (values) => {
    await defaultAPI.put(`/admin/colors/${id}`, { name: values.name, code:values.code }).then(res => {
      res.data.code === StatuseCode.OK && handleClose()
    }).then(() => {
      dispatch(getColors(info))
    })
  };

  const { sidebarRTL } = useSidebarContext();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <div>
      <Button disabled={loading} variant="contained" onClick={handleClickOpen} sx={sx} endIcon={icon}>
        {t("Edit")}
      </Button>
      <Dialog
        fullWidth={true}
        open={open}
        onClose={handleClose}
        sx={{
          width: { xs: "100%", md: "50%" },
          margin: "auto",
          padding: "0",
        }}
      >
        <DialogTitle sx={{ fontWeight: "bold", fontSize: "22px" }} align={sidebarRTL ? "right" : "left"}>{t("Edit")}</DialogTitle>
        <DialogContent dir={sidebarRTL?"rtl":"ltr"}>
            <label dir={sidebarRTL?"rtl":"ltr"} style={{fontSize:"18px",fontWeight: "Bold"}}>{t("Name")}</label>          <TextField
            autoFocus
            margin="dense"
            id="name"
            placeholder={t("Name")}
            type="text"
            fullWidth
            variant="outlined"
            {...formik.getFieldProps("name")}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            dir={sidebarRTL ? "rtl" : "ltr"}
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: colors.blueAccent[700],
              }
            }}
            inputProps={{
              style: { fontSize: "18px", fontWeight: "bold" }, // Adjust the font size here
            }}
                />
                  <ColorInput
                      defaultValue={colorValue}
                      setValueFeild={formik.setFieldValue}
                      setColorValue={setColorValue} />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            {t("Cancel")}
          </Button>
          <Button
            variant="contained"
            onClick={formik.handleSubmit}
            disabled={ formik.isSubmitting}
          >
            {t("Edit")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditColors;
