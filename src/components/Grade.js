import React from "react";

const Grade = (props) => {
  const { grade, tone } = props;
  return (
    <div>
      <h1>{grade}</h1>
      <h4>{tone}</h4>
    </div>
  );
};

export default Grade;
