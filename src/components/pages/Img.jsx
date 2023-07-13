import React from "react";
import { useSelector } from "react-redux";

const Img = () => {
  const questionsDB = useSelector((state) => state.db.value.questionsDB);
  console.log(questionsDB);

  return (
    <div
      style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
    >
      {questionsDB.map((item) => {
        return (
          item.mediaType === "image" &&
          item.content && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "44px" }}
            >
              <img
                src={`http://appsbreaking.com/qimage/${item.content}`}
                width="100px"
                alt="content"
              />
              <span>{item.content}</span>
            </div>
          )
        );
      })}
    </div>
  );
};

export default Img;
