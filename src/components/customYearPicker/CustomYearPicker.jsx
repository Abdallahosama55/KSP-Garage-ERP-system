import React from "react";
import { useSidebarContext } from "../../pages/global/sidebar/sidebarContext";
import { Box, TextField, useMediaQuery } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useTranslation } from "react-i18next";
import CustomLable from "../CustomLable";
import dayjs from "dayjs";

const CustomYearPicker = (props) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { t } = useTranslation();
  const { sidebarRTL } = useSidebarContext();
  return (
    <Box
      dir={sidebarRTL ? "rtl" : "ltr"}
      display="grid"
      gap="30px"
      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
      sx={{
        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
      }}
    >
      <CustomLable title={props.title} />
      <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth={true}>
        <DatePicker
          views={["year"]}
          dir={sidebarRTL ? "rtl" : "ltr"}
          sx={{
            direction: sidebarRTL ? "rtl" : "ltr",
            gridColumn: "span 4",
          }}
          placeholder={t(props.title)}
          format="YYYY"
          value={props.value}
          onBlur={props.onBlur}
          onChange={props.onChange}
          name={props.name}
          error={props.error}
          defaultValue={dayjs(props.defaultData || null)}
          helperText={props.helperText}
          renderInput={(props) => (
            <TextField {...props} variant="outlined" fullWidth />
          )}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default CustomYearPicker;
