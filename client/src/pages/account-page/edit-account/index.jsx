import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { editUser } from "../../../components/apis/users";

const EditAccountForm = ({ show, handleClose, realName }) => {
  const [realNameForm, setRealNameForm] = useState(realName);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const resp = await editUser({
      realName: realNameForm,
      gradDate: new Date(),
    });
    if (resp) {
      handleClose();
    }
    setIsLoading(false);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>Edit Profile</Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Real Name</Form.Label>
            <Form.Control
              type="text"
              placeholder={realName}
              onChange={(e) => {
                setRealNameForm(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} style={{ marginRight: "0.5rem" }}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Loading" : "Save"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditAccountForm;
