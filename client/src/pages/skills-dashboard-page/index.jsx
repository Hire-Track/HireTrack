import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/row";
import PageHeader from "../../components/header";
import { SkillCard, SkillListItem } from "./components/skillCard";
import SkillsModal from "./components/modal";
import "./styles.css";
import { mockSkills } from "./mockdata";

const SkillsDashboard = () => {
  const [skills, setSkills] = useState({ topSkills: [], remainingSkills: [] });
  const [parsedSkills, setParsedSkills] = useState([]);

  const fetchData = () => {
    // TODO API to fetch all Skills
    // Temp dummy data:
    return mockSkills;
  };
  const parseData = (data) => {
    // TODO
    return data;
  };

  useEffect(() => {
    let data = fetchData();
    setParsedSkills(parseData(data));
  }, []);

  useEffect(() => {
    // Sort by most in demand (jobs count)
    parsedSkills.sort(function (a, b) {
      return b.jobs - a.jobs;
    });
    // Set Skills
    setSkills({
      topSkills: parsedSkills
        .slice(0, 5)
        .map(({ skillName, skillLevel, jobs }, index) => (
          <SkillCard
            key={index}
            name={skillName}
            level={skillLevel}
            jobCount={jobs}
            handleOpen={handleOpen}
          />
        )),
      remainingSkills: parsedSkills
        .slice(5)
        .map(({ skillName, skillLevel, jobs }, index) => (
          <SkillListItem
            key={index}
            name={skillName}
            level={skillLevel}
            jobCount={jobs}
          />
        )),
    });
  }, [skills]);

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ name: "", level: "" });

  const handleOpen = (name, level) => {
    setShowModal(true);
    setModalData({ name: name, level: level });
  };
  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="main-content">
      <PageHeader text="Skills" />
      <Row className="skills-row">{skills.topSkills}</Row>
      <p />
      <Row>{skills.remainingSkills}</Row>
      <SkillsModal
        show={showModal}
        handleClose={handleClose}
        name={modalData.name}
        level={modalData.level}
      />
    </div>
  );
};

export default SkillsDashboard;
