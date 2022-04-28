import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

const LogInForm = () => {
  const [email, setEmail] = useState("officerjenny@abc.com");
  const [pwd, setPwd] = useState("abc123");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && pwd) {
      try {
        const response = await fetch('/api/users/login', {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": "token-value",
        },
        body: JSON.stringify({email: email, password: pwd})
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          console.log(data.email);
        }
      } catch {
        console.log("ERROR");
      }
    }
  }

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
        <Row
          xs={1}
          md={2}
          className={"justify-content-center align-items-center"}
        >
          <Col>
            <Button onClick={handleSubmit}>Log In</Button>
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
