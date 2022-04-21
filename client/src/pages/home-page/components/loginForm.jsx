import React from "react";
import { Form, Button } from "react-bootstrap";

const LogInForm = () => {
  return (
    <Form>
      <Form.Group>
        <Form.Control type="email" placeholder="Email Address"></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Control type="password" placeholder="Password"></Form.Control>
      </Form.Group>
    <Button>Log In</Button>
    </Form>
  );
};

export default LogInForm;
