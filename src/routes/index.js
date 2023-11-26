import { createBrowserRouter } from "react-router-dom";
import Department from "../Hr/pages/Department";
import ApplicantsTable from "../Hr/pages/Applicants/ApplicantsTable";
import App from "../App";
import ProductsTable from "../pages/Products/ProductTable";
import AddProduct from "../pages/Products/AddPruduct";
import EditProduct from "../pages/Products/EditProduct";
import EditJob_announcements from "../Hr/pages/Job_announcements/EditJob_announcements";
import AboutUs from "../pages/About_us/About_us";
import ContactUs from "../pages/contact_us/contact_us";
import Units from "../pages/units";
import Profile from "./../pages/profile/profile";
import Colors from "../pages/Colors/colors";
import JobTable from "../Hr/pages/Job/JobTable";
import Job_announcementsTable from "../Hr/pages/Job_announcements/Job_announcementsTable";
import Working_shiftsTable from "../pages/working_shifts/Working_shiftsTable";
import EmployeesTable from "../Hr/pages/Employees/EmployeesTable";
import InterviewsTable from "../Hr/pages/Applicants/interviews/InterviewsTable";
import ContractTable from "../Hr/pages/Employees/Contract/ContractTable";
import Responsibility from "../pages/responsibility";
import TypeExpensessTable from "../pages/typeExpensess/table";
import { Quote } from "../pages/Quote/Quote";
import StoreHouse from "../pages/storeHouse/storeHouse";
import Settings from "../pages/settings/settings";
import VisitorsCars from "../pages/VisitorsCars/VisitorsCars";
import AddVisitorsCars from "../pages/VisitorsCars/AddVisitorsCars";
import EditVisitorsCars from "../pages/VisitorsCars/EditVisitorsCars";
import Tasks from "../pages/tasks/tasks";
import AddTasks from "../pages/tasks/AddTasks";
import EditTasks from "../pages/tasks/EditTasks";
import DamagedMaterials from "../pages/damagedMaterials/damagedMaterials";
import TermsAndCondtions from "../pages/termsAndCondtions/termsAndCondtions";
import Visitors from "../pages/Visitors/Visitors";
import AddVisitors from "../pages/Visitors/AddVisitors";
import EditVisitors from "../pages/Visitors/EditVisitors";
import AdsTable from "../pages/ads/ads";
import AddAds from "../pages/ads/addAds";
import EditAds from "../pages/ads/editAds";

import Visits from "../pages/visits/Visits";
import ConsumedProducts from "../pages/ConstumedProduct/consumedProducts";
import AddConsumedProduct from "../pages/ConstumedProduct/AddcomsumedProduct";
import EditConsumedProduct from "../pages/ConstumedProduct/editComsumedProduct";
import CarFix from "../pages/carFix/carFix";
import AddCarFix from "../pages/carFix/addCarFix";
import ShowCarFix from "../pages/carFix/ShowOneCarFix";
import Expenses from "./../pages/Expenses/Expenses";
import AdminEmpolyee from "../pages/adminEmpolyee/adminEmpolyee";
import AddAdmin from "../pages/adminEmpolyee/addAdmin";
import EditAdmin from "../pages/adminEmpolyee/editAdmin";
import MyTasks from "../pages/myTasks/myTasks";
import Blogs from "../pages/Blogs/Blogs";
import EditCarFix from "../pages/carFix/editCarFix";
import AddRoles from "../pages/responsibility/AddRoles";
import EditRole from "../pages/responsibility/EditRoles";
import AddGarage from "../pages/Garages/AddGarage";
import EditGarage from "../pages/Garages/EditGarage";
import AddStoreHouse from "../pages/storeHouse/addStoreHouse";
import EditStoreHouse from "../pages/storeHouse/editStoreHouse";
// import ShowVisitorsCars from "../pages/VisitorsCars/ShowVisitorsCars";
import BrandsTable from "./../pages/brands/table";
import SubUnitsTbale from "./../pages/units/subUnitsTbale";
import Cars from "./../pages/Cars/index";
import MoveProducts from "./../pages/moveProducts/moveProducts";
import Garages from "./../pages/Garages/Garages";
import { Testimonials } from "./../pages/Testimonials/Testimonials";
import AddJobAnoucementPage from "../Hr/pages/Job_announcements/AddJobAnoucementPage";
import AddEmployees from "../Hr/pages/Employees/AddEmployees";
import EditEmployee from "../Hr/pages/Employees/EditEmployees";
import PenaltyTable from "../pages/allowancePenaltyTypes/allowancePenaltyTypes";
import EmployeeAllowances from "../pages/employee_allowances/employee_allowances";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "brand", element: <BrandsTable /> },
      { path: "cars", element: <Cars /> },
      { path: "units", element: <Units /> },
      { path: "units/:id/sub_units", element: <SubUnitsTbale /> },
      { path: "products", element: <ProductsTable /> },
      { path: "move-products", element: <MoveProducts /> },
      { path: "products/add-Product", element: <AddProduct /> },
      { path: "products/:id/edit-Product", element: <EditProduct /> },
      { path: "about-us", element: <AboutUs /> },
      { path: "contact-us", element: <ContactUs /> },
      { path: "profile", element: <Profile /> },
      { path: "colors", element: <Colors /> },
      { path: "roles", element: <Responsibility /> },
      { path: "roles/add", element: <AddRoles /> },
      { path: "roles/edit/:role_id", element: <EditRole /> },
      { path: "garages", element: <Garages /> },
      { path: "garages/add", element: <AddGarage /> },
      { path: "garages/edit/:id", element: <EditGarage /> },
      { path: "Testimonials", element: <Testimonials /> },
      { path: "quote", element: <Quote /> },
      { path: "typeExpensess", element: <TypeExpensessTable /> },
      { path: "storehouse", element: <StoreHouse /> },
      { path: "storehouse/add", element: <AddStoreHouse /> },
      { path: "storehouse/edit/:id", element: <EditStoreHouse /> },
      { path: "settings", element: <Settings /> },
      { path: "visitorscars", element: <VisitorsCars /> },
      { path: "visitorscars/add-visitor-car", element: <AddVisitorsCars /> },
      {
        path: "visitorscars/edit-Visitor-car/:visitorId",
        element: <EditVisitorsCars />,
      },
      { path: "expenses", element: <Expenses /> },
      { path: "tasks", element: <Tasks /> },
      { path: "tasks/add-task", element: <AddTasks /> },
      { path: "tasks/edit-task/:task_id", element: <EditTasks /> },
      { path: "tasks/:id/show", element: <EditTasks /> },
      { path: "my-tasks", element: <MyTasks /> },
      { path: "damaged-materials", element: <DamagedMaterials /> },
      { path: "terms-and-conditions", element: <TermsAndCondtions /> },
      { path: "visitors", element: <Visitors /> },
      { path: "visitors/add-visitor", element: <AddVisitors /> },
      { path: "visitors/edit-visitor/:visitor_id", element: <EditVisitors /> },
      { path: "ads", element: <AdsTable /> },
      { path: "ads/add-ads", element: <AddAds /> },
      { path: "ads/edit-ads/:ad_id", element: <EditAds /> },
      { path: "visits", element: <Visits /> },
      { path: "consumed-products", element: <ConsumedProducts /> },
      { path: "consumed-products/add", element: <AddConsumedProduct /> },
      { path: "consumed-products/edit/:id", element: <EditConsumedProduct /> },
      { path: "car-fix", element: <CarFix /> },
      { path: "car-fix/add", element: <AddCarFix /> },
      { path: "car-fix/:garage_id/show/:fix_id", element: <ShowCarFix /> },
      { path: "car-fix/:garage_id/update/:fix_id", element: <EditCarFix /> },
      { path: "admin-employee", element: <AdminEmpolyee /> },
      { path: "admin-employee/add", element: <AddAdmin /> },
      { path: "admin-employee/edit/:id", element: <EditAdmin /> },
      { path: "Blogs", element: <Blogs /> },
      { path: "interviews", element: <InterviewsTable /> },
      { path: "Department", element: <Department /> },
      { path: "Job", element: <JobTable /> },
      { path: "job_announcements", element: <Job_announcementsTable /> },
      { path: "Applicants", element: <ApplicantsTable /> },
      { path: "working_shifts", element: <Working_shiftsTable /> },
      { path: "employees", element: <EmployeesTable /> },
      { path: "Contract", element: <ContractTable /> },
      { path: "Edit_Annoucement/:id", element: <EditJob_announcements /> },
      { path: "/Add_Annoucement", element: <AddJobAnoucementPage /> },
      { path: "/Add_Employee", element: <AddEmployees /> },
      { path: "/editemployee/:id", element: <EditEmployee /> },
      { path: "penalty", element: <PenaltyTable /> },
      { path: "employee_allowances", element: <EmployeeAllowances /> },
    ],
  },
]);
