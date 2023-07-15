import * as Yup from "yup";

export const SignUpSchema = Yup.object({
  first_name: Yup.string()
    .min(2)
    .max(25)
    .required("Please enter your first name"),
  last_name: Yup.string()
    .min(2)
    .max(25)
    .required("Please enter your last name"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).required("Please enter your password"),
  confirm_password: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

export const SignInSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).required("Please enter your password"),
});

export const ForgetPassSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email"),
});
