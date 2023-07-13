import React, { useEffect, useRef } from "react";
import { Col, Row } from "react-bootstrap";

const QuizResultDetalis = ({ index, questionData, userSelectedAns }) => {
  const { correctAnswer, question, answers, explanation, content, mediaType } =
    questionData;
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
      <div className="result-detalis-ques text-center">
        <div>
          <div className="result-question">
            <h3>
              {index + 1}. {question}
            </h3>
          </div>
          <div className="content text-center">
            {mediaType === "image" && content && (
              <img
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
          <div className="result_options">
            <Row>
              <Col>
                <label ref={option1} id="0">
                  {answers[0]}
                </label>
              </Col>
              <Col>
                <label ref={option2} id="1">
                  {answers[1]}
                </label>
              </Col>
            </Row>
            <Row>
              <Col>
                <label ref={option3} id="2">
                  {answers[2]}
                </label>
              </Col>
              <Col>
                <label ref={option4} id="3">
                  {answers[3]}
                </label>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <hr></hr>
    </>
  );
};

export default QuizResultDetalis;
