import React from "react";
import { pagesNames, pagesUrls } from "./pagesNames";
import { Link } from "react-router-dom";

import "./Pages.css";

const Pages = () => {
  return (
    <div className="pages-links">
      {pagesNames.map((item, index) => (
        <Link className="single-link" to={pagesUrls[index]}>
          {item}
        </Link>
      ))}
    </div>
  );
};

export default Pages;
