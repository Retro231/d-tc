import React from "react";
import { useDispatch } from "react-redux";
import { setShow } from "./myToastSlice";

const MyToast = ({ error }) => {
  const dispatch = useDispatch();
  setTimeout(() => {
    dispatch(setShow(false));
  }, 2000);

  return (
    <>
      <div className="bg-red-400 p-3 rounded-md inline-block fixed right-6 top-4">
        <span className="font-semibold">{error}</span>
      </div>
    </>
  );
};

export default MyToast;
