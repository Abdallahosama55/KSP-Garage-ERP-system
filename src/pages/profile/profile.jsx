import React, { useEffect, useState } from "react";
import { Box, Button, TextField, useMediaQuery, useTheme } from "@mui/material";
import "./profile.css";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { editUserProfile, userProfile } from "../../redux/profile";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../global/sidebar/sidebarContext";
import * as yup from "yup";
import { useFormik } from "formik";
import { tokens } from "../../theme";
import PasswordChange from "./password";
import { StatuseCode } from "../../statuseCodes";
import { useRef } from "react";
import BadgeAvatars from "./avatar";

const Profile = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const profileInfo = useSelector((state) => state.profile.userInfo.data);
  const validationSchema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    name: yup.string().required("Required"),
  });
  console.log("profileInfo", profileInfo);

  const [img, setImg] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: profileInfo?.name,
      email: profileInfo?.email,
      avatar: null,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    if (values.avatar) {
      formData.append("avatar", values.avatar);
    }
    await dispatch(editUserProfile(formData)).then((res) =>
      res.payload.code === StatuseCode.OK ? dispatch(userProfile()) : null
    );
  };

  useEffect(() => {
    dispatch(userProfile());
  }, [dispatch]);

  const { sidebarRTL } = useSidebarContext();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    setImg(profileInfo?.avatar);
  }, [profileInfo]);

  const handleImgChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files[0]);
      await formik.setFieldValue("avatar", e.target.files[0]);
      await setImg(URL.createObjectURL(e.target.files[0]));
    }
  };
  const fileInputRef = useRef();
  const handleAvatarClick = () => {
    fileInputRef.current.click(); // Simulate a click on the file input
  };
  return (
    <Box m="20px">
      <Header title={t("User Profile")} />

      <form
        onSubmit={formik.handleSubmit}
        display="flex"
        flexDirection="column"
        backgroundColor="#0000005e"
        padding="25px"
        borderRadius="10px"
        gap="20px"
        textAlign={sidebarRTL ? "right" : "left"}
      >
        <Box
          sx={{
            margin: "1rem auto",
            width: "fit-content",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <BadgeAvatars onClick={handleAvatarClick} avatarSrc={img} />

          <input
            type="file"
            style={{ display: "none" }}
            onChange={handleImgChange}
            ref={fileInputRef}
          />
        </Box>
        <div
          className="mainProfileData"
          style={{ flexDirection: sidebarRTL ? "row-reverse" : "row" }}
        >
          <div
            className="profileDataContainer"
            style={{ flexDirection: sidebarRTL ? "row-reverse" : "row" }}
          >
            <p>{t("ID")} </p>
            <TextField
              value={profileInfo?.id}
              disabled={true}
              sx={{ margin: "0px 10px" }}
              variant="standard"
            />
          </div>
          <div
            className="profileDataContainer"
            style={{ flexDirection: sidebarRTL ? "row-reverse" : "row" }}
          >
            <p>{t("address")} </p>
            <TextField
              multiline
              variant="standard"
              disabled={true}
              value={profileInfo?.address}
              sx={{ margin: "0px 10px" }}
            />
          </div>
          <div
            className="profileDataContainer"
            style={{ flexDirection: sidebarRTL ? "row-reverse" : "row" }}
          >
            <p>{t("Name")} </p>
            <TextField
              name="name"
              // defaultValue={profileInfo.name}
              value={formik.values.name}
              onChange={formik.handleChange}
              variant="standard"
              fullWidth
              margin="normal"
            />
          </div>
          <div
            className="profileDataContainer"
            style={{ flexDirection: sidebarRTL ? "row-reverse" : "row" }}
          >
            <p>{t("Phone")} </p>
            <TextField
              variant="standard"
              value={profileInfo?.phone}
              sx={{ margin: "0px 10px" }}
              disabled={true}
            />
          </div>
          <div
            className="profileDataContainer"
            style={{ flexDirection: sidebarRTL ? "row-reverse" : "row" }}
          >
            <p>{t("email")} </p>
            <TextField
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              variant="standard"
              fullWidth
              margin="normal"
            />
          </div>
          <div
            className="profileDataContainer"
            style={{ flexDirection: sidebarRTL ? "row-reverse" : "row" }}
          >
            <p>{t("type")} </p>
            <TextField
              value={profileInfo?.type}
              variant="standard"
              disabled={true}
              sx={{ margin: "0px 10px" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "75%",
            }}
          >
            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: colors.greenAccent[500],
                fontSize: "16px",
                fontWeight: "bold",
                width: isNonMobile ? "50%" : "100%",
                height: "40px",
                margin: "1rem auto",
                alignSelf: "center",
              }}
            >
              {t("Update")}
            </Button>
            <PasswordChange />
          </div>
        </div>
      </form>
    </Box>
  );
};

export default Profile;
