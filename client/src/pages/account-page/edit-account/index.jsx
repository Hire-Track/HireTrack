import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-date-picker";
import { editUser } from "../../../components/apis/users";

const EditAccountForm = ({ show, handleClose, realName, gradDate }) => {
  const [realNameForm, setRealNameForm] = useState(realName);
  const [gradDateForm, setGradDateForm] = useState(
    gradDate ? new Date(gradDate) : ""
  );
  const [isLoading, setIsLoading] = useState(false);

  const onDateChange = (value) => {
    if (value) {
      setGradDateForm(value);
    } else if (!value && gradDateForm) {
      setGradDateForm("");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let resp;
    if (gradDateForm === "") {
      resp = await editUser({
        realName: realNameForm,
      });
    } else {
      resp = await editUser({
        realName: realNameForm,
        gradDate: gradDateForm,
      });
    }
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
          </Form.Group>{" "}
          <br />
          <Form.Label>Graduation Date</Form.Label> <br />
          <DatePicker value={gradDateForm} onChange={onDateChange} /> <p />
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Loading" : "Save"}
          </Button>
          <Button
            onClick={handleClose}
            style={{ marginRight: "0.5rem" }}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditAccountForm;
