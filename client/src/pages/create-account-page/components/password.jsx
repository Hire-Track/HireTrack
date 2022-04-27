import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "../styles.css";

const PasswordInput = ({
  isPwdNew,
  isValid,
  setIsValid,
  setPassword,
  requiredText,
}) => {
  const [firstPwd, setFirstPwd] = useState("");
  const [secondPwd, setSecondPwd] = useState("");
  const [showError, setShowError] = useState(false);
  const [isNew, setIsNew] = useState({ one: true, two: true });

  useEffect(() => {
    const checkPwdsMatch = () => {
      if (firstPwd === secondPwd && firstPwd.length > 0) {
        setShowError(false);
        setPassword(firstPwd);
        setIsValid(true);
      } else {
        setShowError(true);
        setIsValid(false);
      }
    };
    checkPwdsMatch();
  }, [firstPwd, secondPwd, setIsValid, setPassword]);

  const onPwdChangeOne = (e) => {
    setIsNew({ ...isNew, one: false });
    setFirstPwd(e.target.value);
  };

  const onPwdChangeTwo = (e) => {
    setIsNew({ ...isNew, two: false });
    setSecondPwd(e.target.value);
  };

  const PasswordErrorText = () => (
    <div style={{ color: "red", marginLeft: "auto" }}>Passwords must match</div>
  );

  return (
    <>
      <Form.Group>
        <Form.Label style={{ display: "flex" }}>
          Choose a password:
          {!isPwdNew && !isValid && requiredText}
        </Form.Label>
        <Form.Control type="password" onChange={onPwdChangeOne}></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label style={{ display: "flex" }}>
          Enter password again:
          {(showError && !isNew.one && !isNew.two && <PasswordErrorText />) ||
            (!isPwdNew && !isValid && requiredText)}
        </Form.Label>
        <Form.Control type="password" onChange={onPwdChangeTwo}></Form.Control>
      </Form.Group>
    </>
  );
};

export default PasswordInput;
