import React from "react";

const ListHistory = (props) => {
  return (
    <div>
      <h2>History</h2>
      {props.history.length > 0 ? (
        <ol>
          {props.history.map((id) => (
            <li key={id}>{id}</li>
          ))}
        </ol>
      ) : (
        <p>Accesible List of most recent call reports</p>
      )}
    </div>
  );
};

export default ListHistory;
