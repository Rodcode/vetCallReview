import React from "react";

const Msg = (props) => {
  const { owner, str, desk } = props;
  const isOwner = str.split(":")[0] === owner;
  const speaker = isOwner ? owner : desk;
  const msg = isOwner
    ? str.replace(`${owner}:`, "")
    : str.replace(`${desk}:`, "");
  return (
    <div>
      <h4>{speaker}</h4>
      <p>{msg}</p>
    </div>
  );
};

export default Msg;
