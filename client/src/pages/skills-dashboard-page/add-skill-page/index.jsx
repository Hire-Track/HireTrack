import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles.css";

const AddSkillPage = () => {
  return (
    <div className="form-content">
      <h3 className="header-2 add-skill-header"><strong>Add Skill</strong></h3>
      <Form>
        <Form.Control placeholder="Skill Name"></Form.Control>
        <p />
        <Form.Group>
          <Form.Select>
            <option selected disabled>Skill Level:</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Expert</option>
          </Form.Select>
        </Form.Group>
        <div className="button-row">
          <Button>Save</Button>&emsp;
        </div>
      </Form>
    </div>
  );
};

export default AddSkillPage;
