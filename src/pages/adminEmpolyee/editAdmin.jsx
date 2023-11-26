import { Box,Button,useTheme } from "@mui/material";
import { useFormik } from "formik";
import { useMediaQuery } from "@mui/material";
import { tokens } from "../../theme";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../global/sidebar/sidebarContext";
import { CustomFormikTextFeild } from "../../components/CustomFormikTextFeild/customFormikTextFeild";
import { useEffect } from "react";
import { getRole } from "../../redux/select_menus";
import { StatuseCode } from '../../statuseCodes';
import { useNavigate, useParams } from "react-router-dom";
import CustomPassword from '../../components/PasswordAndConfirmPassword/PassAndConfPass';
import CustomLable from "../../components/CustomLable";
import { editAdmin, getAdminEmployee, getOneAdmin } from "../../redux/adminEmployee";
import CustomMultiSelectMenu from "../../components/CustomMultiSelectMenu/CustomMultiSelectMenu";
import { USER_TYPES_ENUM } from './../../enums/userTypeEnum';
import { adminAccountSchema } from "../../utils/ValidationSchema";

const EditAdmin = () => {
  const {id} = useParams()
  const rolesMenu = useSelector((state) => state.selectMenu.roles.data) || [];
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate()
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { sidebarRTL } = useSidebarContext();
  const loading = useSelector((state) => state.visitorsCars.loading);
  const oneAdminData = useSelector(state => state.admin.oneAdminData.data)
  console.log(oneAdminData)
  useEffect(() => {
    dispatch(getOneAdmin(id))
  },[dispatch,id])

  useEffect(() => {  
    if (!(rolesMenu.length)) {
      dispatch(getRole());
    }
  });
  
  const formik = useFormik({
    initialValues: {
      name: oneAdminData?.name,
      email: oneAdminData?.email,
      password:'',
      password_confirmation:'',
      role_id: oneAdminData?.rolesIds,
      is_admin_employee:  oneAdminData?.type===USER_TYPES_ENUM.ADMIN_EMPLOYEE?1:0
    },
    enableReinitialize:true,
    validationSchema: adminAccountSchema,
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  const handleFormSubmit = async (values) => {
    console.log(values)
    const pageSize = 10
    const info = {
      id: id,
      values: {
        ...values
      }
    }
    await dispatch(editAdmin(info)).then(res => {
      if (res.payload.code === StatuseCode.OK) {
        dispatch(getAdminEmployee({pageSize:pageSize}))
        formik.resetForm()
        navigate(-1)
      }
    })
  };
  

  const textFields = [
    {
      name: "name",
      value: formik.values.name,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: t("name"),
      error: !!formik.touched.name && !!formik.errors.name,
      helperText: formik.touched.name && formik.errors.name,
    },
    {
      name: "email",
      value: formik.values.email,
      handleChange: formik.handleChange,
      placeholder: t("email"),
      onBlur: formik.handleBlur,
      error: !!formik.touched.email && !!formik.errors.email,
      helperText: formik.touched.email && formik.errors.email,
    },
  ];
  const handleRoleChange = (items) => {
    const selectedIds = items?.map((option) => option.id);
    formik.setFieldValue("role_id",selectedIds)
  };

  return (
    <Box m="20px">
      <form onSubmit={formik.handleSubmit} dir={sidebarRTL ? "ltr" : "rtl"}>
        {textFields.map((item, index) => (
          <Box
          key={index}
          dir={sidebarRTL ? "rtl" : "ltr"}
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          <CustomLable title={item.placeholder}/>
          <CustomFormikTextFeild
              placeholder={t(item.placeholder)} onBlur={item.onBlur}
              onChange={item.handleChange} value={item.value} name={item.name}
              error={item.error} helperText={item.helperText}/>
          </Box>
        ))}
        <CustomPassword
          // req={ formik.values.is_admin_employee }
          name="password"
          error={!!formik.touched.password && !!formik.errors.password}
          helperText={formik.touched.password && formik.errors.password}
          value={formik.values.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <CustomPassword
          // req={ formik.values.is_admin_employee }
          name="password_confirmation"
          error={
            !!formik.touched.password_confirmation &&
            !!formik.errors.password_confirmation
          }
          helperText={
            formik.touched.password_confirmation &&
            formik.errors.password_confirmation
          }
          value={formik.values.password_confirmation}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <Box>
          {oneAdminData?.type === USER_TYPES_ENUM.ADMIN_EMPLOYEE && (
            <CustomMultiSelectMenu
            defaultData={oneAdminData?.rolesIds}
            lable="role"
            placeholder="Select an option"
            onChange={handleRoleChange}
            options={rolesMenu}
          />
          )}
        </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                sx={{
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                }}
                disabled={loading}
                variant="outlined"
              >
                {loading ? t("wait") : t("edit")}
              </Button>
            </Box>
          </form>
    </Box>
  );
};

export default EditAdmin;
