import React from "react";
import { tokens } from "../theme";
import { Button, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

const EditButton = ({ disabled, fullWidth, backGround, onClick, text }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Button
      disabled={disabled ? true : false}
      fullWidth={fullWidth ?? false}
      variant="contained"
      sx={{ background: `${backGround ?? colors.primary[600]}`, margin: 2 }}
      onClick={onClick}
    >
      {t(text)}
    </Button>
  );
};

export default EditButton;
