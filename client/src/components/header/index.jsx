import React from "react";

const PageHeader = ({text}) => {
  return (
    <div className="text-center">
      <h1 className="header-2">{text}</h1>
    </div>
  );
};

export default PageHeader;
