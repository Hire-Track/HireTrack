import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { createSkill } from "../../../components/apis/skills";
import "../styles.css";

const AddSkillPage = () => {
  const navigator = useNavigate();
  const [skillName, setSkillName] = useState("");
  const [skillLevel, setSkillLevel] = useState(null);
  const [showError, setShowError] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const handleSubmit = async () => {
    setShowLoading(true);
    if (skillName && skillLevel) {
      createSkill({ skillName: skillName, skillLevel: skillLevel });
      navigator("/skills");
    } else {
      setShowError(true);
    }
    setShowLoading(false);
  };

  return (
    <div className="form-content">
      <h3 className="header-2 header-2-border">
        <strong>Add Skill</strong>
      </h3>
      <Form onSubmit={handleSubmit}>
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
            defaultValue=""
          >
            <option value="" disabled>
              Skill Level:
            </option>
            <option value="BEGINNER">Beginner</option>
            <option value="INTERMEDIATE">Intermediate</option>
            <option value="ADVANCED">Advanced</option>
          </Form.Select>
        </Form.Group>
        <div className="button-row">
          <Button onClick={handleSubmit} disabled={showLoading} type="submit">
            {showLoading ? "Loading..." : "Save"}
          </Button>
          <Link to="/skills">
            <Button style={{ marginLeft: "0.5rem" }}>Cancel</Button>
          </Link>
          {showError && (
            <span style={{ color: "red", marginLeft: "auto" }}>
              All fields are required
            </span>
          )}
        </div>
      </Form>
    </div>
  );
};

export default AddSkillPage;
