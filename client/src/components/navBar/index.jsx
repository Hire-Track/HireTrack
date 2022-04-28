import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import "./styles.css";

const HireTrackNavBar = () => {
  return (
    <Navbar expand="md" sticky="top" className="hiretrack-navbar">
      <Container>
        <Navbar.Brand href="/"><StackedLineChartIcon />&thinsp;HireTrack</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav style={{marginLeft: 'auto'}}>
            <NavDropdown title="Jobs" id="basic-nav-dropdown">
              <NavDropdown.Item href="/job-dashboard">
                Jobs Dashboard
              </NavDropdown.Item>
              <NavDropdown.Item href="/add-job">
                Add a Job
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Skills" id="basic-nav-dropdown">
              <NavDropdown.Item href="/skills">
                Skills Dashboard
              </NavDropdown.Item>
              <NavDropdown.Item href="/add-skill">Add a Skill</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/account">Account</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HireTrackNavBar;
