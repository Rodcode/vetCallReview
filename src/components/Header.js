import React from "react";

const Header = (props) => {
  const { logoUrl, practiceName } = props;
  return (
    <div className="header">
      <img
        className="header__logo"
        src={logoUrl}
        alt={practiceName + " Logo goes here."}
      />
      <div className="header__title">
        <h1>{practiceName}</h1>
        <h2>Vet Front Desk Call Review</h2>
      </div>
    </div>
  );
};

export default Header;
