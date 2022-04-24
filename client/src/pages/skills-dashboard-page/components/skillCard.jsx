import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import SkillsModal from "./modal";

export const SkillCard = ({ key, name, level, jobCount }) => {
  const [showModal, setShowModal] = useState(false);
  const handleOpen = () => {
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <Card
        key={key}
        className={"skills-card col-10 col-md-4 col-lg-2 offset-lg-0"}
        onClick={handleOpen}
      >
        <Card.Body className="body-text">
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle>Level: {level}</Card.Subtitle>
          <Card.Link>Found in {jobCount} Jobs</Card.Link>
        </Card.Body>
      </Card>
      <SkillsModal
        show={showModal}
        handleClose={handleClose}
        name={name}
        level={level}
      />
    </>
  );
};

export const SkillListItem = ({ key, name, level, jobCount }) => {
  return (
    <li key={key}>
      <strong>{name}</strong> {level} – {jobCount}
    </li>
  );
};
