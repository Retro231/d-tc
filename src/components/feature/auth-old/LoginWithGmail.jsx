import React from "react";
import googleIcon from "./../../assets/googleIcon.png";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { setLogin } from "./authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginWithGmail = ({ btnText }) => {
  const provider = new GoogleAuthProvider();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleAuth = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        dispatch(setLogin(true));
        navigate("/");
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <div className="google-auth" onClick={handleGoogleAuth}>
      <div className="google-auth-btn">
        <img src={googleIcon} alt="google icon" />
        <p>{btnText}</p>
      </div>
    </div>
  );
};

export default LoginWithGmail;
