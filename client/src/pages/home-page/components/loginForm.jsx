import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

const LogInForm = () => {
  return (
    <div>
      <h3 className="header-2">Log In</h3>
      <Form>
        <Form.Group>
          <Form.Control type="email" placeholder="Email Address"></Form.Control>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Control type="password" placeholder="Password"></Form.Control>
        </Form.Group>
        <br />
        <Row xs={1} md={2} className={"justify-content-center align-items-center"}>
          <Col>
            <Button type="submit">Log In</Button>
          </Col>
          <Col>
            <Link to="/signup">Create Account</Link>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default LogInForm;
