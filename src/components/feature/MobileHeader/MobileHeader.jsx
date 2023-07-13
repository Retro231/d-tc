import { HashLink } from "react-router-hash-link";
import "./MobileHeader.css";
import React, { useState, useEffect } from "react";
import logoIcon from "./../../assets/logo-icon.png";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { setLogin } from "../auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const MobileHeader = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();
  const user = auth.currentUser;
  const { userRegInfo, isLogedin } = useSelector((state) => state.auth.value);
  console.log(user);
  const handleLogout = async () => {
    try {
      const isSignOut = await signOut(auth);
      console.log(isSignOut);
      dispatch(setLogin(false));
    } catch (error) {
      console.log(error);
    }
  };
  const handleNavLinkClick = () => {
    setShowMenu(false);
  };
  useEffect(() => {
    const updateUser = () => {
      updateProfile(auth.currentUser, {
        displayName: userRegInfo.name,
      })
        .then(() => {
          // Profile updated!
          // ...
          console.log("Profile updated!");
        })
        .catch((error) => {
          // An error occurred
          // ...
          console.log(error);
        });
    };

    if (user && user.displayName === null) {
      updateUser();
    }
  });
  return (
    <>
      <div className="mobile-header-wrapper">
        <div className="head-left">
          <div className="mini-logo">
            <HashLink to="/#">
              <img src={logoIcon} alt="logo" />
            </HashLink>
          </div>
        </div>
        <div className="head-right">
          <div
            className="menu-icon-open"
            onClick={() => {
              setShowMenu(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              class="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </div>
        </div>
        {showMenu && (
          <div className="mobile-menu">
            <div className="profile">
              <div className="user-profile">
                <img
                  alt="profile"
                  src="https://tse4.mm.bing.net/th/id/OIP.6yuCxX3agcmqdUaie4OZwQAAAA?pid=ImgDet&rs=1"
                />
              </div>
              <h4 className="user-name">
                {isLogedin ? userRegInfo.name : "Guest"}
              </h4>
              <h6 className="user-mail">{isLogedin ? user.email : ""}</h6>
              <div
                className="menu-icon-close"
                onClick={() => setShowMenu(false)}
              >
                <h2>X</h2>
              </div>
            </div>
            <hr />
            <div className="menu-list">
              <HashLink to="/" onClick={handleNavLinkClick}>
                Home
              </HashLink>
              <HashLink to="/#mock" onClick={handleNavLinkClick}>
                Mock
              </HashLink>
              <HashLink to="/#categories" onClick={handleNavLinkClick}>
                Practice
              </HashLink>
              <HashLink to="/pricing" onClick={handleNavLinkClick}>
                Pricing
              </HashLink>
              <HashLink to="/#footer" onClick={handleNavLinkClick}>
                Help
              </HashLink>
            </div>
            <hr />
            {isLogedin && (
              <>
                <div className="active-package">
                  <HashLink to="/pricing" onClick={handleNavLinkClick}>
                    Active Package
                  </HashLink>
                </div>
                <hr />
              </>
            )}

            <div className="mobile-menu-btn">
              {isLogedin && (
                <Button variant="danger" onClick={handleLogout}>
                  Log Out
                </Button>
              )}
              {!isLogedin && (
                <div className="when-logout">
                  <Button
                    variant="outline-success"
                    onClick={() => navigate("/login")}
                  >
                    Log In
                  </Button>
                  <Button
                    variant="success"
                    onClick={() => navigate("/register")}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MobileHeader;
