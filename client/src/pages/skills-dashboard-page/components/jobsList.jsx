import React from "react";

const JobsList = ({ jobsIds, jobs }) => {
  const percent = (
    <span className="header-2">
      <strong>{Math.round((jobsIds.length / Object.keys(jobs).length) * 100)}%</strong>
    </span>
  );
  return (
    <div className="body-text">
      This skill is found in {percent} of your applications.
      <p />
      <u>Jobs That Require This Skill:</u>
      <br />
      <div style={{ marginLeft: "1rem" }}>
        {jobsIds.map((job, index) => (
          <li key={index}>
            {jobs[job].jobTitle} - {jobs[job].jobCompany}
          </li>
        ))}
      </div>
    </div>
  );
};

export default JobsList;
