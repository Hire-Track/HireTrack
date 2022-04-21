import React from "react";
import { Container } from "react-bootstrap";
import "./styles.css";

const HomePage = () => {
  return (
    <Container>
      <div className="hero-row">
        <div>
          <h1>HireTrack</h1>
        </div>
        <div>
          <h2>Log In</h2>
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
