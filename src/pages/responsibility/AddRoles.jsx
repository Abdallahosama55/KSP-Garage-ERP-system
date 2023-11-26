import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import {
  Responsibility,
  addRole,
  getPermission,
} from "../../redux/responsibility";
import Table from "./GridComponent";
import { useSidebarContext } from "../global/sidebar/sidebarContext";
import { preparePermissions } from "./prepareRoles";
import DefaultButton from "./../../components/defaultBtn";

const AddRoles = ({ icon, pageSize, show }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const theme = useTheme();
  const loading = useSelector((state) => state.roles.loading);
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPermission());
  }, [dispatch]);

  const allRoles =
    useSelector((state) => state.roles.getPermission?.data) || [];
  const { uniqueRoles, uniqueOperations, uniquePermissions } =
    preparePermissions(allRoles);

  const handleCheckboxChange = (newCheckedItems) => {
    setSelectedIds(Object.keys(newCheckedItems));
  };

  const handleAdd = async () => {
    await dispatch(addRole({ name, permissions: selectedIds })).then(
      (res) => res.payload.code === 201 && handleClose()
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = async () => {
    const info = {
      pageSize,
    };
    setOpen(false);
    await dispatch(Responsibility(info));
    await setName("");
  };

  const { sidebarRTL } = useSidebarContext();

  return (
    <div>
      <DefaultButton
        // show={show}
        handleClick={handleClickOpen}
        text={t("Add")}
      />
      <Dialog
        fullWidth={true}
        sx={{
          "& .MuiPaper-elevation": {
            minWidth: "50%",
            transform: "translateX(-12%)",
          },
          margin: "auto",
          padding: "0",
        }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle
          sx={{ fontWeight: "bold", fontSize: "20px" }}
          align={sidebarRTL ? "right" : "left"}
        >
          {t("Add")}
        </DialogTitle>
        <DialogContent dir={sidebarRTL ? "rtl" : "ltr"}>
          <label style={{ fontSize: "18px", fontWeight: "Bold" }}>
            {t("Name")}
          </label>
          <TextField
            autoFocus
            margin="dense"
            placeholder={t("Name")}
            dir={sidebarRTL ? "rtl" : "ltr"}
            type="text"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ fontWeight: "bold", fontSize: "16px" }}
          />
          <Table
            uniquePermissions={uniquePermissions}
            uniquePermissionsLength={Object?.keys(uniquePermissions)?.length}
            uniqueOperations={uniqueOperations}
            uniqueRoles={uniqueRoles}
            onCheckboxChange={handleCheckboxChange}
          />
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
            onClick={handleAdd}
            disabled={!name}
            endIcon={icon}
          >
            {loading ? t("wait") : t("Add")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddRoles;
