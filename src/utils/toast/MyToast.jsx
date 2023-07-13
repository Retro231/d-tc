import "./MyToast.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShow } from "./myToastSlice";
import { Toast } from "react-bootstrap";

const MyToast = ({ error }) => {
  const { show } = useSelector((state) => state.myToast.value);
  const dispatch = useDispatch();

  return (
    <>
      <div className="toasterArea">
        <Toast
          onClose={() => dispatch(setShow(false))}
          show={show}
          delay={3000}
          autohide
          bg="danger"
        >
          {/* <Toast.Header>
                  <img
                    src="holder.js/20x20?text=%20"
                    className="rounded me-2"
                    alt=""
                  />
                  <strong className="me-auto">Bootstrap</strong>
                  <small>11 mins ago</small>
                </Toast.Header> */}
          <Toast.Body>{error}</Toast.Body>
        </Toast>
      </div>
    </>
  );
};

export default MyToast;
