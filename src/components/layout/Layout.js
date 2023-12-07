import React from "react";

import Header from "./header/Header";
import "./Layout.css";

const Layout = ({ children }) => {
  return (
        <div className="layout">
            <Header />
            <div className="layout-page-content">{children}</div>
        </div>
    );
};

export default Layout;
