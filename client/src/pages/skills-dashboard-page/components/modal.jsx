import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import EditSkillForm from "../edit-skills-form";
import JobsList from "./jobsList";
import "../../../components/app/App.css";
import "../styles.css";

const SkillsModal = ({ id, show, handleModal, name, level, jobs, allJobs }) => {
  const [showJobs, setShowJobs] = useState(true);
  const showJobsModal = () => {
    setShowJobs(true);
  };

  return (
    <Modal
      show={show}
      onHide={handleModal.handleClose}
      size="lg"
      scrollable={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <strong>{name}</strong>&emsp;
          <span className="header-2">{level}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showJobs && <JobsList jobsIds={jobs} jobs={allJobs}/>}
        {!showJobs && (
          <EditSkillForm
            id={id}
            skillName={name}
            showJobsModal={showJobsModal}
            handleModal={handleModal}
            jobs={jobs}
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
