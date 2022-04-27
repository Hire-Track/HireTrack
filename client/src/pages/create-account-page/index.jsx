import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import PasswordInput from "./components/password";
import "./styles.css";

const CreateAccountPage = () => {
  const [accountForm, setAccountForm] = useState({
    username: "",
    email: "",
    password: "",
    realName: "",
    graduationDate: "",
  });
  const [password, setPassword] = useState("");
  const [isPwdValid, setIsPwdValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isNew, setIsNew] = useState({
    username: true,
    email: true,
    password: true,
  });

  useEffect(() => {
    if (password.length > 0) {
      setAccountForm({ ...accountForm, password: password });
    }
  }, [password]);

  useEffect(() => {
    validate();
  }, [accountForm.email]);

  const validate = () => {
    if (accountForm.email.length > 0) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  };

  // TODO
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(
      accountForm.username,
      accountForm.email,
      accountForm.password,
      accountForm.realName
    );
    if (accountForm.username && isEmailValid && isPwdValid) {
      alert("submit");
    } else {
      setIsNew({
        username: false,
        email: false,
        password: false,
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
      <Form>
        <Form.Group>
          <Form.Label style={{ display: "flex" }}>
            Username:
            {!isNew.username && !accountForm.username && <ErrorText />}
          </Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => {
              setAccountForm({ ...accountForm, username: e.target.value });
              setIsNew({ ...isNew, username: false });
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label style={{ display: "flex" }}>
            Email Address: {!isNew.email && !accountForm.email && <ErrorText />}
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Email Address"
            onChange={(e) => {
              setAccountForm({ ...accountForm, email: e.target.value });
              setIsNew({ ...isNew, email: false });
            }}
          ></Form.Control>
        </Form.Group>
        <p />
        {!isNew.password && !accountForm.password && <ErrorText />}
        <PasswordInput setIsValid={setIsPwdValid} setPassword={setPassword} />
        <p />
        <Form.Label>Optional:</Form.Label>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Full Name"
            required={false}
            onChange={(e) => {
              setAccountForm({ ...accountForm, realName: e.target.value });
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Graduation Date"
            required={false}
          ></Form.Control>
        </Form.Group>
        <Button style={{ marginRight: "0.5rem" }} onClick={onSubmit}>
          Submit
        </Button>
        <Link to="/">
          <Button>Cancel</Button>
        </Link>
      </Form>
    </div>
  );
};

export default CreateAccountPage;
