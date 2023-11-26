import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, TextField, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext";
import { useDispatch } from "react-redux";
import {
  firedEmployees,
  getEmployeesData,
} from "../../redux/Employees";

const FiredEmployees = (props) => {
  const { sidebarRTL } = useSidebarContext();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(props.img);

  const [formData, setFormData] = useState({
 
    reason: props.reason,
    type:"",
    
    id:props.id,
 

  });

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // State variable to store the URL of the selected image

  const handleClickOpen = async () => {
    setOpen(true);
  };

  const handleApiCall = async () => {
    if (loading) {
      return; // If loading is true, do nothing (prevent multiple clicks)
    }
  
    const info = {
      values: formData,
      reason: props.reason,
    type:props.type,
      id:formData.id,
    };
  
    await dispatch(firedEmployees(info)).then((res) =>
      res.payload.code === 201
        ? dispatch(getEmployeesData(props.pageSize)).then(setOpen(false))
        : setOpen(true)
    );
  };
  
  return (
    <Box>
      <Button
        variant="contained"
        onClick={handleClickOpen}
       
        sx={{background: colors.redAccent[400]}}
        endIcon={props.icon}
        disabled={props.is_fired} // Add this line
      >
        {t("fire_employee")}
      </Button>
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
          {t("FiredEmployees")}
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
              {t(" reason")}
            </label>
            <TextField
              type="text"
              name="reason"
              value={formData.reason}
              onChange={(e) =>
                setFormData({ ...formData, reason: e.target.value })
              }
            />
            <label
            style={{
              fontSize: "18px",
              marginBottom: ".5rem",
              fontWeight: "bold",
            }}
          >
            {t("type")}
          </label>
          <TextField
            type="text"
            name="type"
            value={formData.type}
            onChange={(e) =>
              setFormData({ ...formData, type: e.target.value })
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
          >
            {t("FiredEmployees")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FiredEmployees;
