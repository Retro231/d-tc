import "./Header.css";
import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";
import logoIcon from "./../../assets/logo-icon.png";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { setLogin, setSubscribed } from "../auth/authSlice";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";

const Header = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();
  const { userRegInfo, isLogedin } = useSelector((state) => state.auth.value);
  const handleLogout = async () => {
    try {
      const isSignOut = await signOut(auth);
      console.log(isSignOut);
      dispatch(setLogin(false));
      dispatch(setSubscribed(false));
    } catch (error) {
      console.log(error);
    }

    setShow(false);
  };
  useEffect(() => {
    const user = auth.currentUser;

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

  const handleLogoClick = () => {
    navigate("/#");
    // window.location.reload(false);
  };
  return (
    <>
      {/* <div className="min-header">
        <div>
          <ul>
            <li>
              <DeviceMobileIcon size={24} />
              +8801400887388
            </li>
            <li>
              <MailIcon size={24} />
              nazshakib02@gmail.com
            </li>
          </ul>
        </div>
        <div>
          <ul>
            <li>support</li>
            <li>contact</li>
          </ul>
        </div>
      </div> */}
      {["lg"].map((expand) => (
        <Navbar
          sticky="top"
          key={expand}
          bg="warning"
          expand={expand}
          className="myNav"
        >
          <Container fluid>
            <Navbar.Brand href="/#">
              <div className="logo">
                {/* <h3>LOGO</h3> */}
                <img src={logoIcon} alt="logo" />
              </div>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link as={Link} to="/" eventKey="1">
                    Home
                  </Nav.Link>
                  <NavDropdown
                    title="Features"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item as={HashLink} to="/#mock">
                      Mock Tests
                    </NavDropdown.Item>
                    <NavDropdown.Item as={HashLink} to="/#categories">
                      Practice
                    </NavDropdown.Item>
                  </NavDropdown>
                  {/* <NavDropdown
                    title="Resources"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action4" disabled>
                      Instructions
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action6" disabled>
                      Blogs
                    </NavDropdown.Item>
                  </NavDropdown> */}
                  <Nav.Link as={HashLink} to="/pricing#pricing" eventKey="4">
                    Pricing
                  </Nav.Link>
                  <Nav.Link href="#footer" eventKey="5">
                    Help
                  </Nav.Link>
                </Nav>
                {!isLogedin ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <div className="user-info">
                      <div
                        className="user-profile"
                        onClick={() => {
                          setShow((prev) => !prev);
                        }}
                      >
                        <img
                          alt="profile"
                          src="https://tse4.mm.bing.net/th/id/OIP.6yuCxX3agcmqdUaie4OZwQAAAA?pid=ImgDet&rs=1"
                        />
                      </div>
                      {show && (
                        <div className="user-profile-menu">
                          <ul>
                            <li className="user-name">
                              {isLogedin && userRegInfo.name}
                            </li>
                            <li className="user-mail">
                              {isLogedin && userRegInfo.email}
                            </li>
                            <hr />
                            <li>
                              <HashLink to="/pricing#pricing">
                                Active Package
                              </HashLink>
                            </li>
                            <hr />
                            <li>
                              <Button variant="danger" onClick={handleLogout}>
                                Log Out
                              </Button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};

export default Header;
