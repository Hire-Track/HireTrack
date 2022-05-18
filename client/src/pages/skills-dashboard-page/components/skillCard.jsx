import React from "react";
import Card from "react-bootstrap/Card";
import "../styles.css";

export const SkillCard = ({ id, name, level, jobs, handleOpen }) => {
  return (
    <Card
      className={"skills-card"}
      onClick={() => {
        handleOpen(id, name, level, jobs);
      }}
    >
      <Card.Body className="body-text">
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="grey">{level}</Card.Subtitle>
        <Card.Text>{jobs.length} Jobs</Card.Text>
      </Card.Body>
    </Card>
  );
};

export const SkillListItem = ({ id, name, level, jobs, handleOpen }) => {
  return (
    <li
      className="skills-item"
      onClick={() => {
        handleOpen(id, name, level, jobs);
      }}
    >
      <strong>{name}</strong> {level} – {jobs.length}
    </li>
  );
};
