import React from "react";

const Header = (props) => {
  const { logoUrl, practiceName } = props;
  return (
    <div>
      <img src={logoUrl} alt={practiceName + " Logo goes here."} />
      <p>{practiceName} Vet Front Desk Call Review</p>
    </div>
  );
};

export default Header;
