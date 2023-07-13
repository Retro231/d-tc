import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetQuiz, setCorrectAns, setWrongAns } from "./quizSlice";
import QuizResultDetalis from "./QuizResultDetalis";
import { collection, addDoc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { Button } from "react-bootstrap";

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

  console.log(pass);
  console.log(fail);
  console.log(testState);

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
        <div className="result-wrapper text-center fail">
          <div className="result">
            {testState !== "practice" && (
              <div className="info">
                <h2>Sorry!!😔</h2>
                <h3 className="title">You've failed !!</h3>
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
            {testState !== "practice" && (
              <div className="notice">
                <h6>
                  📌To pass the test you must score at least 43 out of 50.
                </h6>
                <h6>
                  Keep practicing until you are able to pass consistently.
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

      {/* {clicked && ( */}
      <div className="result-review-wrapper">
        <div className="review-title text-center">
          <h2>Review:</h2>
        </div>
        {questions.map((question, index) => {
          return (
            <QuizResultDetalis
              key={index}
              index={index}
              questionData={question}
              userSelectedAns={regAns[index]}
            />
          );
        })}
      </div>
      {/* )} */}
    </>
  );
};

export default QuizResult;
