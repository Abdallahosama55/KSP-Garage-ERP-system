import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../global/sidebar/sidebarContext";
import { addGagrage, getEmployeeMenu, getGarages } from "../../redux/garages";
import CustomMultiSelectMenu from "../../components/CustomMultiSelectMenu/CustomMultiSelectMenu";
import CustomTextFeild from "../../components/CustomTextFeild/CustomTextFeild";
import CustomSelectMenu from "../../components/CustomSelect/CustomSelect";
import { StatuseCode } from "./../../statuseCodes";
import { Box } from "@mui/material";
import DefaultButton from "../../components/defaultBtn";
import { useNavigate } from "react-router-dom";

const AddGarage = ({ pageSize }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState(null);
  const { sidebarRTL } = useSidebarContext();
  const [SelectedManager, setSelectedManager] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmployeeMenu());
  }, [dispatch]);

  const employeedata =
    useSelector((state) => state.garages.employeeMenu.data) || [];
  const info = {
    name: name,
    employees: selectedIds,
    manager_id: SelectedManager ? parseInt(SelectedManager.id) : null,
    address: address,
    phone: phone ? parseInt(phone) : null,
    pageSize: pageSize,
  };

  const handleAdd = async () => {
    await dispatch(addGagrage(info)).then((res) => {
      res.payload.code === StatuseCode.CREATED ??
        dispatch(getGarages(info)).then(() => navigate(-1, { replace: true }));
    });
  };
  const handleSelectManager = (selectedOptions) => {
    setSelectedManager(selectedOptions);
  };
  const handleSelect = (selectedOptions) => {
    const selectedIds = selectedOptions.map((option) => option.id);
    setSelectedIds(selectedIds);
  };

  const textFieldTest = [
    { title: "name", method: setName, autoFocus: true, value: name },
    { title: "phone", method: setPhone, autoFocus: false, value: phone },
    { title: "address", method: setAddress, autoFocus: false, value: address },
  ];
  return (
    <div style={{ margin: "20px" }}>
      <Box dir={sidebarRTL ? "rtl" : "ltr"}>
        {textFieldTest.map((item, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <label style={{ fontSize: "18px", fontWeight: "Bold" }}>
              {t(item.title)}
            </label>
            <CustomTextFeild
              autoFocus={item.autoFocus}
              placeholder={t(item.title)}
              fullWidth={true}
              value={item.value}
              onChange={(e) => item.method(e.target.value)}
            />
          </div>
        ))}

        <CustomSelectMenu
          lable="Select manager"
          options={employeedata}
          // placeholder={t("Select Manager")}
          onChange={handleSelectManager}
        />
        <div style={{ marginTop: "10px", position: "relative" }}>
          <label style={{ fontSize: "18px", fontWeight: "Bold" }}>
            {t("Select Employees")}
          </label>
          <CustomMultiSelectMenu
            options={employeedata.length > 0 && employeedata}
            // placeholder={t("Select Employees")}
            onChange={handleSelect}
          />
        </div>
      </Box>
      <DefaultButton fullWidth={true} handleClick={handleAdd} text="Add" />
    </div>
  );
};

export default AddGarage;
