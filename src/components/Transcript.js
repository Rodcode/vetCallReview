import React from "react";
import Msg from "./Msg";

const Transcript = (props) => {
  const transcript = props.transcript
    .split("[")
    .filter((msg) => msg !== "")
    .map((msg) =>
      msg
        .replace("Pet Owner]", props.petOwner.split(" ")[0])
        .replace("Vet Front Desk]", props.vetDesk)
    );
  const owner = props.petOwner.split(" ")[0];
  return (
    <div>
      {transcript.map((str, i) => (
        <Msg key={i} str={str} owner={owner} desk={props.vetDesk} />
      ))}
    </div>
  );
};

Transcript.defaultProps = {
  petOwner: "Pet Owner",
  vetDesk: "Vet Front Desk",
};

export default Transcript;
