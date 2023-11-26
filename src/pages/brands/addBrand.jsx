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
import { getBrands } from "../../redux/brands";

const AddBrand = (props) => {
  const { sidebarRTL } = useSidebarContext();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    img: null,
  });
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [selectedImageUrl, setSelectedImageUrl] = useState("");

  const handleClickOpen = () => {
    setOpen(true);

    // Reset the form data when the dialog is opened
    setFormData({
      name: "",
      img: null,
    });

    // Reset the selected image URL
    setSelectedImageUrl("");
  };

  const handleApiCall = async () => {
    if (loading) {
      return; // If loading is true, do nothing (prevent multiple clicks)
    }

    if (!formData.img) {
      setMessage("Please select an image file.");
      return;
    }

    const allowedExtensions = [".jpg", ".jpeg", ".png"];
    const fileName = formData.img.name;
    const fileExtension = fileName
      .substring(fileName.lastIndexOf("."))
      .toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      setMessage("Please select a valid image file (jpg or png).");
      return;
    }

    setLoading(true);

    const apiUrl = `/admin/brands`;
    try {
      const formDataObj = new FormData();
      formDataObj.append("name", formData.name);
      formDataObj.append("img", formData.img);

      // Send the image data to the server and get the response
      const response = await defaultAPI.post(apiUrl, formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Set the selected image URL
      setSelectedImageUrl(response.data.imgUrl);
      dispatch(getBrands(props.pageSize));
      // Reset the form data
      setFormData({
        name: "",
        img: null,
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
            {t("Select File")}
          </label>
          <input
            type="file"
            id="fileInput"
            onChange={(e) =>
              setFormData({ ...formData, img: e.target.files[0] })
            }
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
                value={formData.img ? formData.img.name : ""}
                placeholder={t("File")}
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
