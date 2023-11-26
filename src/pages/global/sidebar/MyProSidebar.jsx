import { useState } from "react";
import { Menu, SubMenu, MenuItem, Sidebar } from "react-pro-sidebar";
import { useSidebarContext } from "./sidebarContext";
import { tokens } from "../../../theme";
import { useTheme, Box, IconButton } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useTranslation } from "react-i18next";
import { MenuOutlined } from "@mui/icons-material";
import Item from "./sidebarMenuItem";
import RoutesArray from "./routesArray";
import "./sidebar.css";
const MyProSidebar = () => {
  const { t } = useTranslation();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("brands");
  const { sidebarRTL } = useSidebarContext();
  const [collapsed, setCollapsed] = useState(true);
  return (
    <Box
      sx={{
        position: "stiky",
        display: "flex",
        minHeight: "100vh",
        top: 0,
        bottom: 0,
        zIndex: 10000,
        "& .sidebar": {
          border: "none",
        },
        "& .menu-icon": {
          backgroundColor: "transparent !important",
        },
        "& .menu-item": {
          backgroundColor: "transparent !important",
        },
        "& .menu-anchor": {
          color: "inherit !important",
          backgroundColor: "transparent !important",
        },
        "& .sub-menu-content": {
          color: "inherit !important",
          backgroundColor: `${colors.primary[400]} !important`,
        },

        "& .sc-pyfCe:hover": {
          color: `${colors.blueAccent[500]} !important`,
          backgroundColor: "transparent !important",
        },
        "& .menu-item.active": {
          color: `${colors.greenAccent[500]} !important`,
          backgroundColor: "transparent !important",
        },
      }}
    >
      <Sidebar
        className="parentSidebar"
        style={{
          height: "100vh", // Set a fixed height
          overflowY: "auto",
        }}
        breakPoint="md"
        rtl={sidebarRTL}
        collapsed={collapsed}
        width="300px"
        backgroundColor={colors.primary[400]}
      >
        <Menu iconshape="square">
          <MenuItem
            icon={
              collapsed && (
                <MenuOutlined onClick={() => setCollapsed(!collapsed)} />
              )
            }
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!collapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <img
                  src={
                    localStorage.getItem("color-mode") === "dark"
                      ? "/assets/KSBLOGOPNG.png"
                      : "/assets/KSBLOGOPNG.png"
                  }
                  alt="logo"
                  width="180px"
                  height="175px"
                  style={{
                    // margin: "0px 10px",
                    "@media (maxWidth:600px)": { margin: "0px 12px" },
                  }}
                />
                {/* <Avatar scr="assets/KSBLOGOPNG.png"/> */}
                <IconButton
                  onClick={() => setCollapsed(!collapsed)}
                  // onClick={

                  // }
                >
                  <CloseOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          <Box paddingLeft={collapsed ? undefined : "12%"}>
            {/* <MenuItem
              active={selected === "Dashboard"}
              onClick={() => setSelected("Dashboard")}
              icon={<School />}
              routerLink={<Link to="/dashboard" />}
              style={{
                color: colors.grey[100],
              }}
            > */}
            {/* <Typography sx={{ fontSize: "15px", fontWeight: 600 }}>
                {t("Dashboard")}
              </Typography> */}
            {/* </MenuItem> */}
            {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              <hr />
            </Typography> */}

            <Menu transitionDuration={2000}>
              {RoutesArray().map((item) => (
                <SubMenu icon={item.icon} label={t(item.lable)}>
                  {item.routes.map((menuItem) => (
                    <Item
                      key={menuItem.title}
                      title={t(menuItem.title)}
                      to={menuItem.to}
                      icon={menuItem.icon}
                      selected={selected}
                      setSelected={setSelected}
                      permission={menuItem.permission}
                      type={menuItem.type}
                    />
                  ))}
                </SubMenu>
              ))}
            </Menu>
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default MyProSidebar;
