import React from "react";
import { Container } from "react-bootstrap";
import LogInForm from "./components/loginForm";
import "./styles.css";

const HomePage = () => {
  return (
      <div className="hero-row">
        <div>
          <h1 className="header-1">HireTrack</h1>
          <div style={{ textAlign: "left" }} className="body-text">
            <li>Track your applications</li>
            <li>List your skills</li>
            <li>Keep your contacts</li>
            <li>Get hired</li>
          </div>
        </div>
        <div>
          <h2>Log In</h2>
          <LogInForm />
        </div>
      </div>
  );
};

export default HomePage;
