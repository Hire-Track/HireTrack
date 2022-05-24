import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { updateSkill, deleteSkill } from "../../../components/apis/skills";
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

  const onDelete = async () => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      const resp = await deleteSkill(id);
      if (resp) {
        handleModal.handleClose();
        window.location.reload();
      }
    }
  };

  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Select defaultValue="" onChange={handleChange}>
            <option value="" disabled>
              Edit Skill Level:
            </option>
            <option value="BEGINNER">Beginner</option>
            <option value="INTERMEDIATE">Intermediate</option>
            <option value="ADVANCED">Advanced</option>
          </Form.Select>
        </Form.Group>
        <div className="button-row">
          <Button onClick={onSave} disabled={isLoading}>
            {isLoading ? "Loading" : "Save"}
          </Button>
          &emsp;
          <Button onClick={showJobsModal}>Cancel</Button>
          &emsp;
          <Button onClick={onDelete} variant="danger">
            Delete
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditSkillForm;
