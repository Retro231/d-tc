import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetQuiz, setCorrectAns, setWrongAns } from "./quizSlice";
import QuizResultDetalis from "./QuizResultDetalis";
import { collection, addDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { Button } from "react-bootstrap";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";

const QuizResult = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const auth = getAuth();
  const user = auth.currentUser;
  const title = location.state.title;
  const quizState = useSelector((state) => state.quiz.value);
  const { questions, regAns, correctAns, wrongAns, pass, fail, testState } =
    quizState;
  const [scrollTop, setScrollTop] = useState(false);

  console.log(pass);
  console.log(fail);
  console.log(testState);

  // local state
  // const [clicked, setClicked] = useState(true);

  // result
  let ansList = [];
  questions.forEach((item) => {
    ansList.push(`${item.correctAnswer}`);
  });

  const getResult = (ansList, userSelectedAns) => {
    let correct = 0;
    let wrong = 0;
    ansList.forEach((item, index) => {
      if (item === userSelectedAns[index]) {
        correct++;
      } else {
        wrong++;
      }
    });
    return { correct, wrong };
  };
  useEffect(() => {
    const { correct, wrong } = getResult(ansList, regAns);
    dispatch(setCorrectAns(correct));
    dispatch(setWrongAns(wrong));

    const addData = async () => {
      try {
        const docRef = await addDoc(
          collection(db, "users", user.uid, `${title}`),
          {
            questions,
            regAns,
            correctAns: correct,
            wrongAns: wrong,
          }
        );
        // Update the timestamp field with the value from the server
        const updateTimestamp = await updateDoc(docRef, {
          timestamp: new Date().toGMTString(), // this does the trick!
        });
        console.log("Document written by user uid");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };

    testState !== "freeTest" && addData();
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 340) {
        setScrollTop(true);
      } else {
        setScrollTop(false);
      }
    });
  }, []);
  const bottomToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* when pass */}
      {pass && (
        <div className="result-wrapper text-center pass">
          <div className="result">
            {testState !== "practice" && (
              <div className="info">
                <h2>Congratulations 🎉</h2>
                <h3 className="title">You've Passed !!</h3>
              </div>
            )}

            <div className="score">
              <h4>
                ✔️ Correct Ans : <span>{correctAns}</span>
              </h4>
              <h4>
                ❌ Wrong Ans : <span>{wrongAns}</span>
              </h4>
            </div>
          </div>
          <div className="result-action-btn">
            {/* <Button
              variant="success"
              onClick={() => {
                setClicked((prev) => !prev);
              }}
            >
              Review
            </Button> */}
            <Button
              variant="danger"
              onClick={() => {
                dispatch(resetQuiz());
                navigate("/");
              }}
            >
              Close
            </Button>
          </div>
        </div>
      )}
      {/* when fail */}
      {fail && (
        <div className="bg-red-200 text-center py-4">
          <div className="result">
            {testState !== "practice" && (
              <div className="">
                <h2 className="text-xl">Sorry!!😔</h2>
                <h3 className="text-lg">You've failed !!</h3>
              </div>
            )}
            <div className="p-2 text-sm -ml-5">
              <h4>
                ✔️ Correct Ans : <span>{correctAns}</span>
              </h4>
              <h4>
                ❌ Wrong Ans : <span>{wrongAns}</span>
              </h4>
            </div>
            {testState !== "practice" && (
              <div className="border border-amber-600 p-2 inline-block m-2">
                <h6>
                  📌To pass the test you must score at least 43 out of 50.
                  <br className="hidden sm:block"></br> Keep practicing until
                  you are able to pass consistently.
                </h6>
              </div>
            )}
          </div>
          <div className="result-action-btn">
            {/* <Button
              variant="success"
              onClick={() => {
                setClicked((prev) => !prev);
              }}
            >
              Review
            </Button> */}
            <Button
              className="btn bg-red-700 text-white hover:bg-red-800"
              onClick={() => {
                dispatch(resetQuiz());
                navigate("/");
              }}
            >
              Close
            </Button>
          </div>
        </div>
      )}

      {/* {clicked && ( */}
      <div className="bg-slate-900 text-gray-300 sm:p-8 px-4 sm:px-24">
        <div className="pt-8 sm:pt-0 text-lg text-center">
          <h2>Review:</h2>
        </div>
        {questions.map((question, index) => {
          return (
            <>
              <QuizResultDetalis
                key={index}
                index={index}
                questionData={question}
                userSelectedAns={regAns[index]}
              />
              {index === questions.length - 1 ? "" : <hr></hr>}
            </>
          );
        })}
      </div>
      {/* )} */}
      {scrollTop && (
        <div className="right-1 md:right-6 bottom-8 z-50 fixed">
          <ArrowUpCircleIcon
            className="text-amber-600 w-[45px] h-[45px] bg-slate-900 rounded-full cursor-pointer"
            onClick={bottomToTop}
          />
        </div>
      )}
    </>
  );
};

export default QuizResult;
