import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, TextField, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DefaultButton from "./defaultBtn";
import { useTranslation } from "react-i18next";
import defaultAPI from "../../axiosInstance";
import { useSidebarContext } from "../global/sidebar/sidebarContext";
import { useDispatch } from "react-redux";
import { getworking_shiftsData } from "../../redux/working_shifts";

const AddWorkingShift = (props) => {
  const { sidebarRTL } = useSidebarContext();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    starts_at: "",
    ends_at: "",
    rest_hours: null,
  });
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleClickOpen = () => {
    setOpen(true);
    setFormData({
      name: "",
      starts_at: "",
      ends_at: "",
      rest_hours: null,
    });
  };

  const handleApiCall = async () => {
    if (loading) {
      return;
    }

    setLoading(true);

    const apiUrl = `/admin/working_shifts`;
    try {
      const formDataObj = new FormData();
      formDataObj.append("name", formData.name);

      // Convert starts_at and ends_at to 24-hour format
      const startsAtIn24Hours = convertTo24HourFormat(formData.starts_at);
      const endsAtIn24Hours = convertTo24HourFormat(formData.ends_at);

      formDataObj.append("starts_at", startsAtIn24Hours);
      formDataObj.append("ends_at", endsAtIn24Hours);
      formDataObj.append("rest_hours", formData.rest_hours);

      const response = await defaultAPI.post(apiUrl, formDataObj);

      dispatch(getworking_shiftsData(props.pageSize));

      setFormData({
        name: "",
        starts_at: "",
        ends_at: "",
        rest_hours: null,
      });

      setOpen(false);
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while uploading.");
    } finally {
      setLoading(false);
    }
  };

  const convertTo24HourFormat = (time) => {
    const [hours, minutes] = time.split(":");
    const isPM = hours.toLowerCase().includes("pm");

    let hoursIn24Format = parseInt(hours, 10);
    if (isPM && hoursIn24Format !== 12) {
      hoursIn24Format += 12;
    } else if (!isPM && hoursIn24Format === 12) {
      hoursIn24Format = 0;
    }

    const formattedHours = hoursIn24Format.toString().padStart(2, "0");
    const formattedMinutes = minutes.padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}`;
  };

  return (
    <Box>
      <DefaultButton handleClick={handleClickOpen} text={t("ADD")} />
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
                setFormData({ ...formData, starts_at: e.target.value })
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
                setFormData({ ...formData, ends_at: e.target.value })
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
            disabled={loading}
          >
            {loading ? t("Loading...") : t("Add")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddWorkingShift;
