import React from "react";

const JobsList = ({ jobsIds, jobs }) => {
  return (
    <div>
      This skill is found in{" "}
      {Math.round((jobsIds.length / Object.keys(jobs).length) * 100)}% if your
      applications.
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
