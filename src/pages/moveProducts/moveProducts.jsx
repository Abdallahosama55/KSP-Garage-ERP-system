import { Box, Button, useTheme } from "@mui/material";
import { useFormik } from "formik";
import { tokens } from "../../theme";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../global/sidebar/sidebarContext";
import { useEffect } from "react";
import {
  getStoreHousesMenu,
  getStoreHousesProductMenu,
} from "../../redux/select_menus";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import InputNumber from "../../components/CustomNumberInput/CustomNubmerInput";
import CustomLable from "../../components/CustomLable";
import { useState } from "react";
import { move_products } from "../../redux/product";

const MoveProducts = () => {
  const storeHouseProductMenu =
    useSelector((state) => state.selectMenu.storeHouseProductsMenu?.data) || [];
  const sotreHouseMenu =
    useSelector((state) => state.selectMenu.storeHouseMenu.data) || [];
  const [selectedStore, setSelectedStore] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productCount, setProductCount] = useState(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { sidebarRTL } = useSidebarContext();

  useEffect(() => {
    // Your existing code here
    dispatch(getStoreHousesMenu());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getStoreHousesProductMenu(selectedStore));
  }, [dispatch, selectedStore]);

  const formik = useFormik({
    initialValues: {
      from_storehouse: "",
      to_storehouse: "",
      quantity: null,
    },
    enableReinitialize: true,
    // validationSchema: VisitorsCarsSchema,
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  const handleFormSubmit = async (values) => {
    const info = {
      id: selectedProduct,

      from_storehouse: values.from_storehouse,
      to_storehouse: values.to_storehouse,
      quantity: productCount,
    };
    await dispatch(move_products(info));
  };

  const handleSelectSotreChange = (item) => {
    formik.setFieldValue("from_storehouse", item?.id);
    setSelectedStore(item?.id);
  };
  const handleToStoreChange = (item) => {
    formik.setFieldValue("to_storehouse", item?.id);
  };

  const handleSelectProduct = (item) => {
    setSelectedProduct(item.id);
  };
  const handleNumber = (val) => {
    setProductCount(val);
    // console.log(val)
  };
  return (
    <Box m="20px">
      <form onSubmit={formik.handleSubmit} dir={sidebarRTL ? "ltr" : "rtl"}>
        <Box>
          <CustomLable title={t("from_storeHouse")} />
          <CustomSelect
            placeholder="Select an option"
            onChange={handleSelectSotreChange}
            options={sotreHouseMenu}
            // isDisabled={!sotreHouseMenu.length?true:false}
          />
        </Box>
        <Box>
          <CustomLable title={t("product")} />
          <CustomSelect
            placeholder="Select an option"
            onChange={handleSelectProduct}
            options={storeHouseProductMenu}
          />
        </Box>
        <Box>
          <CustomLable title={t("to_storeHouse")} />
          <CustomSelect
            placeholder="Select an option"
            onChange={handleToStoreChange}
            selected={{ id: selectedStore, disable: true }}
            options={sotreHouseMenu}
          />
        </Box>
        <Box
          dir={sidebarRTL ? "rtl" : "ltr"}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CustomLable title={t("quantity")} />
          <InputNumber onChange={handleNumber} />
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button
            type="submit"
            fullWidth
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            variant="outlined"
          >
            {t("save")}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default MoveProducts;
