import React from "react";
import Quiz from "./Quiz";
import ErrorBoundary from "./../../../utils/ErrorBoundary/ErrorBoundary";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const ShowQuiz = () => {
  const location = useLocation();
  const title = location.state.title;
  console.log(title);
  return (
    <>
      <ErrorBoundary
        fallback={
          <div className="fallbackMsg">
            <span>
              Opps!!Looks like you've reload your page.Please restart your quiz.
            </span>
            <Link to={"/"}>Click me</Link>
          </div>
        }
      >
        <Quiz title={title} />
      </ErrorBoundary>
    </>
  );
};

export default ShowQuiz;
