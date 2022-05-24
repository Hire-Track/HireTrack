import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "./components/password";
import { resetPass } from "../../components/apis/users";
import "./styles.css";

const ResetPage = () => {
  const [payload, setPayload] = useState({
    password: "",
  });
  const [password, setPassword] = useState("");
  const [isPwdValid, setIsPwdValid] = useState(false);
  const [isNew, setIsNew] = useState({
    password: true,
  });
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (password.length > 0) {
      setPayload({ ...payload, password: password });
    }
  }, [password, payload]);


  const navigator = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isPwdValid) {
      setShowLoading(true);
      const resetToken = window.location.pathname
      const res = await resetPass(payload, resetToken);
      if (res === "success") {
        alert("Password reset successfull! Redirecting");
        navigator("/");
        window.location.reload();
      } else if (res === "token expired") {
        alert("The reset link has expired, please request a new one. Redirecting");
        navigator("/");
        window.location.reload();
      } else {
        alert("Something went wrong! Please try again.");
        window.location.reload();
      }
      setShowLoading(false);
    } else {
      setIsNew({
        userName: false,
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
    <div className={"form-content reset-password"}>
      <h3 className={"header-2 header-2-border"}>
        <strong>Reset Password</strong>
      </h3>
      <Form onSubmit={onSubmit}>
        <Form.Label style={{ display: "flex" }}></Form.Label>
        <PasswordInput
          isPwdNew={isNew.password}
          isValid={isPwdValid}
          setIsValid={setIsPwdValid}
          setPassword={setPassword}
          requiredText={<ErrorText />}
        />
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

export default ResetPage;
