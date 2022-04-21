import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

const HireTrackNavBar = () => {
  return (
    <Navbar expand="md" sticky="top">
      <Container>
        <Navbar.Brand href="/">HireTrack</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Menu" id="basic-nav-dropdown">
              <NavDropdown.Item href="job-dashboard">Jobs</NavDropdown.Item>
              <NavDropdown.Item href="skills">Skills</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="account">Account</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HireTrackNavBar;
