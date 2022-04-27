import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles.css";

const AddSkillPage = () => {
  const [skillName, setSkillName] = useState("");
  const [skillLevel, setSkillLevel] = useState(null);
  const [showError, setShowError] = useState(false);

  const handleSubmit = () => {
    if (skillName && skillLevel) {
      alert(skillName + ": " + skillLevel);
    } else {
      setShowError(true);
    }
  };

  return (
    <div className="form-content">
      <h3 className="header-2 header-2-border">
        <strong>Add Skill</strong>
      </h3>
      <Form>
        <Form.Control
          placeholder="Skill Name"
          onChange={(e) => {
            setSkillName(e.target.value);
          }}
        ></Form.Control>
        <p />
        <Form.Group>
          <Form.Select
            onChange={(e) => {
              setSkillLevel(e.target.value);
            }}
          >
            <option selected disabled>
              Skill Level:
            </option>
            <option value={0}>Beginner</option>
            <option value={1}>Intermediate</option>
            <option value={2}>Advanced</option>
          </Form.Select>
        </Form.Group>
        <div className="button-row">
          <Button onClick={handleSubmit}>Save</Button>&emsp;
          {showError && (
            <span style={{ color: "red", marginLeft: 'auto' }}>All fields are required</span>
          )}
        </div>
      </Form>
    </div>
  );
};

export default AddSkillPage;
