import React from "react";
import Row from "react-bootstrap/Row";

const About = () => {
  return (
    <Row className="about">
      <h3>About</h3>
      <br />
      <div className="two-col">
        <div>
          <li>Words</li>
          <li>Words</li>
          <li>Words</li>
          <li>Words</li>
        </div>
        <div>
          <li>More Words</li>
          <li>More Words</li>
          <li>More Words</li>
          <li>More Words</li>
        </div>
      </div>
    </Row>
  );
};

export default About;
