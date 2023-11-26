import React, { useState,useEffect } from "react";
import Button from "@mui/material/Button";

import { Box, TextField, useTheme,Select,MenuItem, Container } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { tokens } from "../../../theme";
import DefaultButton from "./defaultBtn";
import { useTranslation } from "react-i18next";
import defaultAPI from "../../../axiosInstance";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext";
import { useDispatch,useSelector } from "react-redux";
import { getEmployeesData} from "../../redux/Employees";
import { getWorkingShiftsMenu,getJobsMenu,getUsersMenu} from "../../../redux/select_menus";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Header from "../../../components/Header";



const AddEmployees = (props) => {
  const WorkingShiftData = useSelector((state) => state.selectMenu.WorkingShiftsMenu.data);
  const JobsMenu = useSelector((state) => state.selectMenu.JobsMenu) ;
  const UsersMenu = useSelector((state) => state.selectMenu.UsersMenu.data) ;
  const { sidebarRTL } = useSidebarContext();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch=useDispatch()
  const [open, setOpen] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    cv: null,
  });
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // State variable to store the URL of the selected image
  const [selectedImageUrl, setSelectedImageUrl] = useState("");

  const handleClickOpen = () => {



    setFormData({
      
      cv: null,
      working_shift_id: "",
      job_id: "",
      birth_date: "",
      certificate: "",
      military_service: "",
      nationality: "",
      passport_number: "",
      landline_number: "",
      social_status: "",
      type: "",
      name: "",
      email: "",
      phone: "",
      user_id: "",
      
      
    });

    // Reset the selected image URL
    setSelectedImageUrl("");
  };
  useEffect(() => {
    // dispatch(getFullMarkGrades());
    dispatch(getWorkingShiftsMenu());
  }, [dispatch]);

  useEffect(() => {
    // dispatch(getFullMarkGrades());
    dispatch(getJobsMenu());
  }, [dispatch]);

  useEffect(() => {
    // dispatch(getFullMarkGrades());
    dispatch( getUsersMenu());
  }, [dispatch]);

 
  const handleApiCall = async () => {
    if (loading) {
      return; // If loading is true, do nothing (prevent multiple clicks)
    }

    if (!formData.cv) {
      setMessage("Please select an pdf file.");
      return;
    }

    const allowedExtensions = [".pdf",".PDF"];
    const fileName = formData.cv.name;
    const fileExtension = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      setMessage("Please select a valid image file (pdf).");
      return;
    }

    setLoading(true);

    const apiUrl = `/admin/employees`;
    try {
      const formDataObj = new FormData();
      formDataObj.append("name", formData.name);
      formDataObj.append("cv", formData.cv);
      formDataObj.append(" working_shift_id", formData.working_shift_id);
      formDataObj.append(" job_id", formData.job_id);
      formDataObj.append("birth_date", formData.birth_date);

      formDataObj.append("certificate", formData.certificate);
      formDataObj.append("military_service", formData.military_service);
      formDataObj.append("nationality", formData.nationality);
      formDataObj.append("passport_number", formData.passport_number);
      formDataObj.append("landline_number", formData.landline_number);

      
      formDataObj.append("social_status", formData.social_status);
      formDataObj.append("user_id", formData.user_id);
      formDataObj.append("type", formData.type);
      formDataObj.append("email", formData.email);
      formDataObj.append("phone", formData.phone);

      


     

    
  
   
   
      // Send the image data to the server and get the response
      const response = await defaultAPI.post(apiUrl, formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Set the selected image URL
      setSelectedImageUrl(response.data.cvUrl);
      dispatch(getEmployeesData(props.pageSize))
      // Reset the form data
      setFormData({
        cv: null,
        working_shift_id: "",
        job_id: "",
        birth_date: "",
        certificate: "",
        military_service: "",
        nationality: "",
        passport_number: "",
        landline_number: "",
        social_status: "",
        type: "",
        name: "",
        email: "",
        phone: "",
        user_id: "",
     
        
      });

    
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while uploading.");
    } finally {
      setLoading(false);
    }
  };

  const isEmployeeType = formData.type === "employee";
  return (
    <Box>

 <Container>
          
    <Header title={t("Add")}></Header>
  
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
              {t("working Shift")}
            </label>
        
            <Select
            name="working_shift_id"
            value={formData.working_shift_id}
            onChange={(e) =>
              setFormData({ ...formData, working_shift_id: e.target.value })
            }
            sx={{ width: "100%" }}
          >
            {WorkingShiftData?.map((shift) => (
              <MenuItem key={shift.id} value={shift.id}>
                {shift.name}
              </MenuItem>
            ))}
          </Select>



          </Box>
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
            {t("job Name")}
          </label>
      

        
          <Select
          name="job_id"
          value={formData.job_id}
          onChange={(e) =>
            setFormData({ ...formData, job_id: e.target.value })
          }
          sx={{ width: "100%" }}
        >
          {JobsMenu?.map((job) => (
            <MenuItem key={job.id} value={job.id}>
              {job.name}
            </MenuItem>
          ))}
        </Select>
          </Box>
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
            {t("birth_date")}
          </label>
          <TextField
            type="date"
            name="birth_date"
            value={formData.birth_date}
            onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
          />
          </Box>
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
            {t("certificate")}
          </label>
          <TextField
            type="text"
            name="certificate"
            value={formData.certificate}
            onChange={(e) => setFormData({ ...formData, certificate: e.target.value })}
          />
          </Box>
          
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
            {t("Military Service")}
          </label>
          <Select
          name="military_service"
          value={formData.military_service}
          onChange={(e) => setFormData({ ...formData, military_service: e.target.value })}
       >
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="exempt">Exempt</MenuItem>
              <MenuItem value="postponed">Postponed</MenuItem>
              <MenuItem value="ongoing">Ongoing</MenuItem>

</Select>
   
          </Box>



          


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
            {t("Nationality")}
          </label>
          <TextField
          type="text" // Change type to "text"
          name="nationality"
          value={formData.nationality}
          onChange={(e) => {
            // Allow only numeric input
            const numericValue = e.target.value.replace(/\D/g, "");
            setFormData({ ...formData, nationality: numericValue });
          }}
          inputProps={{
            pattern: "[0-9]*", // Allow only numeric input
          }}
        />
          </Box>
          

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
            {t("Passport Number")}
          </label>
          <TextField
          type="text" // Change type to "text"
          name="passport_number"
          value={formData.passport_number}
          onChange={(e) => {
            // Allow only numeric input
            const numericValue = e.target.value.replace(/\D/g, "");
            setFormData({ ...formData, passport_number: numericValue });
          }}
          inputProps={{
            pattern: "[0-9]*", // Allow only numeric input
          }}
        />
          </Box>
          
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
            {t("landline_number")}
          </label>
          <TextField
          type="text" // Change type to "text"
          name="landline_number"
          value={formData.landline_number}
          onChange={(e) => {
            // Allow only numeric input
            const numericValue = e.target.value.replace(/\D/g, "");
            setFormData({ ...formData, landline_number: numericValue });
          }}
          inputProps={{
            pattern: "[0-9]*", // Allow only numeric input
          }}
        />
          </Box>
          
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
            {t("social_status")}
          </label>
          <Select
          value={formData.social_status}
          name="social_status"
          onChange={(e) => setFormData({ ...formData, social_status: e.target.value })}
        >
          <MenuItem value="single">{t("Single")}</MenuItem>
          <MenuItem value="married">{t("Married")}</MenuItem>
        </Select>
          </Box>
          
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
            {t("type")}
          </label>
          <RadioGroup row
          name="type"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        >
        
          <FormControlLabel
            value="employee"
            control={<Radio />}
            label={t("Employee")}
          />
          <FormControlLabel
            value="new_employee"
            control={<Radio />}
            label={t("New Employee")}
          />
        </RadioGroup>
          </Box>
          

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
            {t("email")}
          </label>
          <TextField
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          </Box>
          
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
            {t("phone")}
          </label>
          <TextField
            type="tel"
            name="tel"
            value={formData.phone}
            onChange={(e) => {
              // Allow only numeric input
              const numericValue = e.target.value.replace(/\D/g, "");
              setFormData({ ...formData, phone: numericValue });
            }}
            inputProps={{
              pattern: "[0-9]*", // Allow only numeric input
            }}
          />
          </Box>
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
            {t("user ")}
          </label>
  

           
          <Select
          name="user_id"
          value={formData.user_id}
          onChange={(e) =>
            setFormData({ ...formData, user_id: e.target.value })
          }
          sx={{ width: "100%" }}
           required={isEmployeeType}
        >
          {UsersMenu?.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.name}
            </MenuItem>
          ))}
        </Select>

        </Box>
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
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />


         
        </Box>
        {isEmployeeType && (
          <Box>
          <label
            htmlFor="fileInput"
            dir={sidebarRTL ? "rtl" : "ltr"}
            style={{
              display: "block",
              fontSize: "18px",
              marginBottom: ".5rem",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {t("Select file")}
          </label>
          <input
            type="file"
            id="fileInput"
            onChange={(e) => setFormData({ ...formData, cv: e.target.files[0] })}
            style={{ display: "none" }}
          />
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
              <TextField
                variant="outlined"
                value={formData.cv ? formData.cv.name : ""}
                placeholder={t("PDF only")}
                InputProps={{
                  style: {
                    fontSize: "18px",
                    fontWeight: "bold",
                    borderRight: "50px",
                  },
                }}
                disabled
                style={{ width: "83%" }}
              />
              <Button
                variant="contained"
                component="label"
                htmlFor="fileInput"
                style={{
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "15px 0",
                  width: "15%",
                }}
              >
                {t("Browse")}
              </Button>
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
      </Box>
       )}
     
    
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 15px",
              width:"100%",
              margin:"30px 0px",
            }}
            onClick={handleApiCall}
            endIcon={props.icon}
            disabled={loading}
          >
            {loading ? t("Loading...") : t("Add")}
          </Button>
          </Container>
    </Box>
  
  );
};

export default AddEmployees ;
