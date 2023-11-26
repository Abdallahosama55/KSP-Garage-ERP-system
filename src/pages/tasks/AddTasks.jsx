import { Box, Button, useTheme } from "@mui/material";
import { useFormik } from "formik";
import { tokens } from "../../theme";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useSidebarContext } from "../global/sidebar/sidebarContext";
import { CustomFormikTextFeild } from "../../components/CustomFormikTextFeild/customFormikTextFeild";
import { TasksSchema } from "../../utils/ValidationSchema";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import {
  getMyEmployeeMenu,
  getVisitorsCarsMenu,
} from "../../redux/select_menus";
import { StatuseCode } from "../../statuseCodes";
import CustomDateTime from "../../components/CustomDateTime/CustomDateTime";
import { carsArray } from "./carsArray";
import CustomLable from "../../components/CustomLable";
import { addTask, getTasks } from "../../redux/tasks";
import { useNavigate } from "react-router-dom";

const AddTasks = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const employeesMenu =
    useSelector((state) => state.selectMenu.myEmployeesMenu.data) || [];
  const VisitorsCarsMenu =
    useSelector((state) => state.selectMenu.VisitorsCarsMenu.data) || [];
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);
  const { sidebarRTL } = useSidebarContext();
  // const loading = useSelector((state) => state.selectMenu.loading);

  const formik = useFormik({
    initialValues: {
      description: "",
      title: "",
    },
    validationSchema: TasksSchema,
    onSubmit: (values) => handleFormSubmit(values),
  });

  // const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getMyEmployeeMenu());
    dispatch(getVisitorsCarsMenu());
  }, [dispatch]);
  const pageSize = 10;
  const handleFormSubmit = async (values) => {
    dispatch(addTask(values)).then((res) =>
      res.payload.code === StatuseCode.CREATED
        ? dispatch(getTasks({ pageSize: pageSize })) && navigate(-1)
        : null
    );
  };
  const setVisiotrsCars = (value) => {
    formik.setFieldValue("visitor_car_id", value?.id);
  };

  const handleDateTimeChangeStart = (e) => {
    const momentObject = e;
    const formattedDateTime = momentObject.format("YYYY-MM-DD HH:mm");
    formik.setFieldValue("starts_at", formattedDateTime);
  };

  const handleDateTimeChangeEnd = (e) => {
    const momentObject = e;

    const formattedDateTime = momentObject.format("YYYY-MM-DD HH:mm");

    formik.setFieldValue("due_to", formattedDateTime);
  };
  const [carType, setCarType] = useState("");
  const handleCarsType = (value) => {
    formik.setFieldValue("type", value?.name);
    setCarType(value.name);
  };
  const handleEmployee = (value) => {
    formik.setFieldValue("employee_id", value?.id);
  };
  const textFields = [
    {
      name: "description",
      value: formik.values.description,
      isMulti: true,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: t("description"),
      error: !!formik.touched.description && !!formik.errors.description,
      helperText: formik.touched.description && formik.errors.description,
    },
    {
      name: "title",
      value: formik.values.title,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: t("title"),
      error: !!formik.touched.title && !!formik.errors.title,
      helperText: formik.touched.title && formik.errors.title,
    },
  ];
  return (
    <Box m="20px">
      <form onSubmit={formik.handleSubmit} dir={sidebarRTL ? "ltr" : "rtl"}>
        {textFields.map((item, index) => (
          <Box dir={sidebarRTL ? "rtl" : "ltr"} key={index}>
            <CustomLable title={item.placeholder} />
            <CustomFormikTextFeild
              placeholder={item.placeholder}
              onBlur={item.onBlur}
              onChange={item.handleChange}
              value={item.value}
              name={item.name}
              isMulti={item.isMulti}
              error={item.error}
              helperText={item.helperText}
            />
          </Box>
        ))}
        <Box dir={sidebarRTL ? "rtl" : "ltr"}>
          <CustomLable title="start_date" />
          <CustomDateTime onChange={handleDateTimeChangeStart} />
        </Box>
        <Box dir={sidebarRTL ? "rtl" : "ltr"}>
          <CustomLable title="end_date" />
          <CustomDateTime onChange={handleDateTimeChangeEnd} />
        </Box>
        <CustomSelect
          lable="select_employee"
          options={employeesMenu}
          onChange={handleEmployee}
        />
        <CustomSelect
          lable="select_type"
          options={carsArray}
          onChange={handleCarsType}
        />
        <CustomSelect
          isDisabled={carType === "other"}
          lable="select_visitor_car"
          options={VisitorsCarsMenu}
          onChange={setVisiotrsCars}
        />

        <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
          fullWidth
          type="submit"
        >
          {t("Add")}
        </Button>
      </form>
    </Box>
  );
};

export default AddTasks;
