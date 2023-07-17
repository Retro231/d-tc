import React, { useEffect, useRef } from "react";
import { Col, Row } from "react-bootstrap";

const QuizResultDetalis = ({ index, questionData, userSelectedAns }) => {
  const { correctAnswer, question, answers, explanation, content, mediaType } =
    questionData;
  console.log(explanation);
  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);

  useEffect(() => {
    if (option1.current.id === `${userSelectedAns}`) {
      option1.current.style.backgroundColor = "red";
      option1.current.style.color = "white";
    } else if (option2.current.id === `${userSelectedAns}`) {
      option2.current.style.backgroundColor = "red";
      option2.current.style.color = "white";
    } else if (option3.current.id === `${userSelectedAns}`) {
      option3.current.style.backgroundColor = "red";
      option3.current.style.color = "white";
    } else if (option4.current.id === `${userSelectedAns}`) {
      option4.current.style.backgroundColor = "red";
      option4.current.style.color = "white";
    } else {
      console.log("not found");
    }
    if (option1.current.id === `${correctAnswer}`) {
      option1.current.style.backgroundColor = "green";
      option1.current.style.color = "white";
    } else if (option2.current.id === `${correctAnswer}`) {
      option2.current.style.backgroundColor = "green";
      option2.current.style.color = "white";
    } else if (option3.current.id === `${correctAnswer}`) {
      option3.current.style.backgroundColor = "green";
      option3.current.style.color = "white";
    } else if (option4.current.id === `${correctAnswer}`) {
      option4.current.style.backgroundColor = "green";
      option4.current.style.color = "white";
    } else {
      console.log("not found");
    }
  });
  return (
    <>
      <div className="text-center">
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center m-5">
            <h3 className="text-sm font-medium my-2 sm:w-[75%] text-center">
              {index + 1}. {question}
            </h3>
          </div>
          <div className="">
            {mediaType === "image" && content && (
              <img
                className="w-[350px] max-[320px]:w-[300px]  h-60 max-[320px]:h-auto mb-5"
                src={`http://appsbreaking.com/qimage/${content}`}
                alt="content"
              />
            )}
            {/* {mediaType === "video" && (
            <div className="player">
              <ReactPlayer
                url={content}
                controls={true}
                outline={true}
              ></ReactPlayer>
            </div>
          )} */}
          </div>
          <div className="explain">
            <p>
              <span>Explanation:</span>
              {explanation}
            </p>
          </div>
          <div className="flex flex-col items-center w-full gap-1 my-5">
            <label
              className="py-2 bg-gray-400 text-slate-900 font-medium rounded-md border-2 border-transparent w-full sm:w-[60%]"
              ref={option1}
              id="0"
            >
              {answers[0]}
            </label>

            <label
              className="py-2 bg-gray-400 text-slate-900 font-medium rounded-md border-2 border-transparent w-full sm:w-[60%]"
              ref={option2}
              id="1"
            >
              {answers[1]}
            </label>

            <label
              className="py-2 bg-gray-400 text-slate-900 font-medium rounded-md border-2 border-transparent w-full sm:w-[60%]"
              ref={option3}
              id="2"
            >
              {answers[2]}
            </label>

            <label
              className="py-2 bg-gray-400 text-slate-900 font-medium  rounded-md border-2 border-transparent w-full sm:w-[60%]"
              ref={option4}
              id="3"
            >
              {answers[3]}
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizResultDetalis;
