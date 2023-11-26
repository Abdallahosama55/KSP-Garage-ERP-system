import React, { useState,useEffect } from "react";
import Button from "@mui/material/Button";

import { Box, TextField, TextareaAutosize,Select,MenuItem, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import DefaultButton from "./defaultBtn";
import { useTranslation } from "react-i18next";
import defaultAPI from "../../../axiosInstance";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext";
import { useDispatch,useSelector } from "react-redux";
import { getJob_announcementsData } from "../../redux/Job_announcements";
import CustomDateTime from "../../../components/CustomDateTime/CustomDateTime";
import {getJobsMenu} from "../../../redux/select_menus";
import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";

const AddJobAnoucementPage = (props) => {
  const jobs = useSelector((state) => state.selectMenu.JobsMenu) || [];

  const { sidebarRTL } = useSidebarContext();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    job_id: "",
    starts_at: "",
    ends_at: "",
    experience_years: "",
    requirements: "",
  });
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Validation errors for form fields
  const [errors, setErrors] = useState({
    name: "",
    job_id: "",
    starts_at: "",
    ends_at: "",
    experience_years: "",
    requirements: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    // Validate 'name' field
    if (!formData.name) {
      newErrors.name = "Name is required";
      valid = false;
    } else {
      newErrors.name = "";
    }

    // Validate 'job_id' field
    if (!formData.job_id) {
      newErrors.job_id = "Job ID is required";
      valid = false;
    } else {
      newErrors.job_id = "";
    }

    // Validate 'starts_at' field
    if (!formData.starts_at) {
      newErrors.starts_at = "Start date is required";
      valid = false;
    } else {
      newErrors.starts_at = "";
    }

    // Validate 'ends_at' field
    if (!formData.ends_at) {
      newErrors.ends_at = "End date is required";
      valid = false;
    } else {
      newErrors.ends_at = "";
    }

      // Validate 'starts_at' field format
      if (!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(formData.starts_at)) {
        newErrors.starts_at = "Start date must match the format Y-m-d H:i";
        valid = false;
      } else {
        newErrors.starts_at = "";
      }
  
      // Validate 'ends_at' field format
      if (!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(formData.ends_at)) {
        newErrors.ends_at = "End date must match the format Y-m-d H:i";
        valid = false;
      } else {
        newErrors.ends_at = "";
      }

    // Add additional validation checks for other fields here

    // Update the errors state
    setErrors(newErrors);

    return valid;
  };

  const handleClickOpen = () => {
    setOpen(true);


    setFormData({
      name: "",
      job_id: "",
      starts_at: "",
      ends_at: "",
      experience_years: "",
      requirements: "",
    });
    setErrors({
      name: "",
      job_id: "",
      starts_at: "",
      ends_at: "",
      experience_years: "",
      requirements: "",
    });
  };
 const handleDateTimeChange=(event)=>{
setFormData({...formData,starts_at:event.format("YYYY-MM-DD HH:mm")})

}
const handleDateTimeChangeEnd=(event)=>{
  setFormData({...formData,ends_at:event.format("YYYY-MM-DD HH:mm")})
  
  }

  const handleApiCall = async () => {
    if (loading || !validateForm()) {
      
      return;
    }

    setLoading(true);

    const apiUrl = `/admin/job_announcements`;
    console.log(formData)
    try {
      const formDataObj = new FormData();
      formDataObj.append("name", formData.name);
      formDataObj.append("job_id", formData.job_id);
      formDataObj.append("starts_at", formData.starts_at);
      formDataObj.append("ends_at", formData.ends_at);
      formDataObj.append("experience_years", formData.experience_years);
      formDataObj.append("requirements", formData.requirements);

      // Send the image data to the server and get the response
      await defaultAPI.post(apiUrl, formDataObj)

      dispatch(getJob_announcementsData({pageSize: props.pageSize}));
      // Reset the form data
      setFormData({
        name: "",
        job_id: "",
        starts_at: "",
        ends_at: "",
        experience_years: "",
        requirements: "",
      });

      // Close the dialog
      // setOpen(true);
      navigate(-1, {replace: true})
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while uploading.");
    } finally {
      setLoading(false);
    }
    

  };

  useEffect(() => {
    // dispatch(getFullMarkGrades());
    dispatch(getJobsMenu());
  }, [dispatch]);

  return (
    <box>

    

    
          
      
          <div className="container">
          <Header title={t("Add")}></Header>
            <div className="row">
              <div className="col-md-12 col-sm-12">
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
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    error={errors.name !== ""}
                    helperText={errors.name}
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
          value={formData.job_id}
          onChange={(e) =>
            setFormData({ ...formData, job_id: e.target.value })
          }
          sx={{ width: "100%" }}
            >
          {jobs.map((job) => (
            <MenuItem key={job.id} value={job.id}>
              {job.name}
            </MenuItem>
          ))}
          </Select>

                  {/* <label
                    style={{
                      fontSize: "18px",
                      marginBottom: ".5rem",
                      fontWeight: "bold",
                    }}
                  >
                    {t("Status")}
                  </label>

                  <Select
                  className="mt-3"
                  name="status"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                >
                  <MenuItem value={1}>true</MenuItem>
                  <MenuItem value={0}>false</MenuItem>
                </Select> */}
                </Box>

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
                  >
                    {/* <Avatar src={selectedImageUrl} /> Display selected image */}
                  </div>
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
              </div>
              <div className="col-md-12 col-sm-12">
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
                    {t("starts_at")}
                  </label>
                  <CustomDateTime
                  type="text"
                  name="starts_at"
                  value={formData.starts_at}
                  onChange={
                    handleDateTimeChange
                  }
                  error={errors.starts_at !== ""}
                  helperText={errors.starts_at}
                  inputProps={{
                    pattern: "\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}",
                  }}
                />
                  <label
                    style={{
                      fontSize: "18px",
                      marginBottom: ".5rem",
                      fontWeight: "bold",
                    }}
                  >
                    {t("ends_at")}
                  </label>
             
                  <CustomDateTime
                  type="text"
                  name="ends_at"
                  value={formData.ends_at}
                  onChange={
                    handleDateTimeChangeEnd
                  }
                  error={errors.ends_at !== ""}
                  helperText={errors.ends_at}
                  inputProps={{
                    pattern: "\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}",
                  }}
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
                    value={formData.experience_years}
                    onChange={(e) =>
                      setFormData({ ...formData, experience_years: e.target.value })
                    }
                    inputProps={{
                      min: 0,
                      max:40
                    }}
                    error={errors.experience_years !== ""}
                    helperText={errors.experience_years}
                  />
                </Box>
              </div>
              <div className="row">
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
                  className="border-1 shadow border-grey m-1 border p-3 bg-transparent"
                  type="text"
                  rows={5}
                  name="requirements"
                  value={formData.requirements}
                  onChange={(e) =>
                    setFormData({ ...formData, requirements: e.target.value })
                  }
                  error={errors.requirements !== ""}
                />
                <span style={{ color: "red", fontSize: "16px" }}>
                  {errors.requirements}
                </span>
              </div>
            </div>
          </div>

      
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              margin:"37px",
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 15px",
            }}
            onClick={handleApiCall}
            endIcon={props.icon}
            disabled={loading}
          >
            {loading ? t("Loading...") : t("Add")}
          </Button>
    
   
    </box>
  );
};

export default AddJobAnoucementPage;
