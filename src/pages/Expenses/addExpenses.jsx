import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import { useMediaQuery } from "@mui/material";
import { tokens } from "../../theme";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useSidebarContext } from "../global/sidebar/sidebarContext";
import { CustomFormikTextFeild } from "../../components/CustomFormikTextFeild/customFormikTextFeild";
import { ExpensesSchema } from "../../utils/ValidationSchema";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import { getExpensesMenu } from "../../redux/select_menus";
import CustomDialogActions from "../../components/DialogActions/DialogActions";
import { getStoreHouses } from "../../redux/storeHouse";
import { StatuseCode } from "../../statuseCodes";
import { addExpenses } from "../../redux/Expenses";

const AddExpenses = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const expensesMenu =
    useSelector((state) => state.selectMenu.expensesMenu.data) || [];
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { sidebarRTL } = useSidebarContext();
  const loading = useSelector((state) => state.selectMenu.loading);

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
    },
    validationSchema: ExpensesSchema,
    onSubmit: (values) => handleFormSubmit(values),
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = async () => {
    await dispatch(getExpensesMenu());
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };

  const handleFormSubmit = async (values) => {
    dispatch(addExpenses(values)).then((res) =>
      res.payload.code === StatuseCode.CREATED
        ? handleClose() &&
          dispatch(getStoreHouses({ pageSize: props.pageSize }))
        : setOpen(true)
    );
  };
  const setExpensesValue = (value) => {
    formik.setFieldValue("expense_type_id", value?.id);
  };

  const textFields = [
    {
      name: "name",
      value: formik.values.name,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: t("name"),
      error: !!formik.touched.name && !!formik.errors.name,
      helperText: formik.touched.name && formik.errors.name,
    },
    {
      name: "price",
      value: formik.values.price,
      handleChange: formik.handleChange,
      placeholder: t("price"),
      onBlur: formik.handleBlur,
      error: !!formik.touched.price && !!formik.errors.price,
      helperText: formik.touched.price && formik.errors.price,
    },
  ];
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
        // disabled={loading}
        variant="outlined"
        onClick={handleClickOpen}
      >
        {loading ? t("wait...") : t("Add")}
      </Button>
      <Dialog
        sx={{ width: { xs: "100%", md: "50%" }, margin: "auto", padding: "0" }}
        open={open}
        onClose={handleClose}
      >
        <DialogContent dir={sidebarRTL ? "rtl" : "ltr"}>
          <DialogTitle
            sx={{ fontWeight: "bold", fontSize: "22px" }}
            align={sidebarRTL ? "right" : "left"}
          >
            {t("expenses")}
          </DialogTitle>
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
                <label
                  style={{
                    marginTop: "1rem",
                    fontSize: "18px",
                    fontWeight: "Bold",
                  }}
                >
                  {t(item.placeholder)}
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
            <CustomSelect
              options={expensesMenu}
              lable={"TypeExpensess"}
              onChange={setExpensesValue}
            />
            <CustomDialogActions
              onClick={handleClose}
              onClickAction={formik.handleSubmit}
              text={loading ? t("wait") : t("Add")}
            />
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AddExpenses;
