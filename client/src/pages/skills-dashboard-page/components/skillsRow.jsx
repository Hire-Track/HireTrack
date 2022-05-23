import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { SkillCard, SkillListItem } from "./skillCard";
import SkillsModal from "./modal";
import { getSkills, getJobsBySkills } from "../../../components/apis/skills";
import { getJobsMap } from "./utils";
import "../styles.css";

const SkillsRow = () => {
  const [allJobs, setAllJobs] = useState({});
  const [skills, setSkills] = useState({ topSkills: [], remainingSkills: [] });
  const [parsedSkills, setParsedSkills] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});

  // Get all jobs on page load
  useEffect(() => {
    const setData = async () => {
      const data = await getJobsMap();
      setAllJobs(data);
    };
    setData();
  }, []);

  // Get all skills on page load or when edited
  useEffect(() => {
    const fetchData = async () => {
      const jobs = await getJobsBySkills();
      // Add job ids associated with each skill
      const allSkills = await getSkills().then((skills) => {
        skills.forEach((skill) => {
          skill.jobs = jobs[skill._id];
        });
        return skills;
      });
      setParsedSkills(allSkills);
    };
    fetchData();
  }, [showModal]);

  function CreateSkill({ id, skillName, skillLevel, jobs, top }) {
    if (top) {
      return (
        <Col>
          <SkillCard
            id={id}
            name={skillName}
            level={skillLevel}
            jobs={jobs}
            handleOpen={handleOpen}
          />
        </Col>
      );
    } else {
      return (
        <SkillListItem
          id={id}
          name={skillName}
          level={skillLevel}
          jobs={jobs}
          handleOpen={handleOpen}
        />
      );
    }
  }

  // If there are skills, sort the skills and set the top three in demand skills
  useEffect(() => {
    const sortSkills = () => {
      // Sort by most in demand (jobs count)
      parsedSkills.sort(function (a, b) {
        return b.jobs.length - a.jobs.length;
      });
      // Set Skills
      setSkills({
        topSkills: parsedSkills
          .slice(0, 3)
          .map(({ _id, skillName, skillLevel, jobs }, index) => (
            <CreateSkill
              key={index}
              id={_id}
              skillName={skillName}
              skillLevel={skillLevel}
              jobs={jobs}
              top={true}
            />
          )),
        remainingSkills: parsedSkills
          .slice(3)
          .map(({ _id, skillName, skillLevel, jobs }, index) => (
            <CreateSkill
              key={index}
              id={_id}
              skillName={skillName}
              skillLevel={skillLevel}
              jobs={jobs}
              top={false}
            />
          )),
      });
    };
    if (parsedSkills.length > 0) {
      sortSkills();
    }
  }, [parsedSkills]);

  const handleOpen = (id, name, level, jobs) => {
    setShowModal(true);
    setModalData({
      id: id,
      name: name,
      level: level,
      jobs: jobs,
      allJobs: allJobs,
    });
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
        jobs={modalData.jobs}
        allJobs={modalData.allJobs}
      />
    </>
  );
};

export default SkillsRow;
