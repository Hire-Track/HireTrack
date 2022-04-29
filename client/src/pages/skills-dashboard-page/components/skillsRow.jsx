import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { SkillCard, SkillListItem } from "./skillCard";
import SkillsModal from "./modal";
import "../styles.css";
import { mockSkills } from "../mockdata";
import { getSkills } from "../../../components/apis/skills";

const SkillsRow = () => {
  const [skills, setSkills] = useState({ topSkills: [], remainingSkills: [] });
  const [parsedSkills, setParsedSkills] = useState([]);

  const fetchData = () => {
    // TODO API to fetch all Skills
    getSkills();
    return mockSkills;
  };

  const parseData = (data) => {
    // TODO
    return data;
  };

  useEffect(() => {
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
            <Col key={index}>
              <SkillCard
                name={skillName}
                level={skillLevel}
                jobCount={jobs}
                handleOpen={handleOpen}
              />
            </Col>
          )),
        remainingSkills: parsedSkills
          .slice(3)
          .map(({ skillName, skillLevel, jobs }, index) => (
            <SkillListItem
              key={index}
              name={skillName}
              level={skillLevel}
              jobCount={jobs}
              handleOpen={handleOpen}
            />
          )),
      });
    };
    let data = fetchData();
    setParsedSkills(parseData(data));
    sortSkills();
  }, [parsedSkills, setParsedSkills]);

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
      <Row xs={1} md={3}>
        {skills.topSkills}
      </Row>
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

export default SkillsRow;
