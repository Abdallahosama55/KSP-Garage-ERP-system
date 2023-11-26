import * as yup from "yup";
import mastervalidationSchema from "./../validationSchemasSyntax";

export const LoginSchema = yup.object({
  email: mastervalidationSchema.email,
  password: mastervalidationSchema.password,
});
export const addStoreHouseSchema = yup.object({
  name: mastervalidationSchema.text,
  phone: mastervalidationSchema.phone,
  address: mastervalidationSchema.address,
});
export const settingsSchema = yup.object({
  title: mastervalidationSchema.text,
  facebook: mastervalidationSchema.socialMedia,
  whatsapp: mastervalidationSchema.phone,
  youtube: mastervalidationSchema.socialMedia,
  checking_amount: mastervalidationSchema.number,
});
export const VisitorsCarsSchema = yup.object({
  car_license: mastervalidationSchema.text,
  vin_number: mastervalidationSchema.text,
  car_model: mastervalidationSchema.text,
});
export const TasksSchema = yup.object({
  description: mastervalidationSchema.text,
  title: mastervalidationSchema.text,
});
export const ExpensesSchema = yup.object({
  name: mastervalidationSchema.text,
  price: mastervalidationSchema.number,
});
export const DamagedMaterialsSchema = yup.object({
  quantity: mastervalidationSchema.number,
});
export const visitorsSchema = yup.object({
  name: mastervalidationSchema.text,
  email: mastervalidationSchema.email,
  phone: mastervalidationSchema.phone,
  type: mastervalidationSchema.text,
});
export const adsSchema = yup.object({
  title: mastervalidationSchema.text,
  discount: mastervalidationSchema.number,
  description: mastervalidationSchema.description,
});
export const noteSchema = yup.object({
  description: mastervalidationSchema.description,
});
export const visitSchema = yup.object({
  reason: yup.string().required("required"),
});
export const paySchema = yup.object({
  paid_amount: mastervalidationSchema.number,
});

export const consumedSchema = yup.object({
  name: mastervalidationSchema.text,
  main_unit_quantity: mastervalidationSchema.number,
  sub_unit_quantity: mastervalidationSchema.number,
  purchase_price: mastervalidationSchema.number,
  selling_price: mastervalidationSchema.number,
});
export const adminAccountSchema = yup.object({
  name: mastervalidationSchema.text,
  email: mastervalidationSchema.email,
  password: mastervalidationSchema.password,
  password_confirmation: mastervalidationSchema.confirmPassword,
});

export const productSchema = yup.object({
  name: mastervalidationSchema.text,
  description: mastervalidationSchema.description,
  serial_number: mastervalidationSchema.number,
  storehouse_place: mastervalidationSchema.text,
  quantity: mastervalidationSchema.number,
  minimum_quantity: mastervalidationSchema.number,
  selling_price: mastervalidationSchema.number,
  purchase_price: mastervalidationSchema.number,
  country_name: mastervalidationSchema.text,
  installation_code: mastervalidationSchema.text,
});
export const profilePasswordSchema = yup.object().shape({
  currentPassword: mastervalidationSchema.password,
  newPassword: mastervalidationSchema.password,
  confirmPassword: mastervalidationSchema.password,
});
export const BlogsSchema = yup.object({
  title: mastervalidationSchema.text,
  description: mastervalidationSchema.description,
  // blog_image: mastervalidationSchema.image ,
});
export const editCarFixSchema = yup.object({
  quantity: mastervalidationSchema.number,
  desc: mastervalidationSchema.description,
  profit_amount: mastervalidationSchema.number,
  paid_amount: mastervalidationSchema.number,
});
