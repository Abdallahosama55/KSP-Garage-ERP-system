import React, { useState } from "react";
import "./table.css";
import { Box, Typography, Checkbox } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../global/sidebar/sidebarContext";

const Table = ({
  uniquePermissions,
  uniquePermissionsLength,
  uniqueOperations,
  uniqueRoles,
  onCheckboxChange,
  initialPermissions,
}) => {
  uniqueOperations = Array.from(uniqueOperations);
  uniqueRoles = Array.from(uniqueRoles);

  //console.log('initial is', initialPermissions)

  const { t } = useTranslation();
  const [checkedItems, setCheckedItems] = useState({});
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [initialSetBefore, setInitialPermissions] = useState(false);
  const { sidebarRTL } = useSidebarContext();

  if (initialPermissions && !initialSetBefore) {
    for (let permission of initialPermissions) {
      checkedItems[permission.id] = true;
    }
    setInitialPermissions(true);
    onCheckboxChange(checkedItems);
  }

  const handleCheckboxChange = (permissionID) => {
    //checkedItems[permissionID] = checkedItems[permissionID] ? false : true;

    if (checkedItems[permissionID]) {
      setSelectAllChecked(false);
      delete checkedItems[permissionID];
    } else {
      checkedItems[permissionID] = true;
      if (isFullyChecked()) {
        setSelectAllChecked(true);
      }
    }

    setCheckedItems(checkedItems);
    onCheckboxChange(checkedItems);
    // console.log(checkedItems);
  };

  const handleSelectAllChange = () => {
    const allSelectedPermissions = {};
    setSelectAllChecked(!selectAllChecked);
    if (!selectAllChecked) {
      Object.values(uniquePermissions).forEach((permissionID) => {
        allSelectedPermissions[permissionID] = true;
      });
    }
    setCheckedItems(allSelectedPermissions);
    onCheckboxChange(allSelectedPermissions);
  };
  // console.log()
  // const setAllChecked = function () {
  //   const allSelectedPermissions = {};

  //   if (selectAllChecked) {
  //     Object.values(uniquePermissions).forEach(function (permissionID) {
  //       allSelectedPermissions[permissionID] = selectAllChecked;
  //     });
  //   }
  //   setCheckedItems(allSelectedPermissions);
  //   onCheckboxChange(allSelectedPermissions);
  // };

  const isFullyChecked = () => {
    return uniquePermissionsLength === Object.keys(checkedItems).length;
  };

  const getChecked = function (operation, role) {
    let result =
      (isFullyChecked() ||
        checkedItems[uniquePermissions[`${operation}-${role}`]] !==
          undefined) &&
      uniquePermissions[`${operation}-${role}`] !== undefined;

    return result;
  };
  return (
    <>
      <Box
        display="flex"
        flexDirection={sidebarRTL ? "row-reverse" : "row"}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h6">{t("Administrator Role")}</Typography>
        <Box display="flex" flexDirection="row" alignItems="center">
          <Checkbox
            checked={selectAllChecked}
            onChange={handleSelectAllChange}
          />
          <Typography variant="h6">{t("Select All")}</Typography>
        </Box>
      </Box>
      <table className="custom-table" dir={sidebarRTL ? "rtl" : "ltr"}>
        <thead>
          <tr>
            <th className="first" style={{ width: "100px" }}>
              {t("Category")}
            </th>
            {uniqueOperations.map(function (element) {
              return (
                <th style={{ width: "100px" }}>
                  {t(
                    element.charAt(0).toUpperCase() +
                      element.slice(1).toLowerCase()
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {uniqueRoles.map((role, index) => (
            <tr key={index}>
              <td>{t(role)}</td>
              {uniqueOperations.map((operation) => (
                <td>
                  <Checkbox
                    checked={getChecked(operation, role)}
                    disabled={!uniquePermissions[`${operation}-${role}`]}
                    onChange={() =>
                      handleCheckboxChange(
                        uniquePermissions[`${operation}-${role}`]
                      )
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
