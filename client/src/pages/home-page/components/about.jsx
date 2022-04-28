import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const About = () => {
  return (
    <Row className="about">
      <div className="text-center">
        <h3>
          <u>About</u>
        </h3>
      </div>
      <Row xs={1} md={2} className="align-items-center">
        <Col>
        Searching for a job is a job itself. Let HireTrack help lighten the
        load.
        </Col>
        <Col>
          <strong>
            Features
          </strong>
          <li>See the jobs you applied to</li>
          <li>Monitor your applications' progress</li>
          <li>List skills required for jobs</li>
          <li>Track your skill proficiency</li>
          <li>Keep contact information of those you meet</li>
        </Col>
      </Row>
    </Row>
  );
};

export default About;
