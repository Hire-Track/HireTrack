import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/row";
import PageHeader from "../../components/header";
import { SkillCard, SkillListItem } from "./components/skillCard";
import "./styles.css";

const SkillsDashboard = () => {
  const [skills, setSkills] = useState({ topSkills: [], remainingSkills: [] });

  // TODO API to fetch all Skills
  // Temp dummy data:
  const parsedSkills = [
    { skillName: "Python", skillLevel: "Advanced", jobs: 5 },
    { skillName: "JavaScript", skillLevel: "Intermediate", jobs: 2 },
    { skillName: "C", skillLevel: "Beginner", jobs: 2 },
    { skillName: "Rust", skillLevel: "Intermediate", jobs: 3 },
    { skillName: "ReactJS", skillLevel: "Intermediate", jobs: 5 },
    { skillName: "Express", skillLevel: "Beginner", jobs: 1 },
    { skillName: "C+", skillLevel: "Beginner", jobs: 1 },
  ];

  useEffect(() => {
    // Sort by most in demand (jobs count)
    parsedSkills.sort(function (a, b) {
      return b.jobs - a.jobs;
    });
    // Set Skills
    setSkills((prevSkills) => ({
      ...prevSkills,
      topSkills: parsedSkills
        .slice(0, 5)
        .map(({ skillName, skillLevel, jobs }, key) => (
          <SkillCard
            key={key}
            name={skillName}
            level={skillLevel}
            jobCount={jobs}
          />
        )),
      remainingSkills: parsedSkills
        .slice(5)
        .map(({ skillName, skillLevel, jobs }, key) => (
          <SkillListItem
            key={key}
            name={skillName}
            level={skillLevel}
            jobCount={jobs}
          />
        )),
    }));
  }, [skills]);

  return (
    <div className="main-content">
      <PageHeader text="Skills" />
      <Row className="skills-row">{skills.topSkills}</Row>
      <p />
      <Row>{skills.remainingSkills}</Row>
    </div>
  );
};

export default SkillsDashboard;
