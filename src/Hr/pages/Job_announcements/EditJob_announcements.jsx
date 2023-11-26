import { useState ,useEffect} from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, TextField, useTheme, Select, MenuItem } from "@mui/material";
import { tokens } from "../../../theme";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext";
import { useDispatch ,useSelector} from "react-redux";
import {
  editJob_announcements,
  getJob_announcementsData,
} from "../../redux/Job_announcements";
import {getJobsMenu} from "../../../redux/select_menus";

import CustomDateTime from "../../../components/CustomDateTime/CustomDateTime";
import { useParams } from "react-router-dom";
import Header from "../../../components/Header";
import { Container } from "reactstrap";

const EditJob_announcements = (props) => {
  const jobs = useSelector((state) => state.selectMenu.JobsMenu) || [];
  const params = useParams();
  const { id } = params;

  const { sidebarRTL } = useSidebarContext();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(true);

  const validationSchema = Yup.object().shape({
    starts_at: Yup.string()
      .matches(
        /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])\s([0-1][0-9]|2[0-3]):[0-5][0-9]$/,
        'Date must be in the format Y-m-d H:i'
      )
      .required('Start date is required'),
    experience_years: Yup.number()
      .max(49, 'Experience must be less than 50')
      .required('Experience is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: props.name,
      job_id: props. job_id,
      starts_at: props.starts_at,
      ends_at: props.ends_at,
      experience_years: props.experience_years,
      requirements: props.requirements,
      id: id,
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values)
      if (loading) {
        return; // If loading is true, do nothing (prevent multiple clicks)
      }

      const info = {
        values: values,
        name: values.name,
        job_id: values.job_id,
        starts_at: values.starts_at,
        ends_at: values.ends_at,
        experience_years: values.experience_years,
        requirements: values.requirements,
        id: id,
      };

      await dispatch(editJob_announcements(info)).then((res) =>
        res.payload.code === 200
          ? dispatch(getJob_announcementsData({pageSize: props.pageSize})).then(setOpen(false))
          : setOpen(true)
      );
    },
  });

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleClickOpen = async () => {
    setOpen(true);
  };


  const handleDateTimeChangeStart =(event)=>
  {
    const momentObject = event;

    const formattedDateTime = momentObject.format('YYYY-MM-DD HH:mm');

    formik.setFieldValue("starts_at", formattedDateTime);
  }


  const handleDateTimeChangeEnd =(event)=>
  {
    const momentObject = event;

    const formattedDateTime = momentObject.format('YYYY-MM-DD HH:mm');

    formik.setFieldValue("ends_at", formattedDateTime);
  }
  useEffect(() => {
    // dispatch(getFullMarkGrades());
    dispatch(getJobsMenu());
  }, [dispatch]);

  return (
    <Box>

  
     
          <div className="container">
            
            <Header title={t("Edit")}></Header>
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <Box
                  fullWidth
                  dir={sidebarRTL ? "rtl" : "ltr"}
                  display="flex"
                  flexDirection="column"
                  sx={{
                    margin: "1rem 0",
                  }}
                >
                  <label
                    style={{
                      fontSize: "18px",
                      marginBottom: ".5rem",
                      fontWeight: "bold",
                    }}
                  >
                    {t("Name")}
                  </label>
                  <TextField
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.name && formik.errors.name}
                    helperText={formik.touched.name && formik.errors.name}
                  />

                  
                  <label
                    style={{
                      fontSize: "18px",
                      marginBottom: ".5rem",
                      fontWeight: "bold",
                    }}
                  >
                    {t("starts_at")}
                  </label>
              
                  <CustomDateTime onChange={handleDateTimeChangeStart} 
                  name="starts_at"
                  value={formik.values.starts_at}
                  onBlur={formik.handleBlur}
                  error={formik.touched.starts_at && formik.errors.starts_at}
                  helperText={formik.touched.starts_at && formik.errors.starts_at}
                  />

                  <label
                    style={{
                      fontSize: "18px",
                      marginBottom: ".5rem",
                      fontWeight: "bold",
                    }}
                  >
                    {t("experience_years")}
                  </label>
                  <TextField
                    type="number"
                    name="experience_years"
                    inputProps={{
                      min: 0,
                      max:40,
                    }}
                    value={formik.values.experience_years}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.experience_years && formik.errors.experience_years}
                    helperText={formik.touched.experience_years && formik.errors.experience_years}
                  />


                </Box>
              </div>
              <div className="col-md-6 col-sm-12">
                <Box
                  fullWidth
                  dir={sidebarRTL ? "rtl" : "ltr"}
                  display="flex"
                  flexDirection="column"
                  sx={{
                    margin: "1rem 0",
                  }}
                >                  
                  <label
                  style={{
                    fontSize: "18px",
                    marginBottom: ".5rem",
                    fontWeight: "bold",
                  }}
                >
                  {t("ends_at")}
                </label>
           

                <CustomDateTime onChange={handleDateTimeChangeEnd} 
                name="ends_at"
                value={formik.values.ends_at}
                onBlur={formik.handleBlur}
                error={formik.touched.ends_at && formik.errors.ends_at}
                helperText={formik.touched.ends_at && formik.errors.ends_at}
                />

                  <label
                    style={{
                      fontSize: "18px",
                      marginBottom: ".5rem",
                      fontWeight: "bold",
                    }}
                  >
                    {t("Job")}
                  </label>
             
            <Select
            name="job_id"
          value={formik.values.job_id}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.job_id && formik.errors.job_id}
          helperText={formik.touched.job_id && formik.errors.job_id}
          sx={{ width: "100%" }}
            >
          {jobs.map((job) => (
            <MenuItem key={job.id} value={job.id}>
              {job.name}
            </MenuItem>
          ))}
          </Select>
                </Box>
              </div>
            </div>
            <div className="row p-1 pe-3">
              <label
                style={{
                  fontSize: "18px",
                  marginBottom: ".5rem",
                  fontWeight: "bold",
                }}
              >
                {t("requirements")}
              </label>
              <textarea
                className="border-2 shadow text-dark m-3  pt-3"
                type="text"
                rows={3}
                
                name="requirements"
                value={formik.values.requirements}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.requirements && formik.errors.requirements}
                helperText={formik.touched.requirements && formik.errors.requirements}
              />


              
            </div>
          </div>
          <div
            style={{
              margin: ".5rem auto",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          ></div>
          <div
            dir={sidebarRTL ? "rtl" : "ltr"}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            ></div>
          </div>
          <p
            dir={sidebarRTL ? "rtl" : "ltr"}
            style={{
              color: "red",
              margin: ".5rem",
              fontSize: "16px",
              fontWeight: "bold",
              direction: sidebarRTL ? "rtl" : "ltr",
            }}
          >
            {t(`${message}`)}
          </p>
   
     
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 15px",
              margin:"30px"
            }}
            onClick={formik.handleSubmit}
            endIcon={props.icon}
            disabled={!formik.isValid}
          >
            {t("Edit")}
          </Button>
   
    </Box>
  );
};

export default EditJob_announcements;