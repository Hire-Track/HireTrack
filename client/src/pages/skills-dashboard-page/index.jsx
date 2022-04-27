import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/row";
import Col from "react-bootstrap/col";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageHeader from "../../components/header";
import { SkillCard, SkillListItem } from "./components/skillCard";
import SkillsModal from "./components/modal";
import "./styles.css";
import { mockSkills } from "./mockdata";

const SkillsDashboard = () => {
  const AddSkillBtn = () => (
    <Link to="/add-skill">
      <Button>Add Skill</Button>
    </Link>
  );

  return (
    <div className="main-content">
      <PageHeader text="Skills" button={<AddSkillBtn />} />
      <SkillsRow />
    </div>
  );
};

export default SkillsDashboard;

const SkillsRow = () => {
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
    sortSkills();
  });

  const sortSkills = () => {
    // Sort by most in demand (jobs count)
    parsedSkills.sort(function (a, b) {
      return b.jobs - a.jobs;
    });
    // Set Skills
    setSkills({
      topSkills: parsedSkills
        .slice(0, 3)
        .map(({ skillName, skillLevel, jobs }, index) => (
          <Col><SkillCard
            key={index}
            name={skillName}
            level={skillLevel}
            jobCount={jobs}
            handleOpen={handleOpen}
          /></Col>
        )),
      remainingSkills: parsedSkills
        .slice(3)
        .map(({ skillName, skillLevel, jobs }, index) => (
          <SkillListItem
            key={index}
            name={skillName}
            level={skillLevel}
            jobCount={jobs}
          />
        )),
    });
  };

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
    <>
      <Row xs={1} md={3}>{skills.topSkills}</Row>
      <p />
      <Row>{skills.remainingSkills}</Row>
      <SkillsModal
        show={showModal}
        handleClose={handleClose}
        name={modalData.name}
        level={modalData.level}
      />
    </>
  );
};
