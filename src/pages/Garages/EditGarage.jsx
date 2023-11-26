import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../global/sidebar/sidebarContext";
import {
  editGarage,
  getEmployeeMenu,
  getGarages,
  getOneGarage,
} from "../../redux/garages";
import CustomMultiSelectMenu from "../../components/CustomMultiSelectMenu/CustomMultiSelectMenu";
import CustomSelectMenu from "../../components/CustomSelect/CustomSelect";
import { StatuseCode } from "./../../statuseCodes";
import { Box } from "@mui/material";
import CustomLable from "../../components/CustomLable";
import { CustomFormikTextFeild } from "./../../components/CustomFormikTextFeild/customFormikTextFeild";
import { useFormik } from "formik";
import DefaultButton from "../../components/defaultBtn";
import { useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";
import CustomLoader from "../../components/CustomLoader/CustomLoader";

const EditGarage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const oneGarageData = useSelector((state) => state.garages.oneGarage.data);
  const loading = useSelector((state) => state.garages.loading);
  const { t } = useTranslation();
  const { sidebarRTL } = useSidebarContext();
  const dispatch = useDispatch();
  const employeedata =
    useSelector((state) => state.garages.employeeMenu.data) || [];
  const oneGarageRef = useRef(true);
  useEffect(() => {
    dispatch(getOneGarage(id));
  }, [dispatch, id, oneGarageRef]);

  const EmpMenuRef = useRef(true);
  useEffect(() => {
    if (oneGarageData?.manager_id) {
      dispatch(getEmployeeMenu({ managerId: oneGarageData?.manager_id || "" }));
    }
  }, [dispatch, EmpMenuRef, oneGarageData]);

  const formik = useFormik({
    initialValues: {
      name: oneGarageData?.name,
      employees: oneGarageData?.garage_employees,
      manager_id:
        oneGarageData?.manager_id ?? parseInt(oneGarageData?.manager_id),
      address: oneGarageData?.address,
      phone: oneGarageData?.phone ? parseInt(oneGarageData?.phone) : null,
    },
    enableReinitialize: true,
    onSubmit: async (values) => handleSubmit(values),
  });

  const handleSubmit = async (values) => {
    const info = {
      pageSize: 10,
      id: id,
      values: {
        ...values,
      },
    };
    await dispatch(editGarage(info)).then((res) => {
      res.payload.code === StatuseCode.OK ??
        dispatch(getGarages(info)).then(() => navigate(-1, { replace: true }));
    });
  };

  const handleSelectManager = (selectedOptions) => {
    formik.setFieldValue("manager_id", selectedOptions?.id);
  };
  const handleSelect = (selectedOptions) => {
    const selectedIds = selectedOptions.map((option) => option.id);
    formik.setFieldValue("employees", selectedIds);
  };

  const textFieldTest = [
    {
      name: "name",
      value: formik.values.name,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: "name",
      error: !!formik.touched.name && !!formik.errors.name,
      helperText: formik.touched.name && formik.errors.name,
    },
    {
      name: "phone",
      value: formik.values.phone,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: "phone",
      error: !!formik.touched.phone && !!formik.errors.phone,
      helperText: formik.touched.phone && formik.errors.phone,
    },
    {
      name: "address",
      value: formik.values.address,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: "address",
      error: !!formik.touched.address && !!formik.errors.address,
      helperText: formik.touched.address && formik.errors.address,
    },
  ];

  return !loading ? (
    <div style={{ margin: "20px" }}>
      <Box dir={sidebarRTL ? "rtl" : "ltr"}>
        {textFieldTest.map((item, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <CustomLable title={t(item.title)} />
            <CustomFormikTextFeild
              placeholder={item.title}
              onChange={item.handleChange}
              helperText={item.helperText}
              error={item.error}
              onBlur={item.onBlur}
              fullWidth={true}
              value={item.value}
              name={item.name}
            />
          </div>
        ))}
        <div style={{ marginTop: "10px", position: "relative" }}>
          <CustomSelectMenu
            lable="Select manager"
            defaultData={oneGarageData?.manager_id}
            options={employeedata}
            // placeholder={t("Select Manager")}
            onChange={handleSelectManager}
          />
        </div>
        <div style={{ marginTop: "10px", position: "relative" }}>
          <CustomMultiSelectMenu
            lable="Select Employees"
            defaultData={oneGarageData?.garage_employees}
            options={employeedata}
            // placeholder={t("Select Employees")}
            onChange={handleSelect}
          />
        </div>
      </Box>
      <DefaultButton
        text="Edit"
        fullWidth={true}
        handleClick={formik.handleSubmit}
      />
    </div>
  ) : (
    <CustomLoader />
  );
};

export default EditGarage;
