import React, { useState,useEffect } from "react";
import Button from "@mui/material/Button";
import { Box, TextField, useTheme ,Select,MenuItem} from "@mui/material";
import { useParams } from 'react-router-dom';
import { tokens } from "../../../theme";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext";
import { useDispatch,useSelector } from "react-redux";
import { getWorkingShiftsMenu,getJobsMenu,getUsersMenu} from "../../../redux/select_menus";
import {
  editEmployees,
  getEmployeesData,
  getOneEmployeesData
} from "../../redux/Employees";
import { Container } from "reactstrap";
import Header from "../../../components/Header";

const EditEmployee = (props) => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true); 
  const WorkingShiftData = useSelector((state) => state.selectMenu.WorkingShiftsMenu.data);
  const JobsMenu = useSelector((state) => state.selectMenu.JobsMenu) ;

  const UsersMenu = useSelector((state) => state.selectMenu.UsersMenu.data) ;

  const dataEmploye = useSelector(
    (state) => state.Employees.EmployeesDataOne.data
  );
  
  const isDataLoading = useSelector(
    (state) => state.Employees.EmployeesDataOne.loading
  );


 
 
  const { sidebarRTL } = useSidebarContext();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(true)
  const [selectedcvUrl, setSelectedcvUrl] = useState(props.cv);

  const [formData, setFormData] = useState({
    if (dataEmploye) {
      setFormData({
        name: dataEmploye.name,
        cv: null,
        working_shift_id: dataEmploye.working_shift_id,
        birth_date: dataEmploye.birth_date,
        certificate: dataEmploye.certificate,
        military_service: dataEmploye.military_service,
        nationality: dataEmploye.nationality,
        passport_number: dataEmploye.passport_number,
        landline_number: dataEmploye.landline_number,
        social_status: dataEmploye.social_status,
        email: dataEmploye.email,
        phone: dataEmploye.phone,
        password: dataEmploye.password,
        password_confirmation: dataEmploye.password_confirmation,
      });
    }
  });

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // State variable to store the URL of the selected cv

  const handleClickOpen = async () => {
    setOpen(true);
  };

  const handleApiCall = async () => {
    if (loading) {
      return; // If loading is true, do nothing (prevent multiple clicks)
    }

   
    const allowedExtensions = [".PDF", ".pdf"];
    const fileName = formData.cv?.name;
    if (fileName) {
      const fileExtension = fileName
        .substring(fileName.lastIndexOf("."))
        .toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        setMessage("Please select a valid cv file (pdd).");
        return;
      }
    }
    const info = {
      values: formData,
      
      

      id:id,

    };

    await dispatch(editEmployees(info)).then((res) =>
      res.payload.code === 200
        ? dispatch(getEmployeesData(props.pageSize)).then(setOpen(false))
        : setOpen(true)

    );



   

  };
  const handlecvChange = (e) => {
    // Retrieve the selected cv file from the input event
    const selectedcv = e.target.files[0];
  
    // Check if a file is selected
    if (selectedcv) {
      // Generate a URL for the selected cv file to be used for display
      setSelectedcvUrl(URL.createObjectURL(selectedcv));
  
      // Update the formData state by assigning the selected cv file directly to the cv field
      setFormData({ ...formData, cv: selectedcv });
    }
  };
  useEffect(() => {
  
    setIsLoading(true);

    const fetchData = async () => {
      await dispatch(getOneEmployeesData({id, pageSize: props.pageSize }));
      await dispatch(getWorkingShiftsMenu());
      await dispatch(getJobsMenu());
      await dispatch(getUsersMenu());

     
      setIsLoading(false);
    };

    fetchData();
  }, [dispatch, id, props.pageSize]);
  useEffect(() => {
    // Check if dataEmploye is available before setting the initial values
    if (dataEmploye) {
      setFormData({
        name: dataEmploye.user.name,
        cv: null,
        working_shift_id: dataEmploye.working_shift_id,
        birth_date: dataEmploye.birth_date,
        certificate: dataEmploye.certificate,
        military_service: dataEmploye.military_service,
        nationality: dataEmploye.nationality,
        passport_number: dataEmploye.passport_number,
        landline_number: dataEmploye.landline_number,
        social_status: dataEmploye.social_status,
        email: dataEmploye.user.email,
        phone: dataEmploye.user.phone,
        password: dataEmploye.password,
        password_confirmation: dataEmploye.password_confirmation,
      });
    }
  }, [dataEmploye]);
  if (isDataLoading) {
    return <p></p>;
  }

  // If dataEmploye is null, data fetching failed or not yet initiated
  if (!dataEmploye) {
    return <p></p>;
  }

  return (
    <Box>
<Container>
<Header title={t("Edit")}/>
    

          
       
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
              {t("working_shift")}
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
            {t("birth date")}
          </label>
          <TextField
            type="text"
            name="birth_date"
            value={formData.birth_date}
            onChange={(e) =>
              setFormData({ ...formData, birth_date: e.target.value })
            }
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
            onChange={(e) =>
              setFormData({ ...formData, certificate: e.target.value })
            }
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
            {t("military_service")}
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
            type="text"
            name="nationality"
            value={formData.nationality}
            onChange={(e) =>
              setFormData({ ...formData, nationality: e.target.value })
            }
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
            {t("passport_number")}
          </label>
          <TextField
            type="text"
            name="passport_number"
            value={formData.passport_number}
            onChange={(e) =>
              setFormData({ ...formData, passport_number: e.target.value })
            }
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
            type="text"
            name="landline_number"
            value={formData.landline_number}
            onChange={(e) =>
              setFormData({ ...formData, landline_number: e.target.value })
            }
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
            {t("name")}
          </label>
          <TextField
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
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
            {t("Email")}
          </label>
          <TextField
            type="text"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
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
            type="text"
            name="phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
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
            {t("password")}
          </label>
          <TextField
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
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
            {t("confirm password")}
          </label>
          <TextField
            type="password"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={(e) =>
              setFormData({ ...formData, password_confirmation: e.target.value })
            }
          />
          </Box>

          <div
            style={{
              margin: ".5rem auto",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
          
          </div>
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
            {t("Select  file")}
          </label>
          <input
            type="file"
            id="fileInput"
            onChange={handlecvChange}
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
              <TextField
                variant="outlined"
                value={formData.cv ? formData.cv.name : ""}
                placeholder={t("File pdf")}
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
       
     
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 15px",
              width:"100%",
              margin:"30px 0 0 0",
            }}
            onClick={handleApiCall}
            endIcon={props.icon}
          >
            {t("Edit")}
          </Button>
          </Container>
    </Box>
  );
};

export default EditEmployee;
