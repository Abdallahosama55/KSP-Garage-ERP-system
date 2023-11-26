import { Box } from "@mui/material";
import React, { useMemo } from "react";
import Select from "react-select";
import { useSidebarContext } from "../../pages/global/sidebar/sidebarContext";
import CustomLable from "../CustomLable";
import { useTranslation } from "react-i18next";

const CustomSelectMenu = ({
  options,
  selected,
  placeholder,
  sx,
  lable,
  isDisabled,
  onChange,
  defaultData,
  loading,
}) => {
  const { t } = useTranslation();
  const { sidebarRTL } = useSidebarContext();
  // useMemo(() => {}, [options, onChange]);
  const translatedOptions = options.map((option) => ({
    ...option,
    name: t(option.name), // Assuming 'name' is the key for translation
  }));
  let selectedObject = options?.find((option) => option.id == defaultData);

  console.log("defaultData", defaultData);
  console.log("option", options);
  console.log("selectedObject", selectedObject);
  return (
    <Box dir={sidebarRTL ? "rtl" : "ltr"} sx={{ margin: "1rem auto" } || sx}>
      {lable ? <CustomLable title={lable} /> : null}
      <Select
        placeholder={placeholder ? t(placeholder) : t("Select Option")}
        isDisabled={!!isDisabled}
        isSearchable={true}
        isClearable={true}
        isMulti={false}
        defaultValue={selectedObject}
        // isOptionSelected={true}
        isOptionDisabled={(SelectedOption) =>
          SelectedOption?.id === selected?.id
        }
        // isLoading={loading}
        onChange={onChange}
        getOptionLabel={(option) => option.name}
        getOptionValue={(option) => option.id}
        options={options.length ? options : []}
        styles={{
          menu: (provided) => ({
            ...provided,
            //   zIndex: 9999,
            color: "#000",
            direction: sidebarRTL ? "rtl" : "ltr",
          }),
          container: (provided) => ({
            ...provided,
            //   zIndex: 9999,
            direction: sidebarRTL ? "rtl" : "ltr",
          }),
          menuPortal: (provided) => ({
            ...provided,
            //   zIndex: 9999,
            direction: sidebarRTL ? "rtl" : "ltr",
          }),
        }}
      />
    </Box>
  );
};

export default CustomSelectMenu;
