import React from "react";
import { Form, Button } from "react-bootstrap";
import "../../styles.css";

const EditSkillForm = ({ handleCancel }) => {
  return (
    <div>
      <h4 className="header-3">Edit Skill Level</h4>
      <Form>
        <Form.Group>
          <Form.Select>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Expert</option>
          </Form.Select>
        </Form.Group>
        <div className="button-row">
          <Button>Save</Button>&emsp;
          <Button onClick={handleCancel}>Cancel</Button>
        </div>
      </Form>
    </div>
  );
};

export default EditSkillForm;
