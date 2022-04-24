import React from "react";
import "./styles.css";

const PageHeader = ({ text }) => {
  return (
    <div className="text-center">
      <h1 className="page-header">{text}</h1>
    </div>
  );
};

export default PageHeader;
