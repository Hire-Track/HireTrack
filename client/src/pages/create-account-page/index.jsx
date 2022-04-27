import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import "./styles.css";

const CreateAccountPage = () => {
  return (
    <div className={"form-content create-account"}>
      <h3 className={"header-2 header-2-border"}>
        <strong>Create an Account</strong>
      </h3>
      <Form>
        <Form.Group>
          <Form.Control type="text" placeholder="Username"></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Control type="email" placeholder="Email Address"></Form.Control>
        </Form.Group>
        <p />
        <Form.Group>
          <Form.Label>Choose a password:</Form.Label>
          <Form.Control type="password"></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Enter password again:</Form.Label>
          <Form.Control type="password"></Form.Control>
        </Form.Group>
        <p />
        <Form.Label>Optional:</Form.Label>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Full Name"
            required={false}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Graduation Date"
            required={false}
          ></Form.Control>
        </Form.Group>
            <Button style={{marginRight: "0.5rem"}}>Submit</Button>
            <Link to="/"><Button>Cancel</Button></Link>
      </Form>
    </div>
  );
};

export default CreateAccountPage;
