import { Box } from "@mui/material";
import { useFormik } from "formik";
import { useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { React } from "react";
import { useSidebarContext } from "../global/sidebar/sidebarContext";
import { CustomFormikTextFeild } from "../../components/CustomFormikTextFeild/customFormikTextFeild";
import { addStoreHouseSchema } from "../../utils/ValidationSchema";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import { getEmployeesMenu, getGaragesMenu } from "../../redux/select_menus";
import {
  OneSotreHouse,
  editStoreHouse,
  getStoreHouses,
} from "../../redux/storeHouse";
import { StatuseCode } from "../../statuseCodes";
import { useNavigation, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useRef } from "react";
import DefaultButton from "../../components/defaultBtn";

const EditStoreHouse = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const oneStoreHouseData =
    useSelector((state) => state.storeHouse.OneSotreHouseData.data) || [];
  const employeesMenu =
    useSelector((state) => state.selectMenu.employeesMenu.data) || [];
  const garagesMenu =
    useSelector((state) => state.selectMenu.garagesMenu.data) || [];
  const navigate = useNavigation();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { sidebarRTL } = useSidebarContext();

  const MenuRef = useRef(true);
  useEffect(() => {
    dispatch(getEmployeesMenu());
    dispatch(getGaragesMenu());
  }, [dispatch, MenuRef]);

  const oneStoreRef = useRef(true);
  useEffect(() => {
    dispatch(OneSotreHouse(id));
  }, [dispatch, id, oneStoreRef]);

  const formik = useFormik({
    initialValues: {
      name: oneStoreHouseData.name || "",
      phone: oneStoreHouseData.phone || "",
      address: oneStoreHouseData.address || "",
      manager_id: oneStoreHouseData.manager?.id || null,
      garage_id: oneStoreHouseData.garage?.id || null,
    },
    enableReinitialize: true,
    validationSchema: addStoreHouseSchema,
    onSubmit: (values) => handleFormSubmit(values),
  });

  const handleFormSubmit = async (values) => {
    const info = {
      values: {
        ...values,
        phone: parseInt(values.phone),
      },
      id: id,
    };
    dispatch(editStoreHouse(info))
      .unwrap()
      .then(
        (res) =>
          res.code === StatuseCode.OK ??
          dispatch(getStoreHouses({ pageSize: 10 })).then(() =>
            navigate(-1, { replace: true })
          )
      );
  };

  const setManagerValue = (value) => {
    formik.setFieldValue("manager_id", value?.id);
  };
  const setGarageValue = (value) => {
    formik.setFieldValue("garage_id", value?.id);
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
      name: "phone",
      value: formik.values.phone,
      handleChange: formik.handleChange,
      placeholder: t("phone"),
      onBlur: formik.handleBlur,
      error: !!formik.touched.phone && !!formik.errors.phone,
      helperText: formik.touched.phone && formik.errors.phone,
    },
    {
      name: "address",
      value: formik.values.address,
      placeholder: t("address"),
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      error: !!formik.touched.address && !!formik.errors.address,
      helperText: formik.touched.address && formik.errors.address,
    },
  ];

  return (
    <Box m="20px">
      <Box dir={sidebarRTL ? "rtl" : "ltr"}>
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
                default={item?.value}
                value={item.value}
                name={item.name}
                error={item.error}
                helperText={item.helperText}
              />
            </Box>
          ))}

          <CustomSelect
            options={garagesMenu}
            defaultData={oneStoreHouseData?.garage_id}
            onChange={setGarageValue}
            lable={"select_garage"}
          />
          <CustomSelect
            lable={"select_manager"}
            options={employeesMenu}
            defaultData={oneStoreHouseData?.manager_id}
            onChange={setManagerValue}
          />
          <DefaultButton
            fullWidth={true}
            handleClick={formik.handleSubmit}
            text="Edit"
          />
        </form>
      </Box>
    </Box>
  );
};

export default EditStoreHouse;
