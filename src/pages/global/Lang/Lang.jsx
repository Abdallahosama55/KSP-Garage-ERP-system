import React, { useState } from "react";
import { DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import ENGIMG from "./flags/us.svg";
import Lebanon from "./flags/lebanon-flag-icon.svg";
import FRENCHIMG from "./flags/french.svg";
import { useTranslation } from "react-i18next";
import LanguageIcon from '@mui/icons-material/Language';
import { useSidebarContext } from "../sidebar/sidebarContext";
import { tokens } from "../../../theme";
import "./Style/style.css";
import { memo } from "react";
import { useTheme } from "@mui/material";
import { useEffect } from "react";

const Languages = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { i18n } = useTranslation();
    const { sidebarRTL, setSidebarRTL } = useSidebarContext();

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem("lang") || "en");

    const handleLanguageChange = (language) => {
        if (language !== i18n.language) {
            localStorage.setItem("lang", language);
            i18n.changeLanguage(language);
            const isRTL = language === "ar";
            setSidebarRTL(isRTL);
            setSelectedLanguage(language);
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        const lang = localStorage.getItem("lang")
        lang === "ar" && setSidebarRTL(true)
    },[])

    return (
        <UncontrolledDropdown tag="li" className="dropdown-user nav-item" isOpen={dropdownOpen} toggle={() => setDropdownOpen(!dropdownOpen)}>
            <DropdownToggle
                tag="a"
                className="nav-link dropdown-user-link"
                onClick={(e) => {
                    e.preventDefault();
                    setDropdownOpen(!dropdownOpen);
                }}
            >
                <LanguageIcon fontSize="large" className="ficon" />
            </DropdownToggle>
            <DropdownMenu end style={{ background: colors.blueAccent[700], color:colors.grey[100] }}>
                <div className="lang" onClick={() => handleLanguageChange("en")}>
                    <img src={ENGIMG} alt="ENG" />
                    <span>English</span>
                </div>
                <div className="lang" onClick={() => handleLanguageChange("ar")}>
                    <img src={Lebanon} alt="AR" />
                    <span>Arabic</span>
                </div>
                <div className="lang" onClick={() => handleLanguageChange("fr")}>
                    <img src={FRENCHIMG} alt="FR" />
                    <span>français</span>
                </div>
            </DropdownMenu>
        </UncontrolledDropdown>
    );
};

export default memo(Languages);
