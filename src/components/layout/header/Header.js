import React from "react";
import Logo from "./Logo";
//import Hamburger from "./Hamburger";

import "./Header.css";
import Pages from "./Pages";

const Header = () => {
  return (
    <div className="header">
        <Logo />
        <Pages />
    </div>
  );
};

export default Header;
