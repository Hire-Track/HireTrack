import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-date-picker";
import PasswordInput from "./components/password";
import { createUser } from "../../components/apis/users";
import "./styles.css";

const CreateAccountPage = () => {
  const [payload, setPayload] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [password, setPassword] = useState("");
  const [isPwdValid, setIsPwdValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isNew, setIsNew] = useState({
    userName: true,
    email: true,
    password: true,
    gradDate: true,
  });
  const [showLoading, setShowLoading] = useState(false);
  const [duplicateUser, setDuplicateUser] = useState(false);
  const [gradDate, setGradDate] = useState("");

  useEffect(() => {
    if (password.length > 0) {
      setPayload({ ...payload, password: password });
    }
  }, [password, payload]);

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
    if (payload.userName && isEmailValid && isPwdValid) {
      setShowLoading(true);
      const res = await createUser(payload);
      if (res === "success") {
        alert("Creation successfull! Redirecting");
        navigator("/");
        window.location.reload();
      } else if (res === "user taken") {
        setDuplicateUser(true);
      }
      setShowLoading(false);
    } else {
      setIsNew({
        userName: false,
        email: false,
        password: false,
        gradDate: false,
      });
    }
  };

  const ErrorText = () => (
    <div style={{ color: "red", marginLeft: "auto" }}>
      This field is required
    </div>
  );

  return (
    <div className={"form-content create-account"}>
      <h3 className={"header-2 header-2-border"}>
        <strong>Create an Account</strong>
      </h3>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label style={{ display: "flex" }}>
            Username:
            {!isNew.userName && !payload.userName && <ErrorText />}
            {duplicateUser && (
              <div style={{ color: "red", marginLeft: "auto" }}>
                Username and/or email already in use
              </div>
            )}
          </Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => {
              setPayload({ ...payload, userName: e.target.value });
              setIsNew({ ...isNew, userName: false });
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label style={{ display: "flex" }}>
            Email Address: {!isNew.email && !payload.email && <ErrorText />}
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Email Address"
            onChange={(e) => {
              setPayload({ ...payload, email: e.target.value });
              setIsNew({ ...isNew, email: false });
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Label style={{ display: "flex" }}></Form.Label>
        <PasswordInput
          isPwdNew={isNew.password}
          isValid={isPwdValid}
          setIsValid={setIsPwdValid}
          setPassword={setPassword}
          requiredText={<ErrorText />}
        />
        <p />
        <Form.Label>
          <u>Optional:</u>
        </Form.Label>
        <Form.Group>
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Full Name"
            required={false}
            onChange={(e) => {
              setPayload({ ...payload, realName: e.target.value });
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Label>Graduation Date:</Form.Label> <br />
        <DatePicker
          value={gradDate}
          onChange={(value) => {
            setGradDate(value);
            setPayload({ ...payload, gradDate: value });
            setIsNew({ ...isNew, gradDate: false });
          }}
        />
        <p />
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

export default CreateAccountPage;
