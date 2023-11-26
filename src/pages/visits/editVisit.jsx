import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../global/sidebar/sidebarContext";
import CustomSelectMenu from "../../components/CustomSelect/CustomSelect";
import CustomDialogActions from "../../components/DialogActions/DialogActions";
import { StatuseCode } from "../../statuseCodes";
import {
  editVisit,
  getOneVisit,
  getVisits,
} from "../../redux/visits";
import { useFormik } from "formik";
import { visitSchema } from "../../utils/ValidationSchema";
import CustomLable from "../../components/CustomLable";
import { CustomFormikTextFeild } from "../../components/CustomFormikTextFeild/customFormikTextFeild";
import { Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const EditVisit = ({ rerenderId, pageSize, id }) => {
  console.log(rerenderId, id);
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { sidebarRTL } = useSidebarContext();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [SelectedGarage, setSelectedGarage] = useState(null);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const loading = useSelector((state) => state.visits.loading);
  const dispatch = useDispatch();
  const VisitorsData =
    useSelector((state) => state.selectMenu.visitorsMenu.data) || [];
  const garageData =
    useSelector((state) => state.selectMenu.garagesMenu.data) || [];
  const oneVisitData =
    useSelector((state) => state.visits.oneVisitsData.data) || [];
  const handleClickOpen = async () => {
    await dispatch(getOneVisit({ visitId: id, id: rerenderId }));
    await setOpen(true);
  };
  const formik = useFormik({
    initialValues: {
      reason: oneVisitData?.reason,
      garage_id: oneVisitData?.garage_id,
      visitor_id: oneVisitData?.visitor_id,
    },
    enableReinitialize: true,
    validationSchema: visitSchema,
    onSubmit: (values) => handleSubmit(values),
  });
  const handleSubmit = async (values) => {
    const data = {
      id: id,
      values: {
        visitor_id: selectedVisitor || values.visitId,
        garage_id: SelectedGarage || values.garage_id,
        reason: values.reason,
      },
    };
    console.log(data);
    await dispatch(editVisit(data)).then((res) => {
      res.payload.code === StatuseCode.OK
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
      <Button
        disabled={loading ? true : false}
        variant="contained"
        sx={{ background: `${colors.primary[600]}`, margin: 2 }}
        onClick={handleClickOpen}
      >
        {t("edit")}
      </Button>
      <Dialog
        fullWidth={true}
        sx={{ width: { xs: "100%", md: "50%" }, margin: "auto", padding: "0" }}
        open={open}
        onClose={() => handleClose}
      >
        {/* <DialogTitle sx={{ fontWeight: "bold", fontSize: "22px" }} align={sidebarRTL ? "right" : "left"}>{t("Add")}</DialogTitle> */}
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
              value={selectedVisitor}
              defaultData={oneVisitData?.visitor_id}
            />
            <CustomSelectMenu
              lable="select_garage"
              options={garageData}
              placeholder={t("Select_garage")}
              value={SelectedGarage}
              onChange={handleSelectGarage}
              defaultData={oneVisitData?.garage_id}
            />
          </form>
        </DialogContent>
        <CustomDialogActions
          text="edit"
          onClick={handleClose}
          disabled={loading}
          onClickAction={formik.handleSubmit}
        />
      </Dialog>
    </div>
  );
};

export default EditVisit;
