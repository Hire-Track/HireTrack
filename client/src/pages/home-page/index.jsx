import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import HireTrackDescription from "./components/description";
import LogInForm from "./components/loginForm";
import About from "./components/about";
import "./styles.css";

const HomePage = ({ user }) => {
  const Top = () => {
    if (user) {
      return <h1 className="header-1">Welcome, {user}!</h1>;
    }
    return (
      <>
        <Col xs="8" lg="3">
          <HireTrackDescription />
        </Col>
        <Col md="1"></Col>
        <Col xs="8" lg="4">
          <LogInForm />
        </Col>
      </>
    );
  };

  return (
    <Container fluid>
      <Row className={"hero-row justify-content-center"} xs={1}>
        <Top />
      </Row>
      <About />
    </Container>
  );
};

export default HomePage;
