import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './index.css';

function Navigation() {
  return (
    <Navbar expand="lg" className="custom-navbar" variant="dark">
      <Nav.Link as={Link} to="/" className="custom-navbar-brand">
        <div className="navbar-logo">
          <img src="/images/crown.png" alt="Crown Logo" className="navbar-logo-icon" />
          <span className="navbar-brand-text">Kings Hockey</span>
        </div>
      </Nav.Link>
      <Navbar.Toggle color="light" aria-controls="navbarSupportedContent" />
      <Navbar.Collapse id="navbarSupportedContent">
        <Nav className="ms-auto">
          <Nav.Item>
            <Nav.Link as={Link} to="/" className="nav-link">
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/schedule" className="nav-link">
              Schedule
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/about" className="nav-link">
              About
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/gallery" className="nav-link">
              Stats
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
