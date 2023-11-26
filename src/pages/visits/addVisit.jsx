import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DefaultButton from "../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../global/sidebar/sidebarContext";
import { getEmployeeMenu } from "../../redux/garages";
import CustomSelectMenu from "../../components/CustomSelect/CustomSelect";
import CustomDialogActions from "../../components/DialogActions/DialogActions";
import { StatuseCode } from "./../../statuseCodes";
import { addVisits, getVisits } from "../../redux/visits";
import { useFormik } from "formik";
import { visitSchema } from "../../utils/ValidationSchema";
import CustomLable from "../../components/CustomLable";
import { CustomFormikTextFeild } from "./../../components/CustomFormikTextFeild/customFormikTextFeild";
import { getVisitorsMenu } from "../../redux/select_menus";

const AddVisit = ({ rerenderId, pageSize }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { sidebarRTL } = useSidebarContext();
  const [SelectedGarage, setSelectedGarage] = useState(null);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const loading = useSelector((state) => state.visits.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmployeeMenu());
    dispatch(getVisitorsMenu());
  }, [dispatch]);

  const VisitorsData =
    useSelector((state) => state.selectMenu.visitorsMenu.data) || [];
  const garageData =
    useSelector((state) => state.selectMenu.garagesMenu.data) || [];

  const handleClickOpen = () => {
    setOpen(true);
  };
  const formik = useFormik({
    initialValues: {
      reason: "",
    },
    enableReinitialize: true,
    validationSchema: visitSchema,
    onSubmit: (values) => handleSubmit(values),
  });
  const handleSubmit = async (values) => {
    const data = {
      visitor_id: selectedVisitor,
      garage_id: SelectedGarage,
      reason: values.reason,
    };
    await dispatch(addVisits(data)).then((res) => {
      res.payload.code === StatuseCode.CREATED
        ? dispatch(getVisits({ id: rerenderId, pageSize: pageSize })) &&
          handleClose()
        : setOpen(true);
    });
  };
  const handleSelectVisitor = (selectedOptions) => {
    setSelectedVisitor(selectedOptions?.id);
  };
  const handleSelectGarage = (selectedOptions) => {
    setSelectedGarage(selectedOptions?.id);
  };
  const handleClose = () => {
    setSelectedGarage(null);
    setSelectedVisitor(null);
    formik.resetForm();
    setOpen(false);
  };
  const textFieldTest = [
    {
      name: "reason",
      value: formik.values.reason,
      isMulti: true,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: "reason",
      error: !!formik.touched.reason && !!formik.errors.reason,
      helperText: formik.touched.reason && formik.errors.reason,
    },
  ];
  return (
    <div>
      <DefaultButton handleClick={handleClickOpen} text={t("Add")} />
      <Dialog
        fullWidth={true}
        sx={{ width: { xs: "100%", md: "50%" }, margin: "auto", padding: "0" }}
        open={open}
        onClose={() => handleClose}
      >
        <DialogTitle
          sx={{ fontWeight: "bold", fontSize: "22px" }}
          align={sidebarRTL ? "right" : "left"}
        >
          {t("Add")}
        </DialogTitle>
        <DialogContent
          dir={sidebarRTL ? "rtl" : "ltr"}
          sx={{ height: "400px" }}
        >
          <form onSubmit={formik.handleSubmit}>
            {textFieldTest.map((item, index) => (
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
            <CustomSelectMenu
              lable="select_visitor"
              options={VisitorsData}
              placeholder={t("select_visitor")}
              onChange={handleSelectVisitor}
            />
            <CustomSelectMenu
              lable="select_garage"
              options={garageData}
              placeholder={t("select_garage")}
              onChange={handleSelectGarage}
            />
          </form>
        </DialogContent>
        <CustomDialogActions
          text="add"
          onClick={handleClose}
          disabled={loading}
          onClickAction={formik.handleSubmit}
        />
      </Dialog>
    </div>
  );
};

export default AddVisit;
