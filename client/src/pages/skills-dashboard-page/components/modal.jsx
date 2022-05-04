import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import EditSkillForm from "../edit-skills-form";
import "../../../components/app/App.css";
import "../styles.css";

const SkillsModal = ({ id, show, handleModal, name, level }) => {
  const [showJobs, setShowJobs] = useState(true);
  const JobsList = () => (<>Jobs That Require This Skill:<br /></>);

  useEffect(() => {
    setShowJobs(true);
  }, [show]);

  const showJobsModal = () => {
    setShowJobs(true);
  };

  return (
    <Modal show={show} onHide={handleModal.handleClose} size="lg" scrollable={true}>
      <Modal.Header closeButton>
        <Modal.Title>
          <strong>{name}</strong>&emsp;
          <span className="header-2">{level}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showJobs && <JobsList />}
        {!showJobs && (
          <EditSkillForm
            id={id}
            skillName={name}
            showJobsModal={showJobsModal}
            handleModal={handleModal}
          />
        )}
      </Modal.Body>
      {showJobs && (
        <Modal.Footer>
          <Button
            onClick={() => {
              setShowJobs(false);
            }}
          >
            Edit Skill
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default SkillsModal;
