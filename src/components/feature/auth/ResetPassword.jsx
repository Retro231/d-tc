import "./Auth.css";
import React, { useState } from "react";
import { setLoading } from "../../../appSlice";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { ForgetPassSchema } from "../../schemas";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSend, setSend] = useState(false);
  const initialValues = {
    email: "",
  };
  const { loading } = useSelector((state) => state.app.value);

  const handleResetPassword = (email) => {
    dispatch(setLoading(true));

    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Password reset email sent!");
        // Password reset email sent!
        // ..
        setSend(true);

        dispatch(setLoading(false));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        dispatch(setLoading(false));
      });
  };

  // formik
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: ForgetPassSchema,
      onSubmit: (values, action) => {
        console.log(values.email);
        handleResetPassword(values.email);
        action.resetForm();
      },
    });
  return (
    <>
      {!isSend && (
        <div className="reg-container">
          <div className="reg-left">
            <h1 className="reg-title">Password Reset</h1>
            <p className="reg-desc">
              You will receive instructions for reseting your password.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="input-block">
                <label htmlFor="email" className="input-label">
                  Enter your Email:
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
              <div className="reg-buttons">
                {loading ? (
                  <button className="input-button" disabled>
                    <Spinner animation="grow" size="sm" />
                    Sending Request...
                  </button>
                ) : (
                  <button className="input-button" type="submit">
                    Request Reset Link
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
      {isSend && (
        <div className="reg-container">
          <div className="reg-left">
            <h1 className="reg-title">
              {" "}
              Password reset email sent!<br></br>Check you email,please.
            </h1>
            <p className="reg-desc">(You can close this page)</p>

            <div className="reg-buttons">
              <button
                className="input-button"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
