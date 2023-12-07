import React from "react";

import logoImage from "../../../assets/images/logo512.png";
import "./Logo.css";

const Logo = () => {
  return (
    <img
      className="logo"
      alt="logo alt"
      src={logoImage}
      width="70"
      draggable="false"
    />
  );
};

export default Logo;
