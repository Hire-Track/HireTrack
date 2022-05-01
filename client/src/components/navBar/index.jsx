import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../app/userContext";
import "./styles.css";

const HireTrackNavBar = () => {
  const navigator = useNavigate();
  const handleLogout = () => {
    logout();
    navigator("/");
    window.location.reload();
  };

  return (
    <Navbar expand="md" sticky="top" className="hiretrack-navbar">
      <Container>
        <Link class="navbar-brand" to="/">
          <StackedLineChartIcon />
          &thinsp;HireTrack
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav style={{ marginLeft: "auto" }}>
            <NavDropdown title="Jobs" id="basic-nav-dropdown">
              <Link class="dropdown-item" to="/job-dashboard">
                Jobs Dashboard
              </Link>
              <Link class="dropdown-item" to="/add-job">
                Add a Job
              </Link>
            </NavDropdown>
            <NavDropdown title="Skills" id="basic-nav-dropdown">
              <Link class="dropdown-item" to="/skills">
                Skills Dashboard
              </Link>
              <Link class="dropdown-item" to="/add-skill">
                Add a Skill
              </Link>
            </NavDropdown>
            <Link class="nav-link" to="/account">
              Account
            </Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HireTrackNavBar;
