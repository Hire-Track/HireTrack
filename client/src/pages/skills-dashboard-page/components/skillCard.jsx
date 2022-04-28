import React from "react";
import Card from "react-bootstrap/Card";
import "../styles.css";

export const SkillCard = ({ name, level, jobCount, handleOpen }) => {
  return (
    <Card
      className={"skills-card"}
      onClick={() => {
        handleOpen(name, level);
      }}
    >
      <Card.Body className="body-text">
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle>Level: {level}</Card.Subtitle>
        <Card.Link>Found in {jobCount} Jobs</Card.Link>
      </Card.Body>
    </Card>
  );
};

export const SkillListItem = ({ name, level, jobCount, handleOpen }) => {
  return (
    <li className="skills-item" onClick={()=>{handleOpen(name, level)}}>
      <strong>{name}</strong> {level} – {jobCount}
    </li>
  );
};
