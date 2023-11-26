import React from "react";
import { useTranslation } from "react-i18next";

const CustomLable = ({ title, margin, body }) => {
  const { t } = useTranslation();
  return (
    <label
      style={{
        margin: margin,
        marginTop: "1rem",
        marginBottom: "1rem",
        fontSize: "18px",
        fontWeight: "Bold",
      }}
    >
      {t(title)}
      {body ? ` : ${body}` : null}
    </label>
  );
};

export default CustomLable;
