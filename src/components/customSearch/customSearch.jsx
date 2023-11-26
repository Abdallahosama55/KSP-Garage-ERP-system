import * as React from "react";
import FormControl from "@mui/material/FormControl";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../../pages/global/sidebar/sidebarContext";
import { useDispatch } from "react-redux";
import { TextField } from "@mui/material";

let FetchedBefore = false;

const CustomSearch = (props) => {
  console.log(props);
  const { t } = useTranslation();
  const { SidebarRTL } = useSidebarContext();
  const dispatch = useDispatch();
  const handleSearch = (e) => {
    if (!e.target.value && !FetchedBefore && !props.id) {
      FetchedBefore = true;
      dispatch(props.action({ handle: "", pageSize: props.pageSize }));
    }
    if (!e.target.value && !FetchedBefore && !props.id) {
      FetchedBefore = true;
      dispatch(props.action({ handle: "", pageSize: props.pageSize }));
    } else if (props.id) {
      FetchedBefore = false;
      dispatch(
        props.action({
          handle: e.target.value,
          id: props.id,
          pageSize: props.pageSize,
        })
      );
    } else {
      FetchedBefore = false;
      dispatch(
        props.action({
          handle: e.target.value,
          id: props.id,
          pageSize: props.pageSize,
        })
      );
    }
  };

  return (
    <FormControl
      dir={SidebarRTL ? "rtl" : "ltr"}
      sx={{ m: 1, width: "25ch", fontSize: "20px" }}
      variant="outlined"
    >
      <label style={{ fontSize: "20px", fontWeight: "bold" }}>
        {t("search")}
      </label>
      <TextField
        dir={SidebarRTL ? "rtl" : "ltr"}
        className="search-input"
        onKeyUp={handleSearch}
        // id="outlined-adornment-weight"
        // aria-describedby="outlined-weight-helper-text"
        // inputProps={{
        //   "aria-label": "weight",
        // }}
      />
    </FormControl>
  );
};

export default CustomSearch;
