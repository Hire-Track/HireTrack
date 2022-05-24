import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { requestReset } from "../../components/apis/users";
import "./styles.css";

const RequestResetPage = () => {
  const [payload, setPayload] = useState({
    email: "",
  });
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isNew, setIsNew] = useState({
    email: true,
  });
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (payload.email.length > 0) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  }, [payload.email]);

  const navigator = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isEmailValid) {
      setShowLoading(true);
      const res = await requestReset(payload);
      if (res === "success") {
        alert("Password reset link sent successfully, please check your email to proceed!");
        navigator("/");
        window.location.reload();
      } else if (res === "invalid email") {
        alert("The email you requested does not exist in our database. Please try again.");
        window.location.reload();
      } else {
        alert("Something went wrong!");
        navigator("/");
        window.location.reload();
      }
      setShowLoading(false);
    } else {
      setIsNew({
        email: false,
      });
    }
  };

  const ErrorText = () => (
    <div style={{ color: "red", marginLeft: "auto" }}>
      This field is required
    </div>
  );

  return (
    <div className={"form-content request-reset"}>
      <h3 className={"header-2 header-2-border"}>
        <strong>Request a Password Reset - Enter Email</strong>
      </h3>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label style={{ display: "flex" }}>
            Email Address: {!isNew.email && !payload.email && <ErrorText />}
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Email Address of User to Reset Password"
            onChange={(e) => {
              setPayload({ ...payload, email: e.target.value });
              setIsNew({ ...isNew, email: false });
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Label style={{ display: "flex" }}></Form.Label>
        <Button
          style={{ marginRight: "0.5rem" }}
          onClick={onSubmit}
          disabled={showLoading}
          type="submit"
        >
          {showLoading ? "Loading" : "Submit"}
        </Button>
        <Link to="/">
          <Button>Cancel</Button>
        </Link>
      </Form>
    </div>
  );
};

export default RequestResetPage;
