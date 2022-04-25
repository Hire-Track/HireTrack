import React from "react";
import "./styles.css";

const PageHeader = ({ text, button }) => {
  return (
    <div className={"text-center page-header"}>
      <h1 className="header-2" style={{marginLeft: 'auto'}}>{text}</h1>
      {button && <span style={{marginLeft: 'auto'}}>{button}</span>}
    </div>
  );
};

export default PageHeader;
