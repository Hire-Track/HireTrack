import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../components/apis/users";

const LogInForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [showError, setShowError] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && pwd) {
      setShowLoading(true);
      const resp = await loginUser(email, pwd);
      if (resp) {
        navigate("/job-dashboard");
      } else {
        setShowError(true);
      }
      setShowLoading(false);
    }
  };

  const ErrorTxt = () => (
    <div style={{ color: "red" }}>Invalid credentials</div>
  );

  return (
    <div>
      <h3 className="header-2">Log In</h3>
      <Form>
        <Form.Group>
          <Form.Control
            type="email"
            placeholder="Email Address"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPwd(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        {showError ? <ErrorTxt /> : <div> </div>}
        <br />
        <Row
          xs={1}
          md={2}
          className={"justify-content-center align-items-center"}
        >
          <Col>
            <Button onClick={handleSubmit} disabled={showLoading}>
              {showLoading ? "Loading..." : "Log In"}
            </Button>
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
