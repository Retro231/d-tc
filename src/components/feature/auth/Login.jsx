// Render Prop
import "./Auth.css";
import React, { useState } from "react";
import { useFormik } from "formik";
import Spinner from "react-bootstrap/Spinner";
import { SignInSchema } from "../../schemas";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "./authSlice";
import MyToast from "../../../utils/toast/MyToast";
import { setShow } from "../../../utils/toast/myToastSlice";
import { setLoading } from "../../../appSlice";
import LoginWithGmail from "./LoginWithGmail";
const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const [serverError, handleServerError] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.app.value);
  const { show } = useSelector((state) => state.myToast.value);
  const auth = getAuth();

  const firebaseErrorHandler = (err) => {
    console.log(err.code);

    switch (err.code) {
      case "auth/user-not-found":
        return "User not found.Please register for an account!";
      case "auth/wrong-password":
        return "You have enterd wrong password.";
      default:
        return err.message;
    }
  };

  const handleLogin = async (userInfo) => {
    dispatch(setLoading(true));
    const { email, password } = userInfo;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      dispatch(setLogin(true));
      navigate("/");
      dispatch(setLoading(false));
    } catch (err) {
      handleServerError(firebaseErrorHandler(err));
      dispatch(setShow(true));
      dispatch(setLoading(false));
    }
  };

  // formik
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: SignInSchema,
      onSubmit: (values, action) => {
        handleLogin(values);
        console.log(values);
        action.resetForm();
      },
    });
  return (
    <>
      <div className="reg-container">
        {show && <MyToast error={serverError} />}
        <div className="reg-left">
          <h1 className="reg-title">Sign In</h1>
          <p className="reg-desc">To Free Driving theory test.</p>
          <form onSubmit={handleSubmit}>
            <div className="input-block">
              <label htmlFor="email" className="input-label">
                Email
              </label>
              <input
                type="email"
                autoComplete="off"
                name="email"
                id="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div className="input-block">
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <input
                type="password"
                autoComplete="off"
                name="password"
                id="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password ? (
                <p className="form-error">{errors.password}</p>
              ) : null}
            </div>
            <div className="forgotPass text-blue-900 underline my-1 mb-2">
              <Link to={"/resetpassword"}>Forgot your password?</Link>
            </div>
            <div className="reg-buttons">
              {loading ? (
                <button className="input-button" disabled>
                  <Spinner animation="grow" size="sm" />
                  Loging in...
                </button>
              ) : (
                <button className="input-button" type="submit">
                  LogIn
                </button>
              )}
            </div>
          </form>
          <LoginWithGmail btnText={"Sign In with Google"} />
          <p className="sign-up">
            Don not have an account? <Link to={"/register"}>Sign Up now</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
