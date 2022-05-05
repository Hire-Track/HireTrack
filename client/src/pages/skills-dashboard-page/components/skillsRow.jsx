import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { SkillCard, SkillListItem } from "./skillCard";
import SkillsModal from "./modal";
import { getSkills } from "../../../components/apis/skills";
import "../styles.css";

const SkillsRow = () => {
  const [skills, setSkills] = useState({ topSkills: [], remainingSkills: [] });
  const [parsedSkills, setParsedSkills] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ id: "", name: "", level: "" });

  // Get all skills on page load
  useEffect(() => {
    const fetchData = async () => {
      const data = await getSkills();
      setParsedSkills(data);
    };
    fetchData();
  }, [showModal]);

  // If there are skills, sort the skills and set the top three in demand skills
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
          .map(({ _id, skillName, skillLevel, jobs }, index) => (
            <Col key={index}>
              <SkillCard
                id={_id}
                name={skillName}
                level={skillLevel}
                jobCount={jobs}
                handleOpen={handleOpen}
              />
            </Col>
          )),
        remainingSkills: parsedSkills
          .slice(3)
          .map(({ _id, skillName, skillLevel, jobs }, index) => (
            <SkillListItem
              id={_id}
              key={index}
              name={skillName}
              level={skillLevel}
              jobCount={jobs}
              handleOpen={handleOpen}
            />
          )),
      });
    };
    sortSkills();
  }, [parsedSkills]);

  const handleOpen = (id, name, level) => {
    setShowModal(true);
    setModalData({ id: id, name: name, level: level });
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
        handleModal={{ handleOpen: handleOpen, handleClose: handleClose }}
        id={modalData.id}
        name={modalData.name}
        level={modalData.level}
      />
    </>
  );
};

export default SkillsRow;
