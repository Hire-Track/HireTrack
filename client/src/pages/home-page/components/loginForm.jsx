import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../components/apis";

const LogInForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && pwd) {
      const resp = await loginUser(email, pwd);
      if (resp) {
        navigate("/job-dashboard");
      }
    }
  };

  return (
    <div>
      <h3 className="header-2">Log In</h3>
      <Form>
        <Form.Group>
          <Form.Control type="email" placeholder="Email Address" onChange={e=>{setEmail(e.target.value)}}></Form.Control>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Control type="password" placeholder="Password" onChange={e=>{setPwd(e.target.value)}}></Form.Control>
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
