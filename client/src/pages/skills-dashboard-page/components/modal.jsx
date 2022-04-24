import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../../../components/app/App.css";
import "../styles.css";

const SkillsModal = ({ show, handleClose, name, level }) => {
  return (
    <Modal show={show} onHide={handleClose} size="lg" scrollable={true}>
      <Modal.Header closeButton>
        <Modal.Title>
          <strong>{name}</strong>&emsp;
          <span className="header-2">{level}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Jobs That Require This Skill:
        <br />
      </Modal.Body>
      <Modal.Footer>
        <Button>Edit Skill</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SkillsModal;
