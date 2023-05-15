import React from "react";

const CriticalDetails = (props) => {
  return (
    <div>
      {props.details.map((detail, i) => {
        return <p key={i}>{detail}</p>;
      })}
    </div>
  );
};

export default CriticalDetails;
