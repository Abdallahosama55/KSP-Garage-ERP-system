import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, TextField, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import DefaultButton from "./defaultBtn";
import { useTranslation } from "react-i18next";
import defaultAPI from "../../../axiosInstance";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext";
import { useDispatch } from "react-redux";
import { getDepartmentData } from "../../redux/Department";

const AddBrand = (props) => {
  const { sidebarRTL } = useSidebarContext();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch=useDispatch()
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    manager_id: null,
  });
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // State variable to store the URL of the selected image


  const handleClickOpen = () => {
    setOpen(true);

    // Reset the form data when the dialog is opened
    setFormData({
      name: "",
      manager_id:null,
     
    });

  };

  const handleApiCall = async () => {
    if (loading) {
      return; // If loading is true, do nothing (prevent multiple clicks)
    }

  

 

    setLoading(true);

    const apiUrl = `/admin/applicants`;
    try {
      const formDataObj = new FormData();
      formDataObj.append("name", formData.name);
      formDataObj.append("manager_id", formData.manager_id);


      // Send the image data to the server and get the response
      const response = await defaultAPI.post(apiUrl, formDataObj);


      dispatch(getDepartmentData(props.pageSize))
      // Reset the form data
      setFormData({
        name: "",
        manager_id:null
   
      });

      // Close the dialog
      setOpen(false);
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while uploading.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      
      <Dialog
        fullWidth={true}
        sx={{ width: { xs: "100%", md: "50%" }, margin: "auto", padding: "0" }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle
          sx={{ fontWeight: "bold", fontSize: "30px" }}
          align={sidebarRTL ? "right" : "left"}
        >
          {t("Add")}
        </DialogTitle>
        <DialogContent>
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
            <label
            style={{
              fontSize: "18px",
              marginBottom: ".5rem",
              fontWeight: "bold",
            }}
          >
              {t("manager_id")}
              </label>
            <TextField
            type="text"
            name="manager_id"
            value={formData.manager_id}
            onChange={(e) => setFormData({ ...formData, manager_id: e.target.value })}
          />
          </Box>
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
            {t("")}
          </label>
   
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
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={() => setOpen(false)}
          >
            {t("Cancel")}
          </Button>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
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
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddBrand;
