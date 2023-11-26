import React, { useState,useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, TextField, useTheme ,MenuItem,Select} from "@mui/material";
import { tokens } from "../../../theme";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext";
import { useDispatch,useSelector } from "react-redux";
import {getMyManagermenu} from "../../../redux/select_menus";
import {
  editDepartment,
  getDepartmentData,
} from "../../redux/Department";


const EditDepartment = (props) => {
  const managers = useSelector((state) => state.selectMenu.MyManagermenu.data) ;

  const { sidebarRTL } = useSidebarContext();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(props.img);

  const [formData, setFormData] = useState({
    name:props.name,
    manager_id: props.manager_id,
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
      setLoading(true);
      return; // If loading is true, do nothing (prevent multiple clicks)
    }
  
    const info = {
      values: formData,
      name: formData.name,
      manager_id: formData.manager_id,
      id:formData.id,
    };

  
    await dispatch(editDepartment(info)).then((res) =>
      res.payload.code === 201
        ? dispatch(getDepartmentData(props.pageSize)).then(setOpen(false))
         
        : setOpen(true)

    );
  };
  useEffect(() => {
    // dispatch(getFullMarkGrades());
    dispatch(getMyManagermenu());
  }, [dispatch]);

  
  return (
    <Box>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={props.sx}
        endIcon={props.icon}
      >
        {t("Edit")}
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
          {t("Edit")}
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
            <label
            style={{
              fontSize: "18px",
              marginBottom: ".5rem",
              fontWeight: "bold",
            }}
          >
            {t("manager")}
          </label>
          <Select
          value={formData.manager_id}
          onChange={(e) =>
            setFormData({ ...formData, manager_id: e.target.value })
          }
          sx={{ width: "100%" }}
        >
          {managers?.map((manager) => (
            <MenuItem key={manager.id} value={manager.id}>
              {manager.name}
            </MenuItem>
          ))}
          </Select>
          
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
            {t("Edit")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EditDepartment;
