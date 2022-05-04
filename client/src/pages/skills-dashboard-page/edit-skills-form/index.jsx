import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { updateSkill } from "../../../components/apis/skills";
import "../styles.css";

const EditSkillForm = ({ id, skillName, showJobsModal, handleModal }) => {
  const [payload, setPayload] = useState({
    id: id,
    skillName: skillName,
    skillLevel: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setPayload({ ...payload, skillLevel: e.target.value.toUpperCase() });
  };

  const onSave = async () => {
    setIsLoading(true);
    if (payload.skillLevel.length > 0) {
      const resp = await updateSkill(payload);
      if (resp) {
        showJobsModal();
        handleModal.handleOpen(id, skillName, payload.skillLevel);
      } else {
        alert("error!");
      }
    } else {
      alert("Choose Level");
    }
    setIsLoading(false);
  };

  return (
    <div>
      <h4 className="header-3">Edit Skill Level</h4>
      <Form>
        <Form.Group>
          <Form.Select onChange={handleChange}>
            <option selected disabled>
              Skill Level:
            </option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </Form.Select>
        </Form.Group>
        <div className="button-row">
          <Button onClick={onSave} disabled={isLoading}>
            {isLoading ? "Loading" : "Save"}
          </Button>
          &emsp;
          <Button onClick={showJobsModal}>Cancel</Button>
        </div>
      </Form>
    </div>
  );
};

export default EditSkillForm;
