import * as React from "react";
import Tooltip from "@mui/material/Tooltip";
import { useTranslation } from "react-i18next";

const CustomToolTip = (props) => {
  const { t } = useTranslation();
  return (
    <Tooltip
      fontSize="18px"
      title={<h6 style={{ fontSize: "18px !important" }}>{t(props.text)}</h6>}
    >
      <span
        style={{
          color: props.color,
          fontSize: "18px !important",
          background: props.background ? props.background : "none",
          padding: ".2rem",
          borderRadius: ".2rem",
        }}
      >
        {t(props.text)}
      </span>
    </Tooltip>
  );
};
export default CustomToolTip;
