import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, TextField, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../global/sidebar/sidebarContext";
import { useDispatch } from "react-redux";
import {
  editworking_shifts,
  getworking_shiftsData,
} from "../../redux/working_shifts";

const EditWorkingShift = (props) => {
  const { sidebarRTL } = useSidebarContext();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(props.img);

  const [formData, setFormData] = useState({
    name:props.name,
    starts_at: props.starts_at,
    ends_at: props.ends_at,
    rest_hours:props.rest_hours,
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
  
    let startsAt = formData.starts_at.split(':'),
        endsAt = formData.ends_at.split(':');

    startsAt.pop();
    endsAt.pop()

    console.log(startsAt.join(':'), endsAt.join(':'))
    const info = {
      values:{
        name: formData.name,
        starts_at: startsAt.join(':'),
        ends_at: endsAt.join(':'),
        rest_hours: formData.rest_hours,
      },
      id:formData.id,
    };
  
    console.log('info', info)
    await dispatch(editworking_shifts(info)).then((res) =>
      res.payload.code === 200
        ? dispatch(getworking_shiftsData({pageSize: props.pageSize})).then(setOpen(false))
        : setOpen(true)
    );
  };
  
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
              {t("Name")}
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
            {t("starts_at")}
          </label>
          <TextField
            type="time"
            name="starts_at"
            value={formData.starts_at}
            onChange={(e) =>
              setFormData({ ...formData, starts_at: e.target.value})
            }
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
          <TextField
            type="time"
            name="ends_at"
            value={formData.ends_at}
            onChange={(e) =>
              setFormData({ ...formData, ends_at: e.target.value})
            }
          />
          <label
          style={{
            fontSize: "18px",
            marginBottom: ".5rem",
            fontWeight: "bold",
          }}
        >
          {t("rest_hours")}
        </label>
        <TextField
          type="number"
          name="rest_hours"
          value={formData.rest_hours}
          onChange={(e) =>
            setFormData({ ...formData, rest_hours: e.target.value })
          }
          inputProps={{ min: 0 }}
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
          >
            {t("Edit")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EditWorkingShift;
