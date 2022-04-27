import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "../styles.css";

const PasswordInput = ({ setIsValid, setPassword }) => {
  const [firstPwd, setFirstPwd] = useState("");
  const [secondPwd, setSecondPwd] = useState("");
  const [showError, setShowError] = useState(false);
  const [isNew, setIsNew] = useState({ one: true, two: true });

  useEffect(() => {
    checkPwdsMatch();
  }, [firstPwd, secondPwd]);

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

  const onPwdChangeOne = (e) => {
    setIsNew({ ...isNew, one: false });
    setFirstPwd(e.target.value);
  };

  const onPwdChangeTwo = (e) => {
    setIsNew({ ...isNew, two: false });
    setSecondPwd(e.target.value);
  };

  const PasswordErrorText = () => (
    <div style={{color: 'red', marginLeft: 'auto'}}>Passwords must match</div>
  );

  return (
    <>
      <Form.Group>
        <Form.Label>Choose a password:</Form.Label>
        <Form.Control type="password" onChange={onPwdChangeOne}></Form.Control>
      </Form.Group>
      <Form.Group>
      <Form.Label style={{display: "flex"}}>
          Enter password again:
          {showError && !isNew.one && !isNew.two && <PasswordErrorText />}
        </Form.Label>
        <Form.Control type="password" onChange={onPwdChangeTwo}></Form.Control>
      </Form.Group>
    </>
  );
};

export default PasswordInput;
