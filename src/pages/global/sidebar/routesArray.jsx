import React from "react";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { USER_TYPES_ENUM } from "../../../enums/userTypeEnum";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import TireRepairIcon from "@mui/icons-material/TireRepair";
import RvHookupIcon from "@mui/icons-material/RvHookup";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import PreviewIcon from "@mui/icons-material/Preview";
import GarageIcon from "@mui/icons-material/Garage";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import EngineeringIcon from "@mui/icons-material/Engineering";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TourIcon from "@mui/icons-material/Tour";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import CarRepairIcon from "@mui/icons-material/CarRepair";
import BalanceIcon from "@mui/icons-material/Balance";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import CancelIcon from "@mui/icons-material/Cancel";
import InventoryIcon from "@mui/icons-material/Inventory";
import ExpandIcon from "@mui/icons-material/Expand";
import AddTaskIcon from "@mui/icons-material/AddTask";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import ChatIcon from "@mui/icons-material/Chat";
import FeedIcon from "@mui/icons-material/Feed";
import StoreIcon from "@mui/icons-material/Store";
import SettingsIcon from "@mui/icons-material/Settings";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import PermMediaIcon from "@mui/icons-material/PermMedia";

const RoutesArray = () => {
  return [
    {
      lable: "Cars Management",
      icon: <RvHookupIcon />,
      routes: [
        {
          title: "brands",
          to: "brand",
          icon: <BrandingWatermarkIcon />,
          permission: "all-brand",
          type: Object.values(USER_TYPES_ENUM),
        },
        {
          title: "colors",
          to: "colors",
          icon: <ColorLensIcon />,
          permission: "all-color",
          type: Object.values(USER_TYPES_ENUM),
        },
        {
          title: "cars",
          to: "cars",
          icon: <DirectionsCarIcon />,
          permission: "all-car",
          type: Object.values(USER_TYPES_ENUM),
        },
      ],
    },
    {
      lable: "Garage Management",
      icon: <StoreIcon />,
      routes: [
        {
          title: "Garages",
          to: "garages",
          icon: <GarageIcon />,
          permission: "all-garage",
          type: [
            USER_TYPES_ENUM.MAIN_GARAGE,
            USER_TYPES_ENUM.ADMIN,
            USER_TYPES_ENUM.ADMIN_EMPLOYEE,
          ],
        },
        {
          title: "store_house",
          to: "storehouse",
          icon: <WarehouseIcon />,
          permission: "all-store_house",
          type: Object.values(USER_TYPES_ENUM),
        },
      ],
    },

    {
      lable: "Visitor Management",
      icon: <DriveEtaIcon />,
      routes: [
        {
          title: "visitors",
          to: "visitors",
          icon: <TransferWithinAStationIcon />,
          permission: "all-visitor",
          type: Object.values(USER_TYPES_ENUM),
        },
        {
          title: "visits",
          to: "visits",
          icon: <TourIcon />,
          permission: "all-visit",
          type: Object.values(USER_TYPES_ENUM),
        },
        {
          title: "visitorscars",
          to: "visitorscars",
          icon: <DirectionsCarIcon />,
          permission: "all-visitor_car",
          type: Object.values(USER_TYPES_ENUM),
        },
        {
          title: "car-fix",
          to: "car-fix",
          icon: <CarRepairIcon />,
          permission: "all-car_fix",
          type: [USER_TYPES_ENUM.MAIN_GARAGE, USER_TYPES_ENUM.SUB_GARAGE],
        },
      ],
    },
    {
      lable: "Materials Management",
      icon: <TireRepairIcon />,
      routes: [
        {
          title: "Units",
          to: "Units",
          icon: <BalanceIcon />,
          permission: "all-unit",
          type: Object.values(USER_TYPES_ENUM),
        },
        {
          title: "Products",
          to: "Products",
          icon: <Inventory2Icon />,
          permission: "all-product",
          type: [
            USER_TYPES_ENUM.ADMIN,
            USER_TYPES_ENUM.MAIN_GARAGE,
            USER_TYPES_ENUM.ADMIN_EMPLOYEE,
          ],
        },

        {
          title: "consumed_products",
          to: "consumed-products",
          icon: <InventoryIcon />,
          permission: "all-consumed_product",
          type: Object.values(USER_TYPES_ENUM),
        },

        {
          title: "move-product",
          to: "move-products",
          icon: <ExpandIcon />,
          permission: "move-product",
          type: Object.values(USER_TYPES_ENUM),
        },
        {
          title: "damaged-materials",
          to: "damaged-materials",
          icon: <CancelIcon />,
          permission: "all-damaged_material",
          type: Object.values(USER_TYPES_ENUM),
        },
      ],
    },
    {
      lable: "Task Management",
      icon: <AssignmentTurnedInIcon />,
      routes: [
        {
          title: "tasks",
          to: "tasks",
          icon: <AddTaskIcon />,
          permission: "all-daily_task",
          type: Object.values(USER_TYPES_ENUM),
        },
        {
          title: "my-tasks",
          to: "my-tasks",
          icon: <AssignmentIndIcon />,
          permission: "",
          type: [USER_TYPES_ENUM.MAIN_GARAGE, USER_TYPES_ENUM.SUB_GARAGE],
        },
      ],
    },
    {
      lable: "Admin Management",
      icon: <AdminPanelSettingsIcon />,
      routes: [
        {
          title: "Roles",
          to: "roles",
          icon: <SupervisorAccountIcon />,
          permission: "all-role",
          type: Object.values(USER_TYPES_ENUM),
        },
        {
          title: "admin-employee",
          to: "admin-employee",
          icon: <EngineeringIcon />,
          permission: "all-employee",
          type: Object.values(USER_TYPES_ENUM),
        },
      ],
    },
    {
      lable: "Expense Management",
      icon: <CurrencyExchangeIcon />,
      routes: [
        {
          title: "typeExpensess",
          to: "typeExpensess",
          icon: <RequestQuoteIcon />,
          permission: "all-expense_type",
          type: Object.values(USER_TYPES_ENUM),
        },
        {
          title: "expenses",
          to: "expenses",
          icon: <LocalAtmIcon />,
          permission: "all-expense",
          type: Object.values(USER_TYPES_ENUM),
        },
      ],
    },
    {
      lable: "Website",
      icon: <PreviewIcon />,
      routes: [
        {
          title: "contact-us",
          to: "contact-us",
          icon: <ChatIcon />,
          permission: "all-contact",
          type: Object.values(USER_TYPES_ENUM),
        },
        {
          title: "about-us",
          to: "about-us",
          icon: <FeedIcon />,
          permission: "all-about_us",
          type: Object.values(USER_TYPES_ENUM),
        },
        {
          title: "settings",
          to: "settings",
          icon: <SettingsIcon />,
          permission: "show-settings",
          type: Object.values(USER_TYPES_ENUM),
        },
        {
          title: "terms-and-conditions",
          to: "terms-and-conditions",
          icon: <LocalPoliceIcon />,
          permission: "show-terms_and_conditions",
          type: Object.values(USER_TYPES_ENUM),
        },
        {
          title: "Quote",
          to: "quote",
          icon: <FormatQuoteIcon />,
          permission: "all-quote",
          type: Object.values(USER_TYPES_ENUM),
        },
        {
          title: "Testimonials",
          to: "Testimonials",
          icon: <RemoveRedEyeIcon />,
          permission: "all-testimonial",
          type: Object.values(USER_TYPES_ENUM),
        },
        {
          title: "ads",
          to: "ads",
          icon: <BorderColorIcon />,
          permission: "all-ad",
          type: Object.values(USER_TYPES_ENUM),
        },
        {
          title: "Blogs",
          to: "Blogs",
          icon: <PermMediaIcon />,
          permission: "all-blog",
          type: Object.values(USER_TYPES_ENUM),
        },
      ],
    },
    {
      lable: "Hr",
      icon: <PreviewIcon />,
      routes: [
        {
          title: "Department",
          to: "Department",
          icon: <AssignmentTurnedInIcon />,
          permission: "all-departments",
          type: Object.values(USER_TYPES_ENUM),
        },
        {
          title: "Job",
          to: "Job",
          icon: <AssignmentTurnedInIcon />,
          permission: "all-working_jobs",
          type: [
            USER_TYPES_ENUM.ADMIN,
            USER_TYPES_ENUM.MAIN_GARAGE,
            USER_TYPES_ENUM.ADMIN_EMPLOYEE,
          ],
        },
        {
          title: "Job_announcements",
          to: "Job_announcements",
          icon: <AssignmentTurnedInIcon />,
          permission: "all-job_announcement",
          type: Object.values(USER_TYPES_ENUM),
        },
        {
          title: "Applicants",
          to: "Applicants",
          icon: <AssignmentTurnedInIcon />,
          permission: "all-applicants",
          type: Object.values(USER_TYPES_ENUM),
        },
        {
          title: "working shifts",
          to: "working_shifts",
          icon: <AssignmentTurnedInIcon />,
          permission: "all-working_shifts",
          type: Object.values(USER_TYPES_ENUM),
        },
        {
          title: "Employees",
          to: "employees",
          icon: <AssignmentTurnedInIcon />,
          permission: "all-employees",
          type: [
            USER_TYPES_ENUM.MAIN_GARAGE,
            USER_TYPES_ENUM.ADMIN,
            USER_TYPES_ENUM.ADMIN_EMPLOYEE,
          ],
        },
        {
          title: "Penalty",
          to: "penalty",
          icon: <AssignmentTurnedInIcon />,
          permission: "all-employees_penalties",
          type: [
            USER_TYPES_ENUM.MAIN_GARAGE,
            USER_TYPES_ENUM.ADMIN,
            USER_TYPES_ENUM.ADMIN_EMPLOYEE,
          ],
        },
        {
          title: "employee_allowances",
          to: "employee_allowances",
          icon: <AssignmentTurnedInIcon />,
          permission: "all-employee_allowances",
          type: [
            USER_TYPES_ENUM.MAIN_GARAGE,
            USER_TYPES_ENUM.ADMIN,
            USER_TYPES_ENUM.ADMIN_EMPLOYEE,
          ],
        },
      ],
    },
  ];
};

export default RoutesArray;
