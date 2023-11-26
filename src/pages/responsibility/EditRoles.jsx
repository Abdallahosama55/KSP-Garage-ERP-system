import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { preparePermissions } from "./prepareRoles";

import {
  editRoles,
  getOneRole,
  getPermission,
} from "../../redux/responsibility";
import { useSidebarContext } from "../global/sidebar/sidebarContext";
import Table from "./GridComponent";
import { Box } from "@mui/material";

const EditRole = ({ icon, sx, id }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const dispatch = useDispatch();
  const { sidebarRTL } = useSidebarContext();

  useEffect(() => {
    dispatch(getPermission());
  }, [dispatch]);

  const allRoles =
    useSelector((state) => state.roles.getPermission?.data) || [];

  const { uniqueRoles, uniqueOperations, uniquePermissions } =
    preparePermissions(allRoles);

  const handleClickOpen = () => {
    dispatch(getOneRole({ id })).then((res) => {
      setName(res.payload.data.name);
      const filteredPermissions = res.payload.data.permissions.filter(
        (permission) => permission.status === true
      );
      setPermissions(filteredPermissions);
      setOpen(true);
    });
  };

  const handleEdit = () => {
    dispatch(editRoles({ name, permissions: selectedIds, id })).then((res) => {
      res.payload.code === 200 && setOpen(false);
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheckboxChange = (newCheckedItems) => {
    setSelectedIds(Object.keys(newCheckedItems));
  };

  return (
    <Box>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={sx}
        endIcon={icon}
      >
        {t("Edit")}
      </Button>
      <Dialog
        fullWidth={true}
        open={open}
        onClose={handleClose}
        sx={{
          width: "100%",
          margin: "auto",
          padding: "0",

          "& .MuiPaper-elevation": {
            minWidth: "50%",
            transform: "translateX(-12%)",
          },
        }}
      >
        <DialogTitle
          sx={{ fontWeight: "bold", fontSize: "22px" }}
          align={sidebarRTL ? "right" : "left"}
        >
          {t("Edit")}
        </DialogTitle>
        <DialogContent dir={sidebarRTL ? "rtl" : "ltr"} sx={{ width: "100%" }}>
          <label style={{ fontSize: "18px", fontWeight: "Bold" }}>
            {t("Name")}
          </label>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            placeholder={t("Name")}
            dir={sidebarRTL ? "rtl" : "ltr"}
            type="text"
            required="true"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            variant="outlined"
            inputProps={{
              style: { fontSize: "20px", fontWeight: "bold" }, // Adjust the font size here
            }}
          />
          <Table
            uniquePermissions={uniquePermissions}
            uniquePermissionsLength={Object?.keys(uniquePermissions)?.length}
            uniqueOperations={uniqueOperations}
            uniqueRoles={uniqueRoles}
            onCheckboxChange={handleCheckboxChange}
            initialPermissions={permissions}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            {t("Cancel")}
          </Button>
          <Button variant="contained" disabled={!name} onClick={handleEdit}>
            {t("Edit")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EditRole;
