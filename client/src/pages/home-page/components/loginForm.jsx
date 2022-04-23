import React from "react";
import { Form, Button } from "react-bootstrap";

const LogInForm = () => {
  return (
    <div>
      <h3 className="header-2 bottom-border">Log In</h3>
      <Form>
        <Form.Group>
          <Form.Control type="email" placeholder="Email Address"></Form.Control>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Control type="password" placeholder="Password"></Form.Control>
        </Form.Group>
        <br />
        <Button>Log In</Button>
      </Form>
    </div>
  );
};

export default LogInForm;
