import React from "react";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";

const HireTrackDescription = () => {
  return (
    <div>
      <h1 className="header-1">
        <StackedLineChartIcon />{" "}
        <span style={{ fontSize: "14px" }}>&thinsp;</span>
        HireTrack
      </h1>
      <div style={{ textAlign: "left" }} className="accent-text-2">
        <li>Track your applications</li>
        <li>List your skills</li>
        <li>Keep your contacts</li>
        <li>Get hired</li>
      </div>
    </div>
  );
};

export default HireTrackDescription;
