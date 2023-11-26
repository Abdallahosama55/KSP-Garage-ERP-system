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
import { DamagedMaterialsSchema } from "../../utils/ValidationSchema";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import {
  getStoreHousesMenu,
  getStoreHousesProductMenu,
} from "../../redux/select_menus";
import CustomDialogActions from "../../components/DialogActions/DialogActions";
import { StatuseCode } from "../../statuseCodes";
import {
  addDamagedMaterials,
  getDamagedMaterials,
} from "../../redux/DamagedMaterials";

const AddDamagedMaterials = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const storeHouseMenu =
    useSelector((state) => state.selectMenu.storeHouseMenu.data) || [];
  console.log("storeHouseMenu", storeHouseMenu);
  const storeHouseProductsMenu =
    useSelector((state) => state.selectMenu.storeHouseProductsMenu.data) || [];
  console.log("storeHouseProductMenu", storeHouseProductsMenu);
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { sidebarRTL } = useSidebarContext();
  const loading = useSelector((state) => state.selectMenu.loading);
  const [storeHouse, setStoreHouse] = useState(null);
  console.log("storeHouse", storeHouse);
  const formik = useFormik({
    initialValues: {
      quantity: "",
    },
    validationSchema: DamagedMaterialsSchema,
    onSubmit: (values) => handleFormSubmit(values),
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = async () => {
    await dispatch(getStoreHousesMenu());
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };

  const handleFormSubmit = async (values) => {
    dispatch(addDamagedMaterials(values)).then((res) =>
      res.payload.code === StatuseCode.CREATED
        ? dispatch(getDamagedMaterials({ pageSize: 10, dateFilter: "" })).then(
            handleClose()
          )
        : setOpen(true)
    );
  };

  const setSelectedStoreHouse = async (value) => {
    try {
      await formik.setFieldValue("storehouse_id", value?.id);
      await dispatch(dispatch(getStoreHousesProductMenu(value?.id)));
      await setStoreHouse(value?.id);
    } catch (error) {
      console.log(error);
    }
  };
  const setSelectedProduct = (value) => {
    formik.setFieldValue("product_id", value?.id);
  };

  const textFields = [
    {
      name: "quantity",
      value: formik.values.quantity,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: t("quantity"),
      error: !!formik.touched.quantity && !!formik.errors.quantity,
      helperText: formik.touched.quantity && formik.errors.quantity,
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
        disabled={loading}
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
          <form onSubmit={formik.handleSubmit} dir={sidebarRTL ? "ltr" : "rtl"}>
            {textFields.map((item, index) => (
              <Box
                key={index}
                dir={sidebarRTL ? "rtl" : "ltr"}
                display="grid"
                gap="30px"
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
              lable={"select_store_house"}
              options={storeHouseMenu}
              onChange={setSelectedStoreHouse}
            />
            <CustomSelect
              lable={"select_store_house_product"}
              isDisabled={!storeHouseProductsMenu.length}
              options={storeHouseProductsMenu}
              onChange={setSelectedProduct}
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

export default AddDamagedMaterials;
