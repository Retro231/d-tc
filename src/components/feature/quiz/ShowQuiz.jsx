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
          <div className="w-[320px] sm:w-[60%] bg-red-400 sm:text-[22px] no font-medium p-6 m-auto mt-6">
            <span>
              Opps!! Looks like you've reload your page. Please restart your quiz.
            </span> <br></br>
            <Link className="text-blue-800 underline" to={"/"}>Click me</Link>
          </div>
        }
      >
        <Quiz title={title} />
      </ErrorBoundary>
    </>
  );
};

export default ShowQuiz;
