import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

const HireTrackNavBar = () => {
  return (
    <Navbar expand="md" sticky="top">
      <Container>
        <Navbar.Brand>HireTrack</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Actions" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Jobs</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Skills</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Contacts</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Account</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HireTrackNavBar;
