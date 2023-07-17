import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import logoIcon from "./../../assets/logo-icon.png";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { setLogin, setSubscribed } from "../auth/authSlice";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Bars3BottomRightIcon } from "@heroicons/react/24/solid";

const Header = () => {
  const [profileShow, setProfileShow] = useState(false);
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
    setProfileShow(false);
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

  const menuList = [
    {
      title: "Home",
      path: "/#",
    },
    {
      title: "Mock Test",
      path: "/#mock",
    },
    {
      title: "Practice",
      path: "/#categories",
    },
    {
      title: "Pricing",
      path: "/pricing",
    },
    {
      title: "Help",
      path: "/#footer",
    },
  ];

  return (
    <div>
      <div className="w-full px-8 py-2 flex justify-between items-center bg-amber-300 fixed z-50">
        {/* logo */}
        <HashLink to="/#" smooth>
          <div className="w-16">
            {/* <h3>LOGO</h3> */}
            <img className="w-full" src={logoIcon} alt="logo" />
          </div>
        </HashLink>
        <div className="flex gap-6 items-center ">
          {/* nav */}
          <section className="hidden lg:block">
            <div className="flex gap-4 text-gray-800 font-semibold">
              {menuList.map((item, index) => {
                return (
                  <HashLink key={index} to={item.path} smooth>
                    {item.title}
                  </HashLink>
                );
              })}
            </div>
          </section>
          {/* btn */}
          {!isLogedin ? (
            <>
              <div className="">
                <button className="btn mr-1" onClick={() => navigate("/login")}>
                  Log In
                </button>
                <button className="btn" onClick={() => navigate("/register")}>
                  Sign Up
                </button>
              </div>
            </>
          ) : (
            <>
              {/* toggle button */}

              <div className="">
                <div
                  className="w-10 h-auto cursor-pointer"
                  onClick={() => {
                    setProfileShow((prev) => !prev);
                  }}
                >
                  <Bars3BottomRightIcon className="block text-slate-800 lg:hidden" />
                  <UserCircleIcon className="text-slate-800 hidden lg:block" />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {/* user Profile */}
      <div
        className={`fixed w-[250px] h-max ${
          profileShow ? "right-1" : "-right-[250px]"
        }  top-[72.4px] bg-slate-600 text-gray-100 z-20 transition-all duration-500 rounded-md text-left text-[20px] sm:text-[18px]`}
      >
        <ul className="m-4">
          {/* profile pic */}
          <section className="lg:hidden">
            <li className="text-right">
              <div
                className="w-10 h-auto cursor-pointer"
                onClick={() => {
                  setProfileShow((prev) => !prev);
                }}
              >
                <img
                  className="w-full rounded-full border-2 border-green-500"
                  alt="profile"
                  src="https://tse4.mm.bing.net/th/id/OIP.6yuCxX3agcmqdUaie4OZwQAAAA?pid=ImgDet&rs=1"
                />
              </div>
            </li>
          </section>
          {/* user info */}
          <section className="mb-2">
            <li className="text-mid capitalize tracking-tight">
              {isLogedin && userRegInfo.name}
            </li>
            <li className="text-gray-300 text-[15px]">
              {isLogedin && userRegInfo.email}
            </li>
            <hr className="my-2" />
          </section>
          {/* nav */}
          <section className="lg:hidden">
            <div className="flex flex-col gap-1">
              {menuList.map((item, index) => {
                return (
                  <HashLink
                    key={index}
                    to={item.path}
                    onClick={() => {
                      setProfileShow(false);
                    }}
                    smooth
                  >
                    {item.title}
                  </HashLink>
                );
              })}
            </div>
            <hr className="my-2" />
          </section>
          {/* active package */}
          <section>
            <li>
              <HashLink
                to="/pricing#pricing"
                onClick={() => {
                  setProfileShow(false);
                }}
              >
                Active Package
              </HashLink>
            </li>
            <hr className="my-2" />
          </section>
          {/* logout */}
          <section>
            <li>
              <button
                className="btn border-red-500 hover:border-red-500 bg-red-600 hover:bg-red-700 font-bold"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </li>
          </section>
        </ul>
      </div>
    </div>
  );
};

export default Header;
