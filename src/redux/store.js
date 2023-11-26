import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import auth from "./auth";
import profile from "./profile";
import roles from "./responsibility";
import interviews from "../Hr/redux/interviews";
import Job_announcements from "../Hr/redux/Job_announcements";
import Job from "../Hr/redux/Job";
import dashboard from "./dashboard";
import Contract from "../Hr/redux/Contract";
import subject from "./subject";
import Subjects from "./Subjects";
import showOnePlaneData from "./showOnePlane";
import changePassowrd from "./changePassowrd";
import socialSpecialist from "./socialSpecialist";
import gradeExpenses from "./gradeExpenses";
import StudentsExpenses from "./StudentsExpenses";
import ExamSchedule from "./ExamSchedule";
import StudentInstallments from "./StudentInstallments";
import currencies from "./currencies";
import units from "./Units";
import product from "./product";
import about_us from "./about_us";
import contact_us from "./contact_us";
import colors from "./colors";
import garages from "./garages";
import Applicants from "../Hr/redux/Applicants";
import Fired_employees from "./Fired_employees";
import working_shifts from "./working_shifts";
import Employees from "../Hr/redux/Employees";
import brands from "./brands";
import TypeExpensess from "./TypeExpensess";
import student from "./student";
import penalty from "../Hr/redux/allowancePenaltyTypes";
import Quote from "./Quote";
import storeHouse from "./storeHouse";
import select_menus from "./select_menus";
import settings from "./settings";
import visitorsCars from "./visitorsCars";
import Department from "../Hr/redux/Department";
import Expenses from "./Expenses";
import tasks from "./tasks";
import DamagedMaterials from "./DamagedMaterials";
import termsAndCondtions from "./termsAndCondtions";
import Visitors from "./Visitors";
import ads from "./ads";
import visits from "./visits";
import consumedProducts from "./consumedProduct";
import carFix from "./carFix";
import adminEmployee from "./adminEmployee";
import notifications from "./notification";
import myTasks from "./myTasks";
import Blogs from "./Blogs";
import cars from "./cars";
import Testimonials from "./Testimonials";
import employeeAllowances from "../Hr/redux/employee_allowances";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const persistedReducer = persistReducer(persistConfig, auth);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
    profile: profile,
    dashboard: dashboard,
    roles: roles,
    subject: subject,
    student: student,
    subjects: Subjects,
    showOnePlane: showOnePlaneData,
    changePassword: changePassowrd,
    socialSpecialist: socialSpecialist,
    cars: cars,
    Department: Department,
    Job: Job,
    brands: brands,
    Expenses: Expenses,
    units: units,
    product: product,
    about_us: about_us,
    contactUs: contact_us,
    colors: colors,
    garages: garages,
    gradeExpenses: gradeExpenses,
    StudentsExpenses: StudentsExpenses,
    ExamSchedule: ExamSchedule,
    Installments: StudentInstallments,
    currencies: currencies,
    Job_announcements: Job_announcements,
    Contract: Contract,
    Applicants: Applicants,
    Fired_employees: Fired_employees,
    working_shifts: working_shifts,
    Employees: Employees,
    typeExpensess: TypeExpensess,
    interviews: interviews,
    Quote: Quote,
    storeHouse: storeHouse,
    selectMenu: select_menus,
    settings: settings,
    visitorsCars: visitorsCars,
    tasks: tasks,
    damagedMaterials: DamagedMaterials,
    termsAndCondtions: termsAndCondtions,
    visitors: Visitors,
    ads: ads,
    visits: visits,
    consumedProducts: consumedProducts,
    CarFix: carFix,
    admin: adminEmployee,
    notifications: notifications,
    myTasks: myTasks,
    Blogs: Blogs,
    Penalty: penalty,
    testimonials: Testimonials,
    employeeAllowances: employeeAllowances,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export let persistor = persistStore(store);
