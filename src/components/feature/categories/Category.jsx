import "./Categories.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setQuestions, setTestState } from "../quiz/quizSlice";
import UserProgress from "../../UserProgress";
import { LockIcon } from "@primer/octicons-react";
const Category = ({ id, title, iconName }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const questionsDB = useSelector((state) => state.db.value.questionsDB);
  const { isLogedin, isSubscribed } = useSelector((state) => state.auth.value);

  const handleClick = () => {
    const categoryId = id;
    const categoryQuestion = questionsDB.filter((item) => {
      if (categoryId !== 0) {
        return item.category === categoryId;
      } else {
        return item.category !== categoryId;
      }
    });

    if (isLogedin) {
      dispatch(setQuestions(categoryQuestion));
      dispatch(setTestState("practice"));
      console.log(categoryQuestion);
      navigate("/quizmenu", { state: { title } });
    } else {
      navigate("/login");
    }
  };
  return (
    <>
      <div className="category-wrapper">
        <div className="btn-left " onClick={handleClick}>
          <img
            alt="category icon"
            src={`http://appsbreaking.com/category_image/${iconName}`}
          />
          <h3>{title}</h3>
        </div>
        {isLogedin && <UserProgress title={title} />}
        {!isLogedin && (
          <>
            <div className="lockBtn" onClick={() => navigate("/pricing")}>
              <LockIcon size={24} />
            </div>
          </>
        )}
        {isLogedin && !isSubscribed && id !== 1 && id !== 2 && (
          <div className="lockBtn" onClick={() => navigate("/pricing")}>
            <LockIcon size={24} />
          </div>
        )}
      </div>
    </>
  );
};

export default Category;
