// Render Prop
import "./Auth.css";
import React from "react";
import { useFormik } from "formik";
import Spinner from "react-bootstrap/Spinner";
import { SignUpSchema } from "../../schemas";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setLoading } from "../../../appSlice";
import { setUserRegInfo } from "./authSlice";
import LoginWithGmail from "./LoginWithGmail";
const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirm_password: "",
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.app.value);
  const auth = getAuth();
  const handleAuth = (userInfo) => {
    dispatch(setLoading(true));
    const { first_name, last_name, email, password } = userInfo;
    let fullName = `${first_name} ${last_name}`;
    dispatch(
      setUserRegInfo({
        name: fullName,
        email,
      })
    );
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        navigate("/");
        dispatch(setLoading(false));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: SignUpSchema,
      onSubmit: (values, action) => {
        handleAuth(values);
        action.resetForm();
      },
    });
  console.log(errors);
  return (
    <>
      <div className="reg-container">
        <div className="reg-left">
          <h1 className="reg-title">Sing Up</h1>
          <p className="reg-desc">To Free Driving theory test.</p>
          <form onSubmit={handleSubmit}>
            <div className="input-block">
              <label htmlFor="name" className="input-label">
                First Name
              </label>
              <input
                type="first_name"
                autoComplete="off"
                name="first_name"
                id="first_name"
                placeholder="First Name"
                value={values.first_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.first_name && touched.first_name ? (
                <p className="form-error">{errors.first_name}</p>
              ) : null}
            </div>
            <div className="input-block">
              <label htmlFor="name" className="input-label">
                Last Name
              </label>
              <input
                type="last_name"
                autoComplete="off"
                name="last_name"
                id="last_name"
                placeholder="Last Name"
                value={values.last_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.last_name && touched.last_name ? (
                <p className="form-error">{errors.last_name}</p>
              ) : null}
            </div>
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
              {errors.email && touched.email ? (
                <p className="form-error">{errors.email}</p>
              ) : null}
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
            <div className="input-block">
              <label htmlFor="confirm_password" className="input-label">
                Confirm Password
              </label>
              <input
                type="password"
                autoComplete="off"
                name="confirm_password"
                id="confirm_password"
                placeholder="Confirm Password"
                value={values.confirm_password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.confirm_password && touched.confirm_password ? (
                <p className="form-error">{errors.confirm_password}</p>
              ) : null}
            </div>
            <div className="reg-buttons">
              {loading ? (
                <button className="input-button" disabled>
                  <Spinner animation="grow" size="sm" />
                  Sigin Up...
                </button>
              ) : (
                <button className="input-button" type="submit">
                  Sign UP
                </button>
              )}
            </div>
          </form>
          <LoginWithGmail btnText={"Sign Up with Google"} />
          <p className="sign-up">
            Already have an account? <Link to={"/login"}>Sign In now</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
